import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const urls = [
    '',
    '/piraeus',
    '/athens-airport',
    '/fleet',
    '/contact',
    '/faq',
    '/terms',
    '/privacy',
  ];
  const all = ['en','el'].flatMap((loc) => urls.map((u) => `${base}/${loc}${u}`.replace(/\/$/, '')));
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all
    .map((u) => `<url><loc>${u}</loc></url>`)\n    .join('\n')}\n</urlset>`;
  return new NextResponse(body, { headers: { 'Content-Type': 'application/xml' } });
}


