import Link from 'next/link';

export default async function MonthlyLeasingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1B33] text-white py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B33] via-[#1a2744] to-[#0B1B33]"></div>
        <div className="container relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Μηνιαία Ενοικίαση Αυτοκινήτου – Χωρίς Εξαγορά' : 'Month-to-Month Car Leasing – No Buyout'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Ευέλικτη μακροχρόνια ενοικίαση χωρίς δέσμευση αγοράς' : 'Flexible long-term rental without purchase commitment'}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? 'Γιατί Μηνιαία Ενοικίαση;' : 'Why Month-to-Month Makes Sense'}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {locale === 'el' 
                  ? 'Χρειάζεστε αυτοκίνητο για μήνες αλλά δεν θέλετε να αγοράσετε; Η μηνιαία ενοικίαση είναι η τέλεια λύση για freelancers, expats, και όποιον χρειάζεται προσωρινή μεταφορά.'
                  : 'Need a car for months but don\'t want to buy? Monthly leasing is perfect for freelancers, expats, and anyone needing temporary transportation.'
                }
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {locale === 'el'
                  ? 'Πληρώνετε μήνα με το μήνα, χωρίς δέσμευση αγοράς (εξαγοράς). Διακόψτε οποιαδήποτε στιγμή με απλή ειδοποίηση.'
                  : 'Pay month by month, with no buyout obligation. Cancel anytime with simple notice.'
                }
              </p>
              <Link href={`/${locale}/booking`} className="btn-primary">
                {locale === 'el' ? 'Ζητήστε Προσφορά' : 'Request Quote'}
              </Link>
            </div>
            <div className="bg-[#ECEFF1] rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-[#0B1B33] mb-6">{locale === 'el' ? 'Σύγκριση Τιμών' : 'Price Comparison'}</h3>
              <div className="space-y-6">
                <div>
                  <div className="font-semibold text-[#0B1B33] mb-2">{locale === 'el' ? 'Ημερήσια Ενοικίαση (30 ημέρες)' : 'Daily Rental (30 days)'}</div>
                  <div className="text-3xl font-bold text-gray-700">€1,050</div>
                  <div className="text-sm text-gray-600">(€35 x 30 {locale === 'el' ? 'ημέρες' : 'days'})</div>
                </div>
                <div className="border-t-2 border-gray-300 pt-6">
                  <div className="font-semibold text-[#0B1B33] mb-2">{locale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing'}</div>
                  <div className="text-4xl font-bold text-[#F9C80E]">€750</div>
                  <div className="text-sm text-[#F9C80E] font-semibold">{locale === 'el' ? 'Εξοικονόμηση €300!' : 'Save €300!'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-[#F9C80E]/10 to-[#F9C80E]/5 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? 'Τι Περιλαμβάνεται' : 'What\'s Included'}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Πλήρης Ασφάλεια' : 'Full Insurance'}</div>
              </div>
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Απεριόριστα Χιλιόμετρα' : 'Unlimited Mileage'}</div>
              </div>
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? '24/7 Υποστήριξη' : '24/7 Support'}</div>
              </div>
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Χωρίς Πιστωτική' : 'No Credit Card'}</div>
              </div>
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Δωρεάν Συντήρηση' : 'Free Maintenance'}</div>
              </div>
              <div>
                <div className="w-3 h-3 bg-[#F9C80E] rounded-full mb-2"></div>
                <div className="font-semibold text-[#0B1B33]">{locale === 'el' ? 'Χωρίς Εξαγορά' : 'No Buyout'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#F9C80E] py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-[#0B1B33] mb-4">
            {locale === 'el' ? 'Ξεκινήστε τη Μίσθωσή σας Σήμερα' : 'Start Your Flexible Lease Today'}
          </h2>
          <p className="text-lg text-[#0B1B33]/80 mb-6">
            {locale === 'el' ? 'Επικοινωνήστε για προσωποποιημένη προσφορά' : 'Contact us for a personalized quote'}
          </p>
          <Link href={`/${locale}/booking`} className="inline-block bg-[#0B1B33] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#0B1B33]/90 transition">
            {locale === 'el' ? 'Επικοινωνία' : 'Get Started'}
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-[#0B1B33] mb-8 text-center">{locale === 'el' ? 'Δείτε επίσης' : 'See Also'}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/${locale}/piraeus-car-rental`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Πειραιάς' : 'Piraeus'}</h3>
              <p className="text-gray-600">{locale === 'el' ? 'Βραχυχρόνια ενοικίαση' : 'Short-term rentals'}</p>
            </Link>
            <Link href={`/${locale}/athens-airport-car-rental`} className="p-6 bg-[#ECEFF1] rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#0B1B33] mb-2">{locale === 'el' ? 'Αεροδρόμιο' : 'Airport'}</h3>
              <p className="text-gray-600">{locale === 'el' ? '24/7 διαθεσιμότητα' : '24/7 availability'}</p>
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

