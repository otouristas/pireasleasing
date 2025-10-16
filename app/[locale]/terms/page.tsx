export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Όροι & Προϋποθέσεις' : 'Terms & Conditions'}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0B1B33] mb-4">{locale === 'el' ? 'Όροι Ενοικίασης' : 'Rental Terms'}</h2>
            <p className="text-gray-700 mb-6">
              {locale === 'el' 
                ? 'Η Aggelos Rentals παρέχει υπηρεσίες ενοικίασης αυτοκινήτων με πλήρη διαφάνεια και χωρίς κρυφές χρεώσεις.'
                : 'Aggelos Rentals provides car rental services with full transparency and no hidden fees.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mb-3 mt-8">{locale === 'el' ? 'Πολιτική Μη Εγγύησης' : 'No Deposit Policy'}</h3>
            <p className="text-gray-700 mb-6">
              {locale === 'el'
                ? 'Δεν απαιτείται πιστωτική κάρτα ούτε εγγύηση κατά την παραλαβή του οχήματος. Πληρώνετε μόνο 15% προκαταβολή online.'
                : 'No credit card or deposit required at vehicle pickup. You only pay 15% deposit online.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mb-3 mt-8">{locale === 'el' ? 'Ασφάλιση' : 'Insurance'}</h3>
            <p className="text-gray-700 mb-6">
              {locale === 'el'
                ? 'Όλα τα οχήματα περιλαμβάνουν πλήρη ασφάλεια και απεριόριστα χιλιόμετρα.'
                : 'All vehicles include full insurance and unlimited mileage.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mb-3 mt-8">{locale === 'el' ? 'Ακύρωση' : 'Cancellation'}</h3>
            <p className="text-gray-700 mb-6">
              {locale === 'el'
                ? 'Δωρεάν ακύρωση έως 48 ώρες πριν την προγραμματισμένη παραλαβή.'
                : 'Free cancellation up to 48 hours before scheduled pickup.'
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
