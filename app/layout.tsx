import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Xans — Minimal Aesthetic Clothing Apparel',
  description:
    'A premium landing page concept for Xans, a minimal aesthetic clothing brand focused on clean silhouettes, neutral tones, and everyday essentials.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
