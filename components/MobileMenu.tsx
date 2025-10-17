"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
  currentLocale: string;
}

export default function MobileMenu({ isOpen, onClose, navLinks, currentLocale }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
  );
}