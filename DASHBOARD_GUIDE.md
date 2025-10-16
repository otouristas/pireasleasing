# Super Admin Dashboard Guide

## Overview
The Super Admin Dashboard is a comprehensive management interface for Aggelos Rentals, accessible only to authorized administrators.

## Access

**URL:** `/dashboard`

**Authorized Emails:**
- `admin@angelosrentals.com`
- `kasio@angelosrentals.com`

⚠️ **Note:** Only these two email addresses can access the dashboard. All other users will be redirected to the login page.

## Features

### 1. Analytics Dashboard 📊
- **Key Metrics:**
  - Total Revenue (all time)
  - Total Bookings with status breakdown
  - Active Cars ratio
  - Average Booking Value
  
- **Visualizations:**
  - Recent Bookings list
  - Booking Status breakdown with progress bars
  - Revenue by Month charts

### 2. Bookings Management 📅
- **View all bookings** with advanced filtering:
  - Search by Booking ID or Order ID
  - Filter by status (awaiting_payment, confirmed, completed, cancelled)
  
- **Edit bookings:**
  - Assign/reassign cars
  - Update booking status
  - View pricing details (total, deposit, balance)
  
- **Delete bookings** (with confirmation)

### 3. Fleet Management 🚗
- **View all vehicles** with:
  - Search by make, model, or license plate
  - Filter by category
  - Visual cards with images
  
- **Add new vehicles:**
  - Complete form with all car details
  - Auto-generate slugs
  - Upload images (JSON array format)
  - Set features and pricing
  
- **Edit vehicles:**
  - Update any field
  - Toggle active/inactive status
  - Modify images and features
  
- **Delete vehicles** (with confirmation)

### 4. Locations Management 📍
- **View all pickup/dropoff locations**
- **Add new locations:**
  - Location code (e.g., ATH, PIR)
  - Display name
  - Delivery fee
  - Off-hours multiplier
  
- **Edit locations:**
  - Update fees and multipliers
  - Modify location details
  
- **Delete locations** (with confirmation)

## Usage Guide

### Accessing the Dashboard
1. Navigate to `/dashboard`
2. If not logged in, you'll be redirected to `/login`
3. Sign in with one of the authorized admin emails
4. You'll be redirected to the dashboard

### Managing Bookings
1. Click the **"Bookings"** tab
2. Use the search bar to find specific bookings
3. Filter by status using the dropdown
4. Click **"Edit"** on any booking to:
   - Change the assigned car
   - Update the booking status
5. Click **"Save"** to apply changes or **"Cancel"** to discard
6. Click **"Delete"** to remove a booking (requires confirmation)

### Managing Fleet
1. Click the **"Fleet"** tab
2. Click **"+ Add New Car"** to add a vehicle
3. Fill in all required fields:
   - Make, Model, Year
   - License Plate (required)
   - Category (e.g., Economy, SUV)
   - Transmission (Manual/Automatic)
   - Fuel Type
   - Number of Seats
   - Price per Day (format: €30/Month)
   - Status (available/rented/maintenance)
   - Description
   - Features (comma-separated)
   - Images (JSON array: `["/fleet/car1.jpg", "/fleet/car2.jpg"]`)
4. Toggle **"Active"** checkbox to show/hide from public
5. Click **"Save Car"** to create
6. Use **"Edit"** on any car card to modify
7. Use **"Delete"** to remove (requires confirmation)

### Managing Locations
1. Click the **"Locations"** tab
2. Click **"+ Add New Location"** to create
3. Fill in:
   - **Code:** Short identifier (e.g., ATH)
   - **Name:** Full name (e.g., Athens Airport)
   - **Delivery Fee:** In euros (converted to cents automatically)
   - **Off-hours Multiplier:** Multiply fee for off-hours pickups
4. Click **"Save Location"**
5. Use **"Edit"** to modify existing locations
6. Use **"Delete"** to remove (requires confirmation)

## Image Management

### For Car Images
Images should be provided as a JSON array of paths:
```json
["/fleet/citroen-c3.jpg", "/fleet/citroen-c3-2.jpg"]
```

