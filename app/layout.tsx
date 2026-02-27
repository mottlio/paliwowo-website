import type { Metadata } from 'next';
import { Inter, Nunito, Fredoka } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-fredoka',
});

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
      <body className={`${fredoka.variable} ${nunito.variable} bg-[var(--blue-900)] antialiased`}>{children}</body>
    </html>
  );
}
