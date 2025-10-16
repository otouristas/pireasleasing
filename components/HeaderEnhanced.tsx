"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-[var(--primary)] shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <nav className="flex flex-col p-8 pt-24 gap-1">
                {/* Navigation Links */}
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className="block py-4 px-4 text-white hover:bg-white/10 hover:text-[var(--accent)] rounded-lg transition-all font-medium text-lg"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Book Now Button - Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="mt-6"
                >
                  <Link 
                    href={`/${currentLocale}/booking`}
                    className="block w-full btn-primary text-center py-4 text-lg"
                  >
                    {currentLocale === 'el' ? '🚗 Κλείστε Τώρα' : '🚗 Book Now'}
                  </Link>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                  className="mt-8 pt-8 border-t border-white/20 space-y-4"
                >
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-[var(--accent)] mb-2">
                      {currentLocale === 'el' ? 'Επικοινωνήστε μαζί μας' : 'Contact Us'}
                    </p>
                    <a href="tel:+306980151068" className="block py-1 hover:text-[var(--accent)] transition">
                      📞 +30 6980 151 068
                    </a>
                    <a href="mailto:piraeus@aggelosrentals.com" className="block py-1 hover:text-[var(--accent)] transition">
                      📧 piraeus@aggelosrentals.com
                    </a>
                    <p className="py-1">
                      🕐 {currentLocale === 'el' ? '7 Ημέρες: 09:00 - 20:00' : '7 Days: 09:00 - 20:00'}
                    </p>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 2) * 0.1 }}
                  className="flex items-center gap-4 mt-6"
                >
                  <a 
                    href="https://www.facebook.com/AggelosRentACar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--accent)] transition-all"
                  >
                    <span className="text-white">f</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/aggelosrentacar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--accent)] transition-all"
                  >
                    <span className="text-white">📷</span>
                  </a>
                  <a 
                    href="https://x.com/AggelosRentACar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--accent)] transition-all"
                  >
                    <span className="text-white">𝕏</span>
                  </a>
                  <a 
                    href="https://www.youtube.com/@AggelosRentACarAntiparos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--accent)] transition-all"
                  >
                    <span className="text-white">▶</span>
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

