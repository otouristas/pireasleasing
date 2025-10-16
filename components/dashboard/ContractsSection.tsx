'use client';

import { useState } from 'react';
import { downloadContract } from '@/lib/contracts';

interface ContractsSectionProps {
  bookings: any[];
  cars: any[];
  locations: any[];
}

export default function ContractsSection({ bookings, cars, locations }: ContractsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.viva_order_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const contractsGenerated = bookings.filter(b => b.car_id).length;
  const confirmedContracts = bookings.filter(b => b.status === 'confirmed' && b.car_id).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Contracts</div>
          <div className="text-3xl font-semibold text-gray-900">{contractsGenerated}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Confirmed</div>
          <div className="text-3xl font-semibold text-gray-900">{confirmedContracts}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Pending</div>
          <div className="text-3xl font-semibold text-gray-900">{contractsGenerated - confirmedContracts}</div>
        </div>
      </div>

      {/* Header & Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Contracts Management</h2>
            <p className="text-sm text-gray-600 mt-0.5">Generate and download rental agreements</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="awaiting_payment">Awaiting Payment</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => {
              const car = cars.find(c => c.id === booking.car_id);
              if (!car) return null; // Skip bookings without car

              return (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-gray-900">{booking.id.slice(0, 8)}...</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.customer_name || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{booking.customer_email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{car.make} {car.model}</div>
                    <div className="text-xs text-gray-500">{car.license_plate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.start_ts).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      to {new Date(booking.end_ts).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'awaiting_payment'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDownloadContract(booking)}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredBookings.filter(b => b.car_id).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No contracts available. Contracts are generated for confirmed bookings with assigned cars.
          </div>
        )}
      </div>
    </div>
  );
}

