import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

async function getResendClient() {
  console.log('📧 [RESEND] Creating client...');
  console.log('📧 [RESEND] Supabase URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('📧 [RESEND] Supabase Key:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: settings, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'resend_api_key')
    .single();

  console.log('📧 [RESEND] API key fetch result:', { 
    found: !!settings?.value, 
    error: error?.message,
    keyLength: settings?.value?.length 
  });

  if (!settings?.value) {
    console.error('❌ [RESEND] API key not found in database!');
    throw new Error('Resend API key not found in database. Run SQL to add it!');
  }

  console.log('✅ [RESEND] API key found, creating Resend instance...');
  return new Resend(settings.value);
}

async function getAdminEmails() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: settings } = await supabase
    .from('settings')
    .select('value')
    .in('key', ['admin_email_1', 'admin_email_2']);

  return settings?.map(s => s.value) || [];
}

export async function sendBookingConfirmation(data: {
  to: string;
  customerName: string;
  bookingId: string;
  carName: string;
  pickupDate: string;
  dropoffDate: string;
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
}) {
  try {
    console.log('📧 [BOOKING EMAIL] Starting sendBookingConfirmation...');
    console.log('📧 [BOOKING EMAIL] To:', data.to);
    console.log('📧 [BOOKING EMAIL] Customer:', data.customerName);
    console.log('📧 [BOOKING EMAIL] Car:', data.carName);
    
    const resend = await getResendClient();
    console.log('📧 [BOOKING EMAIL] Resend client created');
    
    const adminEmails = await getAdminEmails();
    console.log('📧 [BOOKING EMAIL] Admin emails:', adminEmails);
    
    // Production: Send to customer and CC admins
    const recipients = [data.to];
    console.log('📧 [BOOKING EMAIL] Sending to:', recipients);

    // Use actual hosted logo for emails
    const logoUrl = 'https://aggelosrentals.com/wp-content/uploads/2023/12/cropped-cropped-Aggelos-Rentals-Logo-1.png';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #0B1B33; padding: 40px 30px; text-align: center; }
    .logo { max-width: 200px; height: auto; }
    .content { padding: 40px 30px; }
    .title { font-size: 24px; font-weight: bold; color: #0B1B33; margin-bottom: 20px; }
    .detail-box { background-color: #f9f9f9; border-left: 4px solid #F9C80E; padding: 20px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
    .detail-label { color: #666; font-size: 14px; }
    .detail-value { color: #0B1B33; font-weight: 600; font-size: 14px; }
    .total-row { font-size: 18px; padding-top: 15px; border-top: 2px solid #0B1B33; margin-top: 10px; }
    .button { display: inline-block; background-color: #F9C80E; color: #0B1B33; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background-color: #f9f9f9; padding: 30px; text-align: center; color: #666; font-size: 12px; }
    .checklist { background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .checklist-item { padding: 8px 0; color: #2e7d32; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Aggelos Rentals" class="logo" />
    </div>
    
    <div class="content">
      <div class="title">🎉 Booking Confirmed!</div>
      
      <p style="font-size: 16px; color: #333;">Dear ${data.customerName},</p>
      
      <p style="font-size: 14px; color: #666; line-height: 1.6;">
        Thank you for choosing Aggelos Rentals! Your booking has been confirmed and we're excited to serve you.
      </p>
      
      <div class="detail-box">
        <h3 style="margin: 0 0 15px 0; color: #0B1B33;">Booking Details</h3>
        <div class="detail-row">
          <span class="detail-label">Booking ID</span>
          <span class="detail-value">${data.bookingId.slice(0, 8)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Vehicle</span>
          <span class="detail-value">${data.carName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pick-up</span>
          <span class="detail-value">${data.pickupDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Drop-off</span>
          <span class="detail-value">${data.dropoffDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Amount</span>
          <span class="detail-value">€${data.totalAmount.toFixed(2)}</span>
        </div>
        <div class="detail-row" style="background-color: #e8f5e9;">
          <span class="detail-label">Deposit Paid ✓</span>
          <span class="detail-value" style="color: #2e7d32;">€${data.depositAmount.toFixed(2)}</span>
        </div>
        <div class="detail-row total-row">
          <span class="detail-label" style="font-size: 16px;"><strong>Balance Due at Pick-up</strong></span>
          <span class="detail-value" style="font-size: 18px; color: #F9C80E;">€${data.balanceAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="checklist">
        <h3 style="margin: 0 0 15px 0; color: #2e7d32;">✓ What to Bring:</h3>
        <div class="checklist-item">✓ Valid driver's license</div>
        <div class="checklist-item">✓ ID or Passport</div>
        <div class="checklist-item">✓ Balance payment (€${data.balanceAmount.toFixed(2)})</div>
        <div class="checklist-item">✓ This confirmation email</div>
      </div>
      
      <center>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/en" class="button">Visit Our Website</a>
      </center>
      
      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        If you have any questions, please don't hesitate to contact us.
      </p>
    </div>
    
    <div class="footer">
      <div style="font-size: 22px; font-weight: bold; margin-bottom: 10px; color: #F9C80E;">Aggelos Rentals</div>
      <p style="margin: 10px 0; font-size: 14px; color: #e5e7eb;">Your trusted partner for car rentals</p>
      
      <div style="margin: 25px 0;">
        <p style="margin: 5px 0; color: #e5e7eb;">📍 Piraeus, Akti Themistokleous 104, Greece</p>
        <p style="margin: 5px 0;">📧 <a href="mailto:piraeus@aggelosrentals.com" style="color: #F9C80E; text-decoration: none;">piraeus@aggelosrentals.com</a></p>
        <p style="margin: 5px 0;">📱 <a href="tel:+306980151068" style="color: #F9C80E; text-decoration: none;">+30 6980 151 068</a></p>
        <p style="margin: 5px 0; color: #e5e7eb;">🕐 7 Days: 09:00 - 20:00</p>
      </div>
      
      <div style="margin: 25px 0;">
        <a href="https://www.facebook.com/AggelosRentACar" class="social-link">f</a>
        <a href="https://www.instagram.com/aggelosrentacar/" class="social-link">📷</a>
        <a href="https://x.com/AggelosRentACar" class="social-link">𝕏</a>
        <a href="https://www.youtube.com/@AggelosRentACarAntiparos" class="social-link">▶</a>
      </div>
      
      <p style="font-size: 11px; color: #9ca3af; margin-top: 20px;">
        © ${new Date().getFullYear()} Aggelos Rentals. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // Send to customer with admin CC
    console.log('📧 [BOOKING EMAIL] Calling resend.emails.send...');
    
    const result = await resend.emails.send({
      from: 'Aggelos Rentals <onboarding@resend.dev>', // Replace with your verified domain
      to: recipients,
      cc: adminEmails.length > 0 ? adminEmails : undefined,
      replyTo: 'piraeus@aggelosrentals.com',
      subject: `🎉 Booking Confirmed - ${data.carName}`,
      html,
    });

    console.log('✅ [BOOKING EMAIL] Email sent!');
    console.log('✅ [BOOKING EMAIL] Result:', JSON.stringify(result, null, 2));
    
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return false;
  }
}

export async function sendContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    console.log('📧 [RESEND] Starting sendContactForm...');
    console.log('📧 [RESEND] Data:', { name: data.name, email: data.email, hasMessage: !!data.message });
    
    console.log('📧 [RESEND] Getting Resend client...');
    const resend = await getResendClient();
    console.log('📧 [RESEND] Resend client created ✓');
    
    console.log('📧 [RESEND] Getting admin emails...');
    const adminEmails = await getAdminEmails();
    console.log('📧 [RESEND] Admin emails:', adminEmails);
    
    if (!adminEmails || adminEmails.length === 0) {
      throw new Error('No admin emails found in database');
    }
    
    // Production: Send to all admin emails
    const emailsToSend = adminEmails;
    
    // Use actual hosted logo
    const logoUrl = 'https://aggelosrentals.com/wp-content/uploads/2023/12/cropped-cropped-Aggelos-Rentals-Logo-1.png';
    console.log('📧 [RESEND] Logo URL:', logoUrl);

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #0B1B33 0%, #1a2f4d 100%); color: white; padding: 40px 20px; text-align: center; }
    .logo { max-width: 220px; height: auto; margin-bottom: 15px; }
    .tagline { font-size: 16px; color: #F9C80E; font-weight: 500; }
    .content { background: #ffffff; padding: 40px 30px; }
    .greeting { font-size: 26px; color: #0B1B33; margin-bottom: 20px; font-weight: 600; }
    .message { font-size: 16px; margin-bottom: 20px; color: #333; }
    .highlight-box { background: #fffbeb; border-left: 4px solid #F9C80E; padding: 20px; margin: 25px 0; border-radius: 4px; }
    .info-grid { display: table; width: 100%; margin: 20px 0; background: #f9fafb; border-radius: 8px; padding: 20px; }
    .info-item { padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
    .info-item:last-child { border-bottom: none; }
    .info-label { font-weight: 600; color: #0B1B33; display: block; margin-bottom: 5px; }
    .info-value { color: #374151; }
    .cta-section { text-align: center; margin: 30px 0; }
    .button { display: inline-block; background: #F9C80E; color: #0B1B33; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 5px; }
    .button:hover { background: #e0b50c; }
    .divider { border-top: 2px solid #e0e0e0; margin: 30px 0; }
    .contact-grid { display: table; width: 100%; margin: 20px 0; }
    .contact-item { display: table-cell; text-align: center; padding: 15px; vertical-align: top; }
    .contact-icon { font-size: 28px; margin-bottom: 10px; }
    .footer { background: #0B1B33; color: #ffffff; padding: 35px 30px; text-align: center; }
    .footer-links { margin: 20px 0; }
    .footer-link { color: #F9C80E; text-decoration: none; margin: 0 12px; font-size: 13px; }
    .footer-link:hover { color: #fff; }
    .social-links { margin: 25px 0; }
    .social-link { display: inline-block; margin: 0 10px; width: 36px; height: 36px; background: #1a2f4d; border-radius: 50%; line-height: 36px; text-align: center; text-decoration: none; color: #F9C80E; font-size: 18px; }
    .social-link:hover { background: #F9C80E; color: #0B1B33; }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img src="${logoUrl}" alt="Aggelos Rentals" class="logo" />
      <p class="tagline">Premium Car Rental Services in Athens & Piraeus</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <div class="greeting">New Contact Message! 👋</div>
      
      <div class="message">
        <p><strong>You have received a new inquiry from your website.</strong></p>
        <p>A potential customer has reached out and is waiting for your response.</p>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">👤 Customer Name</span>
          <span class="info-value">${data.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">📧 Email Address</span>
          <span class="info-value">${data.email}</span>
        </div>
        <div class="info-item">
          <span class="info-label">📱 Phone Number</span>
          <span class="info-value">${data.phone}</span>
        </div>
      </div>
      
      <div class="highlight-box">
        <p style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #0B1B33;">💬 Customer Message:</p>
        <p style="white-space: pre-wrap; margin: 0; color: #1f2937; line-height: 1.7;">${data.message}</p>
      </div>
      
      <div class="cta-section">
        <p style="margin-bottom: 15px; color: #666;">Reply directly to respond:</p>
        <a href="mailto:${data.email}" class="button">📨 Reply to ${data.name}</a>
        <a href="https://wa.me/306980151068" class="button">💬 WhatsApp</a>
      </div>

      <div class="divider"></div>

      <!-- Quick Contact -->
      <div class="contact-grid">
        <div class="contact-item">
          <div class="contact-icon">📞</div>
          <div style="font-weight: 600; color: #0B1B33;">Phone</div>
          <div style="font-size: 14px;"><a href="tel:+306980151068" style="color: #F9C80E; text-decoration: none;">+30 6980 151 068</a></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">✉️</div>
          <div style="font-weight: 600; color: #0B1B33;">Email</div>
          <div style="font-size: 14px;"><a href="mailto:piraeus@aggelosrentals.com" style="color: #F9C80E; text-decoration: none;">piraeus@aggelosrentals.com</a></div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">🕐</div>
          <div style="font-weight: 600; color: #0B1B33;">Hours</div>
          <div style="font-size: 14px;">7 Days<br>09:00 - 20:00</div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div style="font-size: 22px; font-weight: bold; margin-bottom: 10px; color: #F9C80E;">Aggelos Rentals</div>
      <p style="margin: 10px 0; font-size: 14px; color: #e5e7eb;">Your trusted partner for car rentals in Athens & Piraeus</p>
      
      <div class="divider" style="border-color: #1a2f4d; margin: 25px 0;"></div>
      
      <div style="margin: 20px 0;">
        <p style="margin: 5px 0; color: #e5e7eb;">📍 Piraeus, Akti Themistokleous 104, Greece</p>
        <p style="margin: 5px 0;">📧 <a href="mailto:piraeus@aggelosrentals.com" style="color: #F9C80E; text-decoration: none;">piraeus@aggelosrentals.com</a></p>
        <p style="margin: 5px 0;">📱 <a href="tel:+306980151068" style="color: #F9C80E; text-decoration: none;">+30 6980 151 068</a></p>
        <p style="margin: 5px 0; color: #e5e7eb;">🕐 Open 7 Days: 09:00 - 20:00</p>
      </div>
      
      <div class="social-links">
        <a href="https://www.facebook.com/AggelosRentACar" class="social-link">f</a>
        <a href="https://www.instagram.com/aggelosrentacar/" class="social-link">📷</a>
        <a href="https://x.com/AggelosRentACar" class="social-link">𝕏</a>
        <a href="https://www.youtube.com/@AggelosRentACarAntiparos" class="social-link">▶</a>
      </div>
      
      <div class="footer-links">
        <a href="https://aggelosrentals.com" class="footer-link">Website</a>
        <a href="https://aggelosrentals.com/fleet" class="footer-link">Fleet</a>
        <a href="https://aggelosrentals.com/contact" class="footer-link">Contact</a>
      </div>
      
      <p style="font-size: 11px; color: #9ca3af; margin-top: 25px;">
        © ${new Date().getFullYear()} Aggelos Rentals. All rights reserved.<br>
        This email was sent from your website contact form.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    console.log('📧 [RESEND] Preparing to send email...');
    console.log('📧 [RESEND] To:', emailsToSend);
    console.log('📧 [RESEND] From:', 'Aggelos Rentals <onboarding@resend.dev>');
    console.log('📧 [RESEND] ReplyTo:', data.email);
    
    const emailPayload = {
      from: 'Aggelos Rentals <onboarding@resend.dev>',
      to: emailsToSend,
      replyTo: data.email,
      subject: `Contact Form: ${data.name}`,
      html,
    };
    
    console.log('📧 [RESEND] Email payload prepared');
    console.log('📧 [RESEND] Calling resend.emails.send...');
    
    const result = await resend.emails.send(emailPayload);

    console.log('✅ [RESEND] Email sent successfully!');
    console.log('✅ [RESEND] Result:', JSON.stringify(result, null, 2));
    return true;
  } catch (error: any) {
    console.error('❌ [RESEND] Error sending email!');
    console.error('❌ [RESEND] Error:', error);
    console.error('❌ [RESEND] Message:', error.message);
    console.error('❌ [RESEND] Stack:', error.stack);
    return false;
  }
}

export async function sendPickupReminder(data: {
  to: string;
  customerName: string;
  carName: string;
  pickupDate: string;
  pickupTime: string;
  location: string;
  balanceAmount: number;
}) {
  try {
    const resend = await getResendClient();
    // Use actual hosted logo for emails
    const logoUrl = 'https://aggelosrentals.com/wp-content/uploads/2023/12/cropped-cropped-Aggelos-Rentals-Logo-1.png';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #0B1B33; padding: 30px; text-align: center; }
    .content { padding: 40px 30px; }
    .reminder-box { background-color: #fff9e6; border: 2px solid #F9C80E; border-radius: 8px; padding: 20px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Aggelos Rentals" style="max-width: 180px;" />
    </div>
    <div class="content">
      <h2 style="color: #0B1B33;">🚗 Pick-up Reminder</h2>
      <p>Hi ${data.customerName},</p>
      <p>This is a reminder that your vehicle pick-up is scheduled for <strong>tomorrow</strong>:</p>
      
      <div class="reminder-box">
        <h3 style="color: #F9C80E; margin-top: 0;">Tomorrow's Pick-up</h3>
        <p><strong>Vehicle:</strong> ${data.carName}</p>
        <p><strong>Date:</strong> ${data.pickupDate}</p>
        <p><strong>Time:</strong> ${data.pickupTime}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p style="font-size: 18px; color: #F9C80E; margin-top: 15px;">
          <strong>Balance Due:</strong> €${data.balanceAmount.toFixed(2)}
        </p>
      </div>
      
      <p><strong>Please bring:</strong></p>
      <ul>
        <li>Valid driver's license</li>
        <li>ID or Passport</li>
        <li>Payment for balance (€${data.balanceAmount.toFixed(2)})</li>
      </ul>
      
      <p>We look forward to seeing you tomorrow!</p>
    </div>
  </div>
</body>
</html>
    `;

    await resend.emails.send({
      from: 'Aggelos Rentals <reminders@angelosrentals.com>',
      to: [data.to],
      subject: `Reminder: Pick-up Tomorrow - ${data.carName}`,
      html,
    });

    return true;
  } catch (error) {
    console.error('Error sending pickup reminder:', error);
    return false;
  }
}

