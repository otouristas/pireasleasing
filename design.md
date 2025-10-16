# 🎨 Aggelos Rentals – MVP Design System & UI README

Modern bilingual (Greek/English) car rental design system built for **Next.js + Tailwind CSS**, optimized for **UX trust**, **conversion**, and **SEO clarity**.

---

## 🏁 Design Identity

### 🎯 Brand Personality
- **Professional** yet **accessible**
- **Travel-friendly** and **trust-driven**
- Visual cues of **motion**, **security**, and **simplicity**

### 🎨 Color Palette

| Role | Color | Hex | Usage |
|------|--------|-----|--------|
| **Primary (Dark Blue)** | `#0B1B33` | Backgrounds, header, footer |
| **Accent (Sun Yellow)** | `#F9C80E` | Buttons, highlights, CTAs |
| **Secondary (Cool Gray)** | `#ECEFF1` | Backgrounds, cards |
| **Neutral Text** | `#FFFFFF` | Primary text on dark |
| **Sub Text / Body** | `#B0BEC5` | Paragraphs, placeholders |
| **Error/Warning** | `#FF7043` | Validation, alerts |

> The color story: Dark blue evokes reliability and professionalism (naval/Piraeus connection).  
> Golden yellow signals optimism, travel, and action.

---

## 🧩 Typography

| Element | Font | Weight | Notes |
|----------|------|---------|-------|
| Headings | **Poppins** | 600–700 | Rounded modern sans-serif for trust |
| Body | **Inter** | 400–500 | Clean readability in both Greek & English |
| Numbers / Price | **Roboto Mono** | 500 | Gives precision in pricing tables |

All typography should scale fluidly:
- `H1`: 36–42px  
- `H2`: 28–32px  
- `H3`: 22–26px  
- `Body`: 16–18px  

---

## 🧱 Layout Structure

### Global Components
- **Header:** Sticky, dark blue background, logo left, nav links center, “Book Now” CTA button (yellow) right.
- **Footer:** 3-column (Company, Locations, Contact), dark navy background, subtle yellow underline hover effects.
- **Language Toggle:** `EN | GR` top-right, persistent.

### Grid
- Container width: `max-w-[1280px]` with responsive breakpoints (`sm`, `md`, `lg`, `xl`)
- Gutters: `px-6 md:px-10`
- Sections spaced by `py-16`

---

## 🏠 Home Page Design

### Hero Section
- Full viewport hero with a **Piraeus night harbor photo overlayed by a blue gradient**.
- Headline: “Rent a Car in Piraeus & Athens Airport”
- Subtext: “No credit card. No deposit. Full insurance.”
- CTA: Yellow “Book Now” button → `/booking`
- Secondary CTA: “See Our Fleet” (outline style).

### Highlights Strip (3-column icons)
- 🪪 “No Credit Card Required”  
- 🔐 “Full Insurance Included”  
- 🚗 “Delivery Anywhere in Attica”

### Fleet Preview
- Horizontal card carousel of top 4 cars.
- Hover: subtle lift + yellow outline animation.

### Testimonials (optional MVP+)
- 3 short quotes over dark background with yellow stars.

### Footer CTA
- Split layout: “Ready to drive?” + “Reserve now” button.

---

## ⚓ Piraeus Car Rental Page

### Hero Banner
- Image: Piraeus Port or Ferry backdrop.
- Overlay: Navy gradient, white heading text.

### Content Blocks
- **Left:** text on delivery, no-deposit benefit.  
- **Right:** illustrated map of Piraeus Port + icons for delivery zones.

### Fleet Cards (specific to Piraeus)
- Smaller grid (3-per-row), filter: car type, price range, transmission.
- Each card includes:
  - Car image
  - Model name
  - Price/day
  - “Details” + “Book” buttons

### Callout Box (Highlight)
> “Delivery to Piraeus Port only €20 – free for long-term rentals!”

---

## ✈️ Athens Airport Page

### Hero
- Background: aerial shot of Athens Airport runway sunrise.
- Overlay: blue-to-yellow gradient diagonal.
- Headline: “Athens Airport Car Rental 24/7”

### Content Focus
- Two-column grid: info + “airport process” illustration.
- Icon list:
  - 🕒 24/7 Availability
  - 💳 Pay 15% upfront via Viva Wallet
  - 🏷️ Transparent Pricing

### CTA
- Full-width yellow section:  
  “Landing soon? Book your car now.” → `/booking`

---

## 🚗 Fleet Overview Page

### Route: `/fleet`
- Grid display of all cars in database (SSR rendered).
- Filters (sticky left sidebar):
  - Category (Economy, SUV, Van)
  - Transmission
  - Seats
  - Availability dates (calendar pop)
- Cards:
  - Large car photo
  - Model name + year
  - “From €xx/day”
  - Icons for A/C, auto/manual, doors, fuel
  - “View Details” (→ `/fleet/[slug]`)