Or as comma-separated URLs:
```
/fleet/car1.jpg, /fleet/car2.jpg
```

**Supported formats:**
- Local paths: `/fleet/image.jpg`
- External URLs: `https://example.com/image.jpg`

## Database Schema

### Bookings Table
- `id`: UUID (auto-generated)
- `user_id`: UUID (references auth.users)
- `car_id`: UUID (references cars) - nullable
- `start_ts`: Timestamp
- `end_ts`: Timestamp
- `pickup_location_id`: UUID (references locations)
- `dropoff_location_id`: UUID (references locations)
- `status`: Text (awaiting_payment, confirmed, completed, cancelled)
- `base_price_cents`: Integer
- `fees_cents`: Integer
- `extras_cents`: Integer
- `total_cents`: Integer
- `deposit_cents`: Integer
- `balance_cents`: Integer
- `viva_order_id`: Text - nullable

### Cars Table
- `id`: UUID (auto-generated)
- `make`: Text
- `model`: Text
- `year`: Integer
- `category`: Text
- `transmission`: Text
- `fuel_type`: Text
- `seats`: Integer
- `price_per_day`: Text
- `status`: Text (available, rented, maintenance)
- `description`: Text
- `license_plate`: Text
- `slug`: Text (unique)
- `images`: JSON Array
- `features`: Text (comma-separated)
- `active`: Boolean

### Locations Table
- `id`: UUID (auto-generated)
- `code`: Text (unique)
- `name_key`: Text
- `fee_cents`: Integer
- `offhours_multiplier`: Numeric

## Security

### Authentication
- Server-side authentication check on every dashboard page load
- Only super admin emails can access
- Automatic redirect to login if unauthorized

### Authorization
- Email-based authorization in `lib/auth.ts`
- List of authorized emails is hardcoded (not in database)
- To add more admins, update `SUPER_ADMIN_EMAILS` in `lib/auth.ts`

## Troubleshooting

### Can't Access Dashboard
- **Issue:** Redirected to login
- **Solution:** Ensure you're logged in with an authorized email

### Changes Not Saving
- **Issue:** Error message when saving
- **Solution:** Check browser console for detailed error. Verify Supabase connection

### Images Not Loading
- **Issue:** Car images show broken links
- **Solution:** 
  - Verify image paths are correct
  - Ensure images exist in `/public/fleet/` directory
  - For external URLs, check `next.config.ts` remote patterns

### "Invalid URL" Error
- **Issue:** Error when viewing car details
- **Solution:** 
  - Check car images field format in database
  - Should be valid JSON array or null
  - Use dashboard to edit and fix image URLs

## Technical Details

### Architecture
- **Frontend:** Next.js 15.5.5 with App Router
- **Backend:** Supabase (PostgreSQL + Auth)
- **Styling:** Tailwind CSS 4.0
- **State Management:** React useState (client-side)
- **Data Fetching:** Server Components + Client Components

### File Structure
```
app/
  dashboard/
    page.tsx              # Main dashboard page (server component)
  auth/
    signout/
      route.ts            # Sign out API route

components/
  dashboard/
    DashboardClient.tsx   # Main dashboard wrapper (client)
    AnalyticsSection.tsx  # Analytics view
    BookingsSection.tsx   # Bookings CRUD
    CarsSection.tsx       # Fleet CRUD
    LocationsSection.tsx  # Locations CRUD

lib/
  auth.ts                 # Super admin authorization logic
```

### API Calls
All CRUD operations use direct Supabase client calls from the browser:
- `createClient()` from `@supabase/supabase-js`
- Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Server-side authentication ensures only admins can perform operations

## Future Enhancements

Potential features to add:
- [ ] Export bookings to CSV
- [ ] Advanced analytics charts (Chart.js/Recharts)
- [ ] User management section
- [ ] Email notifications management
- [ ] Bulk operations (multi-select)
- [ ] Image upload directly from dashboard
- [ ] Booking calendar view
- [ ] Revenue forecasting
- [ ] Customer database with history

## Support

For issues or questions:
1. Check browser console for detailed errors
2. Verify Supabase connection and credentials
3. Ensure database tables exist and have proper structure
4. Contact system administrator

