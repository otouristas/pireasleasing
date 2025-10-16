import { NextResponse } from 'next/server';

export const locales = ['en', 'el'] as const;
export type Locale = (typeof locales)[number];

export function getLangFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (locales.includes(seg as Locale)) return seg as Locale;
  return 'en';
}

export function withHtmlLang(html: string, locale: Locale) {
  return html.replace('<html', `<html lang="${locale}"`);
}