### Design Notes
- Hover effect: drop shadow + glow line in `#F9C80E`
- On mobile → vertical cards with swipe gestures.

---

## 🚘 Car Detail Page

### Route: `/fleet/[slug]`
- Hero: photo carousel (3–5 images)
- Title: “Toyota Yaris 2023 – Automatic”
- Price: large yellow text “€39/day”
- Info grid:
  - Category, Transmission, Doors, Fuel, A/C, Mileage policy.
- Tabs:
  - **Description**
  - **Features**
  - **Booking / Availability**
- Sidebar: sticky box with “Book This Car” → embedded date picker.

### Visual Detail
- Use subtle yellow borders for info icons.
- Mini availability calendar popup.
- Testimonials (optional): small review slider with stars.

---

## 📅 Booking Page

### Route: `/booking`
- Clean white card over dark blue background.
- Step progress indicator (1–4): Dates → Car → Details → Payment.
- Viva Wallet Smart Checkout embedded in final step modal.
- Confirmation animation: checkmark confetti in yellow.

### Forms
- Rounded inputs, gray outlines.
- Validation states:
  - Green outline on success.
  - Orange `#FF7043` message for underage driver or missing license.

---

## 🧾 Monthly Leasing Page

- Background: gradient navy to dark gray.
- Headline: “Month-to-Month Car Leasing – No Buyout”
- Layout: 2-column — image of person signing, right side text & CTA.
- Pricing comparison table: Monthly vs Daily rental.
- CTA banner: “Start your flexible lease today → `/booking`”

---

## 💬 FAQ Page

- Accordion component (expand/collapse).
- Each item styled with yellow underline hover.
- Icons: ❓ (outline) / ✅ (open).
- Schema markup SSR for SEO.

---

## 📞 Contact Page

- Map embed (Google Maps API) styled in grayscale.
- Form:
  - Name, Email, Message, Purpose (dropdown).
  - Submit button yellow hover blue.
- Side column: address, phone, hours, social icons (rounded).

---

## 🔐 Admin Dashboard (MVP Internal)

- Theme: dark background (`#0B1B33`), light text.
- Cards for “Bookings”, “Fleet”, “Payments”.
- Use accent yellow for actionable icons (edit, assign, confirm).
- Tables: borderless with alternating row highlight `#112244`.

---

## 🧠 UI Motion & Microinteractions

- Button hover: subtle 2px upward motion + shadow glow.
- Car cards: on hover → tilt + yellow line reveal on bottom.
- Loading state: spinning steering wheel icon.
- Modal transitions: fade-in scale (Framer Motion).
- Booking success: confetti dots in `#F9C80E`.

---

## 🌐 Responsive Guidelines

| Breakpoint | Adjustments |
|-------------|--------------|
| `sm` (<640px) | Stack all columns, full-width cards |
| `md` (641–1024px) | 2-column grids, horizontal scroll for fleet |
| `lg` (1025–1440px) | Standard desktop |
| `xl` (>1441px) | Max width + centered content |

---

## 🪄 Accessibility

- Color contrast ratio > 4.5:1 (yellow on dark blue tested)
- Keyboard focus visible (yellow ring)
- ARIA labels for icons & forms
- Screen-reader text for pricing and form instructions

---

## 📸 Imagery Style

- Real Athens / Piraeus backdrops
- Fleet photos: daylight, clean, minimal reflections
- Keep human element subtle (drivers smiling, urban routes)
- Overlay gradients (blue/black with 50–60% opacity) to keep text legible

---

## 🧩 Component Library

| Component | Description |
|------------|--------------|
| `<NavBar />` | Sticky top nav with logo + language toggle |
| `<HeroSection />` | Reusable hero with background + CTA |
| `<FleetCard />` | Car info component, responsive |
| `<BookingForm />` | Date pickers + Viva integration |
| `<Accordion />` | FAQ expandable section |
| `<Footer />` | Multicolumn + contact info |
| `<AdminTable />` | DataGrid for internal use |

---

## 🧭 Design Tokens in Tailwind

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#0B1B33',
      accent: '#F9C80E',
      graylight: '#ECEFF1',
      textbody: '#B0BEC5',
      warning: '#FF7043'
    },
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['Roboto Mono', 'monospace']
    }
  }
}
🏗️ Implementation Roadmap
✅ Set up Tailwind + color tokens

✅ Create layout: Header, Footer, Language switch

🚗 Build Home → Fleet → Car Detail → Booking → FAQ → Contact

✈️ Add SSR meta & translations (EN/GR)

💳 Integrate Viva Wallet in booking flow

🎨 Polish animations, SEO structure, accessibility

🧩 Final Note
Design goal: Trust + Simplicity + Conversion

Aggelos Rentals isn’t just another car rental site — it’s a premium local brand with zero-stress experience.
Dark navy gives trust. Yellow drives action.
SSR ensures Google sees every detail.

Drive Smart. Drive Aggelos.