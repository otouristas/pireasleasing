import BookingFormEnhanced from '@/components/BookingFormEnhanced';

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      <section className="bg-[#0B1B33] text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold text-white mb-4">{locale === 'el' ? 'Κλείστε το Αυτοκίνητό σας' : 'Book Your Car'}</h1>
          <p className="text-xl text-gray-200">{locale === 'el' ? 'Ολοκληρώστε την κράτησή σας σε λίγα λεπτά' : 'Complete your reservation in minutes'}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <BookingFormEnhanced />

          <div className="mt-8 bg-[#F9C80E]/10 border-2 border-[#F9C80E] rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#0B1B33] mb-3">{locale === 'el' ? 'Σημαντικό' : 'Important'}</h3>
            <ul className="space-y-2 text-gray-700">
              <li>{locale === 'el' ? '✓ Πληρώνετε μόνο 15% τώρα' : '✓ Pay only 15% now'}</li>
              <li>{locale === 'el' ? '✓ Χωρίς πιστωτική κάρτα ή εγγύηση' : '✓ No credit card or deposit required'}</li>
              <li>{locale === 'el' ? '✓ Το υπόλοιπο 85% πληρώνεται στην παραλαβή' : '✓ Remaining 85% paid at pickup'}</li>
              <li>{locale === 'el' ? '✓ Πλήρης ασφάλεια περιλαμβάνεται' : '✓ Full insurance included'}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

