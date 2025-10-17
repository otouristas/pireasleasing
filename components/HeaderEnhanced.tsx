"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load the mobile menu component
const MobileMenu = lazy(() => import('./MobileMenu'));

export default function HeaderEnhanced() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] === 'el' || segments[0] === 'en') ? segments[0] : 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: `/${currentLocale}/fleet`, label: currentLocale === 'el' ? 'Στόλος' : 'Fleet' },
    { href: `/${currentLocale}/piraeus-car-rental`, label: currentLocale === 'el' ? 'Πειραιάς' : 'Piraeus' },
    { href: `/${currentLocale}/athens-airport-car-rental`, label: currentLocale === 'el' ? 'Αεροδρόμιο' : 'Airport' },
    { href: `/${currentLocale}/monthly-leasing`, label: currentLocale === 'el' ? 'Μηνιαία Ενοικίαση' : 'Monthly Leasing' },
    { href: `/${currentLocale}/contact`, label: currentLocale === 'el' ? 'Επικοινωνία' : 'Contact' },
    { href: `/${currentLocale}/faq`, label: 'FAQ' },
  ];

  return (
    <header className={`w-full bg-[var(--primary)] text-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-xl' : 'shadow-lg'
    }`}>
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href={`/${currentLocale}`} className="flex items-center hover:opacity-90 transition z-50">
          <Image 
            src="/logo.png" 
            alt="Aggelos Rentals" 
            width={180} 
            height={50} 
            className="h-10 w-auto"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="hover:text-[var(--accent)] transition relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Side: Language + CTA + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center gap-2 text-sm z-50">
            <Link 
              href={pathname.replace(/^\/(en|el)/, '/en')} 
              className={`${currentLocale === 'en' ? 'font-bold text-[var(--accent)]' : 'hover:text-[var(--accent)]'} transition`}
            >
              EN
            </Link>
            <span className="text-gray-400">|</span>
            <Link 
              href={pathname.replace(/^\/(en|el)/, '/el')} 
              className={`${currentLocale === 'el' ? 'font-bold text-[var(--accent)]' : 'hover:text-[var(--accent)]'} transition`}
            >
              GR
            </Link>
          </div>

          {/* Book Now Button - Desktop */}
          <Link 
            href={`/${currentLocale}/booking`} 
            className="hidden md:flex btn-primary text-sm px-6 py-2"
          >
            {currentLocale === 'el' ? 'Κράτηση' : 'Book Now'}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white transition-all"
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white transition-all"
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white transition-all"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <Suspense fallback={null}>
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
          currentLocale={currentLocale}
        />
      </Suspense>
    </header>
  );
}

