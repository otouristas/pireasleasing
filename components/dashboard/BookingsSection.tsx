'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { downloadContract } from '@/lib/contracts';

interface BookingsSectionProps {
  bookings: any[];
  setBookings: (bookings: any[]) => void;
  cars: any[];
  locations: any[];
}

export default function BookingsSection({ bookings, setBookings, cars, locations }: BookingsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [viewingBooking, setViewingBooking] = useState<any | null>(null);

  const downloadExcel = () => {
    // Create CSV content
    const headers = ['ID', 'Car', 'Start Date', 'End Date', 'Status', 'Total', 'Deposit', 'Created'];
    const rows = filteredBookings.map(booking => {
      const car = cars.find(c => c.id === booking.car_id);
      return [
        booking.id.slice(0, 8),
        car ? `${car.make} ${car.model}` : 'No car',
        new Date(booking.start_ts).toLocaleDateString(),
        new Date(booking.end_ts).toLocaleDateString(),
        booking.status,
        (booking.total_cents / 100).toFixed(2),
        (booking.deposit_cents / 100).toFixed(2),
        new Date(booking.created_at).toLocaleDateString(),
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.viva_order_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (booking: any) => {
    setEditingId(booking.id);
    setEditForm(booking);
  };

  const handleSave = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('bookings')
        .update(editForm)
        .eq('id', editingId);

      if (error) throw error;

      setBookings(bookings.map(b => b.id === editingId ? editForm : b));
      setEditingId(null);
      alert('Booking updated successfully!');
    } catch (error: any) {
      alert('Error updating booking: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;

      setBookings(bookings.filter(b => b.id !== id));
      alert('Booking deleted successfully!');
    } catch (error: any) {
      alert('Error deleting booking: ' + error.message);
    }
  };

  const handleDownloadContract = (booking: any) => {
    const car = cars.find(c => c.id === booking.car_id);
    const pickupLocation = locations.find(l => l.id === booking.pickup_location_id);
    const dropoffLocation = locations.find(l => l.id === booking.dropoff_location_id);
    
    if (!car) {
      alert('No car assigned to this booking');
      return;
    }

    const startDate = new Date(booking.start_ts);
    const endDate = new Date(booking.end_ts);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    downloadContract({
      bookingId: booking.id,
      bookingDate: new Date(booking.created_at).toLocaleDateString(),
      customerName: booking.customer_name || 'Customer',
      customerEmail: booking.customer_email || 'N/A',
      customerPhone: booking.customer_phone || 'N/A',
      customerAddress: booking.customer_address,
      customerLicense: booking.customer_license,
      carMake: car.make,
      carModel: car.model,
      carYear: car.year,
      carLicensePlate: car.license_plate,
      pickupDate: startDate.toLocaleDateString(),
      pickupTime: startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      pickupLocation: pickupLocation?.name_key || 'N/A',
      dropoffDate: endDate.toLocaleDateString(),
      dropoffTime: endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      dropoffLocation: dropoffLocation?.name_key || 'N/A',
      totalAmount: booking.total_cents / 100,
      depositAmount: booking.deposit_cents / 100,
      balanceAmount: booking.balance_cents / 100,
      duration: duration,
    });
  };

  return (
    <div className="space-y-6">
      {/* Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewingBooking(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setViewingBooking(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Reference */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Booking Reference</div>
                <div className="text-xl font-bold font-mono text-gray-900">{viewingBooking.id.slice(0, 13).toUpperCase()}</div>
              </div>

              {/* Car Info */}
              {(() => {
                const car = cars.find(c => c.id === viewingBooking.car_id);
                return car ? (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">🚗 Vehicle</h3>
                    <p className="text-lg font-bold text-gray-900">{car.make} {car.model} ({car.year})</p>
                    <p className="text-sm text-gray-600">{car.license_plate}</p>
                  </div>
                ) : null;
              })()}

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">📅 Pick-up</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(viewingBooking.start_ts).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(viewingBooking.start_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">📅 Drop-off</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(viewingBooking.end_ts).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(viewingBooking.end_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Customer */}
              {viewingBooking.customer_name && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">👤 Customer</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-600">Name</div>
                      <div className="font-semibold">{viewingBooking.customer_name}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Email</div>
                      <div className="font-semibold">{viewingBooking.customer_email}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Phone</div>
                      <div className="font-semibold">{viewingBooking.customer_phone}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">License</div>
                      <div className="font-semibold">{viewingBooking.customer_license || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">💰 Payment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">€{(viewingBooking.total_cents / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>Deposit Paid</span>
                    <span className="font-semibold">€{(viewingBooking.deposit_cents / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-yellow-700">
                    <span>Balance Due</span>
                    <span className="font-semibold">€{(viewingBooking.balance_cents / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleDownloadContract(viewingBooking)}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  Download Contract
                </button>
                <button
                  onClick={() => {
                    setViewingBooking(null);
                    handleEdit(viewingBooking);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Bookings Management</h2>
          <button
            onClick={downloadExcel}
            className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition text-sm"
          >
            Download Excel
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by ID or Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="awaiting_payment">Awaiting Payment</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Car</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deposit</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => {
                const car = cars.find(c => c.id === booking.car_id);
                const isEditing = editingId === booking.id;

                return (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50 transition cursor-pointer" 
                    onClick={() => setViewingBooking(booking)}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-mono text-xs">{booking.id.slice(0, 8)}...</div>
                      {booking.viva_order_id && (
                        <div className="text-xs text-gray-500">Order: {booking.viva_order_id}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {isEditing ? (
                        <select
                          value={editForm.car_id || ''}
                          onChange={(e) => setEditForm({ ...editForm, car_id: e.target.value || null })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm w-full"
                        >
                          <option value="">No car assigned</option>
                          {cars.map(c => (
                            <option key={c.id} value={c.id}>{c.make} {c.model} ({c.license_plate})</option>
                          ))}
                        </select>
                      ) : (
                        <div className="font-medium text-gray-900">
                          {car ? `${car.make} ${car.model}` : 'Not assigned'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{new Date(booking.start_ts).toLocaleDateString()}</div>
                      <div className="text-xs">to {new Date(booking.end_ts).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="awaiting_payment">Awaiting Payment</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'awaiting_payment'
                            ? 'bg-yellow-100 text-yellow-700'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.status.replace('_', ' ')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      €{(booking.total_cents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      €{(booking.deposit_cents / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDownloadContract(booking)}
                        className="px-3 py-1 bg-gray-900 text-white rounded text-xs hover:bg-gray-800 transition"
                        title="Download Contract PDF"
                      >
                        Download
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(booking)}
                            className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-lg text-sm font-semibold hover:bg-[#F9C80E]/90 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No bookings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

