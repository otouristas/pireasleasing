'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CarAvailabilityCalendar from './CarAvailabilityCalendar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  transmission: string;
  fuel_type: string;
  seats: number;
  price_per_day: string;
  status: string;
  description: string;
  license_plate: string;
  slug: string;
  images?: string[];
}

interface CarDetailClientProps {
  car: Car;
  similarCars: Car[];
  features: string[];
  images: string[];
  locale: string;
}

export default function CarDetailClient({ car, similarCars, features, images, locale }: CarDetailClientProps) {
  const [selectedTab, setSelectedTab] = useState<'exterior' | 'interior'>('exterior');

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-white pt-24 pb-6 lg:pb-12">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-[#F9C80E]">
              {locale === 'el' ? 'Αρχική' : 'Home'}
            </Link>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <Link href={`/${locale}/fleet`} className="hover:text-[#F9C80E]">
              {locale === 'el' ? 'Στόλος' : 'Fleet'}
            </Link>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[#0B1B33] font-semibold truncate">{car.make.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* Title Section */}
      <section className="bg-white pb-8">
        <div className="container">
          <div className="mb-4">
            <h1 className="inline text-2xl lg:text-[2.75rem] font-bold mr-2 text-[#0B1B33]">
              {car.make.toUpperCase()} {car.model.toUpperCase()}
            </h1>
            <h2 className="inline text-xl lg:text-[2.5rem] text-gray-600">
              {car.year}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-[#F9C80E] text-[#0B1B33] px-4 py-2 rounded-lg text-sm font-bold">
              {car.category}
            </div>
            {car.status === 'available' && (
              <div className="bg-green-100 text-green-800 border-2 border-green-200 px-4 py-2 rounded-lg text-sm font-bold">
                {locale === 'el' ? '✓ Διαθέσιμο' : '✓ Available'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white pb-8">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Left Column: Image Gallery + Details */}
            <div className="w-full max-w-[42rem] xl:max-w-[640px] mx-auto lg:mx-0">
              {/* Swiper Image Carousel */}
              <div className="relative h-96 sm:h-[526px] rounded-3xl overflow-hidden mb-6">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop={images.length > 1}
                  className="h-full w-full rounded-3xl"
                >
                  {/* Specs Overlay Bar */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 flex gap-6 text-sm font-semibold text-gray-700 w-full max-w-md mx-4">
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                        <circle cx="3.368" cy="4.375" r="1.181" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round"></circle>
                        <circle cx="7.5" cy="4.375" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round" r="1.181"></circle>
                        <circle cx="11.632" cy="4.375" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round" r="1.181"></circle>
                        <circle cx="3.368" cy="11.458" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round" r="1.181"></circle>
                        <circle cx="7.5" cy="11.458" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round" r="1.181"></circle>
                        <path d="M3.368 5.556v4.722M7.5 5.556v4.722M11.632 5.556v1.18a1.18 1.18 0 0 1-1.18 1.18H3.367" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <div className="text-xs md:text-sm">{car.transmission}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15">
                        <path d="M13.903 13.23v-1.181c0-1.1-.753-2.025-1.77-2.287m-2.067-6.986a2.362 2.362 0 0 1 0 4.379m.886 6.074c0-1.1 0-1.65-.18-2.084a2.361 2.361 0 0 0-1.278-1.278c-.434-.18-.984-.18-2.084-.18H5.64c-1.101 0-1.651 0-2.085.18-.579.24-1.038.7-1.278 1.278-.18.434-.18.984-.18 2.084m6.789-8.264a2.361 2.361 0 1 1-4.723 0 2.361 2.361 0 0 1 4.723 0Z" stroke="currentColor" strokeWidth="1.063" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <div className="text-xs md:text-sm">{car.seats} {locale === 'el' ? 'Άτομα' : 'People'}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                        <path d="M8.68 7.326h.59c.653 0 1.181.529 1.181 1.181v1.77a.885.885 0 1 0 1.771 0V6.147l-1.77-1.77M2.778 12.639V4.375c0-.652.528-1.18 1.18-1.18H7.5c.652 0 1.18.528 1.18 1.18v8.264M2.188 12.639H9.27" stroke="currentColor" strokeWidth="1.24" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M11.042 4.965v.59c0 .327.264.59.59.59h.59M2.778 7.326H8.68" stroke="currentColor" strokeWidth="1.24" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      <div className="text-xs md:text-sm">{car.fuel_type}</div>
                    </div>
                  </div>

                  {images.map((img, idx) => {
                    // Additional validation to ensure img is a valid string
                    if (!img || typeof img !== 'string') return null;
                    
                    return (
                      <SwiperSlide key={idx} className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={img}
                          alt={`${car.make} ${car.model} - ${idx + 1}`}
                          fill
                          className="object-contain p-8"
                          priority={idx === 0}
                          unoptimized={img.startsWith('http')}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                {/* Tab Switcher (future: exterior/interior) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow-lg p-2 flex gap-2">
                  <button
                    onClick={() => setSelectedTab('exterior')}
                    className={`rounded-full px-6 py-2 text-sm font-bold transition ${
                      selectedTab === 'exterior'
                        ? 'bg-[#ECEFF1] text-[#F9C80E]'
                        : 'text-gray-600 hover:bg-[#ECEFF1]'
                    }`}
                  >
                    {locale === 'el' ? 'Εξωτερικό' : 'Exterior'}
                  </button>
                  <button
                    onClick={() => setSelectedTab('interior')}
                    className={`rounded-full px-6 py-2 text-sm font-bold transition ${
                      selectedTab === 'interior'
                        ? 'bg-[#ECEFF1] text-[#F9C80E]'
                        : 'text-gray-600 hover:bg-[#ECEFF1]'
                    }`}
                  >
                    {locale === 'el' ? 'Εσωτερικό' : 'Interior'}
                  </button>
                </div>
              </div>

              {/* Info Notice */}
              <div className="flex items-center gap-2 bg-[#ECEFF1] rounded-lg py-2 px-3 mb-8 self-start">
                <svg className="w-5 h-5 text-[#F9C80E] flex-shrink-0" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12.75C9.2125 12.75 9.39063 12.6781 9.53438 12.5344C9.67813 12.3906 9.75 12.2125 9.75 12V9C9.75 8.7875 9.67813 8.60938 9.53438 8.46563C9.39063 8.32188 9.2125 8.25 9 8.25C8.7875 8.25 8.60938 8.32188 8.46563 8.46563C8.32188 8.60938 8.25 8.7875 8.25 9V12C8.25 12.2125 8.32188 12.3906 8.46563 12.5344C8.60938 12.6781 8.7875 12.75 9 12.75ZM9 6.75C9.2125 6.75 9.39063 6.67813 9.53438 6.53438C9.67813 6.39062 9.75 6.2125 9.75 6C9.75 5.7875 9.67813 5.60938 9.53438 5.46563C9.39063 5.32188 9.2125 5.25 9 5.25C8.7875 5.25 8.60938 5.32188 8.46563 5.46563C8.32188 5.60938 8.25 5.7875 8.25 6C8.25 6.2125 8.32188 6.39062 8.46563 6.53438C8.60938 6.67813 8.7875 6.75 9 6.75ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69688 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69688 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69688 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69688 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.675 15 12.0938 14.4188 13.2563 13.2563C14.4188 12.0938 15 10.675 15 9C15 7.325 14.4188 5.90625 13.2563 4.74375C12.0938 3.58125 10.675 3 9 3C7.325 3 5.90625 3.58125 4.74375 4.74375C3.58125 5.90625 3 7.325 3 9C3 10.675 3.58125 12.0938 4.74375 13.2563C5.90625 14.4188 7.325 15 9 15Z" fill="currentColor"/>
                </svg>
                <span className="text-sm text-gray-800">
                  {locale === 'el' ? 'Οι φωτογραφίες του οχήματος είναι ενδεικτικές' : 'Vehicle photos are indicative'}
                </span>
              </div>

              {/* Accordion Sections */}
              <div className="space-y-2">
                {/* Basic Specs */}
                <details className="bg-white border-b border-gray-200 p-4 group" open>
                  <summary className="cursor-pointer flex justify-between items-center list-none">
                    <h3 className="text-lg font-bold text-[#0B1B33]">
                      {locale === 'el' ? 'Βασικά Χαρακτηριστικά' : 'Basic Specifications'}
                    </h3>
                    <svg className="w-6 h-6 text-[#F9C80E] transform group-open:rotate-180 transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.2 14c-.15 0-.27-.05-.36-.15-.09-.1-.14-.22-.14-.35 0-.03.05-.15.15-.35l3.625-3.625c.08-.08.17-.14.25-.17.08-.03.17-.05.27-.05.1 0 .19.02.27.05.08.03.17.09.25.17l3.625 3.625c.05.05.09.1.11.17.03.06.04.12.04.18 0 .13-.05.25-.14.35-.09.1-.21.15-.36.15H8.2z"/>
                    </svg>
                  </summary>
                  <div className="mt-4 flex flex-col gap-2">
                    {[
                      { label: locale === 'el' ? 'Κατηγορία' : 'Category', value: car.category },
                      { label: locale === 'el' ? 'Μετάδοση' : 'Transmission', value: car.transmission },
                      { label: locale === 'el' ? 'Καύσιμο' : 'Fuel Type', value: car.fuel_type },
                      { label: locale === 'el' ? 'Θέσεις' : 'Seats', value: car.seats },
                      { label: locale === 'el' ? 'Έτος' : 'Year', value: car.year },
                      { label: locale === 'el' ? 'Πινακίδα' : 'License Plate', value: car.license_plate },
                    ].map((spec, i) => (
                      <div key={i} className="flex justify-between p-4 rounded-lg border border-gray-200">
                        <span className="text-gray-700">{spec.label}</span>
                        <span className="font-bold text-[#0B1B33]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </details>

                {/* Features */}
                <details className="bg-white border-b border-gray-200 p-4 group">
                  <summary className="cursor-pointer flex justify-between items-center list-none">
                    <h3 className="text-lg font-bold text-[#0B1B33]">
                      {locale === 'el' ? 'Εξοπλισμός' : 'Equipment'}
                    </h3>
                    <svg className="w-6 h-6 text-[#F9C80E] transform group-open:rotate-180 transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.2 14c-.15 0-.27-.05-.36-.15-.09-.1-.14-.22-.14-.35 0-.03.05-.15.15-.35l3.625-3.625c.08-.08.17-.14.25-.17.08-.03.17-.05.27-.05.1 0 .19.02.27.05.08.03.17.09.25.17l3.625 3.625c.05.05.09.1.11.17.03.06.04.12.04.18 0 .13-.05.25-.14.35-.09.1-.21.15-.36.15H8.2z"/>
                    </svg>
                  </summary>
                  <div className="mt-4 grid md:grid-cols-2 gap-2">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 text-sm text-gray-800">
                        <div className="w-1.5 h-1.5 bg-[#F9C80E] rounded-full flex-shrink-0"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </details>
              </div>

              {/* Description */}
              <div className="mt-8 bg-white">
                <h2 className="text-2xl font-bold text-[#0B1B33] mb-4">
                  {locale === 'el' ? 'Περιγραφή' : 'Description'}
                </h2>
                <div className="text-gray-700 leading-relaxed prose prose-gray max-w-none">
                  <p>{car.description}</p>
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="mt-8">
                <CarAvailabilityCalendar carId={car.id} locale={locale} />
              </div>
            </div>

            {/* Right Column: Sticky Booking Card */}
            <div className="w-full lg:w-auto lg:flex-1 lg:max-w-md lg:sticky lg:top-24">
              <div className="bg-[#ECEFF1] rounded-3xl p-6 lg:p-9 flex flex-col gap-6">
                {/* "Για να ξεκινήσεις" Section */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-bold">
                    {locale === 'el' ? 'Για να ξεκινήσεις' : 'To get started'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>

                {/* Registration Fee */}
                <div className="w-full flex justify-between text-gray-600 gap-4">
                  <div>
                    <div>{locale === 'el' ? 'Εγγραφή μια φορά' : 'One-time registration'}</div>
                    <div className="text-black text-xs md:text-sm">
                      {locale === 'el' 
                        ? 'Ισχύει για πάντα ακόμα κι αν διακόψεις τη συνδρομή σου' 
                        : 'Valid forever even if you cancel your subscription'}
                    </div>
                  </div>
                  <div className="font-bold flex flex-col shrink-0">
                    <div className="relative h-max text-gray-300">
                      <div className="inline-block relative after:content-[''] after:block after:absolute after:border-t after:border after:border-gray-300 after:inset-x-0 after:top-1/2">
                        270<span className="text-xs">€</span>
                      </div>
                    </div>
                    <div>0<span className="text-xs">€</span></div>
                  </div>
                </div>

                {/* Deposit */}
                <div className="w-full flex justify-between text-gray-600 gap-4">
                  <div>
                    <div>{locale === 'el' ? '15% Προκαταβολή' : '15% Deposit'}</div>
                    <div className="text-black text-xs md:text-sm">
                      {locale === 'el' 
                        ? 'Επιστρέφεται στο τέλος ή συνυπολογίζεται σε αγορά' 
                        : 'Refunded at end or applied to purchase'}
                    </div>
                  </div>
                  <div className="font-bold">
                    {Math.round(parseFloat(car.price_per_day.replace('€/Month', '')) * 0.15)}<span className="text-xs">€</span>
                  </div>
                </div>

                {/* Total */}
                <div className="w-full flex justify-between font-bold text-lg md:text-2xl border-t border-gray-300 pt-4">
                  <div>{locale === 'el' ? 'Σύνολο' : 'Total'}</div>
                  <div className="text-[#F9C80E]">
                    {Math.round(parseFloat(car.price_per_day.replace('€/Month', '')) * 0.15)}<span className="text-lg">€</span>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="relative mt-6 rounded-2xl overflow-hidden border-2 border-[#F9C80E] bg-white">
                  <span className="block absolute w-full top-0 mt-2 text-sm text-white font-bold text-center bg-[#F9C80E] py-1">
                    {locale === 'el' ? '#ΠΡΟΣΦΟΡΑ' : '#OFFER'}
                  </span>
                  <div className="p-6 pt-12">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div>
                        <div className="text-xl font-bold text-gray-800">
                          {locale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Rental'}
                        </div>
                        <div className="text-xs font-bold mt-1 text-gray-400">
                          {locale === 'el' ? 'Για σένα που θες ευελιξία' : 'For maximum flexibility'}
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-end gap-2.5 text-gray-800">
                        <div className="text-[2.5rem] min-[340px]:text-[2.875rem] leading-[3.5rem] font-extrabold text-[#F9C80E]">
                          {car.price_per_day?.replace('€/Month', '')}
                          <span className="text-[2rem]">€</span>
                        </div>
                        <div className="text-xs font-normal mb-3 text-gray-600">
                          <span className="block">EUR</span>
                          <span>/{locale === 'el' ? 'μήνα' : 'month'}</span>
                          <span> + {locale === 'el' ? 'ΦΠΑ' : 'VAT'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <ul className="space-y-2">
                        {[
                          locale === 'el' ? 'Χωρίς εμπλοκή τραπεζών' : 'No bank involvement',
                          locale === 'el' ? 'Παροχή 24ωρης οδικής βοήθειας' : '24/7 roadside assistance',
                          locale === 'el' ? 'Πληρωμένα τέλη κυκλοφορίας' : 'Road tax included',
                          locale === 'el' ? 'Δωρεάν service' : 'Free servicing',
                          locale === 'el' ? 'Δωρεάν ακύρωση 48h' : 'Free 48h cancellation',
                        ].map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                            <svg className="w-5 h-5 text-[#F9C80E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Availability Status */}
                    <div className={`mt-6 p-4 rounded-xl text-center font-bold text-lg ${
                      car.status === 'available'
                        ? 'bg-green-50 text-green-700 border-2 border-green-200'
                        : 'bg-red-50 text-red-700 border-2 border-red-200'
                    }`}>
                      {car.status === 'available' 
                        ? (locale === 'el' ? '✓ Διαθέσιμο Τώρα' : '✓ Available Now')
                        : (locale === 'el' ? '✗ Ενοικιασμένο' : '✗ Currently Rented')
                      }
                    </div>

                    {/* Book Button */}
                    <Link
                      href={`/${locale}/booking?car=${car.slug}`}
                      className={`block w-full text-center py-4 text-lg font-bold rounded-full shadow-lg transition mt-4 ${
                        car.status === 'available'
                          ? 'btn-primary'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {car.status === 'available'
                        ? (locale === 'el' ? 'Κλείστε Τώρα' : 'Book Now')
                        : (locale === 'el' ? 'Μη Διαθέσιμο' : 'Not Available')
                      }
                    </Link>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col lg:hidden items-center gap-2 mt-6 text-center">
                  <div className="text-gray-600 font-bold">
                    {locale === 'el' ? 'Χρειάζεσαι βοήθεια;' : 'Need help?'}
                  </div>
                  <div className="text-gray-600 font-bold">
                    {locale === 'el' ? 'Κάλεσε μας' : 'Call us'}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                      <path d="M5.52841 2.00001C5.27386 1.99917 5.02168 2.04876 4.78641 2.14593C4.55114 2.24309 4.33746 2.3859 4.15771 2.5661L3.22305 3.50066C2.76853 3.94781 2.42471 4.49491 2.21899 5.09839C2.01327 5.70186 1.95132 6.34503 2.03809 6.97667C2.37721 9.09787 3.11892 11.1347 4.22326 12.9773C5.04931 14.3721 6.04852 15.6568 7.19708 16.8009C8.34087 17.9484 9.62506 18.9468 11.0191 19.7724C12.8624 20.8765 14.8997 21.6181 17.0214 21.9573C17.2095 21.9856 17.3994 21.9999 17.5896 22C18.6829 21.9894 19.728 21.5479 20.4978 20.7715L21.4325 19.8369C21.7959 19.4736 22 18.9807 22 18.4669C22 17.953 21.7959 17.4602 21.4325 17.0968L19.3814 15.046C19.018 14.6826 18.5251 14.4785 18.0112 14.4785C17.4973 14.4785 17.0044 14.6826 16.641 15.046L15.7332 15.9527C15.5262 16.1605 15.28 16.3252 15.0089 16.4372C14.7378 16.5492 14.4472 16.6063 14.1539 16.6052C13.6871 16.6053 13.2317 16.4614 12.8497 16.1931C11.7707 15.4371 10.8056 14.6827 9.81234 13.6896C8.96618 12.844 8.48847 12.1255 7.80198 11.1459C7.49712 10.7141 7.35411 10.1888 7.39807 9.66211C7.44203 9.13541 7.67014 8.64104 8.04235 8.26577L8.94919 7.35903C9.31166 6.99498 9.51516 6.50219 9.51516 5.98849C9.51516 5.47479 9.31166 4.982 8.94919 4.61795L6.89811 2.5671C6.71866 2.3867 6.50519 2.24369 6.27008 2.14635C6.03497 2.049 5.78288 1.99927 5.52841 2.00001Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <a href="tel:+302100000000" className="text-xl font-bold text-[#0B1B33] hover:text-[#F9C80E] transition">
                      +30 210 000 0000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Aggelos Rentals */}
      <section className="py-16 bg-gradient-to-br from-[#ECEFF1] to-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1B33] mb-12 text-center">
            {locale === 'el' ? 'Γιατί Aggelos Rentals;' : 'Why Aggelos Rentals?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: locale === 'el' ? 'Ευελιξία' : 'Flexibility',
                desc: locale === 'el' ? 'Μηνιαία ενοικίαση χωρίς δέσμευση' : 'Monthly rental no commitment',
              },
              {
                title: locale === 'el' ? 'Χωρίς Πιστωτική' : 'No Credit Card',
                desc: locale === 'el' ? 'Μόνο 15% προκαταβολή online' : 'Only 15% deposit online',
              },
              {
                title: locale === 'el' ? 'Πλήρης Ασφάλεια' : 'Full Insurance',
                desc: locale === 'el' ? 'Περιλαμβάνεται στην τιμή' : 'Included in price',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md text-center">
                <div className="w-14 h-14 bg-[#F9C80E] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#0B1B33]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#0B1B33] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Cars */}
      {similarCars && similarCars.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0B1B33] mb-8">
              {locale === 'el' ? 'Παρόμοια Οχήματα' : 'Similar Vehicles'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarCars.map((similar) => {
                // Images in DB already have /lovable-uploads/ prefix
                const simImage = similar.images?.[0] || '/fleet/placeholder.jpg';
                return (
                  <Link 
                    key={similar.id} 
                    href={`/${locale}/fleet/${similar.slug}`}
                    className="flex flex-col gap-2 bg-white border-2 border-[#ECEFF1] rounded-xl p-4 hover:border-[#F9C80E] hover:shadow-lg transition group"
                  >
                    <div className="relative h-36 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <div 
                        style={{
                          backgroundImage: `url(${simImage})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                        className="w-full h-full"
                      />
                    </div>
                    <h3 className="font-bold text-lg text-[#0B1B33] group-hover:text-[#F9C80E] transition">
                      {similar.make.toUpperCase()} {similar.model.toUpperCase()}
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {similar.year} • {similar.seats} {locale === 'el' ? 'θέσεις' : 'seats'}
                    </div>
                    <div className="text-2xl font-bold text-[#F9C80E]">
                      {similar.price_per_day}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link href={`/${locale}/fleet`} className="btn-outline px-8 py-4">
                {locale === 'el' ? 'Δείτε Όλο τον Στόλο' : 'View All Fleet'}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

