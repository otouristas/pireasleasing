import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  
  // Skip locale redirect for dashboard, API routes, and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/dashboard') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }
  
  const pathLocale = pathname.split('/').filter(Boolean)[0];
  if (!locales.includes(pathLocale)) {
    const locale = getLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};


