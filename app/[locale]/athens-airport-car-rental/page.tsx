import Link from 'next/link';

export default async function AirportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1B33] text-white py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] to-[#0B1B33]/80"></div>
        <div className="container relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Ενοικίαση Αυτοκινήτου Αεροδρόμιο Αθήνας' : 'Athens Airport Car Rental 24/7'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Παραλαβή στο αεροδρόμιο σε οποιαδήποτε ώρα' : 'Airport pickup available anytime'}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? '24/7 Διαθεσιμότητα' : '24/7 Availability'}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {locale === 'el' 
                  ? 'Προσγειωθήκατε στην Αθήνα; Παραλάβετε το αυτοκίνητό σας απευθείας από το αεροδρόμιο σε οποιαδήποτε ώρα της ημέρας.'
                  : 'Just landed in Athens? Pick up your car directly from the airport at any time of day or night.'
                }
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#F9C80E] rounded flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? '24/7 Παραλαβή' : '24/7 Pickup'}</h4>
                    <p className="text-gray-600">{locale === 'el' ? 'Σε οποιαδήποτε ώρα' : 'Available anytime'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#F9C80E] rounded flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? '15% Προκαταβολή' : '15% Upfront via Viva Wallet'}</h4>
                    <p className="text-gray-600">{locale === 'el' ? 'Ασφαλής πληρωμή online' : 'Secure online payment'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#F9C80E] rounded flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? 'Διαφανής Τιμολόγηση' : 'Transparent Pricing'}</h4>
                    <p className="text-gray-600">{locale === 'el' ? 'Χωρίς κρυφές χρεώσεις' : 'No hidden fees'}</p>
                  </div>
                </div>
              </div>
              <Link href={`/${locale}/booking`} className="btn-primary">
                {locale === 'el' ? 'Κράτηση Τώρα' : 'Book Now'}
              </Link>
            </div>
            <div className="bg-[#ECEFF1] rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-[#0B1B33] mb-4">{locale === 'el' ? 'Τιμές Αεροδρομίου' : 'Airport Pricing'}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Παράδοση στο αεροδρόμιο' : 'Airport delivery'}</span>
                  <span className="font-semibold text-[#0B1B33]">€40</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Εκτός ωραρίου (21:00-07:00)' : 'Off-hours (21:00-07:00)'}</span>
                  <span className="font-semibold text-[#0B1B33]">€80</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Πλήρης ασφάλεια' : 'Full insurance'}</span>
                  <span className="font-semibold text-[#F9C80E]">✓ {locale === 'el' ? 'Περιλαμβάνεται' : 'Included'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F9C80E] py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-[#0B1B33] mb-4">
            {locale === 'el' ? 'Προσγειώνεστε σύντομα;' : 'Landing Soon?'}
          </h2>
          <p className="text-lg text-[#0B1B33] mb-6">
            {locale === 'el' ? 'Κλείστε το αυτοκίνητό σας τώρα' : 'Book your car now'}
          </p>
          <Link href={`/${locale}/booking`} className="inline-block bg-[#0B1B33] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0B1B33]/90 transition">
            {locale === 'el' ? 'Κράτηση' : 'Reserve Now'}
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#0B1B33] mb-8 text-center">{locale === 'el' ? 'Δείτε επίσης' : 'See Also'}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/${locale}/piraeus-car-rental`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Λιμάνι Πειραιά' : 'Piraeus Port'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Παράδοση μόνο €20' : 'Delivery only €20'}</p>
            </Link>
            <Link href={`/${locale}/monthly-leasing`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Ευέλικτες λύσεις' : 'Flexible solutions'}</p>
            </Link>
            <Link href={`/${locale}/contact`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Επικοινωνία' : 'Contact'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Στείλτε μας μήνυμα' : 'Get in touch'}</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

