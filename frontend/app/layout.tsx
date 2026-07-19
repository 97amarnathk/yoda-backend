import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Yoda — reaction training analytics',
  description: 'Train. Measure. Improve.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div style={{ minHeight: '100vh', background: 'var(--surface-app)', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
            <Nav />
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
