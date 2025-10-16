'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface LocationsSectionProps {
  locations: any[];
  setLocations: (locations: any[]) => void;
}

export default function LocationsSection({ locations, setLocations }: LocationsSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const resetForm = () => {
    setEditForm({
      code: '',
      name_key: '',
      fee_cents: 0,
      offhours_multiplier: 1,
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleEdit = (location: any) => {
    setEditingId(location.id);
    setEditForm({ ...location });
  };

  const handleSave = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      if (isAdding) {
        const { data, error } = await supabase
          .from('locations')
          .insert([editForm])
          .select()
          .single();

        if (error) throw error;
        setLocations([...locations, data]);
        setIsAdding(false);
        alert('Location added successfully!');
      } else {
        const { error } = await supabase
          .from('locations')
          .update(editForm)
          .eq('id', editingId);

        if (error) throw error;
        setLocations(locations.map(l => l.id === editingId ? editForm : l));
        setEditingId(null);
        alert('Location updated successfully!');
      }
    } catch (error: any) {
      alert('Error saving location: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from('locations').delete().eq('id', id);
      if (error) throw error;

      setLocations(locations.filter(l => l.id !== id));
      alert('Location deleted successfully!');
    } catch (error: any) {
      alert('Error deleting location: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0B1B33]">Locations Management</h2>
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#F9C80E]/90 transition"
          >
            + Add New Location
          </button>
        </div>
      </div>

      {/* Add New Location Form */}
      {isAdding && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#F9C80E]">
          <h3 className="text-xl font-bold text-[#0B1B33] mb-4">Add New Location</h3>
          <LocationForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {/* Locations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => {
          const editing = editingId === location.id;

          return (
            <div key={location.id} className={`bg-white rounded-2xl shadow-sm border transition ${
              editing ? 'border-[#F9C80E] border-2' : 'border-gray-200'
            }`}>
              {editing ? (
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0B1B33] mb-4">Edit Location</h3>
                  <LocationForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-[#0B1B33] mb-1">
                        {location.code}
                      </div>
                      <div className="text-sm text-gray-600">
                        {location.name_key}
                      </div>
                    </div>
                    <div className="text-3xl">📍</div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Delivery Fee</span>
                      <span className="font-bold text-[#0B1B33]">
                        €{(location.fee_cents / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Off-hours Multiplier</span>
                      <span className="font-bold text-[#0B1B33]">
                        {location.offhours_multiplier}x
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(location)}
                      className="flex-1 px-4 py-2 bg-[#F9C80E] text-[#0B1B33] rounded-lg text-sm font-semibold hover:bg-[#F9C80E]/90 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl">
          No locations found. Add your first location to get started.
        </div>
      )}
    </div>
  );
}

// Reusable Location Form Component
function LocationForm({ form, setForm, onSave, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Code</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          placeholder="e.g., ATH, PIR"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={form.name_key}
          onChange={(e) => setForm({ ...form, name_key: e.target.value })}
          placeholder="e.g., Athens Airport, Piraeus Port"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Fee (€)</label>
        <input
          type="number"
          step="0.01"
          value={form.fee_cents / 100}
          onChange={(e) => setForm({ ...form, fee_cents: Math.round(parseFloat(e.target.value) * 100) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Off-hours Multiplier</label>
        <input
          type="number"
          step="0.1"
          value={form.offhours_multiplier}
          onChange={(e) => setForm({ ...form, offhours_multiplier: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F9C80E] focus:border-transparent"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={onSave}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Save Location
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

