import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['900'],
  style: ['italic'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'paliwowo — Fuel prices and discounts nearby',
  description:
    'Compare fuel prices nearby including loyalty-card discounts. Community-powered fuel prices for Poland.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${nunito.variable} bg-[var(--blue-900)] antialiased`}>{children}</body>
    </html>
  );
}
