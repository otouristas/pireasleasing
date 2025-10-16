import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { calculatePrice } from '@/lib/pricing';
import { createPaymentOrder } from '@/lib/viva';

const BookingPayload = z.object({
  startTs: z.string().datetime(),
  endTs: z.string().datetime(),
  carId: z.string(),
  pickup: z.object({ locationId: z.string(), isOffHours: z.boolean() }),
  dropoff: z.object({ locationId: z.string(), isOffHours: z.boolean() }),
  extras: z.array(z.object({ addonId: z.string() })).default([]),
  driver: z.object({ 
    name: z.string(),
    dob: z.string().date().or(z.string()), 
    licenseNo: z.string(), 
    idNo: z.string(), 
    email: z.string().email(), 
    phone: z.string() 
  }),
  paymentMethod: z.enum(['viva', 'iris']).optional().default('iris'),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = BookingPayload.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Allow both authenticated and unauthenticated bookings
  const userId = user?.id || null;

  // Get car details for pricing
  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('id', parsed.data.carId)
    .single();

  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  // Calculate pricing
  const start = new Date(parsed.data.startTs);
  const end = new Date(parsed.data.endTs);
  const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const monthlyRate = parseFloat(car.price_per_day.replace('€/Month', '').replace('€', ''));
  const dailyRate = monthlyRate / 30;
  const totalCents = Math.round(dailyRate * duration * 100);
  const depositCents = Math.round(totalCents * 0.15);
  const balanceCents = totalCents - depositCents;

  // Create booking record
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      user_id: userId,
      car_id: parsed.data.carId,
      start_ts: parsed.data.startTs,
      end_ts: parsed.data.endTs,
      pickup_location_id: parsed.data.pickup.locationId,
      dropoff_location_id: parsed.data.dropoff.locationId,
      status: 'awaiting_payment',
      base_price_cents: totalCents,
      fees_cents: 0,
      extras_cents: 0,
      total_cents: totalCents,
      deposit_cents: depositCents,
      balance_cents: balanceCents,
      customer_name: parsed.data.driver.name,
      customer_email: parsed.data.driver.email,
      customer_phone: parsed.data.driver.phone,
      customer_license: parsed.data.driver.licenseNo,
    })
    .select('*')
    .single();

  if (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Handle payment based on method
  if (parsed.data.paymentMethod === 'iris') {
    // IRIS Payment - Skip payment gateway, send confirmation immediately
    console.log('💳 [IRIS] Payment method selected - sending confirmation');
    console.log('💳 [IRIS] Customer email:', parsed.data.driver.email);
    console.log('💳 [IRIS] Booking ID:', booking.id);
    
    try {
      // Send booking confirmation email
      const { sendBookingConfirmation } = await import('@/lib/resend-email');
      console.log('💳 [IRIS] Calling sendBookingConfirmation...');
      
      const emailSent = await sendBookingConfirmation({
        to: parsed.data.driver.email,
        customerName: parsed.data.driver.name,
        bookingId: booking.id,
        carName: `${car.make} ${car.model}`,
        pickupDate: new Date(booking.start_ts).toLocaleDateString(),
        dropoffDate: new Date(booking.end_ts).toLocaleDateString(),
        totalAmount: booking.total_cents / 100,
        depositAmount: booking.deposit_cents / 100,
        balanceAmount: booking.balance_cents / 100,
      });
      
      console.log('💳 [IRIS] Email send result:', emailSent);
      
      if (!emailSent) {
        console.error('❌ [IRIS] Email failed to send but continuing...');
      } else {
        console.log('✅ [IRIS] Email sent successfully!');
      }
    } catch (emailError: any) {
      console.error('❌ [IRIS] Email error:', emailError.message);
      // Continue anyway - booking is created
    }
    
    return NextResponse.json({ 
      bookingId: booking.id, 
      orderCode: booking.id,
      paymentMethod: 'iris',
      message: 'Booking created successfully. Check your email for confirmation.'
    });
  }

  // Create Viva Wallet payment order
  try {
    const { orderCode, paymentUrl } = await createPaymentOrder({
      amountCents: depositCents,
      customerEmail: parsed.data.driver.email,
      customerName: parsed.data.driver.name,
      customerPhone: parsed.data.driver.phone,
      reference: booking.id,
      description: `Car Rental - ${car.make} ${car.model}`,
      sourceCode: 'Default',
    });
    
    // Update booking with order code
    await supabase.from('bookings').update({ viva_order_id: orderCode }).eq('id', booking.id);
    
    return NextResponse.json({ 
      bookingId: booking.id, 
      paymentUrl,
      orderCode 
    });
  } catch (vivaError: any) {
    console.error('Viva payment error:', vivaError);
    // Delete the booking if payment creation failed
    await supabase.from('bookings').delete().eq('id', booking.id);
    return NextResponse.json({ error: 'Payment processing failed: ' + vivaError.message }, { status: 500 });
  }
}


