import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://xans-landingpage.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Xans — Premium Interactive Clothing Landing Page',
    template: '%s | Xans',
  },
  description:
    'A premium responsive and interactive landing page concept for Xans, a minimal aesthetic clothing brand with product search, filtering, cart drawer, newsletter validation, and premium UI animations.',
  applicationName: 'Xans Landing Page',
  authors: [{ name: 'Jonathan Broqueza' }],
  creator: 'Jonathan Broqueza',
  publisher: 'Jonathan Broqueza',
  keywords: [
    'Xans',
    'clothing landing page',
    'premium landing page',
    'interactive landing page',
    'front-end development',
    'fashion website',
    'Next.js landing page',
    'Tailwind CSS',
  ],
  openGraph: {
    title: 'Xans — Premium Interactive Clothing Landing Page',
    description:
      'A premium responsive clothing brand landing page with product filtering, add-to-cart drawer, newsletter validation, and smooth animations.',
    url: siteUrl,
    siteName: 'Xans',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Xans premium clothing brand landing page preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xans — Premium Interactive Clothing Landing Page',
    description:
      'A premium responsive clothing brand landing page built with Next.js, Tailwind CSS, and interactive front-end features.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
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
