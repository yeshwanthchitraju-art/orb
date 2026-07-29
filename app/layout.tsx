import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Orbiant - Intelligent Enterprise AI',
  description:
    'Deploy AI Employees that understand your business, collaborate with your teams, and execute work across every department.',
  openGraph: {
    title: 'Orbiant - Intelligent Enterprise AI',
    description: 'Deploy AI Employees that never sleep.',
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-neutral-900 antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
