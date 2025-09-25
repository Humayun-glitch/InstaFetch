'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, CircleAlert as AlertCircle, CircleCheck as CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdSenseAd from '@/components/AdSenseAd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


interface VideoData {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  author: string;
}

function DownloadContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!url) {
      setError('No URL provided');
      setLoading(false);
      return;
    }

    // Prevent duplicate requests
    if (hasFetched) {
      return;
    }

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setHasFetched(true);
        
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to extract video');
        }

        setVideoData(data);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setHasFetched(false); // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [url, hasFetched]);

  const handleDownload = async () => {
    if (!videoData) return;

    try {
      // Track download completion
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          event: 'video_downloaded',
          url: url 
        }),
      });
    } catch (analyticsError) {
      console.warn('Analytics tracking failed:', analyticsError);
    }

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = videoData.videoUrl;
    link.download = `${videoData.title || 'instagram-video'}.mp4`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* AdSense Ad - Top */}
          <div className="mb-8 flex justify-center">
            <AdSenseAd 
              slot="1111111111" 
              format="auto" 
              className="w-full max-w-728px"
            />
          </div>

          {/* Main Content Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              {loading && (
                <div className="text-center py-16">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-purple-600" />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Processing your video...</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please wait while we extract the video from Instagram
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-16">
                  <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Error</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setHasFetched(false);
                      setLoading(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {videoData && (
                <div className="space-y-8">
                  {/* Success Message */}
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Video Ready!</h2>
                    <p className="text-gray-600 dark:text-gray-300">Your Instagram video has been extracted successfully</p>
                  </div>

                  {/* Video Preview */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                    <video
                      src={videoData.videoUrl}
                      poster={videoData.thumbnailUrl}
                      controls
                      className="w-full h-auto rounded-lg"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Video Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{videoData.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">By: {videoData.author}</p>
                  </div>

                  {/* Download Button */}
                  <div className="text-center">
                    <button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Video
                    </button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      • Original quality • No watermarks • Fast download
                    </p>
                  </div>
                </div>
              )}

              {!loading && !error && !videoData && (
                <div className="text-center py-16">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">No URL provided</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please go back to the home page and enter a valid Instagram video URL.
                  </p>
                  <Link href="/" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block">
                    Go to Home
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AdSense Ad - Bottom */}
          <div className="mb-8 flex justify-center">
            <AdSenseAd 
              slot="2222222222" 
              format="auto"
              className="w-full max-w-728px"
            />
          </div>

          {/* Instructions */}
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">How to Download</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <div className="space-y-2">
                  <p>• Click the "Download Video" button above</p>
                  <p>• The video will be saved to your downloads folder</p>
                </div>
                <div className="space-y-2">
                  <p>• For mobile: tap and hold the video, then "Save to Photos"</p>
                  <p>• Videos are downloaded in original Instagram quality</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Download() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}
