'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AddonsSectionProps {
  addons: any[];
  setAddons: (addons: any[]) => void;
}

export default function AddonsSection({ addons, setAddons }: AddonsSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const resetForm = () => {
    setEditForm({
      name_key: '',
      description: '',
      price_per_day_cents: 0,
      active: true,
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleEdit = (addon: any) => {
    setEditingId(addon.id);
    setEditForm({ ...addon });
  };

  const handleSave = async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      if (isAdding) {
        const { data, error } = await supabase
          .from('addons')
          .insert([editForm])
          .select()
          .single();

        if (error) throw error;
        setAddons([...addons, data]);
        setIsAdding(false);
        alert('Addon added successfully!');
      } else {
        const { error } = await supabase
          .from('addons')
          .update(editForm)
          .eq('id', editingId);

        if (error) throw error;
        setAddons(addons.map(a => a.id === editingId ? editForm : a));
        setEditingId(null);
        alert('Addon updated successfully!');
      }
    } catch (error: any) {
      alert('Error saving addon: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this addon?')) return;

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase.from('addons').delete().eq('id', id);
      if (error) throw error;

      setAddons(addons.filter(a => a.id !== id));
      alert('Addon deleted successfully!');
    } catch (error: any) {
      alert('Error deleting addon: ' + error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Add-ons</div>
          <div className="text-3xl font-semibold text-gray-900">{addons.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Active</div>
          <div className="text-3xl font-semibold text-gray-900">{addons.filter(a => a.active).length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Total Daily Value</div>
          <div className="text-3xl font-semibold text-gray-900">
            €{((addons.reduce((sum, a) => sum + (a.price_per_day_cents || 0), 0)) / 100).toFixed(0)}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <div className="text-sm font-medium text-gray-600 mb-1">Avg. Price/Day</div>
          <div className="text-3xl font-semibold text-gray-900">
            €{addons.length > 0 ? ((addons.reduce((sum, a) => sum + (a.price_per_day_cents || 0), 0)) / addons.length / 100).toFixed(2) : '0'}
          </div>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Add-ons & Extras</h2>
            <p className="text-sm text-gray-600 mt-0.5">Manage optional extras for bookings</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Add New Addon Form */}
      {isAdding && (
        <div className="bg-white rounded-lg p-6 border border-gray-300">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Add New Add-on</h3>
          <AddonForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {/* Addons Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price/Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {addons.map((addon) => {
              const editing = editingId === addon.id;

              return editing ? (
                <tr key={addon.id}>
                  <td colSpan={5} className="px-6 py-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Edit Add-on</h3>
                      <AddonForm form={editForm} setForm={setEditForm} onSave={handleSave} onCancel={() => setEditingId(null)} />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={addon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{addon.name_key}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {addon.description || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      €{((addon.price_per_day_cents || 0) / 100).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      addon.active 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {addon.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(addon)}
                        className="px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(addon.id)}
                        className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {addons.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No add-ons yet. Click "Add New" to create one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Addon Form Component
function AddonForm({ form, setForm, onSave, onCancel }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={form.name_key}
          onChange={(e) => setForm({ ...form, name_key: e.target.value })}
          placeholder="e.g., GPS Navigation, Baby Seat"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="Describe this addon..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day (€)</label>
        <input
          type="number"
          step="0.01"
          value={form.price_per_day_cents / 100}
          onChange={(e) => setForm({ ...form, price_per_day_cents: Math.round(parseFloat(e.target.value) * 100) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
          />
          <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={onSave}
          className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition"
        >
          Save
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

