import { getSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function BookingConfirmation({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string; t?: string; s?: string }> 
}) {
  const { locale } = await params;
  const urlParams = await searchParams;
  const orderCode = urlParams?.order || urlParams?.s;
  const transactionId = urlParams?.t;
  
  const supabase = await getSupabaseServerClient();
  let booking = null as any;
  let car = null as any;
  let pickupLocation = null as any;
  let dropoffLocation = null as any;
  
  if (orderCode) {
    // Try to find by viva_order_id first, then by id
    let { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('viva_order_id', orderCode)
      .maybeSingle();
    
    if (!data) {
      // Try by booking ID
      const result = await supabase
        .from('bookings')
        .select('*')
        .eq('id', orderCode)
        .maybeSingle();
      data = result.data;
    }
    
    booking = data;
    
    if (booking?.car_id) {
      const { data: carData } = await supabase
        .from('cars')
        .select('*')
        .eq('id', booking.car_id)
        .single();
      car = carData;
    }
    
    if (booking?.pickup_location_id) {
      const { data: pickupData } = await supabase
        .from('locations')
        .select('*')
        .eq('id', booking.pickup_location_id)
        .single();
      pickupLocation = pickupData;
    }
    
    if (booking?.dropoff_location_id) {
      const { data: dropoffData } = await supabase
        .from('locations')
        .select('*')
        .eq('id', booking.dropoff_location_id)
        .single();
      dropoffLocation = dropoffData;
    }
  }

  const duration = booking ? Math.ceil((new Date(booking.end_ts).getTime() - new Date(booking.start_ts).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold mb-3">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-xl text-green-50">
            Your reservation has been successfully created
          </p>
          <p className="text-green-100 mt-2">
            ✉️ Confirmation email sent to {booking?.customer_email || 'your email'}
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {/* Header with Logo */}
          <div className="bg-gray-900 p-6 text-center">
            <Image 
              src="/logo.png" 
              alt="Aggelos Rentals" 
              width={200} 
              height={60} 
              className="h-12 w-auto mx-auto"
            />
          </div>

          {/* Booking Details */}
          {booking && car ? (
            <div className="p-8">
              {/* Reference Number */}
              <div className="text-center mb-8 p-6 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Booking Reference</div>
                <div className="text-2xl font-bold font-mono text-gray-900">{booking.id.slice(0, 13).toUpperCase()}</div>
                <div className="text-xs text-gray-500 mt-2">Please save this reference number</div>
              </div>

              {/* Vehicle Info with Image */}
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">🚗 Your Vehicle</h2>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 relative bg-white rounded border">
                    {(() => {
                      let carImage = null;
                      try {
                        if (Array.isArray(car.images) && car.images[0]) {
                          if (typeof car.images[0] === 'string' && (car.images[0].startsWith('/') || car.images[0].startsWith('http'))) {
                            carImage = car.images[0];
                          }
                        }
                      } catch (e) {}
                      return carImage ? (
                        <Image src={carImage} alt={car.make} fill className="object-contain p-2" unoptimized={carImage.startsWith('http')} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                      );
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{car.make} {car.model}</h3>
                    <p className="text-gray-600">{car.year} • {car.transmission} • {car.fuel_type}</p>
                    <p className="text-gray-500 text-sm mt-1">{car.license_plate}</p>
                  </div>
                </div>
              </div>

              {/* Rental Period */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">📅 Pick-up</div>
                  <div className="font-semibold text-lg text-gray-900">
                    {new Date(booking.start_ts).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {new Date(booking.start_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {pickupLocation && (
                    <div className="text-gray-700 mt-2">📍 {pickupLocation.name_key}</div>
                  )}
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">📅 Drop-off</div>
                  <div className="font-semibold text-lg text-gray-900">
                    {new Date(booking.end_ts).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {new Date(booking.end_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {dropoffLocation && (
                    <div className="text-gray-700 mt-2">📍 {dropoffLocation.name_key}</div>
                  )}
                </div>
              </div>

              {/* Duration Badge */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-semibold">
                  🕐 Rental Duration: {duration} day{duration !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="mb-8 p-6 border-2 border-gray-200 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">💰 Payment Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Rental Total</span>
                    <span className="font-semibold">€{(booking.total_cents / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-between p-3 bg-green-50 rounded">
                    <span className="font-semibold text-green-800">✓ Deposit Paid (15%)</span>
                    <span className="font-bold text-green-800">€{(booking.deposit_cents / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-yellow-50 rounded">
                    <span className="font-semibold text-yellow-800">Balance Due at Pick-up</span>
                    <span className="font-bold text-yellow-800">€{(booking.balance_cents / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {booking.customer_name && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">👤 Customer Information</h2>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Name</div>
                      <div className="font-semibold text-gray-900">{booking.customer_name}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Email</div>
                      <div className="font-semibold text-gray-900">{booking.customer_email}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Phone</div>
                      <div className="font-semibold text-gray-900">{booking.customer_phone}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">License</div>
                      <div className="font-semibold text-gray-900">{booking.customer_license || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Information */}
              <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h2 className="text-lg font-semibold text-blue-900 mb-4">📋 Important - What to Bring</h2>
                <ul className="space-y-3 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span><strong>Valid Driver's License</strong> - Must be held for minimum 1 year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span><strong>ID or Passport</strong> - Government-issued identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span><strong>Balance Payment</strong> - €{(booking.balance_cents / 100).toFixed(2)} cash or card at pick-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span><strong>This Confirmation</strong> - Print or show on your phone</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="mb-8 p-6 bg-yellow-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">📞 Need Help?</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">📱 Phone / WhatsApp</div>
                    <a href="tel:+306980151068" className="font-semibold text-blue-600 hover:underline">
                      +30 6980 151 068
                    </a>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">✉️ Email</div>
                    <a href="mailto:piraeus@aggelosrentals.com" className="font-semibold text-blue-600 hover:underline">
                      piraeus@aggelosrentals.com
                    </a>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-gray-600 mb-1">📍 Office Location</div>
                    <div className="font-semibold text-gray-900">Piraeus, Akti Themistokleous 104, Greece</div>
                    <div className="text-gray-600 text-xs mt-1">Open 7 Days: 09:00 - 20:00</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>Loading booking details...</p>
              <p className="text-sm mt-2">If you just completed payment, please wait a moment and refresh.</p>
            </div>
          )}

          {/* Actions */}
          <div className="p-8 pt-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}`}
                className="flex-1 text-center px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                ← Back to Home
              </Link>
              <Link
                href={`/${locale}/fleet`}
                className="flex-1 text-center px-6 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Browse More Cars →
              </Link>
            </div>
            
            {booking && (
              <div className="mt-4 text-center">
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Have questions? Contact us
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

