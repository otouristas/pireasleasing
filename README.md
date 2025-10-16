# 🚗 Aggelos Rentals - Car Rental Platform

Modern bilingual (Greek/English) car rental website for Athens & Piraeus, built with Next.js 15, Supabase, and Viva Wallet integration.

## ✨ Features

- **Multilingual Support**: Full Greek (`/el`) and English (`/en`) localization
- **No Credit Card Required**: Book with just 15% deposit, no security deposit
- **SSR Optimized**: Server-side rendering for superior SEO performance
- **Viva Wallet Integration**: Secure online payments via Smart Checkout
- **Real-time Availability**: Check car availability with overlap prevention
- **User Dashboard**: View and manage bookings
- **Admin Panel**: Fleet management, booking oversight (coming soon)
- **Responsive Design**: Beautiful UI following design.md specifications

## 🎨 Design System

### Colors
- **Primary (Dark Blue)**: `#0B1B33` - Headers, footers, text
- **Accent (Sun Yellow)**: `#F9C80E` - CTAs, highlights
- **Light Gray**: `#ECEFF1` - Cards, backgrounds
- **Warning**: `#FF7043` - Validation errors

### Typography
- **Headings**: Poppins (600-700 weight)
- **Body**: Inter (400-500 weight)
- All text optimized for Greek & English readability

## 🗺️ Page Structure

### Public Pages
- `/[locale]` - Homepage with hero, fleet preview, benefits
- `/[locale]/fleet` - All vehicles with filtering
- `/[locale]/piraeus-car-rental` - Piraeus Port specific info
- `/[locale]/athens-airport-car-rental` - Athens Airport details
- `/[locale]/monthly-leasing` - Long-term rental options
- `/[locale]/contact` - Contact form and info
- `/[locale]/faq` - Frequently asked questions
- `/[locale]/terms` - Terms & conditions
- `/[locale]/privacy` - Privacy policy

### User Pages
- `/[locale]/login` - User authentication
- `/[locale]/register` - New account creation
- `/[locale]/dashboard` - User bookings overview
- `/[locale]/booking` - Booking flow with Viva Wallet
- `/booking-confirmation` - Post-payment confirmation

### API Routes
- `GET /api/availability` - Check car availability for date range
- `GET /api/locations` - Fetch pickup/dropoff locations
- `POST /api/booking` - Create booking + Viva Wallet order
- `POST /api/webhooks/viva` - Payment confirmation webhook

## 🗄️ Database Schema (Supabase)

### Tables
- **profiles** - User profiles with role (user/admin)
- **cars** - Fleet vehicles (27 cars seeded from fleet.md)
- **addons** - Optional extras (booster seat, GPS, etc.)
- **locations** - Pickup/dropoff points (Piraeus, Athens Airport)
- **bookings** - Rental reservations with pricing breakdown

### Key Features
- **Exclusion constraint** on bookings prevents overlapping car assignments
- **Row Level Security** enabled on all tables
- **Public read access** for cars, locations, addons
- **User-scoped access** for bookings

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (connected via MCP)
- Viva Wallet credentials (demo or production)

### Installation

```bash
npm install
```

### Environment Variables

Set these in Netlify dashboard or `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://aggelosrentals.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Viva Wallet
VIVA_BASE_URL=https://demo-api.vivapayments.com
VIVA_CLIENT_ID=your_client_id
VIVA_CLIENT_SECRET=your_client_secret
VIVA_MERCHANT_ID=your_merchant_id

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_USER=user
SMTP_PASS=pass
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

## 📦 Deployment (Netlify)

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push

The `netlify.toml` is configured with the Next.js plugin.

## 🔐 Authentication

Uses Supabase Auth with email/password:
- Users can register at `/[locale]/register`
- Login at `/[locale]/login`
- Protected routes redirect to login if not authenticated

## 💳 Payment Flow

1. User fills booking form with dates, location, driver info
2. System calculates total (base + delivery fees + extras)
3. Creates booking with status `awaiting_payment`
4. Redirects to Viva Wallet Smart Checkout for 15% deposit
5. Webhook confirms payment and updates status to `confirmed`
6. User receives confirmation email (to be implemented)

## 📊 Current Status

### ✅ Completed
- Next.js 15 App Router setup with TypeScript
- Supabase integration (SSR + client)
- i18n routing with middleware (`/en` and `/el`)
- Complete design system (Poppins + Inter fonts, colors)
- Header with sticky nav + locale switch
- Footer with 3-column layout
- All public pages (home, fleet, locations, FAQ, contact, legal)
- Auth pages (login, register, dashboard)
- Database schema with RLS policies
- 27 cars seeded from fleet.md
- Locations seeded (Piraeus €20, Athens Airport €40)
- 4 addons seeded (booster seat, GPS, etc.)
- Pricing engine with off-hours logic
- Availability API with overlap checking
- Booking API with Viva Wallet order creation (scaffold)
- Booking confirmation page
- Viva webhook endpoint (verification needed)
- Netlify deployment config

### 🚧 Remaining (Per Plan)
- Enhanced booking UI: calendar widget, live price breakdown, car selection
- Viva Wallet: finalize Smart Checkout redirect URL, verify webhook signatures
- Admin panel: cars CRUD, bookings management, settings
- Email service: confirmation, reminders (Nodemailer or SendGrid)
- SEO: expand location content to 300-500 words, add hreflang
- Tests: pricing unit tests, E2E booking flow
- Monthly pricing from fleet.md (currently using placeholder €35/day)

## 🎯 SEO Keywords

### English
- rent a car Piraeus
- Athens airport car rental
- car rental without credit card
- no deposit car rental Athens
- monthly car leasing Athens

### Greek
- ενοικίαση αυτοκινήτου Πειραιάς
- ενοικίαση αυτοκινήτου αεροδρόμιο Αθήνας
- χωρίς πιστωτική κάρτα
- χωρίς εγγύηση
- μηνιαία ενοικίαση αυτοκινήτου

## 📱 Mobile Responsive

All pages tested on:
- Desktop (1280px+)
- Tablet (768px-1024px)
- Mobile (320px-767px)

## 🌐 Localization

- Middleware auto-redirects to `/en` or `/el` based on browser language
- All content fully translated
- Locale switcher in header (EN | GR)
- SEO metadata per locale

## 🔗 Internal Linking

Each location page links to:
- Other locations (Piraeus ↔ Airport)
- Monthly leasing
- FAQ
- Contact

## 📝 License

© 2025 Aggelos Rentals. All rights reserved.

---

**For developers**: Check `design.md` for UI guidelines and `seo.md` for content strategy.
