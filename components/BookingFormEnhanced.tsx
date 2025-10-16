"use client";
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";

type FormValues = {
  carId: string;
  startDate: Date | null;
  endDate: Date | null;
  pickup: string;
  dropoff: string;
  customerName: string;
  email: string;
  phone: string;
  licenseNo: string;
  idNo: string;
  dob: string;
};

type Step = 1 | 2 | 3 | 4;

interface PriceBreakdown {
  dailyRate: number;
  duration: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  deposit: number;
  balance: number;
}

export default function BookingFormEnhanced() {
  const searchParams = useSearchParams();
  const carSlug = searchParams.get('car');
  
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'viva' | 'iris'>('iris');
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showSummary, setShowSummary] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  
  const watchedValues = watch();
  const startDate = watchedValues.startDate;
  const endDate = watchedValues.endDate;
  const duration = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

  // Fetch locations and cars
  useEffect(() => {
    (async () => {
      const [locRes, carsRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/availability?start=2025-01-01T00:00:00Z&end=2026-01-01T00:00:00Z').catch(() => ({ ok: false }))
      ]);
      
      if (locRes.ok) {
        const data = await locRes.json();
        setLocations(data.locations || []);
      }
      
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

  // Update selected car when carId changes
  useEffect(() => {
    if (watchedValues.carId) {
      const car = cars.find(c => c.id === watchedValues.carId);
      setSelectedCar(car);
    }
  }, [watchedValues.carId, cars]);

  // Calculate live pricing
  useEffect(() => {
    if (selectedCar && duration > 0) {
      const monthlyPrice = parseFloat(selectedCar.price_per_day.replace('€/Month', '').replace('€', ''));
      const dailyRate = monthlyPrice / 30;
      const subtotal = dailyRate * duration;
      const deliveryFee = 0; // Could be calculated based on locations
      const total = subtotal + deliveryFee;
      const deposit = total * 0.15;
      const balance = total - deposit;
      
      setPriceBreakdown({
        dailyRate,
        duration,
        subtotal,
        deliveryFee,
        total,
        deposit,
        balance
      });
    } else {
      setPriceBreakdown(null);
    }
  }, [selectedCar, duration]);

  // Check availability when dates and car are selected
  useEffect(() => {
    const checkAvailability = async () => {
      if (!selectedCar || !startDate || !endDate) {
        setIsAvailable(null);
        return;
      }

      setCheckingAvailability(true);
      try {
        const response = await fetch(
          `/api/availability?start=${startDate.toISOString()}&end=${endDate.toISOString()}&carId=${selectedCar.id}`
        );
        
        if (response.ok) {
          const data = await response.json();
          const available = data.available === true;
          setIsAvailable(available);
          
          if (!available) {
            toast.error('This car is not available for the selected dates');
          }
        }
      } catch (error) {
        console.error('Error checking availability:', error);
      } finally {
        setCheckingAvailability(false);
      }
    };

    const debounce = setTimeout(checkAvailability, 500);
    return () => clearTimeout(debounce);
  }, [selectedCar, startDate, endDate]);

  const onSubmit = async (values: FormValues) => {
    if (!startDate || !endDate) {
      toast.error('Please select pickup and dropoff dates');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: values.carId,
          startTs: startDate.toISOString(),
          endTs: endDate.toISOString(),
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
          paymentMethod: paymentMethod,
        }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
      
      const data = await res.json();
      
      toast.success('Booking created successfully!');
      
      if (paymentMethod === 'viva') {
        window.location.href = data.paymentUrl;
      } else {
        window.location.href = `/en/booking-confirmation?order=${data.orderCode}`;
      }
    } catch (e: any) {
      toast.error(e.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  const canProceedToStep = (step: Step): boolean => {
    switch (step) {
      case 2:
        return !!startDate && !!endDate && duration > 0;
      case 3:
        return !!selectedCar && isAvailable === true;
      case 4:
        return !!watchedValues.pickup && !!watchedValues.dropoff;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 4 && canProceedToStep((currentStep + 1) as Step)) {
      setCurrentStep((currentStep + 1) as Step);
    } else if (!canProceedToStep((currentStep + 1) as Step)) {
      toast.error('Please complete all required fields');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const steps = [
    { number: 1, title: 'Dates & Locations', icon: '📅' },
    { number: 2, title: 'Select Vehicle', icon: '🚗' },
    { number: 3, title: 'Your Details', icon: '👤' },
    { number: 4, title: 'Payment', icon: '💳' }
  ];

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Progress Indicator */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step.number
                      ? 'bg-[#F9C80E] text-[#0B1B33]'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  animate={{
                    scale: currentStep === step.number ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {step.icon}
                </motion.div>
                <span className={`mt-2 text-xs md:text-sm font-medium text-center ${
                  currentStep >= step.number ? 'text-[#0B1B33]' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step.number ? 'bg-[#F9C80E]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Price Display */}
      <AnimatePresence>
        {priceBreakdown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-[#F9C80E] to-[#e0b50c] text-[#0B1B33] rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Live Pricing</h3>
              {checkingAvailability && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="animate-spin h-4 w-4 border-2 border-[#0B1B33] border-t-transparent rounded-full" />
                  Checking availability...
                </div>
              )}
              {isAvailable === true && (
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  Available
                </span>
              )}
              {isAvailable === false && (
                <span className="flex items-center gap-2 text-sm font-semibold text-red-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full" />
                  Not Available
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Rate</span>
                <span className="font-semibold">€{priceBreakdown.dailyRate.toFixed(2)}/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span className="font-semibold">{priceBreakdown.duration} day{priceBreakdown.duration !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">€{priceBreakdown.subtotal.toFixed(2)}</span>
              </div>
              {priceBreakdown.deliveryFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">€{priceBreakdown.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t-2 border-[#0B1B33] pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>€{priceBreakdown.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-white/20 rounded p-3 mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Pay Now (15%)</span>
                  <span className="font-bold text-lg">€{priceBreakdown.deposit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs opacity-80">
                  <span>Pay at Pickup (85%)</span>
                  <span>€{priceBreakdown.balance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Dates & Locations */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">📅 Select Dates & Locations</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pick-up Date & Time *</label>
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: 'Pick-up date is required' }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                        placeholderText="Select pick-up date & time"
                      />
                    )}
                  />
                  {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Date & Time *</label>
                  <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: 'Drop-off date is required' }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={startDate || new Date()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                        placeholderText="Select drop-off date & time"
                      />
                    )}
                  />
                  {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pick-up Location *</label>
                  <select
                    {...register('pickup', { required: 'Pick-up location is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  >
                    <option value="">Select location...</option>
                    {locations.map(l => (
                      <option key={l.id} value={l.id}>{l.name_key}</option>
                    ))}
                  </select>
                  {errors.pickup && <p className="text-red-600 text-sm mt-1">{errors.pickup.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Drop-off Location *</label>
                  <select
                    {...register('dropoff', { required: 'Drop-off location is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  >
                    <option value="">Select location...</option>
                    {locations.map(l => (
                      <option key={l.id} value={l.id}>{l.name_key}</option>
                    ))}
                  </select>
                  {errors.dropoff && <p className="text-red-600 text-sm mt-1">{errors.dropoff.message}</p>}
                </div>
              </div>

              {duration > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
                >
                  <p className="text-sm text-blue-900 font-semibold">
                    ✓ Rental Duration: {duration} day{duration !== 1 ? 's' : ''}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Car Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">🚗 Select Your Vehicle</h3>
              
              {!selectedCar ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cars.map(car => (
                    <motion.div
                      key={car.id}
                      whileHover={{ scale: 1.02 }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        watchedValues.carId === car.id
                          ? 'border-[#F9C80E] bg-[#F9C80E]/5'
                          : 'border-gray-200 hover:border-[#F9C80E]'
                      }`}
                      onClick={() => setValue('carId', car.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                        {car.images?.[0] && (
                          <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-contain p-2"
                            unoptimized
                          />
                        )}
                      </div>
                      <h4 className="font-bold text-gray-900">{car.make} {car.model}</h4>
                      <p className="text-sm text-gray-600">{car.year} • {car.transmission}</p>
                      <p className="text-lg font-bold text-[#F9C80E] mt-2">{car.price_per_day}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-32 h-32 relative bg-white rounded border-2 border-gray-200">
                    {selectedCar.images?.[0] && (
                      <Image
                        src={selectedCar.images[0]}
                        alt={`${selectedCar.make} ${selectedCar.model}`}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">{selectedCar.make} {selectedCar.model}</h4>
                    <p className="text-gray-600">{selectedCar.year} • {selectedCar.transmission} • {selectedCar.fuel_type}</p>
                    <p className="text-2xl font-bold text-[#F9C80E] mt-2">{selectedCar.price_per_day}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCar(null);
                      setValue('carId', '');
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Customer Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">👤 Your Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    {...register('customerName', { required: 'Name is required' })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.customerName && <p className="text-red-600 text-sm mt-1">{errors.customerName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Phone is required' })}
                    placeholder="+30 123 456 7890"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    {...register('dob', { required: 'Date of birth is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Driver's License No *</label>
                  <input
                    type="text"
                    {...register('licenseNo', { required: 'License number is required' })}
                    placeholder="AB123456"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.licenseNo && <p className="text-red-600 text-sm mt-1">{errors.licenseNo.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID/Passport No *</label>
                  <input
                    type="text"
                    {...register('idNo', { required: 'ID/Passport number is required' })}
                    placeholder="ID123456"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-[#F9C80E]"
                  />
                  {errors.idNo && <p className="text-red-600 text-sm mt-1">{errors.idNo.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">💳 Payment Method</h3>
              
              <div className="space-y-3 mb-6">
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'iris' ? 'border-[#F9C80E] bg-[#F9C80E]/5' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="iris"
                    checked={paymentMethod === 'iris'}
                    onChange={() => setPaymentMethod('iris')}
                    className="w-5 h-5 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">IRIS Payment (Bank Transfer)</div>
                    <div className="text-sm text-gray-600">Pay via bank transfer - Instant confirmation</div>
                  </div>
                </motion.label>
                
                <motion.label
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    paymentMethod === 'viva' ? 'border-[#F9C80E] bg-[#F9C80E]/5' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="viva"
                    checked={paymentMethod === 'viva'}
                    onChange={() => setPaymentMethod('viva')}
                    className="w-5 h-5 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">Viva Wallet (Card/E-Wallet)</div>
                    <div className="text-sm text-gray-600">Pay with card, bank account, or e-wallet</div>
                  </div>
                </motion.label>
              </div>

              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-semibold">
                  ✓ No credit card required - Pay with debit card, bank transfer, or e-wallet
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceedToStep((currentStep + 1) as Step)}
              className="px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#e0b50c] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || !selectedCar || duration <= 0 || isAvailable === false}
              className="px-8 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-bold text-lg hover:bg-[#e0b50c] disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-[#0B1B33] border-t-transparent rounded-full" />
                  Processing...
                </span>
              ) : (
                priceBreakdown ? `Pay €${priceBreakdown.deposit.toFixed(2)} Now` : 'Complete Booking'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

