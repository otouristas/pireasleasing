import { getSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${locale}/login`);

  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, start_ts, end_ts, status, total_cents, deposit_cents')
    .eq('user_id', user.id)
    .order('start_ts', { ascending: false });

  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Οι Κρατήσεις Μου' : 'My Bookings'}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="space-y-4">
            {(bookings || []).length > 0 ? (
              bookings.map((b) => (
                <div key={b.id} className="border-2 border-[#ECEFF1] p-6 rounded-lg hover:border-[#F9C80E] transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono text-sm text-gray-500 mb-2">Ref: {b.id}</div>
                      <div className="text-lg font-semibold text-[#0B1B33]">
                        {new Date(b.start_ts).toLocaleDateString()} → {new Date(b.end_ts).toLocaleDateString()}
                      </div>
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          b.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          b.status === 'awaiting_payment' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{locale === 'el' ? 'Σύνολο' : 'Total'}</div>
                      <div className="text-2xl font-bold text-[#0B1B33]">€{(b.total_cents/100).toFixed(2)}</div>
                      <div className="text-sm text-gray-600">{locale === 'el' ? 'Προκαταβολή' : 'Deposit'}: €{(b.deposit_cents/100).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">{locale === 'el' ? 'Δεν έχετε κρατήσεις ακόμα' : 'No bookings yet'}</p>
                <Link href={`/${locale}/booking`} className="btn-primary">
                  {locale === 'el' ? 'Κάντε την πρώτη σας κράτηση' : 'Make your first booking'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

