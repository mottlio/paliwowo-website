import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'paliwowo — Fuel prices and discounts nearby',
  description:
    'Compare fuel prices nearby including loyalty-card discounts. Community-powered fuel prices for Poland.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[var(--blue-900)] antialiased">{children}</body>
    </html>
  );
}
