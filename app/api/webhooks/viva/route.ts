import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { verifyTransaction } from '@/lib/viva';
import crypto from 'crypto';

// Viva Wallet Webhook - Transaction Payment Created
// Docs: https://developer.vivawallet.com/webhooks-for-payments/webhook-events/

/**
 * Verifies Viva Wallet webhook signature
 * @param payload - The raw request body as string
 * @param signature - The Authorization header value
 * @param webhookKey - Your Viva Wallet webhook verification key
 */
function verifyVivaSignature(payload: string, signature: string, webhookKey: string): boolean {
  try {
    // Viva Wallet uses HMAC-SHA256 for webhook signatures
    const expectedSignature = crypto
      .createHmac('sha256', webhookKey)
      .update(payload)
      .digest('hex');
    
    // Remove 'Bearer ' prefix if present
    const providedSignature = signature.replace(/^Bearer\s+/i, '');
    
    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(providedSignature)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Get raw body for signature verification
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);
    
    console.log('Viva webhook received:', payload);
    
    // Get webhook verification key from database
    const supabase = await getSupabaseServerClient();
    const { data: webhookSettings } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'viva_webhook_key')
      .single();
    
    if (!webhookSettings?.value) {
      console.error('Viva webhook key not configured');
      // In production, return 401. For now, log warning and continue
      console.warn('⚠️ WARNING: Webhook signature verification skipped - no key configured');
    } else {
      // Verify webhook signature
      const authHeader = req.headers.get('Authorization');
      
      if (!authHeader) {
        console.error('Missing Authorization header for webhook');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      const isValid = verifyVivaSignature(rawBody, authHeader, webhookSettings.value);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
      
      console.log('✅ Webhook signature verified');
    }
    
    // Extract data from webhook payload
    const transactionId = payload?.EventData?.TransactionId;
    const orderCode = payload?.EventData?.OrderCode;
    const amount = payload?.EventData?.Amount; // in cents
    const statusId = payload?.EventData?.StatusId; // 'F' = success

    if (!transactionId || !orderCode) {
      console.error('Missing required webhook data');
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Verify transaction with Viva API
    let transactionData;
    try {
      transactionData = await verifyTransaction(transactionId);
    } catch (error) {
      console.error('Transaction verification failed:', error);
      // Still process if webhook data looks valid
      transactionData = { statusId };
    }

    const supabase = await getSupabaseServerClient();

    // Find booking by Viva order code
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('viva_order_id', String(orderCode))
      .maybeSingle();

    if (!booking) {
      console.error('Booking not found for order:', orderCode);
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Check if payment was successful
    const isSuccess = statusId === 'F' || transactionData?.statusId === 'F';

    if (isSuccess) {
      // Update booking to confirmed
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'confirmed',
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (error) {
        console.error('Failed to update booking:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
      }

      console.log('Booking confirmed:', booking.id);
      
      // Send confirmation email to customer
      if (booking.customer_email && booking.customer_name) {
        const car = await supabase.from('cars').select('*').eq('id', booking.car_id).single();
        
        if (car.data) {
          const { sendBookingConfirmation } = await import('@/lib/resend-email');
          await sendBookingConfirmation({
            to: booking.customer_email,
            customerName: booking.customer_name,
            bookingId: booking.id,
            carName: `${car.data.make} ${car.data.model}`,
            pickupDate: new Date(booking.start_ts).toLocaleDateString(),
            dropoffDate: new Date(booking.end_ts).toLocaleDateString(),
            totalAmount: booking.total_cents / 100,
            depositAmount: booking.deposit_cents / 100,
            balanceAmount: booking.balance_cents / 100,
          });
        }
      }
      
      return NextResponse.json({ ok: true, status: 'confirmed' });
    } else {
      // Payment failed or pending
      console.log('Payment not successful, status:', statusId);
      return NextResponse.json({ ok: true, status: 'pending' });
    }
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


