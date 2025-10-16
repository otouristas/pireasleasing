import Link from 'next/link';
import { Metadata } from 'next';
import { generateOrganizationSchema, generateWebsiteSchema, renderStructuredData } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'el'
    ? 'Ενοικίαση Αυτοκινήτου Πειραιάς & Αθήνα | Aggelos Rentals'
    : 'Rent a Car in Piraeus & Athens Airport | Aggelos Rentals';
  
  const description = locale === 'el'
    ? 'Ενοικιάστε αυτοκίνητο στον Πειραιά και Αθήνα χωρίς πιστωτική κάρτα. Πλήρης ασφάλεια, διαφανής τιμολόγηση και παράδοση 24/7.'
    : 'Rent a car in Piraeus and Athens without credit card. Full insurance, transparent pricing, and 24/7 delivery available.';
  
  const url = `https://aggelosrentals.com/${locale}`;
  const imageUrl = 'https://aggelosrentals.com/logo.png';
  
  return {
    title,
    description,
    keywords: locale === 'el'
      ? 'ενοικίαση αυτοκινήτου, Πειραιάς, Αθήνα, χωρίς πιστωτική, αεροδρόμιο, λιμάνι'
      : 'car rental, Piraeus, Athens, no credit card, airport, port, Greece',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Aggelos Rentals',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Aggelos Rentals Logo',
        },
      ],
      locale: locale === 'el' ? 'el_GR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@AggelosRentACar',
      site: '@AggelosRentACar',
    },
    alternates: {
      canonical: url,
      languages: {
        'en': 'https://aggelosrentals.com/en',
        'el': 'https://aggelosrentals.com/el',
      },
    },
  };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Generate structured data
  const organizationSchema = generateOrganizationSchema(locale);
  const websiteSchema = generateWebsiteSchema();
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderStructuredData(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: renderStructuredData(websiteSchema) }}
      />
      {/* Hero Section */}
      <section className="relative bg-[var(--primary)] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] via-[#0B1B33]/95 to-[#0B1B33]/90"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-block bg-[var(--accent)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {locale === 'el' ? 'Χωρίς Πιστωτική Κάρτα' : 'No Credit Card Required'}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                {locale === 'el' ? 'Ενοικίαση Αυτοκινήτου σε Πειραιά & Αεροδρόμιο Αθήνας' : 'Rent a Car in Piraeus & Athens Airport'}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {locale === 'el' ? 'Χωρίς πιστωτική κάρτα. Χωρίς εγγύηση. Πλήρης ασφάλεια περιλαμβάνεται. Διαφανής τιμολόγηση με παράδοση στο λιμάνι ή το αεροδρόμιο.' : 'No credit card. No deposit. Full insurance included. Transparent pricing with delivery at port or airport.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/booking`} className="btn-primary text-lg px-8 py-4">
                  {locale === 'el' ? 'Κλείστε Τώρα' : 'Book Now'}
                </Link>
                <Link href={`/${locale}/fleet`} className="btn-outline text-lg px-8 py-4">
                  {locale === 'el' ? 'Δείτε τον Στόλο' : 'See Our Fleet'}
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-6">{locale === 'el' ? 'Ξεκινήστε την Κράτησή σας' : 'Start Your Reservation'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{locale === 'el' ? 'Παραλαβή' : 'Pick-up Date'}</label>
                  <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{locale === 'el' ? 'Επιστροφή' : 'Return Date'}</label>
                  <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[var(--accent)] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{locale === 'el' ? 'Τοποθεσία' : 'Location'}</label>
                  <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[var(--accent)] focus:outline-none text-gray-700">
                    <option>{locale === 'el' ? 'Λιμάνι Πειραιά' : 'Piraeus Port'}</option>
                    <option>{locale === 'el' ? 'Αεροδρόμιο Αθήνας' : 'Athens Airport'}</option>
                    <option>{locale === 'el' ? 'Παράδοση στη Διεύθυνσή σας' : 'Delivery to Your Address'}</option>
                  </select>
                </div>
                <Link href={`/${locale}/booking`} className="btn-primary w-full text-center block py-4">
                  {locale === 'el' ? 'Έλεγχος Διαθεσιμότητας' : 'Check Availability'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
              {locale === 'el' ? 'Γιατί να επιλέξετε Aggelos Rentals;' : 'Why Choose Aggelos Rentals?'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'el' ? 'Βασικοί λόγοι για να ενοικιάσετε από εμάς' : 'Key reasons to rent from us'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#ECEFF1] to-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center mb-6">
                <div className="w-10 h-10 border-4 border-[var(--primary)] rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">{locale === 'el' ? 'Χωρίς Πιστωτική Κάρτα' : 'No Credit Card Required'}</h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'el' ? 'Κρατήστε με μόνο 15% προκαταβολή online. Χωρίς εγγύηση ή κράτηση στην κάρτα σας κατά την παραλαβή.' : 'Reserve with just 15% down payment online. No deposit or credit card hold at pickup.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#ECEFF1] to-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center mb-6">
                <div className="w-10 h-10 border-4 border-[var(--primary)] rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">{locale === 'el' ? 'Πλήρης Ασφάλεια' : 'Full Insurance Included'}</h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'el' ? 'Ασφάλεια και ΦΠΑ περιλαμβάνονται στην τιμή. Οδηγήστε με ηρεμία χωρίς κρυφές χρεώσεις.' : 'Insurance and VAT included in the price. Drive with peace of mind, no hidden fees.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#ECEFF1] to-white rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-2xl flex items-center justify-center mb-6">
                <div className="w-6 h-6 bg-[var(--primary)] rounded"></div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">{locale === 'el' ? 'Παράδοση Παντού στην Αττική' : 'Delivery Anywhere in Attica'}</h3>
              <p className="text-gray-600 leading-relaxed">
                {locale === 'el' ? 'Αεροδρόμιο Αθηνών, Λιμάνι Πειραιά ή στη διεύθυνσή σας. Εύκολη παράδοση και παραλαβή.' : 'Athens Airport, Piraeus Port, or your address. Easy delivery and pickup options.'}
              </p>
            </div>
          </div>

          {/* Location Quick Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <Link href={`/${locale}/piraeus-car-rental`} className="group relative overflow-hidden rounded-2xl h-64 hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                <h3 className="text-3xl font-bold mb-2">{locale === 'el' ? 'Λιμάνι Πειραιά' : 'Piraeus Port'}</h3>
                <p className="text-gray-200">{locale === 'el' ? 'Παράδοση μόνο €20 • Ιδανικό για ταξίδια με ferry' : 'Delivery only €20 • Perfect for ferry travelers'}</p>
              </div>
            </Link>

            <Link href={`/${locale}/athens-airport-car-rental`} className="group relative overflow-hidden rounded-2xl h-64 hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/80"></div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-[var(--primary)] mb-2">{locale === 'el' ? 'Αεροδρόμιο Αθηνών' : 'Athens Airport'}</h3>
                <p className="text-[var(--primary)]/80">{locale === 'el' ? '24/7 Διαθεσιμότητα • Παραλαβή €40' : '24/7 Availability • Pickup €40'}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-20 bg-[#ECEFF1]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
              {locale === 'el' ? 'Ο Στόλος Μας' : 'Our Fleet'}
            </h2>
            <p className="text-xl text-gray-600">
              {locale === 'el' ? 'Διαλέξτε από οικονομικά, SUV και premium οχήματα' : 'Choose from economy, SUV, and premium vehicles'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Toyota Yaris', price: '35', category: locale === 'el' ? 'Οικονομικό' : 'Economy', features: ['A/C', 'Auto', '5 ' + (locale === 'el' ? 'θέσεις' : 'seats')] },
              { name: 'Nissan Qashqai', price: '55', category: 'SUV', features: ['A/C', 'Auto', '5 ' + (locale === 'el' ? 'θέσεις' : 'seats')] },
              { name: 'VW Polo', price: '38', category: locale === 'el' ? 'Οικονομικό' : 'Economy', features: ['A/C', 'Manual', '5 ' + (locale === 'el' ? 'θέσεις' : 'seats')] },
              { name: 'Hyundai Tucson', price: '65', category: 'SUV', features: ['A/C', 'Auto', '7 ' + (locale === 'el' ? 'θέσεις' : 'seats')] },
            ].map((car, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all group">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <div className="w-32 h-20 bg-gray-400 rounded-lg"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{car.category}</div>
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-3">{car.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((f, j) => (
                      <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">{f}</span>
                    ))}
                  </div>
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="text-3xl font-bold text-[var(--accent)]">€{car.price}</div>
                    <div className="text-gray-500">/ {locale === 'el' ? 'ημέρα' : 'day'}</div>
                  </div>
                  <Link href={`/${locale}/booking`} className="btn-primary w-full text-center block">
                    {locale === 'el' ? 'Κράτηση' : 'Book Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href={`/${locale}/fleet`} className="btn-outline text-lg px-8 py-4">
              {locale === 'el' ? 'Δείτε Όλα τα Οχήματα' : 'View All Vehicles'}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
              {locale === 'el' ? 'Η Διαφορά μας' : 'Your Complete Transportation Solution'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[var(--primary)] rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-3">{locale === 'el' ? 'Τοπική Οικογενειακή Επιχείρηση' : 'Local Family Business'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Πάνω από 15 χρόνια εξυπηρέτησης στην Αττική' : 'Over 15 years serving customers in Attica'}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <div className="w-2 h-8 bg-[var(--primary)] rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-3">{locale === 'el' ? 'Αξιόπιστα & Καλοσυντηρημένα' : 'Trusted & Reliable'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Τακτικός έλεγχος και συντήρηση του στόλου μας' : 'Regular inspections and maintenance on our fleet'}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <div className="w-8 h-1 bg-[var(--primary)] rounded"></div>
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-3">{locale === 'el' ? 'Ευέλικτες Ώρες' : 'Flexible Service'}</h3>
              <p className="text-gray-600">{locale === 'el' ? '24/7 παράδοση σε αεροδρόμιο και λιμάνι' : '24/7 delivery to airport and port available'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/90 py-16">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
            {locale === 'el' ? 'Έτοιμοι να Ξεκινήσετε;' : 'Ready to Start Your Journey?'}
          </h2>
          <p className="text-xl text-[var(--primary)]/80 mb-8 max-w-2xl mx-auto">
            {locale === 'el' ? 'Κλείστε το αυτοκίνητό σας τώρα με μόνο 15% προκαταβολή' : 'Reserve your car now with just 15% deposit'}
          </p>
          <Link href={`/${locale}/booking`} className="inline-block bg-[var(--primary)] text-white px-10 py-5 rounded-xl text-lg font-semibold hover:bg-[var(--primary)]/90 transition shadow-lg">
            {locale === 'el' ? 'Κλείστε Τώρα' : 'Book Your Car Now'}
          </Link>
        </div>
      </section>
    </>
  );
}
