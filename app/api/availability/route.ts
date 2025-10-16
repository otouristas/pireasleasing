import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const category = searchParams.get('category');
  if (!start || !end) {
    return NextResponse.json({ error: 'Missing start/end' }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  // Find cars that do not have any booking overlapping the given range
  // Overlap condition: (start < booking.end_ts) AND (end > booking.start_ts)
  const { data: allCars, error: carsErr } = await supabase
    .from('cars')
    .select('*')
    .eq('active', true)
    .maybeSingle();

  // Since Supabase RPC or complex joins are better for this, run two queries and filter in app for now
  const { data: booked, error: bErr } = await supabase
    .from('bookings')
    .select('car_id')
    .not('car_id', 'is', null)
    .lt('start_ts', end)
    .gt('end_ts', start);

  if (carsErr || bErr) {
    return NextResponse.json({ error: (carsErr || bErr)?.message }, { status: 500 });
  }

  const bookedIds = new Set((booked || []).map(b => b.car_id));
  const { data: carsList, error } = await supabase
    .from('cars')
    .select('*')
    .eq('active', true)
    .filter('id', 'not.in', `(${[...bookedIds].map(id => `'${id}'`).join(',') || ''})`)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fallback: when no booked ids, just return all active cars
  if (bookedIds.size === 0) {
    const { data: cars } = await supabase.from('cars').select('*').eq('active', true);
    return NextResponse.json({ cars });
  }

  // Filter by category if provided
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .eq('active', true);

  const available = (cars || []).filter(c => !bookedIds.has(c.id) && (!category || c.category === category));
  return NextResponse.json({ cars: available });
}


