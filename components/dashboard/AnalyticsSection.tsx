'use client';

interface AnalyticsSectionProps {
  analytics: {
    totalRevenue: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    activeCars: number;
    totalCars: number;
  };
  bookings: any[];
  cars: any[];
}

export default function AnalyticsSection({ analytics, bookings, cars }: AnalyticsSectionProps) {
  // Today's date helpers
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // Today's pickups - bookings starting today
  const todayPickups = bookings.filter(b => {
    const startDate = new Date(b.start_ts);
    startDate.setHours(0, 0, 0, 0);
    return startDate.getTime() === today.getTime() && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).sort((a, b) => new Date(a.start_ts).getTime() - new Date(b.start_ts).getTime());

  // Today's dropoffs - bookings ending today
  const todayDropoffs = bookings.filter(b => {
    const endDate = new Date(b.end_ts);
    endDate.setHours(0, 0, 0, 0);
    return endDate.getTime() === today.getTime() && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).sort((a, b) => new Date(a.end_ts).getTime() - new Date(b.end_ts).getTime());

  // Tomorrow's pickups
  const tomorrowPickups = bookings.filter(b => {
    const startDate = new Date(b.start_ts);
    startDate.setHours(0, 0, 0, 0);
    return startDate.getTime() === tomorrow.getTime() && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).sort((a, b) => new Date(a.start_ts).getTime() - new Date(b.start_ts).getTime());

  // Tomorrow's dropoffs
  const tomorrowDropoffs = bookings.filter(b => {
    const endDate = new Date(b.end_ts);
    endDate.setHours(0, 0, 0, 0);
    return endDate.getTime() === tomorrow.getTime() && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).sort((a, b) => new Date(a.end_ts).getTime() - new Date(b.end_ts).getTime());

  // Cars on road - currently rented
  const now = new Date();
  const carsOnRoad = bookings.filter(b => {
    const start = new Date(b.start_ts);
    const end = new Date(b.end_ts);
    return now >= start && now <= end && (b.status === 'confirmed' || b.status === 'awaiting_payment');
  }).sort((a, b) => new Date(a.end_ts).getTime() - new Date(b.end_ts).getTime());

  // Calculate revenue by month
  const revenueByMonth: { [key: string]: number } = {};
  bookings.forEach((booking) => {
    if (booking.created_at) {
      const month = new Date(booking.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      revenueByMonth[month] = (revenueByMonth[month] || 0) + (booking.total_cents || 0);
    }
  });

  // Get top performing cars
  const carBookings: { [key: string]: number } = {};
  const carRevenue: { [key: string]: number } = {};
  bookings.forEach((booking) => {
    if (booking.car_id) {
      carBookings[booking.car_id] = (carBookings[booking.car_id] || 0) + 1;
      carRevenue[booking.car_id] = (carRevenue[booking.car_id] || 0) + (booking.total_cents || 0);
    }
  });

  const topCars = Object.entries(carBookings)
    .map(([carId, count]) => ({
      carId,
      count,
      revenue: carRevenue[carId] || 0,
      car: cars.find(c => c.id === carId)
    }))
    .filter(item => item.car)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Calculate monthly trends
  const monthlyData = Object.entries(revenueByMonth)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-6);

  const maxRevenue = Math.max(...monthlyData.map(([, rev]) => rev), 1);

  return (
    <div className="space-y-6">
      {/* TODAY'S OPERATIONS - Critical for daily use */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Operations</h2>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Pickups */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Today's Pick-ups ({todayPickups.length})</h3>
              <span className="text-xs text-gray-500">{today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="space-y-2">
              {todayPickups.slice(0, 5).map(booking => {
                const car = cars.find(c => c.id === booking.car_id);
                const time = new Date(booking.start_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{time}</div>
                      <div className="text-xs text-gray-600">{car ? `${car.make} ${car.model}` : 'No car assigned'}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </div>
                    </div>
                  </div>
                );
              })}
              {todayPickups.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">No pickups today</div>
              )}
            </div>
          </div>

          {/* Today's Dropoffs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Today's Drop-offs ({todayDropoffs.length})</h3>
              <span className="text-xs text-gray-500">{today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="space-y-2">
              {todayDropoffs.slice(0, 5).map(booking => {
                const car = cars.find(c => c.id === booking.car_id);
                const time = new Date(booking.end_ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{time}</div>
                      <div className="text-xs text-gray-600">{car ? `${car.make} ${car.model}` : 'No car assigned'}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </div>
                    </div>
                  </div>
                );
              })}
              {todayDropoffs.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">No dropoffs today</div>
              )}
            </div>
          </div>
        </div>

        {/* Tomorrow Preview */}
        {(tomorrowPickups.length > 0 || tomorrowDropoffs.length > 0) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Tomorrow ({tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })})
            </h3>
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Pick-ups: {tomorrowPickups.length}</span>
              <span>Drop-offs: {tomorrowDropoffs.length}</span>
            </div>
          </div>
        )}
      </div>

      {/* CARS ON ROAD - Currently rented */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cars on Road ({carsOnRoad.length})</h2>
        <div className="space-y-2">
          {carsOnRoad.slice(0, 10).map(booking => {
            const car = cars.find(c => c.id === booking.car_id);
            const dueDate = new Date(booking.end_ts);
            const daysLeft = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">
                    {car ? `${car.make} ${car.model}` : 'Unknown car'}
                    <span className="text-gray-500 ml-2 text-xs">({car?.license_plate})</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Due back: {dueDate.toLocaleDateString()} at {dueDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${daysLeft <= 0 ? 'text-red-600' : daysLeft <= 2 ? 'text-yellow-600' : 'text-gray-900'}`}>
                    {daysLeft <= 0 ? 'OVERDUE' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
                  </div>
                  <div className="text-xs text-gray-500">
                    €{(booking.total_cents / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
          {carsOnRoad.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">No cars currently on road</div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Revenue</div>
          <div className="text-3xl font-semibold text-gray-900">
            €{(analytics.totalRevenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Bookings</div>
          <div className="text-3xl font-semibold text-gray-900">{analytics.totalBookings}</div>
          <div className="flex gap-3 mt-1 text-xs text-gray-500">
            <span>{analytics.pendingBookings} pending</span>
            <span>{analytics.confirmedBookings} confirmed</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Fleet Status</div>
          <div className="text-3xl font-semibold text-gray-900">
            {analytics.activeCars}/{analytics.totalCars}
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-gray-900 rounded-full h-1.5"
                style={{ width: `${(analytics.activeCars / analytics.totalCars) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round((analytics.activeCars / analytics.totalCars) * 100)}% active</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Avg Booking Value</div>
          <div className="text-3xl font-semibold text-gray-900">
            €{analytics.totalBookings > 0 
              ? (analytics.totalRevenue / analytics.totalBookings / 100).toFixed(2)
              : '0.00'
            }
          </div>
          <p className="text-xs text-gray-500 mt-1">Per booking</p>
        </div>
      </div>

      {/* Recent Bookings & Status Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0B1B33] mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => {
              const car = cars.find(c => c.id === booking.car_id);
              return (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-[#0B1B33]">
                      {car ? `${car.make} ${car.model}` : 'No car assigned'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {new Date(booking.start_ts).toLocaleDateString()} - {new Date(booking.end_ts).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-[#0B1B33]">
                      €{(booking.total_cents / 100).toFixed(2)}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'awaiting_payment'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Status Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0B1B33] mb-4">Booking Status</h3>
          <div className="space-y-3">
            {['confirmed', 'awaiting_payment', 'cancelled', 'completed'].map((status) => {
              const count = bookings.filter(b => b.status === status).length;
              const percentage = bookings.length > 0 ? (count / bookings.length) * 100 : 0;
              const colors = {
                confirmed: { bg: 'bg-green-500', text: 'text-green-700' },
                awaiting_payment: { bg: 'bg-yellow-500', text: 'text-yellow-700' },
                cancelled: { bg: 'bg-red-500', text: 'text-red-700' },
                completed: { bg: 'bg-blue-500', text: 'text-blue-700' },
              }[status] || { bg: 'bg-gray-500', text: 'text-gray-700' };

              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium capitalize ${colors.text}`}>{status.replace('_', ' ')}</span>
                    <span className="text-sm font-bold text-[#0B1B33]">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${colors.bg} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performing Cars */}
      {topCars.length > 0 && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Top Performing Cars</h3>
          <div className="space-y-3">
            {topCars.map((item, index) => (
              <div key={item.carId} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-semibold bg-gray-100 text-gray-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">
                    {item.car.make} {item.car.model}
                  </div>
                  <div className="text-xs text-gray-500">{item.count} bookings</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm">
                    €{(item.revenue / 100).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue by Month */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h3>
        <div className="space-y-3">
          {monthlyData.map(([month, revenue]) => {
            const percentage = (revenue / maxRevenue) * 100;
            return (
              <div key={month}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{month}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    €{(revenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded h-2">
                  <div
                    className="bg-gray-900 h-2 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

