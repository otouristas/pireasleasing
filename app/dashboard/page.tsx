import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperAdmin } from '@/lib/auth';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  // Debug logging
  console.log('Dashboard access attempt:', {
    hasUser: !!user,
    userEmail: user?.email,
    isAdmin: user?.email ? isSuperAdmin(user.email) : false,
    error: error
  });

  // Check if user is authenticated and is super admin
  if (!user) {
    console.log('No user found, redirecting to login');
    redirect('/en/login?redirect=/dashboard');
  }

  if (!isSuperAdmin(user.email)) {
    console.log('User is not super admin:', user.email);
    // Redirect to unauthorized page
    redirect('/dashboard/unauthorized');
  }

  // Fetch all data from Supabase
  const [
    { data: bookings },
    { data: cars },
    { data: locations },
    { data: addons },
    { data: settings },
    { data: authUsers },
  ] = await Promise.all([
    supabase.from('bookings').select('*').order('created_at', { ascending: false }),
    supabase.from('cars').select('*').order('make'),
    supabase.from('locations').select('*').order('code'),
    supabase.from('addons').select('*').order('name_key'),
    supabase.from('settings').select('*').order('key'),
    supabase.auth.admin.listUsers().catch(() => ({ data: { users: [] } })), // Fallback if admin access fails
  ]);

  console.log('Dashboard data fetched:', {
    bookingsCount: bookings?.length || 0,
    carsCount: cars?.length || 0,
    locationsCount: locations?.length || 0,
    addonsCount: addons?.length || 0,
    usersCount: authUsers?.users?.length || 0,
  });

  // Calculate analytics
  const totalRevenue = bookings?.reduce((sum, b) => sum + (b.total_cents || 0), 0) || 0;
  const pendingBookings = bookings?.filter(b => b.status === 'awaiting_payment').length || 0;
  const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0;
  const activeCars = cars?.filter(c => c.active).length || 0;

  return (
    <DashboardClient
      user={user}
      initialData={{
        bookings: bookings || [],
        cars: cars || [],
        locations: locations || [],
        addons: addons || [],
        users: authUsers?.users || [],
        settings: settings || [],
      }}
      analytics={{
        totalRevenue,
        totalBookings: bookings?.length || 0,
        pendingBookings,
        confirmedBookings,
        activeCars,
        totalCars: cars?.length || 0,
      }}
    />
  );
}

