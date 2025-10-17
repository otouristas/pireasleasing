import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import HeaderEnhanced from "../components/HeaderEnhanced";
import Footer from "../components/Footer";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Aggelos Rentals | Rent a Car in Athens & Piraeus",
  description: "No credit card, no deposit car rental in Athens & Piraeus. Airport and port delivery available.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <HeaderEnhanced />
        {children}
        <Footer />
      </body>
    </html>
  );
}
