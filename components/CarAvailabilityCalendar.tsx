'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface CarAvailabilityCalendarProps {
  carId: string;
  locale: string;
}

export default function CarAvailabilityCalendar({ carId, locale }: CarAvailabilityCalendarProps) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [carId]);

  const fetchData = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const [bookingsResult, blockedResult] = await Promise.all([
        supabase
          .from('bookings')
          .select('*')
          .eq('car_id', carId)
          .in('status', ['confirmed', 'awaiting_payment']),
        supabase
          .from('blocked_dates')
          .select('*')
          .eq('car_id', carId)
      ]);

      if (bookingsResult.error) throw bookingsResult.error;
      if (blockedResult.error) throw blockedResult.error;

      setBookings(bookingsResult.data || []);
      setBlockedDates(blockedResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateBooked = (date: Date) => {
    return bookings.some(booking => {
      const start = new Date(booking.start_ts);
      const end = new Date(booking.end_ts);
      return date >= start && date <= end;
    });
  };

  const isDateBlocked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.some(bd => {
      const blockedDate = new Date(bd.blocked_date).toISOString().split('T')[0];
      return blockedDate === dateStr;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString(locale === 'el' ? 'el-GR' : 'en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-center text-gray-500">
          {locale === 'el' ? 'Φόρτωση...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {locale === 'el' ? 'Διαθεσιμότητα' : 'Availability'}
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-white text-sm font-medium"
            >
              ←
            </button>
            <span className="text-sm font-medium text-gray-900 min-w-[150px] text-center">
              {monthName}
            </span>
            <button
              onClick={nextMonth}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-white text-sm font-medium"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-6">
        {/* Legend */}
        <div className="flex gap-4 mb-4 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">
              {locale === 'el' ? 'Διαθέσιμο' : 'Available'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-600">
              {locale === 'el' ? 'Μπλοκαρισμένο' : 'Blocked'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-900 rounded"></div>
            <span className="text-gray-600">
              {locale === 'el' ? 'Κλεισμένο' : 'Booked'}
            </span>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {(locale === 'el' 
            ? ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
          ).map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} className="aspect-square"></div>;
            }

            const isBooked = isDateBooked(day);
            const isBlocked = isDateBlocked(day);
            const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={day.toISOString()}
                className={`aspect-square border rounded flex items-center justify-center text-sm font-medium ${
                  isBooked
                    ? 'bg-gray-900 text-white border-gray-900'
                    : isBlocked
                    ? 'bg-red-500 text-white border-red-500'
                    : isPast
                    ? 'bg-gray-50 text-gray-400 border-gray-200'
                    : isToday
                    ? 'border-green-600 border-2 bg-green-500 text-white'
                    : 'bg-green-500 text-white border-green-500'
                }`}
                title={
                  isBooked 
                    ? (locale === 'el' ? 'Κλεισμένο' : 'Booked')
                    : isBlocked
                    ? (locale === 'el' ? 'Μπλοκαρισμένο' : 'Blocked')
                    : (locale === 'el' ? 'Διαθέσιμο' : 'Available')
                }
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <p className="text-xs text-gray-600">
          {locale === 'el' 
            ? 'Πράσινες ημερομηνίες: Διαθέσιμες | Κόκκινες: Μπλοκαρισμένες | Μαύρες: Κλεισμένες'
            : 'Green dates: Available | Red: Blocked | Black: Booked'}
        </p>
      </div>
    </div>
  );
}

