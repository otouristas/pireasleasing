// Email reminder system for bookings

interface EmailReminderData {
  to: string;
  bookingId: string;
  customerName: string;
  carName: string;
  date: string;
  time: string;
  location: string;
  type: 'pickup' | 'dropoff' | 'payment';
}

export async function sendReminderEmail(data: EmailReminderData): Promise<boolean> {
  try {
    // In production, this would call your email service (SendGrid, Resend, etc.)
    // For now, we'll use a placeholder that logs to console
    
    const subject = {
      pickup: `Reminder: Vehicle Pick-up Tomorrow`,
      dropoff: `Reminder: Vehicle Drop-off Tomorrow`,
      payment: `Payment Reminder for Your Booking`,
    }[data.type];

    const message = {
      pickup: `
Hello ${data.customerName},

This is a reminder that your vehicle pick-up is scheduled for tomorrow:

Vehicle: ${data.carName}
Date: ${data.date}
Time: ${data.time}
Location: ${data.location}

Booking ID: ${data.bookingId}

Please arrive 15 minutes before your scheduled time with your driver's license and identification.

Thank you for choosing Aggelos Rentals!
      `,
      dropoff: `
Hello ${data.customerName},

This is a reminder that your vehicle drop-off is scheduled for tomorrow:

Vehicle: ${data.carName}
Date: ${data.date}
Time: ${data.time}
Location: ${data.location}

Booking ID: ${data.bookingId}

Please ensure the vehicle is returned with a full tank and in good condition.

Thank you for choosing Aggelos Rentals!
      `,
      payment: `
Hello ${data.customerName},

This is a reminder that payment is due for your booking:

Vehicle: ${data.carName}
Booking ID: ${data.bookingId}

Please complete your payment to confirm your reservation.

Thank you for choosing Aggelos Rentals!
      `,
    }[data.type];

    console.log('📧 Email Reminder:', { to: data.to, subject, message });
    
    // TODO: Integrate with actual email service
    // Example: await resend.emails.send({ to: data.to, subject, html: message });
    
    return true;
  } catch (error) {
    console.error('Error sending reminder:', error);
    return false;
  }
}

export function getUpcomingReminders(bookings: any[], cars: any[]): any[] {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const nextDay = new Date(tomorrow);
  nextDay.setDate(nextDay.getDate() + 1);
  
  const reminders: any[] = [];
  
  bookings.forEach(booking => {
    if (booking.status !== 'confirmed') return;
    
    const car = cars.find(c => c.id === booking.car_id);
    if (!car) return;
    
    const startDate = new Date(booking.start_ts);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(booking.end_ts);
    endDate.setHours(0, 0, 0, 0);
    
    // Pickup reminder (1 day before)
    if (startDate.getTime() === tomorrow.getTime()) {
      reminders.push({
        id: `${booking.id}-pickup`,
        bookingId: booking.id,
        type: 'pickup',
        date: new Date(booking.start_ts).toLocaleDateString(),
        time: new Date(booking.start_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        customer: booking.customer_name || 'Customer',
        email: booking.customer_email,
        car: `${car.make} ${car.model}`,
      });
    }
    
    // Dropoff reminder (1 day before)
    if (endDate.getTime() === tomorrow.getTime()) {
      reminders.push({
        id: `${booking.id}-dropoff`,
        bookingId: booking.id,
        type: 'dropoff',
        date: new Date(booking.end_ts).toLocaleDateString(),
        time: new Date(booking.end_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        customer: booking.customer_name || 'Customer',
        email: booking.customer_email,
        car: `${car.make} ${car.model}`,
      });
    }
  });
  
  return reminders;
}

