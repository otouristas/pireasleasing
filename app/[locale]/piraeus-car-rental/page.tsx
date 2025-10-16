import Link from 'next/link';

export default async function PiraeusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1B33] text-white py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] to-[#0B1B33]/80"></div>
        <div className="container relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Ενοικίαση Αυτοκινήτου Πειραιάς' : 'Car Rental at Piraeus Port'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Παραλαβή και παράδοση στο λιμάνι με μόνο €20' : 'Pickup and delivery at the port for only €20'}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? 'Γιατί Πειραιάς;' : 'Why Piraeus?'}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {locale === 'el' 
                  ? 'Ο Πειραιάς είναι η κύρια πύλη των νησιών. Παραλάβετε το αυτοκίνητό σας απευθείας από το λιμάνι και ξεκινήστε το ταξίδι σας άμεσα.'
                  : 'Piraeus is the main gateway to the Greek islands. Pick up your car directly from the port and start your journey immediately.'
                }
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {locale === 'el'
                  ? 'Χωρίς πιστωτική κάρτα, χωρίς εγγύηση. Πληρώνετε μόνο 15% προκαταβολή online και το υπόλοιπο στην παραλαβή.'
                  : 'No credit card, no deposit required. Pay only 15% deposit online and the rest at pickup.'
                }
              </p>
              <Link href={`/${locale}/booking`} className="btn-primary">
                {locale === 'el' ? 'Κράτηση Τώρα' : 'Book Now'}
              </Link>
            </div>
            <div className="bg-[#ECEFF1] rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-[#0B1B33] mb-4">{locale === 'el' ? 'Τιμές Πειραιά' : 'Piraeus Pricing'}</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Παράδοση στο λιμάνι' : 'Port delivery'}</span>
                  <span className="font-semibold text-[#0B1B33]">€20</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Εκτός ωραρίου (21:00-07:00)' : 'Off-hours (21:00-07:00)'}</span>
                  <span className="font-semibold text-[#0B1B33]">€40</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">{locale === 'el' ? 'Δωρεάν για μακροχρόνια ενοικίαση' : 'Free for long-term rentals'}</span>
                  <span className="font-semibold text-[#F9C80E]">✓</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="bg-[#F9C80E] py-12">
        <div className="container text-center">
          <p className="text-2xl font-semibold text-[#0B1B33]">
            {locale === 'el' 
              ? 'Συναντήστε μας στο Λιμάνι Πειραιά – Εύκολη Παραλαβή σε 5 Λεπτά'
              : 'Meet us at Piraeus Port – Easy 5-Minute Pickup'
            }
          </p>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#0B1B33] mb-8 text-center">{locale === 'el' ? 'Δείτε επίσης' : 'See Also'}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/${locale}/athens-airport-car-rental`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Αεροδρόμιο Αθηνών' : 'Athens Airport'}</h3>
              <p className="text-gray-600">{locale === 'el' ? '24/7 διαθεσιμότητα' : '24/7 availability'}</p>
            </Link>
            <Link href={`/${locale}/monthly-leasing`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Ευέλικτες λύσεις' : 'Flexible solutions'}</p>
            </Link>
            <Link href={`/${locale}/faq`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">FAQ</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Συχνές ερωτήσεις' : 'Common questions'}</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

