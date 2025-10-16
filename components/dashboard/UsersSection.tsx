'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface UsersSectionProps {
  users: any[];
  setUsers: (users: any[]) => void;
  bookings: any[];
}

export default function UsersSection({ users, setUsers, bookings }: UsersSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const filteredUsers = users.filter((user) => {
    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
    return (
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getUserBookings = (userId: string) => {
    return bookings.filter(b => b.user_id === userId);
  };

  const getUserStats = (userId: string) => {
    const userBookings = getUserBookings(userId);
    const totalSpent = userBookings.reduce((sum, b) => sum + (b.total_cents || 0), 0);
    const confirmedCount = userBookings.filter(b => b.status === 'confirmed' || b.status === 'completed').length;
    
    return {
      totalBookings: userBookings.length,
      confirmedBookings: confirmedCount,
      totalSpent,
      avgBookingValue: userBookings.length > 0 ? totalSpent / userBookings.length : 0,
    };
  };

  // Aggregate stats
  const totalUsers = users.length;
  const usersWithBookings = users.filter(u => getUserBookings(u.id).length > 0).length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_cents || 0), 0);
  const avgRevenuePerUser = totalUsers > 0 ? totalRevenue / totalUsers : 0;

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Users</div>
          <div className="text-3xl font-semibold text-gray-900">{totalUsers}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Active Customers</div>
          <div className="text-3xl font-semibold text-gray-900">{usersWithBookings}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Revenue</div>
          <div className="text-3xl font-semibold text-gray-900">€{(totalRevenue / 100).toFixed(0)}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Avg. per User</div>
          <div className="text-3xl font-semibold text-gray-900">€{(avgRevenuePerUser / 100).toFixed(0)}</div>
        </div>
      </div>

      {/* Header & Search */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Users & Customers</h2>
            <p className="text-sm text-gray-600 mt-0.5">View user profiles and booking history</p>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 w-full md:w-64"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const stats = getUserStats(user.id);
          const userBookings = getUserBookings(user.id);
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || 'N/A';

          return (
            <div 
              key={user.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
            >
              <div className="p-6">
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9C80E] to-yellow-500 flex items-center justify-center text-white font-bold text-xl">
                      {(user.email?.[0] || 'U').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B1B33]">{fullName}</h3>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                    </div>
                  </div>
                  {stats.totalBookings > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-[#0B1B33]">{stats.totalBookings}</div>
                    <div className="text-xs text-gray-600">Bookings</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-[#0B1B33]">€{(stats.totalSpent / 100).toFixed(0)}</div>
                    <div className="text-xs text-gray-600">Total Spent</div>
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-semibold">{new Date(user.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sign In:</span>
                    <span className="font-semibold">
                      {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-semibold ${
                      user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {user.email_confirmed_at ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>
                </div>

                {/* Expandable Bookings */}
                {selectedUser?.id === user.id && userBookings.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-sm text-[#0B1B33] mb-2">Recent Bookings</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {userBookings.slice(0, 5).map(booking => (
                        <div key={booking.id} className="text-xs bg-gray-50 rounded p-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">€{(booking.total_cents / 100).toFixed(2)}</span>
                            <span className={`px-2 py-0.5 rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                              booking.status === 'awaiting_payment' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-gray-500 mt-1">
                            {new Date(booking.start_ts).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View More Button */}
                {userBookings.length > 0 && (
                  <button
                    className="w-full mt-3 py-2 text-xs font-semibold text-[#F9C80E] hover:text-[#0B1B33] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(selectedUser?.id === user.id ? null : user);
                    }}
                  >
                    {selectedUser?.id === user.id ? 'Hide Details ▲' : 'View Details ▼'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-600">No users match your search criteria</p>
        </div>
      )}
    </div>
  );
}

