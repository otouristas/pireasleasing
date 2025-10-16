'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  const isMissingEnvVars = error.message.includes('Missing Supabase environment variables') || 
                          error.message.includes('project\'s URL and Key are required');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Error</h1>
              <p className="text-gray-600">Something went wrong loading the dashboard</p>
            </div>
          </div>

          {isMissingEnvVars ? (
            <div className="space-y-6">
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <h2 className="text-lg font-bold text-yellow-900 mb-3">
                  🔐 Missing Environment Variables
                </h2>
                <p className="text-yellow-800 mb-4">
                  Supabase credentials are not configured in your deployment. The dashboard requires database access to function.
                </p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">📋 Quick Fix (2 minutes):</h3>
                <ol className="space-y-3 text-sm text-blue-900">
                  <li className="flex gap-2">
                    <span className="font-bold">1.</span>
                    <span>Go to your <strong>Netlify Dashboard</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">2.</span>
                    <span>Click <strong>Site Settings → Environment Variables</strong></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold">3.</span>
                    <span>Add these variables:</span>
                  </li>
                </ol>

                <div className="mt-4 bg-white rounded-lg p-4 font-mono text-xs space-y-2">
                  <div>
                    <div className="text-gray-600">Key:</div>
                    <div className="font-bold text-gray-900">NEXT_PUBLIC_SUPABASE_URL</div>
                    <div className="text-gray-600 mt-1">Value:</div>
                    <div className="bg-gray-100 p-2 rounded break-all">
                      https://hjgukvbkurboxkrgrruz.supabase.co
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-gray-200 pt-2">
                    <div className="text-gray-600">Key:</div>
                    <div className="font-bold text-gray-900">NEXT_PUBLIC_SUPABASE_ANON_KEY</div>
                    <div className="text-gray-600 mt-1">Value:</div>
                    <div className="bg-gray-100 p-2 rounded break-all">
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>4.</strong> After adding variables, trigger a new deploy in Netlify
                  </p>
                  <p className="text-sm text-green-800 mt-1">
                    <strong>5.</strong> Wait 3-5 minutes for the build to complete
                  </p>
                  <p className="text-sm text-green-800 mt-1">
                    <strong>6.</strong> Refresh this page - dashboard will load! ✅
                  </p>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="https://app.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0B1B33] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0B1B33]/90 transition"
                >
                  Open Netlify Dashboard →
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-sm font-mono text-red-800">{error.message}</p>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-2">Error ID: {error.digest}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => reset()}
                  className="flex-1 px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#e0b50c] transition"
                >
                  Try Again
                </button>
                <a
                  href="/en"
                  className="flex-1 text-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Go Home
                </a>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Need help? Check <code className="bg-gray-100 px-2 py-1 rounded text-xs">ENV_SETUP_GUIDE.md</code> in the repository
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

