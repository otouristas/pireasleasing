"use client";
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    
    // Check if URL has a redirect parameter
    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get('redirect') || '/dashboard';
    router.push(redirect);
  };

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container max-w-md">
        <h1 className="text-4xl font-bold text-[#0B1B33] mb-8">{locale === 'el' ? 'Σύνδεση' : 'Login'}</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-[#ECEFF1] p-8 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-[#0B1B33] mb-2">Email</label>
            <input 
              className="border-2 border-gray-300 p-3 w-full rounded focus:border-[#F9C80E] focus:outline-none" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0B1B33] mb-2">{locale === 'el' ? 'Κωδικός' : 'Password'}</label>
            <input 
              className="border-2 border-gray-300 p-3 w-full rounded focus:border-[#F9C80E] focus:outline-none" 
              type="password" 
              placeholder={locale === 'el' ? 'Κωδικός' : 'Password'} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="text-[#FF7043]">{error}</p>}
          <button className="btn-primary w-full py-3" disabled={loading}>
            {loading ? (locale === 'el' ? 'Σύνδεση...' : 'Logging in...') : (locale === 'el' ? 'Σύνδεση' : 'Login')}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {locale === 'el' ? 'Δεν έχετε λογαριασμό; ' : 'Don\'t have an account? '}
          <Link href={`/${locale}/register`} className="text-[#F9C80E] font-semibold hover:underline">
            {locale === 'el' ? 'Εγγραφή' : 'Sign up'}
          </Link>
        </p>
      </div>
    </main>
  );
}

