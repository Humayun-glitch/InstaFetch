import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InstaFetch - Fast, Free Instagram Video Downloads',
  description: 'Download Instagram videos quickly and easily. Fast, free, and simple Instagram video downloads with InstaFetch.',
  keywords: 'instagram downloader, instagram video download, instagram download free, instagram video saver',
  authors: [{ name: 'InstaFetch' }],
  creator: 'InstaFetch',
  publisher: 'InstaFetch',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://instafetch.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'InstaFetch - Fast, Free Instagram Video Downloads',
    description: 'Download Instagram videos quickly and easily. Fast, free, and simple Instagram video downloads.',
    url: 'https://instafetch.app',
    siteName: 'InstaFetch',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InstaFetch - Instagram Video Downloader',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaFetch - Fast, Free Instagram Video Downloads',
    description: 'Download Instagram videos quickly and easily. Fast, free, and simple Instagram video downloads.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
