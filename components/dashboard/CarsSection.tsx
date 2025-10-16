'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

interface CarsSectionProps {
  cars: any[];
  setCars: (cars: any[]) => void;
}

export default function CarsSection({ cars, setCars }: CarsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const categories = Array.from(new Set(cars.map(c => c.category)));

  const filteredCars = cars.filter((car) => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.license_plate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || car.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setEditForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Economy',
      transmission: 'Manual',
      fuel_type: 'Petrol',
      seats: 5,
      price_per_day: '€30/Month',
      status: 'available',
      description: '',
      license_plate: '',
      slug: '',
      images: [],
      features: '',
      active: true,
      // Maintenance fields
      insurance_expiry: '',
      last_service_date: '',
      next_service_date: '',
      kteo_expiry: '',
      current_mileage: 0,
      service_interval_km: 10000,
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleEdit = (car: any) => {
    setEditingId(car.id);
    setEditForm({ ...car });
  };

  const handleSave = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Generate slug if not provided
      if (!editForm.slug) {
        editForm.slug = `${editForm.make}-${editForm.model}-${editForm.year}`
          .toLowerCase()
          .replace(/\s+/g, '-');
      }

      if (isAdding) {
        const { data, error } = await supabase
          .from('cars')
          .insert([editForm])
          .select()
          .single();

        if (error) throw error;
        setCars([...cars, data]);
        setIsAdding(false);
        alert('Car added successfully!');
      } else {
        const { error } = await supabase
          .from('cars')
          .update(editForm)
          .eq('id', editingId);

        if (error) throw error;
        setCars(cars.map(c => c.id === editingId ? editForm : c));
        setEditingId(null);
        alert('Car updated successfully!');
      }
    } catch (error: any) {
      alert('Error saving car: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;

      setCars(cars.filter(c => c.id !== id));
      alert('Car deleted successfully!');
    } catch (error: any) {
      alert('Error deleting car: ' + error.message);
    }
  };

  const downloadExcel = () => {
    // Create CSV content
    const headers = ['Make', 'Model', 'Year', 'License Plate', 'Category', 'Transmission', 'Fuel', 'Seats', 'Price', 'Status', 'Mileage', 'Insurance Expiry', 'KTEO Expiry', 'Next Service'];
    const rows = filteredCars.map(car => [
      car.make,
      car.model,
      car.year,
      car.license_plate,
      car.category,
      car.transmission,
      car.fuel_type,
      car.seats,
      car.price_per_day,
      car.status,
      car.current_mileage || 0,
      car.insurance_expiry || 'Not set',
      car.kteo_expiry || 'Not set',
      car.next_service_date || 'Not set',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fleet-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isEditing = (id: string) => editingId === id || isAdding;

  return (
    <div className="space-y-6">
      {/* Maintenance Alerts */}
      {cars.some(c => {
        const insuranceExpiry = c.insurance_expiry ? new Date(c.insurance_expiry) : null;
        const kteoExpiry = c.kteo_expiry ? new Date(c.kteo_expiry) : null;
        const nextService = c.next_service_date ? new Date(c.next_service_date) : null;
        const now = new Date();
        const in30Days = new Date();
        in30Days.setDate(in30Days.getDate() + 30);
        
        return (insuranceExpiry && insuranceExpiry <= in30Days) || 
               (kteoExpiry && kteoExpiry <= in30Days) ||
               (nextService && nextService <= in30Days);
      }) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-red-900 mb-2">⚠️ Maintenance Alerts</h3>
          <div className="space-y-1 text-sm text-red-700">
            {cars.filter(c => {
              const insuranceExpiry = c.insurance_expiry ? new Date(c.insurance_expiry) : null;
              const now = new Date();
              const in30Days = new Date();
              in30Days.setDate(in30Days.getDate() + 30);
              return insuranceExpiry && insuranceExpiry <= in30Days;
            }).map(c => (
              <div key={`ins-${c.id}`}>
                • {c.make} {c.model} - Insurance expires {new Date(c.insurance_expiry).toLocaleDateString()}
              </div>
            ))}
            {cars.filter(c => {
              const kteoExpiry = c.kteo_expiry ? new Date(c.kteo_expiry) : null;
              const now = new Date();
              const in30Days = new Date();
              in30Days.setDate(in30Days.getDate() + 30);
              return kteoExpiry && kteoExpiry <= in30Days;
            }).map(c => (
              <div key={`kteo-${c.id}`}>
                • {c.make} {c.model} - KTEO expires {new Date(c.kteo_expiry).toLocaleDateString()}
              </div>
            ))}
            {cars.filter(c => {
              const nextService = c.next_service_date ? new Date(c.next_service_date) : null;
              const now = new Date();
              const in30Days = new Date();
              in30Days.setDate(in30Days.getDate() + 30);
              return nextService && nextService <= in30Days;
            }).map(c => (
              <div key={`service-${c.id}`}>
                • {c.make} {c.model} - Service due {new Date(c.next_service_date).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header & Filters */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">Fleet Management</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadExcel}
              className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition text-sm"
            >
              Download Excel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition text-sm"
            >
              Add New Car
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
        </div>
      </div>

      {/* Add New Car Form */}
      {isAdding && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#F9C80E]">
          <h3 className="text-xl font-bold text-[#0B1B33] mb-4">Add New Car</h3>
          <CarForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {/* Cars Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => {
          const editing = editingId === car.id;
          
          // Parse and validate car image
          let carImage = '/fleet/placeholder.jpg';
          try {
            if (Array.isArray(car.images) && car.images.length > 0 && car.images[0]) {
              const img = car.images[0];
              if (typeof img === 'string' && (img.startsWith('/') || img.startsWith('http'))) {
                carImage = img;
              }
            } else if (typeof car.images === 'string') {
              try {
                const parsed = JSON.parse(car.images);
                if (Array.isArray(parsed) && parsed[0] && (parsed[0].startsWith('/') || parsed[0].startsWith('http'))) {
                  carImage = parsed[0];
                }
              } catch {
                // If not JSON, treat as direct path
                if (car.images.startsWith('/') || car.images.startsWith('http')) {
                  carImage = car.images;
                }
              }
            }
          } catch (error) {
            console.error('Error parsing car image:', error);
          }

          return (
            <div key={car.id} className={`bg-white rounded-2xl shadow-sm border transition ${
              editing ? 'border-[#F9C80E] border-2' : 'border-gray-200'
            }`}>
              {editing ? (
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0B1B33] mb-4">Edit Car</h3>
                  <CarForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
                </div>
              ) : (
                <>
                  <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl overflow-hidden">
                    {carImage && (carImage.startsWith('/') || carImage.startsWith('http')) ? (
                      <Image
                        src={carImage}
                        alt={`${car.make} ${car.model}`}
                        fill
                        className="object-contain p-4"
                        unoptimized={carImage.startsWith('http')}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        🚗 No Image
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        car.active ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}>
                        {car.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#0B1B33]">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-600">{car.year} • {car.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#F9C80E]">{car.price_per_day}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-gray-600">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold">{car.transmission}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold">{car.seats} seats</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold">{car.fuel_type}</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-xs text-gray-500 font-mono">{car.license_plate}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(car)}
                        className="flex-1 px-4 py-2 bg-[#F9C80E] text-[#0B1B33] rounded-lg text-sm font-semibold hover:bg-[#F9C80E]/90 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl">
          No cars found matching your criteria.
        </div>
      )}
    </div>
  );
}

// Reusable Car Form Component
function CarForm({ form, setForm, onSave, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Make</label>
          <input
            type="text"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Model</label>
          <input
            type="text"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">License Plate</label>
          <input
            type="text"
            value={form.license_plate}
            onChange={(e) => setForm({ ...form, license_plate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Transmission</label>
          <select
            value={form.transmission}
            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fuel Type</label>
          <input
            type="text"
            value={form.fuel_type}
            onChange={(e) => setForm({ ...form, fuel_type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Seats</label>
          <input
            type="number"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price per Day</label>
          <input
            type="text"
            value={form.price_per_day}
            onChange={(e) => setForm({ ...form, price_per_day: e.target.value })}
            placeholder="€30/Month"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="auto-generated if empty"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-4 h-4 text-[#F9C80E] border-gray-300 rounded focus:ring-[#F9C80E]"
            />
            <span className="text-sm font-semibold text-gray-700">Active</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Features (comma separated)</label>
        <input
          type="text"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
          placeholder="Air Conditioning, Bluetooth, GPS"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Images (JSON array or comma-separated URLs)</label>
        <textarea
          value={typeof form.images === 'string' ? form.images : JSON.stringify(form.images)}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          rows={2}
          placeholder='["/fleet/car1.jpg", "/fleet/car2.jpg"]'
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 font-mono text-sm"
        />
      </div>

      {/* MAINTENANCE TRACKING FIELDS */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Fleet Maintenance Tracking</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Expiry Date</label>
            <input
              type="date"
              value={form.insurance_expiry || ''}
              onChange={(e) => setForm({ ...form, insurance_expiry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">KTEO Expiry Date</label>
            <input
              type="date"
              value={form.kteo_expiry || ''}
              onChange={(e) => setForm({ ...form, kteo_expiry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Service Date</label>
            <input
              type="date"
              value={form.last_service_date || ''}
              onChange={(e) => setForm({ ...form, last_service_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Next Service Date</label>
            <input
              type="date"
              value={form.next_service_date || ''}
              onChange={(e) => setForm({ ...form, next_service_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Mileage (km)</label>
            <input
              type="number"
              value={form.current_mileage || 0}
              onChange={(e) => setForm({ ...form, current_mileage: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Interval (km)</label>
            <input
              type="number"
              value={form.service_interval_km || 10000}
              onChange={(e) => setForm({ ...form, service_interval_km: parseInt(e.target.value) })}
              placeholder="10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition"
        >
          Save Car
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

