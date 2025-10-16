export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Πολιτική Απορρήτου' : 'Privacy Policy'}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-[#0B1B33] mb-4">{locale === 'el' ? 'Προστασία Προσωπικών Δεδομένων' : 'Data Protection'}</h2>
            <p className="text-gray-700 mb-6">
              {locale === 'el' 
                ? 'Η Aggelos Rentals σέβεται την ιδιωτικότητά σας και προστατεύει τα προσωπικά σας δεδομένα σύμφωνα με τον GDPR.'
                : 'Aggelos Rentals respects your privacy and protects your personal data in accordance with GDPR.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mb-3 mt-8">{locale === 'el' ? 'Τι Δεδομένα Συλλέγουμε' : 'What Data We Collect'}</h3>
            <p className="text-gray-700 mb-6">
              {locale === 'el'
                ? 'Συλλέγουμε μόνο τα απαραίτητα στοιχεία για την ενοικίαση: όνομα, email, τηλέφωνο, στοιχεία άδειας οδήγησης και ταυτότητας.'
                : 'We only collect necessary information for rental: name, email, phone, driver\'s license and ID details.'
              }
            </p>

            <h3 className="text-2xl font-bold text-[#0B1B33] mb-3 mt-8">{locale === 'el' ? 'Πώς Χρησιμοποιούμε τα Δεδομένα' : 'How We Use Your Data'}</h3>
            <p className="text-gray-700 mb-6">
              {locale === 'el'
                ? 'Τα δεδομένα σας χρησιμοποιούνται αποκλειστικά για την εξυπηρέτηση της κράτησής σας και την επικοινωνία μαζί σας.'
                : 'Your data is used exclusively for processing your booking and communicating with you.'
              }
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
