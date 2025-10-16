import { NextResponse } from 'next/server';
import { createPaymentOrder } from '@/lib/viva';

// Test endpoint to create a 0.10 EUR payment
export async function GET() {
  try {
    const { orderCode, paymentUrl } = await createPaymentOrder({
      amountCents: 10, // 0.10 EUR in cents
      customerEmail: 'test@angelosrentals.com',
      customerName: 'Test Customer',
      customerPhone: '+30 123 456 7890',
      reference: 'TEST-' + Date.now(),
      description: 'Test Payment - €0.10',
      sourceCode: 'Default',
    });

    return NextResponse.json({
      success: true,
      orderCode,
      paymentUrl,
      message: 'Test payment order created! Redirect to paymentUrl to complete payment.',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}

