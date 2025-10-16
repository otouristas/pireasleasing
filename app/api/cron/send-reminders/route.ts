import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { sendPickupReminder } from '@/lib/resend-email';

/**
 * Cron job to send automated pickup reminders
 * Should be triggered daily by Vercel Cron or external scheduler
 * 
 * Setup in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-reminders",
 *     "schedule": "0 10 * * *"
 *   }]
 * }
 */

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'default-secret-change-in-production';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = await getSupabaseServerClient();
    
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Find bookings with pickup tomorrow
    const { data: upcomingBookings } = await supabase
      .from('bookings')
      .select(`
        *,
        cars:car_id (
          make,
          model
        ),
        pickup_location:pickup_location_id (
          name_key
        )
      `)
      .gte('start_ts', tomorrow.toISOString())
      .lt('start_ts', dayAfterTomorrow.toISOString())
      .eq('status', 'confirmed');

    if (!upcomingBookings || upcomingBookings.length === 0) {
      return NextResponse.json({ 
        message: 'No reminders to send',
        count: 0 
      });
    }

    // Send reminders
    const results = await Promise.allSettled(
      upcomingBookings.map(async (booking) => {
        if (!booking.customer_email || !booking.customer_name) {
          return { success: false, bookingId: booking.id, reason: 'Missing email' };
        }

        const pickupDate = new Date(booking.start_ts);
        
        const sent = await sendPickupReminder({
          to: booking.customer_email,
          customerName: booking.customer_name,
          carName: `${booking.cars?.make} ${booking.cars?.model}`,
          pickupDate: pickupDate.toLocaleDateString(),
          pickupTime: pickupDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          location: booking.pickup_location?.name_key || 'See booking details',
          balanceAmount: booking.balance_cents / 100,
        });

        return {
          success: sent,
          bookingId: booking.id,
          email: booking.customer_email,
        };
      })
    );

    const successCount = results.filter(
      r => r.status === 'fulfilled' && r.value.success
    ).length;

    return NextResponse.json({
      message: `Sent ${successCount} reminder(s)`,
      total: upcomingBookings.length,
      success: successCount,
      failed: upcomingBookings.length - successCount,
      details: results.map(r => r.status === 'fulfilled' ? r.value : { error: r.reason }),
    });

  } catch (error) {
    console.error('Error in reminder cron:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint for testing
 * POST /api/cron/send-reminders with auth header
 */
export async function POST(req: Request) {
  return GET(req);
}

