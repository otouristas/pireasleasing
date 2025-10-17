"use client";
import { useEffect, useState, lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Lazy load heavy components
const ReactDatePicker = lazy(() => import('react-datepicker'));

type FormValues = {
  carId: string;
  start: string;
  end: string;
  pickup: string;
  dropoff: string;
  customerName: string;
  email: string;
  phone: string;
  licenseNo: string;
  idNo: string;
  dob: string;
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  const carSlug = searchParams.get('car');
  
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'viva' | 'iris'>('iris'); // Default to IRIS for testing
  
  const watchedValues = watch();
  const startDate = watchedValues.start ? new Date(watchedValues.start) : null;
  const endDate = watchedValues.end ? new Date(watchedValues.end) : null;
  const duration = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  useEffect(() => {
    // Fetch locations and cars
    (async () => {
      const [locRes, carsRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/availability?start=2025-01-01T00:00:00Z&end=2026-01-01T00:00:00Z').catch(() => ({ ok: false }))
      ]);
      
      if (locRes.ok) {
        const data = await locRes.json();
        setLocations(data.locations || []);
      }
      
      // Try to get cars from supabase directly
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: carsData } = await supabase
        .from('cars')
        .select('*')
        .eq('active', true)
        .order('make');
      
      if (carsData) {
        setCars(carsData);
        
        // Pre-select car if slug provided
        if (carSlug) {
          const car = carsData.find((c: any) => c.slug === carSlug);
          if (car) {
            setSelectedCar(car);
            setValue('carId', car.id);
          }
        }
      }
    })();
  }, [carSlug, setValue]);

  useEffect(() => {
    if (watchedValues.carId) {
      const car = cars.find(c => c.id === watchedValues.carId);
      setSelectedCar(car);
    }
  }, [watchedValues.carId, cars]);

  // Calculate pricing
  const monthlyPrice = selectedCar ? parseFloat(selectedCar.price_per_day.replace('€/Month', '').replace('€', '')) : 0;
  const totalAmount = duration > 0 ? (monthlyPrice / 30) * duration : 0;
  const depositAmount = totalAmount * 0.15;
  const balanceAmount = totalAmount - depositAmount;

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: values.carId,
          startTs: new Date(values.start).toISOString(),
          endTs: new Date(values.end).toISOString(),
          pickup: { locationId: values.pickup, isOffHours: false },
          dropoff: { locationId: values.dropoff, isOffHours: false },
          extras: [],
          driver: { 
            name: values.customerName,
            dob: values.dob, 
            licenseNo: values.licenseNo, 
            idNo: values.idNo, 
            email: values.email, 
            phone: values.phone 
          },
          paymentMethod: paymentMethod, // Add payment method
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      
      const data = await res.json();
      
      if (paymentMethod === 'viva') {
        // Redirect to Viva Wallet Smart Checkout
        window.location.href = data.paymentUrl;
      } else {
        // IRIS Payment - redirect to confirmation with locale
        window.location.href = `/en/booking-confirmation?order=${data.orderCode}`;
      }
    } catch (e: any) {
      setError(e.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Car Selection */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Select Vehicle</h3>
        
        {!selectedCar ? (
          <select
            {...register('carId', { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="">-- Select a car --</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.make} {car.model} ({car.year}) - {car.price_per_day}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-24 h-24 relative bg-white rounded border border-gray-200">
              {(() => {
                // Parse and validate car image
                let carImage = null;
                try {
                  if (Array.isArray(selectedCar.images) && selectedCar.images.length > 0 && selectedCar.images[0]) {
                    const img = selectedCar.images[0];
                    if (typeof img === 'string' && (img.startsWith('/') || img.startsWith('http'))) {
                      carImage = img;
                    }
                  } else if (typeof selectedCar.images === 'string') {
                    try {
                      const parsed = JSON.parse(selectedCar.images);
                      if (Array.isArray(parsed) && parsed[0] && (parsed[0].startsWith('/') || parsed[0].startsWith('http'))) {
                        carImage = parsed[0];
                      }
                    } catch {
                      if (selectedCar.images.startsWith('/') || selectedCar.images.startsWith('http')) {
                        carImage = selectedCar.images;
                      }
                    }
                  }
                } catch (error) {
                  console.error('Error parsing car image:', error);
                }

                return carImage && (carImage.startsWith('/') || carImage.startsWith('http')) ? (
                  <Image
                    src={carImage}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                    fill
                    className="object-contain p-2"
                    unoptimized={carImage.startsWith('http')}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                );
              })()}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{selectedCar.make} {selectedCar.model}</h4>
              <p className="text-sm text-gray-600">{selectedCar.year} • {selectedCar.transmission} • {selectedCar.fuel_type}</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{selectedCar.price_per_day}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCar(null);
                setValue('carId', '');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Dates & Locations */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Rental Period & Locations</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Date & Time</label>
            <input
              type="datetime-local"
              {...register('start', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date & Time</label>
            <input
              type="datetime-local"
              {...register('end', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Location</label>
            <select
              {...register('pickup', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="">Select location...</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>{l.name_key}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
            <select
              {...register('dropoff', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="">Select location...</option>
              {locations.map(l => (
                <option key={l.id} value={l.id}>{l.name_key}</option>
            ))}
          </select>
          </div>
        </div>

        {duration > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-900">
              <strong>Duration:</strong> {duration} day{duration !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Customer Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Customer Details</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              {...register('customerName', { required: true })}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              {...register('phone', { required: true })}
              placeholder="+30 123 456 7890"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
            <input
              type="date"
              {...register('dob', { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License No *</label>
            <input
              type="text"
              {...register('licenseNo', { required: true })}
              placeholder="AB123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ID/Passport No *</label>
            <input
              type="text"
              {...register('idNo', { required: true })}
              placeholder="ID123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {selectedCar && duration > 0 && (() => {
        const monthlyPrice = parseFloat(selectedCar.price_per_day.replace('€/Month', '').replace('€', ''));
        const dailyRate = monthlyPrice / 30;
        const totalAmount = dailyRate * duration;
        const depositAmount = totalAmount * 0.15;
        const balanceAmount = totalAmount - depositAmount;
        
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">4. Price Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Monthly Rate</span>
                <span>€{monthlyPrice.toFixed(2)}/month</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Daily Rate</span>
                <span>€{dailyRate.toFixed(2)}/day</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Duration</span>
                <span>{duration} day{duration !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Rental Total</span>
                <span>€{totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3"></div>
              <div className="flex justify-between text-gray-900 font-semibold">
                <span>Deposit (15%) - Pay Now</span>
                <span className="text-xl">€{depositAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Balance - Pay at pickup</span>
                <span>€{balanceAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✓ No credit card required - Pay with debit card, bank transfer, or e-wallet
              </p>
            </div>
      </div>
        );
      })()}

      {/* Payment Method Selection */}
      {selectedCar && duration > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">5. Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:border-gray-400"
              style={{ borderColor: paymentMethod === 'iris' ? '#0B1B33' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="iris"
                checked={paymentMethod === 'iris'}
                onChange={() => setPaymentMethod('iris')}
                className="w-4 h-4 mr-3"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">IRIS Payment (Bank Transfer)</div>
                <div className="text-sm text-gray-600">Pay via bank transfer - Instant confirmation</div>
              </div>
            </label>
            
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition hover:border-gray-400"
              style={{ borderColor: paymentMethod === 'viva' ? '#0B1B33' : '#e5e7eb' }}>
              <input
                type="radio"
                name="payment"
                value="viva"
                checked={paymentMethod === 'viva'}
                onChange={() => setPaymentMethod('viva')}
                className="w-4 h-4 mr-3"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Viva Wallet (Card/E-Wallet)</div>
                <div className="text-sm text-gray-600">Pay with card, bank account, or e-wallet</div>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Submit */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !selectedCar || duration <= 0}
        className="w-full py-4 bg-gray-900 text-white rounded-md font-semibold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading 
          ? 'Processing...' 
          : selectedCar && duration > 0 
            ? paymentMethod === 'iris'
              ? 'Complete Booking (IRIS Payment)'
              : `Pay Deposit €${((parseFloat(selectedCar.price_per_day.replace('€/Month', '').replace('€', '')) / 30) * duration * 0.15).toFixed(2)} with Viva Wallet`
            : 'Complete Form to Continue'
        }
      </button>

      <p className="text-xs text-gray-500 text-center">
        {paymentMethod === 'iris' 
          ? 'You will receive booking confirmation and payment instructions via email'
          : 'Secure payment powered by Viva Wallet. You will be redirected to complete your payment.'
        }
      </p>
    </form>
  );
}
