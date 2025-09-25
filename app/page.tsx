'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Instagram, Zap, Shield, Clock } from 'lucide-react';
import AdSenseAd from '@/components/AdSenseAd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    
    // Redirect to download page with URL parameter
    window.location.href = `/download?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              InstaFetch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Fast, free, and simple Instagram video downloads.
            </p>
          </div>

          {/* URL Input Form */}
          <Card className="max-w-2xl mx-auto mb-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="url"
                    placeholder="Paste Instagram video URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="text-lg py-6 pl-4 pr-32 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={loading || !url.trim()}
                    className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports all Instagram video formats • No registration required • 100% free
                </p>
              </form>
            </CardContent>
          </Card>

          {/* AdSense Ad - Top */}
          <AdSenseAd 
            slot="1234567890" 
            format="auto" 
            style={{ marginBottom: '3rem' }}
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download Instagram videos in seconds with our optimized servers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Safe</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No malware, no ads on downloaded files, completely secure downloads
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Registration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start downloading immediately without creating an account
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
            How to Download Instagram Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-300 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Copy URL</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Copy the Instagram video URL from your browser or app
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-300 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Paste & Click</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Paste the URL in the input box above and click Download
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-300 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Download</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get your video file and save it to your device instantly
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Ad - Bottom */}
        <AdSenseAd 
          slot="0987654321" 
          format="auto"
          style={{ marginTop: '3rem', marginBottom: '3rem' }}
        />

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Is InstaFetch free to use?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, InstaFetch is completely free. You can download unlimited Instagram videos without any charges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">What video quality can I download?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide downloads in the original quality available on Instagram, ensuring the best possible video quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Do I need to install any software?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  No installation required. InstaFetch works entirely in your web browser on any device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}