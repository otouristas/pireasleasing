import Link from 'next/link';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const faqs = locale === 'el' ? [
    { q: 'Χρειάζομαι πιστωτική κάρτα;', a: 'Όχι. Δεν απαιτείται πιστωτική κάρτα ή εγγύηση. Πληρώνετε μόνο 15% προκαταβολή online μέσω Viva Wallet και το υπόλοιπο 85% στην παραλαβή του οχήματος.' },
    { q: 'Τι περιλαμβάνει η τιμή;', a: 'Η τιμή περιλαμβάνει πλήρη ασφάλεια, απεριόριστα χιλιόμετρα και ΦΠΑ. Δεν υπάρχουν κρυφές χρεώσεις.' },
    { q: 'Μπορώ να ακυρώσω την κράτησή μου;', a: 'Ναι, μπορείτε να ακυρώσετε έως 48 ώρες πριν την παραλαβή για πλήρη επιστροφή της προκαταβολής.' },
    { q: 'Υπάρχει ελάχιστη ηλικία οδηγού;', a: 'Ναι, η ελάχιστη ηλικία είναι 25 ετών με άδεια οδήγησης τουλάχιστον 1 έτος.' },
    { q: 'Μπορώ να παραλάβω το αυτοκίνητο στο λιμάνι Πειραιά;', a: 'Ναι, παράδοση στο λιμάνι Πειραιά με χρέωση μόνο €20 (€40 για ώρες 21:00-07:00).' },
    { q: 'Υπάρχει χρέωση για παράδοση στο αεροδρόμιο;', a: 'Η παράδοση στο αεροδρόμιο Αθηνών κοστίζει €40 (€80 για εκτός ωραρίου 21:00-07:00).' },
    { q: 'Μπορώ να επιστρέψω το αυτοκίνητο σε διαφορετική τοποθεσία;', a: 'Ναι, μπορείτε να επιλέξετε διαφορετικές τοποθεσίες παραλαβής και επιστροφής.' },
  ] : [
    { q: 'Do I need a credit card?', a: 'No. No credit card or deposit required. You only pay 15% deposit online via Viva Wallet and the remaining 85% at vehicle pickup.' },
    { q: 'What does the price include?', a: 'The price includes full insurance, unlimited mileage, and VAT. There are no hidden fees.' },
    { q: 'Can I cancel my booking?', a: 'Yes, you can cancel up to 48 hours before pickup for a full refund of your deposit.' },
    { q: 'Is there a minimum driver age?', a: 'Yes, the minimum age is 25 years with a driver\'s license for at least 1 year.' },
    { q: 'Can I get a car directly at Piraeus Port?', a: 'Yes, port delivery is available for only €20 (€40 for off-hours 21:00-07:00).' },
    { q: 'Is there a delivery fee at Athens Airport?', a: 'Athens Airport delivery costs €40 (€80 for off-hours 21:00-07:00).' },
    { q: 'Can I return the car at a different location?', a: 'Yes, you can choose different pickup and return locations.' },
  ];
  
  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Συχνές Ερωτήσεις' : 'Frequently Asked Questions'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις' : 'Find answers to the most common questions'}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border-2 border-[#ECEFF1] rounded-lg p-6 hover:border-[#F9C80E] transition">
                <h3 className="text-xl font-semibold text-[#0B1B33] mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-4">{locale === 'el' ? 'Δεν βρήκατε την απάντησή σας;' : 'Didn\'t find your answer?'}</p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {locale === 'el' ? 'Επικοινωνήστε Μαζί Μας' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
