import Link from 'next/link';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export default async function UnauthorizedPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-[#0B1B33] mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You are logged in as <strong>{user?.email || 'unknown'}</strong>, but this account does not have super admin privileges.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Only the super admin can access this dashboard.</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This account is not authorized to access the admin panel.
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/en" 
            className="flex-1 px-6 py-3 bg-[#F9C80E] text-[#0B1B33] rounded-lg font-semibold hover:bg-[#F9C80E]/90 transition"
          >
            Go Home
          </Link>
          <form action="/auth/signout" method="post" className="flex-1">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

