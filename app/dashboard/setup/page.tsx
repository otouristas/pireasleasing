'use client';

import { useState } from 'react';

export default function SetupPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkSetup = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/setup/blocked-dates', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Database Setup</h1>
          <p className="text-gray-600 mb-6">
            Check if the blocked_dates table exists and get setup instructions if needed.
          </p>

          <button
            onClick={checkSetup}
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Check Setup'}
          </button>

          {result && (
            <div className="mt-6">
              {result.success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Setup Complete!</h3>
                  <p className="text-green-700 text-sm">{result.message}</p>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">❌ Setup Required</h3>
                  <p className="text-red-700 text-sm mb-4">{result.message || result.error}</p>
                  
                  {result.sql && (
                    <div>
                      <p className="font-medium text-gray-900 mb-2 text-sm">
                        Run this SQL in Supabase SQL Editor:
                      </p>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-xs">{result.sql}</pre>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.sql);
                          alert('SQL copied to clipboard!');
                        }}
                        className="mt-3 px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
                      >
                        Copy SQL
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📖 Instructions</h3>
          <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
            <li>Click "Check Setup" button above</li>
            <li>If setup required, click "Copy SQL"</li>
            <li>Go to Supabase Dashboard → SQL Editor</li>
            <li>Paste and run the SQL</li>
            <li>Come back here and click "Check Setup" again</li>
            <li>If you see ✅ Setup Complete, you're done!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

