import { getSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MyBookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect(`/${locale}/login?redirect=/${locale}/my-bookings`);
    }

    const { data: bookings } = await supabase
      .from('bookings')
      .select(`
        *,
        cars:car_id (
          make,
          model,
          year,
          license_plate,
          images
        ),
        pickup_location:pickup_location_id (
          name_key,
          code
        ),
        dropoff_location:dropoff_location_id (
          name_key,
          code
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const activeBookings = bookings?.filter(b => 
      new Date(b.end_ts) >= new Date() && 
      (b.status === 'confirmed' || b.status === 'awaiting_payment')
    ) || [];

    const pastBookings = bookings?.filter(b => 
      new Date(b.end_ts) < new Date() || 
      b.status === 'completed' || 
      b.status === 'cancelled'
    ) || [];

    return (
      <>
        <section className="bg-[#0B1B33] text-white py-20">
          <div className="container">
            <h1 className="text-5xl font-bold text-white mb-4">
              {locale === 'el' ? 'Οι Κρατήσεις Μου' : 'My Bookings'}
            </h1>
            <p className="text-xl text-gray-200">
              {locale === 'el' ? 'Διαχειριστείτε τις κρατήσεις σας' : 'Manage your reservations'}
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            {/* Active Bookings */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#0B1B33] mb-6">
                {locale === 'el' ? 'Ενεργές Κρατήσεις' : 'Active Bookings'}
              </h2>
              
              {activeBookings.length === 0 ? (
                <div className="bg-white border-2 border-gray-200 rounded-lg p-12 text-center">
                  <p className="text-gray-600 mb-6">
                    {locale === 'el' ? 'Δεν έχετε ενεργές κρατήσεις' : 'You have no active bookings'}
                  </p>
                  <Link href={`/${locale}/booking`} className="btn-primary">
                    {locale === 'el' ? 'Κάντε Κράτηση' : 'Make a Booking'}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-white border-2 border-[#F9C80E] rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                {locale === 'el' ? 'Κωδικός Κράτησης' : 'Booking Reference'}
                              </div>
                              <div className="font-mono text-lg font-bold text-[#0B1B33]">
                                {booking.id.slice(0, 13).toUpperCase()}
                              </div>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {booking.status === 'confirmed' 
                                ? (locale === 'el' ? 'Επιβεβαιωμένο' : 'Confirmed')
                                : (locale === 'el' ? 'Εκκρεμεί Πληρωμή' : 'Awaiting Payment')
                              }
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                {locale === 'el' ? 'Όχημα' : 'Vehicle'}
                              </div>
                              <div className="font-semibold text-[#0B1B33]">
                                {booking.cars?.make} {booking.cars?.model} ({booking.cars?.year})
                              </div>
                              <div className="text-sm text-gray-500">{booking.cars?.license_plate}</div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                {locale === 'el' ? 'Ημερομηνίες' : 'Dates'}
                              </div>
                              <div className="font-semibold text-[#0B1B33]">
                                {new Date(booking.start_ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US')}
                              </div>
                              <div className="text-sm text-gray-500">
                                {locale === 'el' ? 'έως' : 'to'} {new Date(booking.end_ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US')}
                              </div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                {locale === 'el' ? 'Παραλαβή' : 'Pickup'}
                              </div>
                              <div className="text-sm text-gray-700">{booking.pickup_location?.name_key}</div>
                            </div>

                            <div>
                              <div className="text-sm text-gray-600 mb-1">
                                {locale === 'el' ? 'Επιστροφή' : 'Return'}
                              </div>
                              <div className="text-sm text-gray-700">{booking.dropoff_location?.name_key}</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div>
                              <div className="text-sm text-gray-600">
                                {locale === 'el' ? 'Σύνολο' : 'Total Amount'}
                              </div>
                              <div className="text-2xl font-bold text-[#0B1B33]">
                                {(booking.total_cents / 100).toFixed(2)} EUR
                              </div>
                              {booking.status === 'awaiting_payment' && (
                                <div className="text-sm text-yellow-700 font-semibold mt-1">
                                  {locale === 'el' ? 'Εκκρεμεί πληρωμή' : 'Balance due'}: {(booking.balance_cents / 100).toFixed(2)} EUR
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0B1B33] mb-6">
                  {locale === 'el' ? 'Προηγούμενες Κρατήσεις' : 'Past Bookings'}
                </h2>
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 opacity-75">
                      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        <div>
                          <div className="font-mono text-sm text-gray-500">{booking.id.slice(0, 13).toUpperCase()}</div>
                          <div className="font-semibold text-[#0B1B33] mt-1">
                            {booking.cars?.make} {booking.cars?.model}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {new Date(booking.start_ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US')} - {new Date(booking.end_ts).toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US')}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'completed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status === 'completed' 
                              ? (locale === 'el' ? 'Ολοκληρώθηκε' : 'Completed')
                              : (locale === 'el' ? 'Ακυρώθηκε' : 'Cancelled')
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#0B1B33] mb-4">
            {locale === 'el' ? 'Σφάλμα Σύνδεσης' : 'Connection Error'}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === 'el' 
              ? 'Δεν ήταν δυνατή η φόρτωση των κρατήσεων σας. Παρακαλώ δοκιμάστε ξανά αργότερα.'
              : 'Unable to load your bookings. Please try again later or contact support.'
            }
          </p>
          <Link href={`/${locale}`} className="btn-primary">
            {locale === 'el' ? 'Επιστροφή στην Αρχική' : 'Return to Home'}
          </Link>
        </div>
      </div>
    );
  }
}

