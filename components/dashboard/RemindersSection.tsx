'use client';

import { useState } from 'react';
import { getUpcomingReminders, sendReminderEmail } from '@/lib/email';

interface RemindersSectionProps {
  bookings: any[];
  cars: any[];
  locations: any[];
}

export default function RemindersSection({ bookings, cars, locations }: RemindersSectionProps) {
  const [sending, setSending] = useState<string | null>(null);

  const reminders = getUpcomingReminders(bookings, cars);

  const handleSendReminder = async (reminder: any) => {
    setSending(reminder.id);
    
    const pickupLocation = locations.find(l => l.id === bookings.find(b => b.id === reminder.bookingId)?.pickup_location_id);
    const dropoffLocation = locations.find(l => l.id === bookings.find(b => b.id === reminder.bookingId)?.dropoff_location_id);
    
    const success = await sendReminderEmail({
      to: reminder.email,
      bookingId: reminder.bookingId,
      customerName: reminder.customer,
      carName: reminder.car,
      date: reminder.date,
      time: reminder.time,
      location: reminder.type === 'pickup' ? (pickupLocation?.name_key || 'N/A') : (dropoffLocation?.name_key || 'N/A'),
      type: reminder.type,
    });
    
    setSending(null);
    
    if (success) {
      alert('Reminder sent successfully!');
    } else {
      alert('Failed to send reminder. Check console for details.');
    }
  };

  const sendAllReminders = async () => {
    if (!confirm(`Send ${reminders.length} reminder emails?`)) return;
    
    setSending('all');
    let sent = 0;
    
    for (const reminder of reminders) {
      const booking = bookings.find(b => b.id === reminder.bookingId);
      const pickupLocation = locations.find(l => l.id === booking?.pickup_location_id);
      const dropoffLocation = locations.find(l => l.id === booking?.dropoff_location_id);
      
      const success = await sendReminderEmail({
        to: reminder.email,
        bookingId: reminder.bookingId,
        customerName: reminder.customer,
        carName: reminder.car,
        date: reminder.date,
        time: reminder.time,
        location: reminder.type === 'pickup' ? (pickupLocation?.name_key || 'N/A') : (dropoffLocation?.name_key || 'N/A'),
        type: reminder.type,
      });
      
      if (success) sent++;
    }
    
    setSending(null);
    alert(`Sent ${sent} out of ${reminders.length} reminders`);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Pending Reminders</div>
          <div className="text-3xl font-semibold text-gray-900">{reminders.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Pick-up Reminders</div>
          <div className="text-3xl font-semibold text-gray-900">
            {reminders.filter(r => r.type === 'pickup').length}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Drop-off Reminders</div>
          <div className="text-3xl font-semibold text-gray-900">
            {reminders.filter(r => r.type === 'dropoff').length}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Email Reminders</h2>
            <p className="text-sm text-gray-600 mt-0.5">Send automated reminders to customers</p>
          </div>
          {reminders.length > 0 && (
            <button
              onClick={sendAllReminders}
              disabled={sending === 'all'}
              className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {sending === 'all' ? 'Sending...' : 'Send All Reminders'}
            </button>
          )}
        </div>
      </div>

      {/* Reminders List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reminders.map((reminder) => (
              <tr key={reminder.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    reminder.type === 'pickup' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {reminder.type === 'pickup' ? 'Pick-up' : 'Drop-off'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{reminder.customer}</div>
                  <div className="text-xs text-gray-500">{reminder.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{reminder.car}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{reminder.date}</div>
                  <div className="text-xs text-gray-500">{reminder.time}</div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleSendReminder(reminder)}
                    disabled={sending === reminder.id}
                    className="px-3 py-1 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 disabled:opacity-50 transition"
                  >
                    {sending === reminder.id ? 'Sending...' : 'Send Now'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reminders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No pending reminders for tomorrow.</p>
            <p className="text-xs mt-2">Reminders are automatically queued 1 day before pickup/dropoff.</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">ℹ️ How Reminders Work</h3>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Pick-up reminders are sent 1 day before the rental starts</li>
          <li>Drop-off reminders are sent 1 day before the rental ends</li>
          <li>Only confirmed bookings receive reminders</li>
          <li>Emails are sent to the customer's registered email address</li>
        </ul>
      </div>
    </div>
  );
}

