import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ReportsProvider } from '@/context/ReportsContext';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'FINDA – Find What You Lost',
  description:
    'Platform kehilangan dan penemuan barang untuk kampus, sekolah, dan tempat umum.',
  icons: { icon: '/favicon.ico' },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#EEF4FF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-[#EEF4FF] antialiased">
        <AuthProvider>
          <ReportsProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ReportsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
