import { createClient } from '@supabase/supabase-js';

type OAuthTokenResponse = { access_token: string; expires_in: number; token_type: 'Bearer' };

async function getVivaCredentials() {
  console.log('💳 [VIVA] Fetching credentials from database...');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: settings, error } = await supabase
    .from('settings')
    .select('key, value')
    .in('key', ['viva_client_id', 'viva_client_secret', 'viva_merchant_id', 'viva_api_key', 'viva_source_code']);

  console.log('💳 [VIVA] Settings fetched:', { count: settings?.length || 0, error: error?.message });

  if (!settings || settings.length === 0) {
    console.error('❌ [VIVA] No credentials found!');
    throw new Error('Viva credentials not found in database. Run SQL to add them!');
  }

  const creds: any = {};
  settings.forEach(s => {
    creds[s.key] = s.value;
    console.log(`💳 [VIVA] ${s.key}: ${s.value ? 'SET ✓' : 'MISSING ✗'}`);
  });

  if (!creds.viva_client_id || !creds.viva_client_secret) {
    console.error('❌ [VIVA] Missing client_id or client_secret!');
    throw new Error('Viva client credentials missing from database');
  }

  console.log('✅ [VIVA] Credentials loaded successfully');

  return {
    clientId: creds.viva_client_id,
    clientSecret: creds.viva_client_secret,
    merchantId: creds.viva_merchant_id,
    apiKey: creds.viva_api_key,
    sourceCode: creds.viva_source_code || 'Default',
  };
}

async function getOAuthToken(): Promise<string> {
  const { clientId, clientSecret } = await getVivaCredentials();
  
  console.log('💳 [VIVA AUTH] Client ID:', clientId?.substring(0, 20) + '...');
  console.log('💳 [VIVA AUTH] Has Secret:', !!clientSecret);
  
  if (!clientId || !clientSecret) {
    throw new Error('Missing Viva credentials in database');
  }

  // Try PRODUCTION endpoints (your client ID ends with .apps.vivapayments.com)
  const authBase = 'https://accounts.vivapayments.com';
  console.log('💳 [VIVA AUTH] Using endpoint:', authBase);
  
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
  });

  const authHeader = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  console.log('💳 [VIVA AUTH] Auth header created');

  console.log('💳 [VIVA AUTH] Requesting token...');
  const resp = await fetch(`${authBase}/connect/token`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authHeader,
    },
    body: params.toString(),
    cache: 'no-store',
  });
  
  console.log('💳 [VIVA AUTH] Response status:', resp.status);
  
  if (!resp.ok) {
    const error = await resp.text();
    console.error('❌ [VIVA AUTH] Failed! Status:', resp.status);
    console.error('❌ [VIVA AUTH] Error:', error);
    
    // Try demo as fallback
    console.log('💳 [VIVA AUTH] Trying DEMO endpoint as fallback...');
    const demoResp = await fetch('https://demo-accounts.vivapayments.com/connect/token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authHeader,
      },
      body: params.toString(),
      cache: 'no-store',
    });
    
    if (!demoResp.ok) {
      const demoError = await demoResp.text();
      console.error('❌ [VIVA AUTH] Demo also failed:', demoError);
      throw new Error(`Viva OAuth failed on both production and demo: ${error}`);
    }
    
    const demoData = (await demoResp.json()) as OAuthTokenResponse;
    console.log('✅ [VIVA AUTH] Demo auth successful!');
    return demoData.access_token;
  }
  
  const data = (await resp.json()) as OAuthTokenResponse;
  console.log('✅ [VIVA AUTH] Production auth successful!');
  return data.access_token;
}

export async function createPaymentOrder(params: {
  amountCents: number;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  reference: string; // our booking id
  description: string;
  sourceCode?: string;
}) {
  const apiBase = 'https://demo-api.vivapayments.com';
  const token = await getOAuthToken();
  const { sourceCode: defaultSourceCode } = await getVivaCredentials();
  
  const orderData = {
    amount: params.amountCents, // Amount in cents
    customerTrns: params.description,
    customer: {
      email: params.customerEmail || '',
      fullName: params.customerName || '',
      phone: params.customerPhone || '',
      countryCode: 'GR',
      requestLang: 'en-GB'
    },
    paymentTimeout: 1800, // 30 minutes
    preauth: false,
    allowRecurring: false,
    maxInstallments: 0,
    paymentNotification: true,
    disableExactAmount: false,
    disableCash: false,
    disableWallet: false,
    sourceCode: params.sourceCode || defaultSourceCode || 'Default',
    merchantTrns: `Booking: ${params.reference}`,
    tags: ['booking', params.reference]
  };

  console.log('Creating Viva payment order:', orderData);

  const resp = await fetch(`${apiBase}/checkout/v2/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
    cache: 'no-store',
  });
  
  if (!resp.ok) {
    const error = await resp.text();
    console.error('Viva create order failed:', error);
    throw new Error(`Viva create order failed: ${error}`);
  }
  
  const data = await resp.json();
  const orderCode = String(data.orderCode); // Keep as string to avoid JS number limit
  
  // Smart Checkout redirect URL
  const checkoutUrl = `https://demo.vivapayments.com/web/checkout?ref=${orderCode}`;
  
  return {
    orderCode,
    paymentUrl: checkoutUrl,
  };
}

export async function verifyTransaction(transactionId: string) {
  const apiBase = 'https://demo-api.vivapayments.com';
  const token = await getOAuthToken();
  
  const resp = await fetch(`${apiBase}/checkout/v2/transactions/${transactionId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  
  if (!resp.ok) {
    throw new Error('Failed to verify transaction');
  }
  
  return await resp.json();
}


