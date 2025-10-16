import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--primary)] text-white min-h-[600px] flex items-center">
        <div className="hero-overlay absolute inset-0"></div>
        <div className="container relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                Rent a Car in Piraeus & Athens Airport
              </h1>
              <p className="text-xl text-[var(--graylight)] mb-8">
                No credit card. No deposit. Full insurance included. Transparent pricing with delivery at port or airport.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/en/booking" className="btn-primary">
                  Book Now
                </Link>
                <Link href="/en/fleet" className="btn-outline">
                  See Our Fleet
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Quick Booking</h3>
              <div className="space-y-4">
                <input type="date" className="w-full p-3 rounded bg-white/20 border border-white/30 text-white placeholder-white/60" placeholder="Pickup Date" />
                <input type="date" className="w-full p-3 rounded bg-white/20 border border-white/30 text-white placeholder-white/60" placeholder="Return Date" />
                <select className="w-full p-3 rounded bg-white/20 border border-white/30 text-white">
                  <option>Piraeus Port</option>
                  <option>Athens Airport</option>
                </select>
                <Link href="/en/booking" className="btn-primary w-full text-center block">
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="bg-[var(--graylight)] py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-3xl">🪪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Credit Card Required</h3>
              <p className="text-[var(--textbody)]">Reserve with a small 15% payment. No deposit or credit hold at pickup.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Full Insurance Included</h3>
              <p className="text-[var(--textbody)]">Peace of mind with coverage included as standard. No hidden fees.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery Anywhere in Attica</h3>
              <p className="text-[var(--textbody)]">Athens Airport, Piraeus Port, or your address within Attica region.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Fleet</h2>
            <p className="text-lg text-[var(--textbody)]">Choose from economy, SUV, or premium vehicles</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Toyota Yaris', price: '€35', category: 'Economy' },
              { name: 'Nissan Qashqai', price: '€55', category: 'SUV' },
              { name: 'VW Polo', price: '€38', category: 'Economy' },
              { name: 'Hyundai Tucson', price: '€65', category: 'SUV' },
            ].map((car, i) => (
              <div key={i} className="border-2 border-[var(--graylight)] rounded-lg p-6 hover:border-[var(--accent)] hover:shadow-lg transition-all">
                <div className="bg-gray-200 h-40 rounded mb-4 flex items-center justify-center">
                  <span className="text-4xl">🚗</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
                <p className="text-sm text-[var(--textbody)] mb-2">{car.category}</p>
                <div className="text-2xl font-bold text-[var(--accent)] mb-4">{car.price}/day</div>
                <Link href="/en/fleet" className="btn-outline w-full text-center block text-sm">
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/en/fleet" className="btn-primary">
              See All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[var(--accent)] py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-[var(--primary)] mb-4">Ready to Drive?</h2>
          <p className="text-lg text-[var(--primary)] mb-8">Reserve your car now and pay only 15% upfront</p>
          <Link href="/en/booking" className="inline-block bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)]/90 transition">
            Reserve Now
          </Link>
        </div>
      </section>
    </>
  );
}
