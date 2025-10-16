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
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? 'Γιατί Πειραιάς;' : 'Why Rent a Car at Piraeus Port?'}</h2>
              <p className="text-lg text-gray-700 mb-4">
                {locale === 'el' 
                  ? 'Ο Πειραιάς είναι η κύρια πύλη των νησιών. Παραλάβετε το αυτοκίνητό σας απευθείας από το λιμάνι και ξεκινήστε το ταξίδι σας άμεσα.'
                  : 'Piraeus Port is Greece\'s largest passenger port and the main gateway to the Greek islands. With millions of ferry passengers annually, having a rental car ready at the port saves valuable time and eliminates transportation hassles.'
                }
              </p>
              <p className="text-lg text-gray-700 mb-4">
                {locale === 'el'
                  ? 'Χωρίς πιστωτική κάρτα, χωρίς εγγύηση. Πληρώνετε μόνο 15% προκαταβολή online και το υπόλοιπο στην παραλαβή.'
                  : 'Our Piraeus car rental service is designed specifically for ferry travelers. Whether you\'re heading to Santorini, Mykonos, Crete, or returning from the islands, we make car pickup effortless with direct port delivery.'
                }
              </p>
              <p className="text-lg text-gray-700 mb-6">
                {locale === 'el'
                  ? 'Με παραπάνω από 15 χρόνια εμπειρίας στην ενοικίαση αυτοκινήτων στον Πειραιά, εξυπηρετούμε χιλιάδες πελάτες ετησίως που ταξιδεύουν με ferry.'
                  : 'With over 15 years of experience serving ferry passengers, we understand the unique needs of travelers passing through Piraeus. No credit card required, no security deposit, and transparent pricing with full insurance included.'
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

      {/* Additional Content - SEO Boost */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0B1B33] mb-8">
            {locale === 'el' ? 'Ολοκληρωμένη Εξυπηρέτηση στο Λιμάνι Πειραιά' : 'Complete Service at Piraeus Port'}
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-[#0B1B33] mt-8 mb-4">
              {locale === 'el' ? 'Πώς Λειτουργεί η Παραλαβή' : 'How Port Pickup Works'}
            </h3>
            <p className="text-gray-700 mb-4">
              {locale === 'el'
                ? 'Η διαδικασία παραλαβής στο λιμάνι Πειραιά είναι απλή και γρήγορη. Αφού κάνετε την κράτησή σας online, θα λάβετε email επιβεβαίωσης με οδηγίες για το σημείο συνάντησης. Ο αντιπρόσωπός μας θα σας περιμένει στο συμφωνημένο σημείο με το όχημα έτοιμο για παράδοση.'
                : 'Our Piraeus port pickup process is designed for maximum convenience. After booking online, you will receive a confirmation email with detailed meeting point instructions. Our representative will meet you at the agreed location with your vehicle ready to go, fully fueled and inspected.'
              }
            </p>
            
            <h3 className="text-2xl font-bold text-[#0B1B33] mt-8 mb-4">
              {locale === 'el' ? 'Ιδανικό για Ταξιδιώτες Ferry' : 'Perfect for Ferry Travelers'}
            </h3>
            <p className="text-gray-700 mb-4">
              {locale === 'el'
                ? 'Αν ταξιδεύετε με ferry από ή προς τα νησιά, η ενοικίαση αυτοκινήτου στον Πειραιά είναι η πιο λογική επιλογή. Αποφύγετε τα ακριβά ταξί και τα περιορισμένα δρομολόγια των δημοσίων μεταφορών. Με δικό σας αυτοκίνητο έχετε πλήρη ελευθερία κίνησης.'
                : 'If you are traveling by ferry to or from the Greek islands, renting a car at Piraeus is the most practical choice. Avoid expensive taxis and limited public transportation schedules. With your own vehicle, you have complete freedom to explore Athens and Attica region at your own pace.'
              }
            </p>
            
            <h3 className="text-2xl font-bold text-[#0B1B33] mt-8 mb-4">
              {locale === 'el' ? 'Οχήματα για Κάθε Ανάγκη' : 'Vehicles for Every Need'}
            </h3>
            <p className="text-gray-700 mb-4">
              {locale === 'el'
                ? 'Ο στόλος μας περιλαμβάνει οικονομικά αυτοκίνητα, SUV, και οικογενειακά οχήματα. Όλα τα αυτοκίνητα είναι καλά συντηρημένα, με κλιματισμό, και πλήρη ασφάλεια. Από μικρά city cars για δύο άτομα έως ευρύχωρα 7θέσια για οικογένειες.'
                : 'Our fleet includes economy cars, SUVs, and family vehicles. All cars are well-maintained, air-conditioned, and fully insured. From small city cars for couples to spacious 7-seaters for families, we have the perfect vehicle for your needs. Many vehicles feature automatic transmission, GPS navigation, and modern safety features.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mt-8 mb-4">
              {locale === 'el' ? 'Εξερευνήστε την Αττική' : 'Explore the Attica Region'}
            </h3>
            <p className="text-gray-700 mb-4">
              {locale === 'el'
                ? 'Με την έδρα μας στον Πειραιά, είμαστε ιδανικά τοποθετημένοι για να σας βοηθήσουμε να εξερευνήσετε ολόκληρη την Αττική. Επισκεφθείτε το ιστορικό κέντρο της Αθήνας, τις παραλίες της Αττικής Ριβιέρας, το Σούνιο, ή κάντε ημερήσιες εκδρομές στα γύρω μέρη.'
                : 'Based in Piraeus, we are ideally located to help you explore the entire Attica region. Visit the historic center of Athens, the beaches of the Athenian Riviera, Cape Sounion with its ancient temple, or take day trips to nearby destinations. Having your own car gives you the flexibility to discover hidden gems and move on your own schedule.'
              }
            </p>
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

