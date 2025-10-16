'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface SettingsSectionProps {
  settings: any[];
  setSettings: (settings: any[]) => void;
}

export default function SettingsSection({ settings, setSettings }: SettingsSectionProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (setting: any) => {
    setEditingKey(setting.key);
    setEditValue(setting.value);
  };

  const handleSave = async (key: string) => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('settings')
        .update({ value: editValue })
        .eq('key', key);

      if (error) throw error;

      setSettings(settings.map(s => s.key === key ? { ...s, value: editValue } : s));
      setEditingKey(null);
      alert('Setting updated successfully!');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  const vivaSettings = settings.filter(s => s.key.startsWith('viva_'));
  const otherSettings = settings.filter(s => !s.key.startsWith('viva_'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-base font-semibold text-gray-900">System Settings</h2>
        <p className="text-sm text-gray-600 mt-0.5">Manage payment gateway and system configuration</p>
      </div>

      {/* Viva Wallet Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">Viva Wallet Configuration</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {vivaSettings.map((setting) => {
              const isEditing = editingKey === setting.key;
              const isSecret = setting.key.includes('secret') || setting.key.includes('key');

              return (
                <div key={setting.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {setting.key.replace(/_/g, ' ').replace(/^viva /, 'Viva ').toUpperCase()}
                      </label>
                      {setting.description && (
                        <p className="text-xs text-gray-500 mb-2">{setting.description}</p>
                      )}
                      {isEditing ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 font-mono text-sm"
                        />
                      ) : (
                        <div className="font-mono text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded border border-gray-200">
                          {isSecret ? '••••••••••••••••' : setting.value}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(setting.key)}
                            className="px-3 py-1 bg-gray-900 text-white rounded text-sm hover:bg-gray-800"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingKey(null)}
                            className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(setting)}
                          className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Other Settings */}
      {otherSettings.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">General Settings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {otherSettings.map((setting) => {
                const isEditing = editingKey === setting.key;

                return (
                  <div key={setting.key} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {setting.key.replace(/_/g, ' ').toUpperCase()}
                        </label>
                        {setting.description && (
                          <p className="text-xs text-gray-500 mb-2">{setting.description}</p>
                        )}
                        {isEditing ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">{setting.value}</div>
                        )}
                      </div>
                      <div className="ml-4">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSave(setting.key)}
                              className="px-3 py-1 bg-gray-900 text-white rounded text-sm hover:bg-gray-800"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingKey(null)}
                              className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(setting)}
                            className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">ℹ️ About Settings</h3>
        <p className="text-sm text-blue-700">
          All payment gateway credentials are stored securely in Supabase. Changes take effect immediately.
        </p>
      </div>
    </div>
  );
}

