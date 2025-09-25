import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StructuredData from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://instafetch.com'),
  title: 'InstaFetch - Download Instagram Videos Online | Fast & Free',
  description: 'Download Instagram videos instantly with InstaFetch. Fast, free, and simple Instagram video downloader. No registration required. Support all video qualities.',
  keywords: 'Instagram video downloader, download Instagram videos online, Instagram video download, save Instagram videos, Instagram downloader, free video downloader, Instagram reel downloader, Instagram story downloader',
  authors: [{ name: 'InstaFetch Team' }],
  creator: 'InstaFetch',
  publisher: 'InstaFetch',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://instafetch.com',
  },
  openGraph: {
    title: 'InstaFetch - Download Instagram Videos Online',
    description: 'Fast, free, and simple Instagram video downloads. Download any Instagram video in seconds.',
    url: 'https://instafetch.com',
    siteName: 'InstaFetch',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InstaFetch - Instagram Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaFetch - Download Instagram Videos Online',
    description: 'Fast, free, and simple Instagram video downloads.',
    images: ['/og-image.png'],
    creator: '@instafetch',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`} suppressHydrationWarning>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}