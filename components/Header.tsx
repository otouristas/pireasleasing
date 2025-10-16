"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] === 'el' || segments[0] === 'en') ? segments[0] : 'en';

  return (
    <header className="w-full bg-[var(--primary)] text-white sticky top-0 z-50 shadow-lg">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${currentLocale}`} className="flex items-center hover:opacity-90 transition">
          <Image 
            src="/logo.png" 
            alt="Aggelos Rentals" 
            width={180} 
            height={50} 
            className="h-10 w-auto"
            priority
          />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href={`/${currentLocale}/fleet`} className="hover:text-[var(--accent)] transition">
            {currentLocale === 'el' ? 'Στόλος' : 'Fleet'}
          </Link>
          <Link href={`/${currentLocale}/piraeus-car-rental`} className="hover:text-[var(--accent)] transition">
            {currentLocale === 'el' ? 'Πειραιάς' : 'Piraeus'}
          </Link>
          <Link href={`/${currentLocale}/athens-airport-car-rental`} className="hover:text-[var(--accent)] transition">
            {currentLocale === 'el' ? 'Αεροδρόμιο' : 'Airport'}
          </Link>
          <Link href={`/${currentLocale}/monthly-leasing`} className="hover:text-[var(--accent)] transition">
            {currentLocale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing'}
          </Link>
          <Link href={`/${currentLocale}/contact`} className="hover:text-[var(--accent)] transition">
            {currentLocale === 'el' ? 'Επικοινωνία' : 'Contact'}
          </Link>
          <Link href={`/${currentLocale}/faq`} className="hover:text-[var(--accent)] transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Link 
              href={pathname.replace(/^\/(en|el)/, '/en')} 
              className={`${currentLocale === 'en' ? 'font-bold underline' : 'hover:underline'}`}
            >
              EN
            </Link>
            <span>|</span>
            <Link 
              href={pathname.replace(/^\/(en|el)/, '/el')} 
              className={`${currentLocale === 'el' ? 'font-bold underline' : 'hover:underline'}`}
            >
              GR
            </Link>
          </div>
          <Link href={`/${currentLocale}/booking`} className="btn-primary text-sm px-6 py-2">
            {currentLocale === 'el' ? 'Κράτηση' : 'Book Now'}
          </Link>
        </div>
      </div>
    </header>
  );
}
