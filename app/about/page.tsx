import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Shield, Zap, Heart, Users, Download } from 'lucide-react';
import AdSenseAd from '@/components/AdSenseAd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About InstaFetch - Free Instagram Video Downloader | How It Works',
  description: 'Learn more about InstaFetch, the fastest and safest way to download Instagram videos. Get instructions, FAQ, and tips for downloading Instagram content.',
  keywords: 'InstaFetch about, Instagram video downloader guide, how to download Instagram videos, Instagram downloader instructions',
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              About InstaFetch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The most trusted Instagram video downloader used by millions worldwide
            </p>
          </div>

          {/* AdSense Ad - Top */}
          <AdSenseAd 
            slot="3333333333" 
            format="auto" 
            style={{ marginBottom: '3rem' }}
          />

          {/* What is InstaFetch */}
          <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-purple-600" />
                What is InstaFetch?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                InstaFetch is a free, fast, and secure Instagram video downloader that allows you to save Instagram videos 
                directly to your device. Whether you're on desktop or mobile, our tool makes it simple to download your 
                favorite Instagram content in just a few clicks.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Built with privacy and speed in mind, InstaFetch doesn't store your videos or personal information. 
                We simply provide a direct link to download the content you want, when you want it.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose InstaFetch */}
          <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-purple-600" />
                Why Choose InstaFetch?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">100% Safe & Secure</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        No malware, no viruses, no hidden fees. Your privacy is our priority.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Zap className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Lightning Fast</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Download videos in seconds with our optimized servers.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">No Registration</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Start downloading immediately without creating an account.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Download className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">All Formats</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Download videos in their original quality and format.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">How to Download Instagram Videos</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Copy the Instagram Video URL</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Go to Instagram and find the video you want to download. Copy the video URL from your browser's address bar 
                      or use the "Copy Link" option from the Instagram app.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Paste URL and Click Download</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Come to InstaFetch, paste the URL in the input box on our homepage, and click the "Download" button. 
                      Our system will instantly process the video.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Save to Your Device</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Click the final download button to save the video to your device. The video will be saved in its 
                      original quality without any watermarks from our service.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AdSense Ad - Middle */}
          <AdSenseAd 
            slot="4444444444" 
            format="auto"
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          />

          {/* FAQ */}
          <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Is InstaFetch completely free?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, InstaFetch is 100% free to use. There are no hidden charges, subscription fees, or premium plans. 
                    You can download unlimited Instagram videos at no cost.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Do I need to create an account?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No registration is required. You can start downloading Instagram videos immediately without providing 
                    any personal information or creating an account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">What video quality can I download?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We provide downloads in the original quality available on Instagram. This ensures you get the best 
                    possible video quality for your downloaded content.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Can I download private videos?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No, InstaFetch can only download public Instagram videos. Private videos are protected by Instagram's 
                    privacy settings and cannot be downloaded without proper authorization.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Is it legal to download Instagram videos?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Downloading public Instagram videos for personal use is generally acceptable. However, always respect 
                    copyright laws and the original creator's rights. Don't redistribute downloaded content without permission.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Does InstaFetch work on mobile devices?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, InstaFetch is fully responsive and works perfectly on all devices including smartphones, tablets, 
                    and desktop computers. The interface adapts to your screen size for the best experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact/Support */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you encounter any issues or have questions about using InstaFetch, we're here to help.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                InstaFetch is developed with ❤️ to make Instagram video downloading simple and accessible for everyone.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}