import { getSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperAdmin } from '@/lib/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TestAuthPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#0B1B33] mb-6">🔍 Authentication Test</h1>
        
        <div className="space-y-4">
          {/* Authentication Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#0B1B33] mb-2">Authentication Status</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Status:</span>
                {user ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                    ✓ Authenticated
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                    ✗ Not Authenticated
                  </span>
                )}
              </div>
              
              {user && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Email:</span>
                    <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                      {user.email}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">User ID:</span>
                    <span className="text-xs font-mono text-gray-500">
                      {user.id}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Super Admin:</span>
                    {isSuperAdmin(user.email) ? (
                      <span className="px-3 py-1 bg-[#F9C80E] text-[#0B1B33] rounded-full text-sm font-bold">
                        ✓ YES
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-bold">
                        ✗ NO
                      </span>
                    )}
                  </div>
                </>
              )}
              
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {error.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Session Info */}
          {user && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-bold text-[#0B1B33] mb-2">Session Info</h2>
              <pre className="text-xs bg-white p-3 rounded border overflow-auto">
                {JSON.stringify({ 
                  email: user.email,
                  id: user.id,
                  createdAt: user.created_at,
                  lastSignIn: user.last_sign_in_at,
                }, null, 2)}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {user ? (
              <>
                {isSuperAdmin(user.email) ? (
                  <Link 
                    href="/dashboard" 
                    className="flex-1 text-center px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#F9C80E]/90 transition"
                  >
                    Go to Dashboard →
                  </Link>
                ) : (
                  <div className="flex-1 text-center px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed">
                    Dashboard (Not Authorized)
                  </div>
                )}
                <form action="/auth/signout" method="post" className="flex-1">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link 
                href="/en/login" 
                className="flex-1 text-center px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#F9C80E]/90 transition"
              >
                Go to Login →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

