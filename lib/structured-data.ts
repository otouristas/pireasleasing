/**
 * Structured Data (JSON-LD) utilities for SEO
 * Implements Schema.org schemas for car rental business
 */

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  priceRange: string;
}

interface LocalBusinessSchema extends OrganizationSchema {
  '@type': 'CarRental' | 'LocalBusiness';
  areaServed: {
    '@type': string;
    name: string;
  }[];
  paymentAccepted: string[];
}

interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  brand: {
    '@type': string;
    name: string;
  };
  offers: {
    '@type': string;
    priceCurrency: string;
    price: string;
    priceValidUntil: string;
    availability: string;
    url: string;
  };
  image: string;
  sku: string;
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aggelosrentals.com';

/**
 * Organization/Local Business Schema for homepage
 */
export function generateOrganizationSchema(locale: string = 'en'): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CarRental',
    name: 'Aggelos Rentals',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: locale === 'el' 
      ? 'Ενοικίαση αυτοκινήτων στην Αθήνα και Πειραιά χωρίς πιστωτική κάρτα. Πλήρης ασφάλεια και διαφανής τιμολόγηση.'
      : 'Car rental in Athens and Piraeus without credit card. Full insurance and transparent pricing.',
    telephone: '+306980151068',
    email: 'piraeus@aggelosrentals.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Akti Themistokleous 104',
      addressLocality: 'Piraeus',
      addressRegion: 'Attica',
      postalCode: '18538',
      addressCountry: 'GR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.9465,
      longitude: 23.6461
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AggelosRentACar',
      'https://www.instagram.com/aggelosrentacar/',
      'https://x.com/AggelosRentACar',
      'https://www.youtube.com/@AggelosRentACarAntiparos'
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Athens'
      },
      {
        '@type': 'City',
        name: 'Piraeus'
      },
      {
        '@type': 'State',
        name: 'Attica'
      }
    ],
    paymentAccepted: ['Cash', 'Bank Transfer', 'Debit Card', 'Credit Card'],
    priceRange: '€€'
  };
}

/**
 * Product Schema for individual car listings
 */
export function generateCarProductSchema(car: {
  make: string;
  model: string;
  year: number;
  price: string;
  slug: string;
  images?: string[];
  license_plate: string;
}, locale: string = 'en'): ProductSchema {
  const price = parseFloat(car.price.replace(/[^0-9.]/g, ''));
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${car.make} ${car.model} ${car.year}`,
    description: locale === 'el'
      ? `Ενοικίαση ${car.make} ${car.model} ${car.year} με πλήρη ασφάλεια και χωρίς πιστωτική κάρτα.`
      : `Rent ${car.make} ${car.model} ${car.year} with full insurance and no credit card required.`,
    brand: {
      '@type': 'Brand',
      name: car.make
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: price.toFixed(2),
      priceValidUntil: nextYear.toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}/fleet/${car.slug}`
    },
    image: car.images?.[0] ? `${BASE_URL}${car.images[0]}` : `${BASE_URL}/logo.png`,
    sku: car.license_plate
  };
}

/**
 * Breadcrumb Schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * FAQ Schema for FAQ page
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Website Search Action Schema
 */
export function generateWebsiteSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aggelos Rentals',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/en/fleet?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Renders JSON-LD script tag
 */
export function renderStructuredData(data: any): string {
  return JSON.stringify(data);
}

