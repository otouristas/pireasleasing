import Link from 'next/link';
import ContactFormClient from '@/components/ContactFormClient';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Επικοινωνία' : 'Contact Us'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Είμαστε εδώ για να σας βοηθήσουμε' : 'We are here to help you'}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1B33] mb-6">{locale === 'el' ? 'Στοιχεία Επικοινωνίας' : 'Contact Information'}</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#0B1B33] mb-1">Email</h4>
                  <a href="mailto:piraeus@aggelosrentals.com" className="text-[#F9C80E] hover:underline">
                    piraeus@aggelosrentals.com
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? 'Τηλέφωνο' : 'Phone'}</h4>
                  <a href="tel:+306980151068" className="text-gray-700 hover:text-[#F9C80E]">
                    +30 6980 151 068
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0B1B33] mb-1">WhatsApp</h4>
                  <a href="https://wa.me/306980151068" target="_blank" rel="noopener noreferrer" className="text-[#F9C80E] hover:underline">
                    +30 6980 151 068
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? 'Διεύθυνση' : 'Address'}</h4>
                  <p className="text-gray-700">
                    Piraeus, Akti Themistokleous 104<br />
                    Greece
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0B1B33] mb-1">{locale === 'el' ? 'Ώρες Λειτουργίας' : 'Office Hours'}</h4>
                  <p className="text-gray-700">
                    {locale === 'el' ? '7 Ημέρες την εβδομάδα' : '7 Days a week'}<br />
                    09:00 - 20:00
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#0B1B33] mb-4">{locale === 'el' ? 'Συνήθεις Ερωτήσεις;' : 'Have Questions?'}</h3>
                <Link href={`/${locale}/faq`} className="text-[#F9C80E] font-semibold hover:underline">
                  {locale === 'el' ? 'Δείτε τις Συχνές Ερωτήσεις →' : 'Check our FAQ →'}
                </Link>
              </div>
            </div>
            <ContactFormClient locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
