"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const locale = (segments[0] === 'el' || segments[0] === 'en') ? segments[0] : 'en';
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: locale === 'el' ? 'Αρχική' : 'Home', href: `/${locale}` }
  ];

  const routeLabels: Record<string, { en: string; el: string }> = {
    'fleet': { en: 'Fleet', el: 'Στόλος' },
    'booking': { en: 'Booking', el: 'Κράτηση' },
    'piraeus-car-rental': { en: 'Piraeus Port', el: 'Λιμάνι Πειραιά' },
    'athens-airport-car-rental': { en: 'Athens Airport', el: 'Αεροδρόμιο Αθηνών' },
    'monthly-leasing': { en: 'Monthly Leasing', el: 'Μηνιαία Ενοικίαση' },
    'contact': { en: 'Contact', el: 'Επικοινωνία' },
    'faq': { en: 'FAQ', el: 'Συχνές Ερωτήσεις' },
    'terms': { en: 'Terms of Service', el: 'Όροι Χρήσης' },
    'privacy': { en: 'Privacy Policy', el: 'Πολιτική Απορρήτου' },
    'dashboard': { en: 'Dashboard', el: 'Πίνακας Ελέγχου' },
    'login': { en: 'Login', el: 'Σύνδεση' },
    'register': { en: 'Register', el: 'Εγγραφή' },
  };

  let currentPath = '';
  segments.forEach((segment, index) => {
    if (index === 0) return; // Skip locale
    
    currentPath += `/${segment}`;
    const label = routeLabels[segment] 
      ? routeLabels[segment][locale as 'en' | 'el']
      : segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      label,
      href: `/${locale}${currentPath}`
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="container py-3">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-gray-400">/</span>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-semibold">{crumb.label}</span>
              ) : (
                <Link 
                  href={crumb.href}
                  className="text-gray-600 hover:text-[#F9C80E] transition"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

