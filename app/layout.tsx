import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BIZ-PC — heyitsbiz.com',
  description: 'Windows 98 desktop launcher for the heyitsbiz internet lab.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
