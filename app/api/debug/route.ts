import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const debug: any = {
    timestamp: new Date().toISOString(),
    environment: {},
    supabase: {},
    settings: {},
  };

  // Check environment variables
  debug.environment = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  // Check Supabase connection
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Test settings table
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('key, description')
      .limit(10);

    debug.supabase.connected = !settingsError;
    debug.supabase.settingsError = settingsError?.message || null;
    debug.supabase.settingsCount = settingsData?.length || 0;

    if (settingsData) {
      debug.settings = {};
      settingsData.forEach((s: any) => {
        debug.settings[s.key] = 'SET ✓';
      });
    }

    // Check specific keys
    const { data: vivaClient } = await supabase.from('settings').select('value').eq('key', 'viva_client_id').single();
    const { data: resendKey } = await supabase.from('settings').select('value').eq('key', 'resend_api_key').single();
    const { data: adminEmail1 } = await supabase.from('settings').select('value').eq('key', 'admin_email_1').single();

    debug.criticalSettings = {
      viva_client_id: vivaClient?.value ? 'SET ✓' : 'MISSING ✗',
      resend_api_key: resendKey?.value ? 'SET ✓' : 'MISSING ✗',
      admin_email_1: adminEmail1?.value || 'MISSING ✗',
    };

  } catch (error: any) {
    debug.supabase.error = error.message;
    debug.supabase.connected = false;
  }

  return NextResponse.json(debug, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

