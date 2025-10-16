'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [debug, setDebug] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/debug')
      .then(res => res.json())
      .then(data => {
        setDebug(data);
        setLoading(false);
      })
      .catch(err => {
        setDebug({ error: err.message });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading debug info...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🔍 System Debug Info</h1>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            {debug?.environment && Object.entries(debug.environment).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}:</span>
                <span className={value ? 'text-green-600' : 'text-red-600'}>
                  {value ? '✓ SET' : '✗ MISSING'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Supabase Connection</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Connected:</span>
              <span className={debug?.supabase?.connected ? 'text-green-600' : 'text-red-600'}>
                {debug?.supabase?.connected ? '✓ YES' : '✗ NO'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Settings Count:</span>
              <span>{debug?.supabase?.settingsCount || 0}</span>
            </div>
            {debug?.supabase?.settingsError && (
              <div className="text-red-600 text-xs mt-2">
                Error: {debug.supabase.settingsError}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Critical Settings</h2>
          <div className="space-y-2 font-mono text-sm">
            {debug?.criticalSettings && Object.entries(debug.criticalSettings).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}:</span>
                <span className={String(value).includes('✓') ? 'text-green-600' : 'text-red-600'}>
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">All Settings in Database</h2>
          <div className="space-y-2 font-mono text-sm">
            {debug?.settings && Object.entries(debug.settings).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-gray-600">{key}:</span>
                <span className="text-green-600">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Instructions</h3>
          <p className="text-sm text-blue-700">
            All settings should show "SET ✓". If any show "MISSING ✗", run the SQL to add them in Supabase.
          </p>
        </div>

        <div className="mt-4">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-xs">
            {JSON.stringify(debug, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

