import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperAdmin } from '@/lib/auth';

export async function POST() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Only super admin can run setup
  if (!user || !isSuperAdmin(user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Try to create a test entry to verify table exists
    const { error: testError } = await supabase
      .from('blocked_dates')
      .select('*')
      .limit(0);

    if (testError) {
      // Table doesn't exist - return SQL to run
      return NextResponse.json({ 
        error: 'Table does not exist',
        sql: `
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  blocked_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(car_id, blocked_date)
);

CREATE INDEX IF NOT EXISTS idx_blocked_dates_car_id ON blocked_dates(car_id);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(blocked_date);

ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on blocked_dates" 
  ON blocked_dates FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage blocked_dates" 
  ON blocked_dates FOR ALL USING (auth.role() = 'authenticated');
        `,
        message: 'Please run this SQL in Supabase SQL Editor'
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Table already exists and is ready to use!'
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      details: 'Could not verify table existence'
    }, { status: 500 });
  }
}

