# Dashboard Setup Checklist

## Quick Start Guide

Follow these steps to set up and access the Super Admin Dashboard.

## ✅ Prerequisites

- [ ] Node.js 18+ installed
- [ ] Next.js project set up
- [ ] Supabase project created
- [ ] Database tables created (see below)

## 🔧 Environment Variables

Create or update your `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL

# Viva Wallet (for payments)
VIVA_CLIENT_ID=r411qqv55z4syf6x23fcnwdp2ug7vb283y616z0d128r5.apps.vivapayments.com
VIVA_CLIENT_SECRET=1G7GSiY0CSdF2BduL64C4Nr4H5dKJQ
VIVA_MERCHANT_ID=7e4e40e7-bc2e-402c-8d95-9d9e0ef3c420
VIVA_API_KEY=H097OtT9ad4rS7dybBGEdEo60y3HOM
```

## 📊 Database Setup

### 1. Create Tables in Supabase

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cars Table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  seats INTEGER NOT NULL DEFAULT 5,
  price_per_day TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT,
  license_plate TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  images JSONB DEFAULT '[]',
  features TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations Table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name_key TEXT NOT NULL,
  fee_cents INTEGER NOT NULL DEFAULT 0,
  offhours_multiplier NUMERIC(3,1) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  car_id UUID REFERENCES cars(id) ON DELETE SET NULL,
  start_ts TIMESTAMP WITH TIME ZONE NOT NULL,
  end_ts TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_location_id UUID REFERENCES locations(id),
  dropoff_location_id UUID REFERENCES locations(id),
  status TEXT NOT NULL DEFAULT 'awaiting_payment',
  base_price_cents INTEGER NOT NULL DEFAULT 0,
  fees_cents INTEGER NOT NULL DEFAULT 0,
  extras_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,
  deposit_cents INTEGER NOT NULL DEFAULT 0,
  balance_cents INTEGER NOT NULL DEFAULT 0,
  viva_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_cars_active ON cars(active);
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(start_ts, end_ts);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for cars and locations
CREATE POLICY "Allow public read access on cars" ON cars
  FOR SELECT USING (active = true);

CREATE POLICY "Allow public read access on locations" ON locations
  FOR SELECT USING (true);

-- Allow authenticated users to read bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to create bookings
CREATE POLICY "Allow authenticated users to create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: Super admins will need service role key for full access
-- Or create specific admin policies
```

### 3. Insert Sample Data (Optional)

```sql
-- Sample Locations
INSERT INTO locations (code, name_key, fee_cents, offhours_multiplier) VALUES
  ('ATH', 'Athens Airport', 4000, 2.0),
  ('PIR', 'Piraeus Port', 2000, 1.5),
  ('CTR', 'City Center', 1000, 1.2);

-- Sample Cars
INSERT INTO cars (make, model, year, category, transmission, fuel_type, seats, price_per_day, license_plate, slug, description, features) VALUES
  ('Toyota', 'Yaris', 2023, 'Economy', 'Manual', 'Petrol', 5, '€35/Month', 'ABC-1234', 'toyota-yaris-2023', 'Reliable and fuel-efficient economy car perfect for city driving.', 'Air Conditioning, Bluetooth, USB Port'),
  ('Volkswagen', 'Golf', 2023, 'Compact', 'Automatic', 'Diesel', 5, '€45/Month', 'XYZ-5678', 'volkswagen-golf-2023', 'Comfortable compact car with great fuel economy.', 'Air Conditioning, Bluetooth, GPS Navigation, Cruise Control'),
  ('Suzuki', 'Jimny', 2022, '4x4', 'Manual', 'Petrol', 4, '€65/Month', 'JIM-9999', 'suzuki-jimny-2022', 'Compact 4x4 perfect for island adventures.', 'Air Conditioning, 4WD, USB Port, AUX Input');
```

## 👤 User Setup

### Create Super Admin Users in Supabase

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Create users with emails:
   - `admin@angelosrentals.com`
   - `kasio@angelosrentals.com`
4. Set passwords for these accounts
5. Confirm the email addresses

### Alternative: Update Authorized Emails

Edit `lib/auth.ts` to change authorized admin emails:

```typescript
export const SUPER_ADMIN_EMAILS = [
  'your-email@example.com',
  'another-admin@example.com',
];
```

## 🚀 Starting the Dashboard

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Dashboard**
   - Open browser to `http://localhost:3000/dashboard`
   - You'll be redirected to login if not authenticated
   - Login with one of the super admin accounts
   - You'll be redirected back to the dashboard

## 🧪 Testing

### Test Dashboard Access

1. **Unauthorized Access Test**
   - Try accessing `/dashboard` without logging in
   - ✅ Should redirect to `/login`

2. **Authorized Access Test**
   - Login with super admin email
   - Navigate to `/dashboard`
   - ✅ Should see dashboard with all tabs

3. **Non-Admin Access Test**
   - Create a regular user (not in admin list)
   - Login with that account
   - Try accessing `/dashboard`
   - ✅ Should redirect to `/login`

### Test CRUD Operations

**Cars Management:**
- [ ] Add a new car
- [ ] Edit an existing car
- [ ] Delete a car
- [ ] Filter cars by category
- [ ] Search for cars

**Bookings Management:**
- [ ] View all bookings
- [ ] Edit booking status
- [ ] Assign car to booking
- [ ] Filter bookings by status
- [ ] Delete a booking

**Locations Management:**
- [ ] Add a new location
- [ ] Edit location fees
- [ ] Delete a location

## 🎨 Customization

### Change Admin Emails
Edit `lib/auth.ts`:
```typescript
export const SUPER_ADMIN_EMAILS = [
  'new-admin@example.com',
];
```

### Modify Dashboard Colors
The dashboard uses these color variables:
- Primary: `#F9C80E` (Yellow)
- Secondary: `#0B1B33` (Dark Blue)
- Background: `from-gray-50 to-gray-100`

Update in component files or add to `globals.css`.

### Add More Sections
1. Create new component in `components/dashboard/`
2. Add tab to `DashboardClient.tsx`
3. Import and render in the main content area

## 📱 Production Deployment

### Before Deploying

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Set up Supabase production project
- [ ] Update all environment variables
- [ ] Test all CRUD operations in production
- [ ] Set up proper RLS policies for admins
- [ ] Enable Supabase Auth email confirmation
- [ ] Set up proper error logging

### Netlify Deployment

Your project already has `netlify.toml` configured. Simply:

1. Push code to Git repository
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

## 🔒 Security Checklist

- [ ] All environment variables are set
- [ ] Super admin emails are correct
- [ ] Supabase RLS policies are enabled
- [ ] Auth email confirmation is enabled (production)
- [ ] Regular backups are scheduled
- [ ] API keys are not exposed in client-side code
- [ ] HTTPS is enabled in production

## 📞 Support

If you encounter issues:

1. **Check Console Logs**
   - Browser DevTools → Console
   - Look for error messages

2. **Verify Supabase Connection**
   - Check environment variables
   - Test connection in Supabase dashboard

3. **Database Issues**
   - Verify tables exist
   - Check RLS policies
   - Review SQL logs in Supabase

4. **Authentication Issues**
   - Verify user emails match admin list
   - Check Supabase Auth settings
   - Clear browser cookies and try again

## ✨ You're All Set!

Your Super Admin Dashboard is now ready to use. Access it at `/dashboard` and start managing your rental business!

For detailed usage instructions, see `DASHBOARD_GUIDE.md`.

