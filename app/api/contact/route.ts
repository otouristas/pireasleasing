import { NextResponse } from 'next/server';
import { sendContactForm } from '@/lib/resend-email';

export async function POST(req: Request) {
  console.log('🔍 [CONTACT API] Starting...');
  
  try {
    const body = await req.json();
    console.log('🔍 [CONTACT API] Body received:', { 
      hasName: !!body.name, 
      hasEmail: !!body.email, 
      hasMessage: !!body.message 
    });
    
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      console.log('❌ [CONTACT API] Missing fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('🔍 [CONTACT API] Calling sendContactForm...');
    
    // Send email
    const success = await sendContactForm({
      name,
      email,
      phone: phone || 'Not provided',
      message,
    });

    console.log('🔍 [CONTACT API] Email send result:', success);

    if (success) {
      console.log('✅ [CONTACT API] Success!');
      return NextResponse.json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
    } else {
      console.log('❌ [CONTACT API] Email send failed');
      return NextResponse.json({ 
        error: 'Failed to send email. Check server logs for details.' 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('❌ [CONTACT API] Exception:', error);
    console.error('❌ [CONTACT API] Stack:', error.stack);
    return NextResponse.json({ 
      error: 'Server error: ' + error.message 
    }, { status: 500 });
  }
}

