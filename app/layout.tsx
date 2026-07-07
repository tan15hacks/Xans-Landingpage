import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://xans-landingpage.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Xans — Minimal Aesthetic Clothing Apparel',
    template: '%s | Xans',
  },
  description:
    'Xans is a minimal aesthetic clothing label built around calm colors, clean silhouettes, comfortable fabrics, and everyday essentials.',
  applicationName: 'Xans',
  authors: [{ name: 'Xans Studio' }],
  creator: 'Xans Studio',
  publisher: 'Xans Studio',
  keywords: [
    'Xans',
    'minimal clothing',
    'aesthetic clothing',
    'neutral apparel',
    'everyday essentials',
    'minimal fashion',
    'clothing brand',
    'streetwear basics',
  ],
  openGraph: {
    title: 'Xans — Minimal Aesthetic Clothing Apparel',
    description:
      'Quiet clothing for people with loud standards. Explore minimal essentials, neutral tones, and clean everyday silhouettes.',
    url: siteUrl,
    siteName: 'Xans',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Xans minimal aesthetic clothing apparel preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xans — Minimal Aesthetic Clothing Apparel',
    description:
      'Minimal essentials, neutral tones, clean silhouettes, and everyday pieces that look premium without trying too hard.',
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
