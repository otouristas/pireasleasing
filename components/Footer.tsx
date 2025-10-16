'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/el') ? 'el' : 'en';

  return (
    <footer className="bg-gray-900 text-white text-center lg:text-left pt-12 pb-8">
      <div className="container">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-4 pb-12 lg:pb-14">
          {/* Logo & Address Column */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image 
              alt="Aggelos Rentals logo" 
              src="/logo.png" 
              width={180} 
              height={50} 
              className="h-10 w-auto"
            />
            <div className="mt-3 lg:max-w-[250px] font-light text-gray-100 text-sm">
              <div>📍 Piraeus, Akti Themistokleous 104</div>
              <div>Greece</div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F9C80E]">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd"></path>
                </svg>
                <a 
                  href="tel:+306980151068" 
                  className="hover:text-[#F9C80E] transition-all duration-300 ease-in-out"
                >
                  +30 6980 151 068
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F9C80E]">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <a 
                  href="mailto:piraeus@aggelosrentals.com" 
                  className="hover:text-[#F9C80E] transition-all duration-300 ease-in-out text-sm"
                >
                  piraeus@aggelosrentals.com
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F9C80E]">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">
                  {locale === 'el' ? '7 Ημέρες: 09:00 - 20:00' : '7 Days: 09:00 - 20:00'}
                </span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <h4 className="font-bold text-lg">
              {locale === 'el' ? 'Υπηρεσίες' : 'Services'}
            </h4>
            <ul className="space-y-5">
              <li>
                <Link 
                  href={`/${locale}/fleet`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Στόλος Αυτοκινήτων' : 'Car Fleet'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/piraeus-car-rental`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Ενοικίαση Πειραιάς' : 'Piraeus Rental'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/athens-airport-car-rental`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Ενοικίαση Αεροδρόμιο' : 'Airport Rental'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/monthly-leasing`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <h4 className="font-bold text-lg">Resources</h4>
            <ul className="space-y-5">
              <li>
                <Link 
                  href={`/${locale}/terms`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Όροι χρήσης' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/privacy`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Δήλωση Απορρήτου' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/faq`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Συχνές Ερωτήσεις' : 'FAQ'}
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <h4 className="font-bold text-lg">
              {locale === 'el' ? 'Σχετικά με εμάς' : 'About Us'}
            </h4>
            <ul className="space-y-5">
              <li>
                <Link 
                  href={`/${locale}/contact`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Επικοινωνία' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/fleet`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Ο Στόλος μας' : 'Our Fleet'}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/piraeus-car-rental`}
                  className="font-light text-gray-100 cursor-pointer hover:text-[#F9C80E] transition-all duration-300"
                >
                  {locale === 'el' ? 'Ενοικίαση Χωρίς Κάρτα' : 'No Credit Card Rental'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <h4 className="font-bold text-lg">Follow us</h4>
            <div className="flex items-center gap-4">
              <a 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#F9C80E] flex items-center justify-center transition-all duration-300"
                href="https://www.facebook.com/AggelosRentACar" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#F9C80E] flex items-center justify-center transition-all duration-300"
                href="https://www.instagram.com/aggelosrentacar/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#F9C80E] flex items-center justify-center transition-all duration-300"
                href="https://x.com/AggelosRentACar" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#F9C80E] flex items-center justify-center transition-all duration-300"
                href="https://www.youtube.com/@AggelosRentACarAntiparos" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 pb-8 text-sm lg:text-base text-center border-t border-gray-500 w-full">
          Copyright <span>{new Date().getFullYear()}</span> © Aggelos Rentals, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
