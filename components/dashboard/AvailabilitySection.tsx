'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AvailabilitySectionProps {
  cars: any[];
  bookings: any[];
}

export default function AvailabilitySection({ cars, bookings }: AvailabilitySectionProps) {
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'block' | 'book' | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    totalAmount: '',
    depositAmount: '',
    notes: '',
  });

  useEffect(() => {
    if (selectedCar) {
      fetchBlockedDates();
    }
  }, [selectedCar]);

  const fetchBlockedDates = async () => {
    if (!selectedCar) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('blocked_dates')
        .select('*')
        .eq('car_id', selectedCar);

      if (error) throw error;
      setBlockedDates(data || []);
    } catch (error) {
      console.error('Error fetching blocked dates:', error);
    }
  };

  const handleDateClick = (date: Date) => {
    if (!selectedCar || loading) return;

    const isBooked = isDateBooked(date, selectedCar);
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

    if (isBooked || isPast) return;

    if (!selectionMode) {
      // First click - start selection
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      // Second click - end selection
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    } else {
      // Reset and start new selection
      setStartDate(date);
      setEndDate(null);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate) return false;
    if (!endDate) return date.toDateString() === startDate.toDateString();
    return date >= startDate && date <= endDate;
  };

  const cancelSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectionMode(null);
  };

  const confirmBlockDates = async () => {
    if (!selectedCar || !startDate || !endDate) return;

    setLoading(true);
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const datesToBlock = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        datesToBlock.push({
          car_id: selectedCar,
          blocked_date: currentDate.toISOString().split('T')[0],
          reason: 'Manually blocked from dashboard'
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const { data, error } = await supabase
        .from('blocked_dates')
        .insert(datesToBlock)
        .select();

      if (error) throw error;

      setBlockedDates([...blockedDates, ...(data || [])]);
      alert(`${datesToBlock.length} date(s) blocked successfully`);
      cancelSelection();
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmCreateBooking = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }
    setShowBookingModal(true);
  };

  const createBooking = async () => {
    if (!selectedCar || !startDate || !endDate) return;

    if (!bookingForm.customerName || !bookingForm.customerEmail || !bookingForm.customerPhone) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Get current user (admin)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const totalCents = Math.round(parseFloat(bookingForm.totalAmount || '0') * 100);
      const depositCents = Math.round(parseFloat(bookingForm.depositAmount || '0') * 100);

      const bookingData = {
        user_id: user.id,
        car_id: selectedCar,
        start_ts: startDate.toISOString(),
        end_ts: endDate.toISOString(),
        status: 'confirmed',
        total_cents: totalCents,
        deposit_cents: depositCents,
        balance_cents: totalCents - depositCents,
        base_price_cents: totalCents,
        fees_cents: 0,
        extras_cents: 0,
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      alert('Booking created successfully!');
      setShowBookingModal(false);
      setBookingForm({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        totalAmount: '',
        depositAmount: '',
        notes: '',
      });
      cancelSelection();
      
      // Refresh page to show new booking
      window.location.reload();
    } catch (error: any) {
      alert('Error creating booking: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get bookings for a specific car
  const getCarBookings = (carId: string) => {
    return bookings.filter(b => b.car_id === carId);
  };

  // Get all dates in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before month starts
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Check if date is booked for a car
  const isDateBooked = (date: Date, carId: string) => {
    const carBookings = getCarBookings(carId);
    return carBookings.some(booking => {
      const start = new Date(booking.start_ts);
      const end = new Date(booking.end_ts);
      return date >= start && date <= end;
    });
  };

  // Check if date is blocked
  const isDateBlocked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.some(bd => {
      const blockedDate = new Date(bd.blocked_date).toISOString().split('T')[0];
      return blockedDate === dateStr;
    });
  };

  // Get booking details for a date
  const getBookingForDate = (date: Date, carId: string) => {
    const carBookings = getCarBookings(carId);
    return carBookings.find(booking => {
      const start = new Date(booking.start_ts);
      const end = new Date(booking.end_ts);
      return date >= start && date <= end;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Calculate stats
  const activeCars = cars.filter(c => c.active).length;
  const totalBookings = bookings.length;
  const currentBookings = bookings.filter(b => {
    const start = new Date(b.start_ts);
    const end = new Date(b.end_ts);
    const now = new Date();
    return now >= start && now <= end;
  }).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Active Cars</div>
          <div className="text-3xl font-semibold text-gray-900">{activeCars}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Bookings</div>
          <div className="text-3xl font-semibold text-gray-900">{totalBookings}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Currently Rented</div>
          <div className="text-3xl font-semibold text-gray-900">{currentBookings}</div>
        </div>
      </div>

      {/* Car Selector & Mode Selection */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Car</label>
            <select
              value={selectedCar || ''}
              onChange={(e) => {
                setSelectedCar(e.target.value || null);
                cancelSelection();
              }}
              className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="">-- Select a car to view availability --</option>
              {cars.filter(c => c.active).map(car => (
                <option key={car.id} value={car.id}>
                  {car.make} {car.model} ({car.license_plate})
                </option>
              ))}
            </select>
          </div>

          {selectedCar && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectionMode('block');
                    cancelSelection();
                  }}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    selectionMode === 'block'
                      ? 'bg-red-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Block Dates
                </button>
                <button
                  onClick={() => {
                    setSelectionMode('book');
                    cancelSelection();
                  }}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    selectionMode === 'book'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Create Booking
                </button>
                {selectionMode && (
                  <button
                    onClick={cancelSelection}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
              {selectionMode && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectionMode === 'block' 
                    ? 'Click start date, then end date to block a range'
                    : 'Click start date, then end date to create a booking'}
                </p>
              )}
            </div>
          )}

          {startDate && endDate && selectionMode && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <span className="text-sm font-medium text-blue-900">
                Selected: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()} 
                ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1} days)
              </span>
              <button
                onClick={selectionMode === 'block' ? confirmBlockDates : confirmCreateBooking}
                disabled={loading}
                className={`ml-auto px-4 py-2 rounded-md text-white font-medium ${
                  selectionMode === 'block' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {loading ? 'Processing...' : selectionMode === 'block' ? 'Confirm Block' : 'Create Booking'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Calendar */}
      {selectedCar && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">
                {cars.find(c => c.id === selectedCar)?.make} {cars.find(c => c.id === selectedCar)?.model} - Availability
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={prevMonth}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  Previous
                </button>
                <span className="text-sm font-medium text-gray-900">{monthName}</span>
                <button
                  onClick={nextMonth}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Legend */}
            <div className="flex gap-4 mb-4 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-900 rounded"></div>
                <span className="text-gray-600">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span className="text-gray-600">Pending Payment</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Click on available dates to block/unblock them
            </p>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square"></div>;
                }

                const isBooked = isDateBooked(day, selectedCar);
                const isBlocked = isDateBlocked(day);
                const booking = getBookingForDate(day, selectedCar);
                const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
                const isToday = day.toDateString() === new Date().toDateString();
                const isClickable = !isBooked && !isPast;

                const inRange = isDateInRange(day);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => selectionMode && isClickable ? handleDateClick(day) : null}
                    disabled={loading || !isClickable || !selectionMode}
                    className={`aspect-square border rounded-md p-2 text-sm transition ${
                      isBooked && booking?.status === 'confirmed'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : isBooked && booking?.status === 'awaiting_payment'
                        ? 'bg-yellow-100 border-yellow-300 text-gray-900'
                        : isBlocked
                        ? 'bg-red-500 text-white border-red-500'
                        : isPast
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        : inRange && selectionMode === 'block'
                        ? 'bg-red-400 text-white border-red-600 ring-2 ring-red-300'
                        : inRange && selectionMode === 'book'
                        ? 'bg-blue-400 text-white border-blue-600 ring-2 ring-blue-300'
                        : isToday
                        ? 'border-gray-900 border-2 bg-green-500 text-white cursor-pointer hover:bg-green-600'
                        : selectionMode
                        ? 'bg-green-500 text-white border-green-500 cursor-pointer hover:bg-green-600'
                        : 'bg-green-500 text-white border-green-500'
                    }`}
                    title={
                      isBooked 
                        ? `Booked - ${booking?.status}` 
                        : isBlocked 
                        ? 'Blocked' 
                        : isPast 
                        ? 'Past date' 
                        : selectionMode 
                        ? 'Click to select' 
                        : 'Available'
                    }
                  >
                    <div className="font-medium">{day.getDate()}</div>
                    {isBooked && (
                      <div className="text-[10px] mt-1 truncate">
                        {booking?.status === 'confirmed' ? 'Booked' : 'Pending'}
                      </div>
                    )}
                    {isBlocked && !isBooked && (
                      <div className="text-[10px] mt-1 truncate">
                        Blocked
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Booking Creation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Booking</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Car:</strong> {cars.find(c => c.id === selectedCar)?.make} {cars.find(c => c.id === selectedCar)?.model}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Dates:</strong> {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Duration:</strong> {startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0} days
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    value={bookingForm.customerName}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email *</label>
                  <input
                    type="email"
                    value={bookingForm.customerEmail}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Phone *</label>
                  <input
                    type="tel"
                    value={bookingForm.customerPhone}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="+30 123 456 7890"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={bookingForm.totalAmount}
                      onChange={(e) => setBookingForm({ ...bookingForm, totalAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="350.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={bookingForm.depositAmount}
                      onChange={(e) => setBookingForm({ ...bookingForm, depositAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      placeholder="100.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={createBooking}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Booking'}
                </button>
                <button
                  onClick={() => setShowBookingModal(false)}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {selectedCar && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Upcoming Bookings</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {getCarBookings(selectedCar)
              .filter(b => new Date(b.end_ts) >= new Date())
              .sort((a, b) => new Date(a.start_ts).getTime() - new Date(b.start_ts).getTime())
              .slice(0, 10)
              .map(booking => (
                <div key={booking.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(booking.start_ts).toLocaleDateString()} - {new Date(booking.end_ts).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.ceil((new Date(booking.end_ts).getTime() - new Date(booking.start_ts).getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">€{(booking.total_cents / 100).toFixed(2)}</div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        booking.status === 'confirmed'
                          ? 'bg-gray-900 text-white'
                          : booking.status === 'awaiting_payment'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {getCarBookings(selectedCar).filter(b => new Date(b.end_ts) >= new Date()).length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No upcoming bookings for this car
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

