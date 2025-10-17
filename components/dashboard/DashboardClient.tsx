'use client';

import { useState, lazy, Suspense } from 'react';
import { User } from '@supabase/supabase-js';
import { getUpcomingReminders } from '@/lib/email';

// Lazy load heavy dashboard sections
const BookingsSection = lazy(() => import('./BookingsSection'));
const CarsSection = lazy(() => import('./CarsSection'));
const LocationsSection = lazy(() => import('./LocationsSection'));
const AddonsSection = lazy(() => import('./AddonsSection'));
const UsersSection = lazy(() => import('./UsersSection'));
const AnalyticsSection = lazy(() => import('./AnalyticsSection'));
const AvailabilitySection = lazy(() => import('./AvailabilitySection'));
const ContractsSection = lazy(() => import('./ContractsSection'));
const RemindersSection = lazy(() => import('./RemindersSection'));
const SettingsSection = lazy(() => import('./SettingsSection'));

interface DashboardClientProps {
  user: User;
  initialData: {
    bookings: any[];
    cars: any[];
    locations: any[];
    addons: any[];
    users: any[];
    settings: any[];
  };
  analytics: {
    totalRevenue: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    activeCars: number;
    totalCars: number;
  };
}

type TabType = 'analytics' | 'bookings' | 'availability' | 'cars' | 'contracts' | 'reminders' | 'addons' | 'locations' | 'users' | 'settings';

export default function DashboardClient({ user, initialData, analytics }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');
  const [bookings, setBookings] = useState(initialData.bookings);
  const [cars, setCars] = useState(initialData.cars);
  const [locations, setLocations] = useState(initialData.locations);
  const [addons, setAddons] = useState(initialData.addons);
  const [users, setUsers] = useState(initialData.users);
  const [settings, setSettings] = useState(initialData.settings);

  // Calculate quick stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayPickups = bookings.filter(b => {
    const startDate = new Date(b.start_ts);
    startDate.setHours(0, 0, 0, 0);
    return startDate.getTime() === today.getTime();
  }).length;

  const todayDropoffs = bookings.filter(b => {
    const endDate = new Date(b.end_ts);
    endDate.setHours(0, 0, 0, 0);
    return endDate.getTime() === today.getTime();
  }).length;

  const now = new Date();
  const carsOnRoad = bookings.filter(b => {
    const start = new Date(b.start_ts);
    const end = new Date(b.end_ts);
    return now >= start && now <= end && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).length;

  const availableCars = cars.filter(c => c.active).length - carsOnRoad;

  const upcomingReminders = getUpcomingReminders(bookings, cars);

  const tabs = [
    { id: 'analytics' as TabType, label: 'Analytics' },
    { id: 'bookings' as TabType, label: 'Bookings', count: bookings.length },
    { id: 'availability' as TabType, label: 'Availability' },
    { id: 'cars' as TabType, label: 'Fleet', count: cars.length },
    { id: 'contracts' as TabType, label: 'Contracts', count: bookings.filter(b => b.car_id).length },
    { id: 'reminders' as TabType, label: 'Reminders', count: upcomingReminders.length },
    { id: 'addons' as TabType, label: 'Add-ons', count: addons.length },
    { id: 'locations' as TabType, label: 'Locations', count: locations.length },
    { id: 'users' as TabType, label: 'Users', count: users.length },
    { id: 'settings' as TabType, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900">
                Aggelos Rentals Admin
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                <div className="font-medium">{user.email}</div>
              </div>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 -mb-px overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{todayPickups}</div>
              <div className="text-xs text-gray-600">Today's Pick-ups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{todayDropoffs}</div>
              <div className="text-xs text-gray-600">Today's Drop-offs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{carsOnRoad}</div>
              <div className="text-xs text-gray-600">On Road</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900">{availableCars}</div>
              <div className="text-xs text-gray-600">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>}>
          {activeTab === 'analytics' && <AnalyticsSection analytics={analytics} bookings={bookings} cars={cars} />}
          {activeTab === 'bookings' && <BookingsSection bookings={bookings} setBookings={setBookings} cars={cars} locations={locations} />}
          {activeTab === 'availability' && <AvailabilitySection cars={cars} bookings={bookings} />}
          {activeTab === 'cars' && <CarsSection cars={cars} setCars={setCars} />}
          {activeTab === 'contracts' && <ContractsSection bookings={bookings} cars={cars} locations={locations} />}
          {activeTab === 'reminders' && <RemindersSection bookings={bookings} cars={cars} locations={locations} />}
          {activeTab === 'addons' && <AddonsSection addons={addons} setAddons={setAddons} />}
          {activeTab === 'locations' && <LocationsSection locations={locations} setLocations={setLocations} />}
          {activeTab === 'users' && <UsersSection users={users} setUsers={setUsers} bookings={bookings} />}
          {activeTab === 'settings' && <SettingsSection settings={settings} setSettings={setSettings} />}
        </Suspense>
      </main>
    </div>
  );
}

