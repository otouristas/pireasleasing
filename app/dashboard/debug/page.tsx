import { getSupabaseServerClient } from '@/lib/supabase/server';
import { isSuperAdmin, SUPER_ADMIN_EMAILS } from '@/lib/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#0B1B33] mb-6">🔍 Dashboard Debug Info</h1>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#0B1B33] mb-3">User Information</h2>
            <div className="space-y-2 text-sm font-mono">
              <div>
                <span className="text-gray-600">Authenticated:</span>{' '}
                <span className={user ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {user ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              {user && (
                <>
                  <div>
                    <span className="text-gray-600">Email:</span>{' '}
                    <span className="text-[#0B1B33] font-bold">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">User ID:</span>{' '}
                    <span className="text-gray-500">{user.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email (trimmed):</span>{' '}
                    <span className="text-gray-500">"{user.email?.trim()}"</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email (lowercase):</span>{' '}
                    <span className="text-gray-500">{user.email?.toLowerCase()}</span>
                  </div>
                </>
              )}
              {error && (
                <div>
                  <span className="text-gray-600">Error:</span>{' '}
                  <span className="text-red-600">{error.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Check */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-bold text-[#0B1B33] mb-3">Admin Check</h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Is Super Admin:</span>{' '}
                <span className={user?.email && isSuperAdmin(user.email) ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {user?.email && isSuperAdmin(user.email) ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              <div>
                <span className="text-gray-600 font-semibold">Authorized Emails:</span>
                <ul className="list-disc list-inside ml-4 mt-2 font-mono">
                  {SUPER_ADMIN_EMAILS.map((email, idx) => (
                    <li key={idx} className={user?.email?.toLowerCase().trim() === email.toLowerCase() ? 'text-green-600 font-bold' : 'text-gray-600'}>
                      {email}
                      {user?.email?.toLowerCase().trim() === email.toLowerCase() && ' ← MATCH!'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Details */}
          {user?.email && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-[#0B1B33] mb-3">Comparison Details</h2>
              <div className="space-y-2 text-sm font-mono">
                <div>Your email: <span className="bg-white px-2 py-1 rounded">{user.email || 'N/A'}</span></div>
                <div>Normalized: <span className="bg-white px-2 py-1 rounded">{user.email?.trim().toLowerCase() || 'N/A'}</span></div>
                <div>Length: <span className="bg-white px-2 py-1 rounded">{user.email?.length || 0} chars</span></div>
                <div className="pt-2 space-y-1">
                  {SUPER_ADMIN_EMAILS.map((adminEmail, idx) => {
                    const matches = user.email?.trim().toLowerCase() === adminEmail.toLowerCase();
                    return (
                      <div key={idx} className={matches ? 'text-green-700 font-bold' : 'text-gray-600'}>
                        {matches ? '✓' : '✗'} Compare with: <span className="bg-white px-2 py-1 rounded">{adminEmail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Link 
              href="/dashboard" 
              className="flex-1 text-center px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#F9C80E]/90 transition"
            >
              Try Dashboard
            </Link>
            {user && (
              <form action="/auth/signout" method="post" className="flex-1">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Sign Out
                </button>
              </form>
            )}
            {!user && (
              <Link 
                href="/en/login" 
                className="flex-1 text-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

