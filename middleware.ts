import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './middleware-auth';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'el'];

function getLocale(req: NextRequest) {
  const accept = req.headers.get('accept-language') || '';
  const preferred = accept.split(',')[0]?.split('-')[0];
  if (locales.includes(preferred)) return preferred;
  return 'en';
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Update auth session for all requests
  const response = await updateSession(req);
  
  // Skip locale redirect for dashboard, API routes, and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/dashboard') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return response;
  }
  
  const pathLocale = pathname.split('/').filter(Boolean)[0];
  if (!locales.includes(pathLocale)) {
    const locale = getLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};


