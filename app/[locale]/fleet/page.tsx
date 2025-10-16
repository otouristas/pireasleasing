import { getSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function FleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .eq('active', true)
    .order('category')
    .order('make');

  const categories = [...new Set((cars || []).map(c => c.category))];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Ο Στόλος Μας' : 'Our Fleet'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Διάλεξε το τέλειο αυτοκίνητο για το ταξίδι σου' : 'Choose the perfect vehicle for your journey'}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#ECEFF1] py-6">
        <div className="container">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Κατηγορίες:' : 'Categories:'}</span>
            <button className="px-4 py-2 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-medium">
              {locale === 'el' ? 'Όλα' : 'All'}
            </button>
            {categories.map(cat => (
              <button key={cat} className="px-4 py-2 bg-white text-[#0B1B33] rounded-lg hover:bg-[#F9C80E] transition font-medium">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(cars || []).map((car) => {
              // Images in DB already have /lovable-uploads/ prefix
              const imageUrl = car.images?.[0] || '/fleet/placeholder.jpg';
              return (
                <Link 
                  key={car.id} 
                  href={`/${locale}/fleet/${car.slug}`}
                  className="flex flex-col gap-2 bg-white border-2 border-[#ECEFF1] rounded-xl p-4 hover:border-[#F9C80E] hover:shadow-lg transition-all group"
                >
                  {/* Image */}
                  <div className="relative h-[136px] rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <div 
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                      className="w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-[#F9C80E] text-[#0B1B33] px-2 py-1 rounded text-xs font-bold">
                      {car.category}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2">
                    <h2 className="flex flex-col">
                      <span className="font-bold text-xl text-[#0B1B33] truncate leading-6">
                        {car.make.toUpperCase()} {car.model.toUpperCase()}
                      </span>
                      <span className="text-gray-500 text-sm truncate leading-5">
                        {car.year}
                      </span>
                    </h2>

                    {/* Specs */}
                    <div className="flex items-center gap-1 text-gray-500 text-sm h-10">
                      <div className="flex items-center gap-x-1 flex-wrap">
                        <span>{car.seats} {locale === 'el' ? 'Άτομα' : 'People'}</span>
                        <span>•</span>
                        <span>{car.transmission}</span>
                        <span>•</span>
                        <span>{car.fuel_type}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-end mt-1">
                      <div className="flex items-end gap-1">
                        <span className="text-sm text-gray-500 -mb-px">{locale === 'el' ? 'από' : 'from'}</span>
                        <span className="text-2xl font-bold text-[#F9C80E] -mb-1 leading-5">
                          {car.price_per_day?.replace('€/Month', '')}
                          <span className="text-base"> €</span>
                        </span>
                        <span className="text-gray-500 text-xs">/{locale === 'el' ? 'μήνα' : 'month'}</span>
                      </div>
                    </div>

                    {/* License plate */}
                    <div className="text-xs text-gray-400 font-mono truncate">
                      {car.license_plate}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {(!cars || cars.length === 0) && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">{locale === 'el' ? 'Δεν βρέθηκαν οχήματα' : 'No vehicles found'}</p>
              <Link href={`/${locale}/contact`} className="btn-primary mt-4 inline-block">
                {locale === 'el' ? 'Επικοινωνήστε Μαζί Μας' : 'Contact Us'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9C80E] py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-[#0B1B33] mb-4">
            {locale === 'el' ? 'Δεν βρήκατε αυτό που ψάχνετε;' : 'Didn\'t Find What You\'re Looking For?'}
          </h2>
          <p className="text-lg text-[#0B1B33]/80 mb-6">
            {locale === 'el' ? 'Επικοινωνήστε μαζί μας για ειδικές ανάγκες' : 'Contact us for special requirements'}
          </p>
          <Link href={`/${locale}/contact`} className="inline-block bg-[#0B1B33] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0B1B33]/90 transition">
            {locale === 'el' ? 'Επικοινωνία' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </>
  );
}
