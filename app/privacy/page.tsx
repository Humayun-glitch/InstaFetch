import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Privacy Policy - InstaFetch',
  description: 'Privacy Policy for InstaFetch Instagram Video Downloader. Learn how we handle your data and privacy.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  InstaFetch is committed to protecting your privacy. We collect minimal information necessary to provide our service:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Instagram URLs you provide for video extraction</li>
                  <li>Basic usage analytics to improve our service</li>
                  <li>Anonymous technical data for service optimization</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>To extract and download Instagram videos as requested</li>
                  <li>To improve our service and user experience</li>
                  <li>To analyze usage patterns and optimize performance</li>
                  <li>To ensure compliance with Instagram's terms of service</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Data Storage and Security
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We do not store your personal information or downloaded videos on our servers. All video processing is done in real-time and videos are served directly from Instagram's servers.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use Google AdSense for advertising. Google may use cookies and similar technologies to serve ads based on your visits to our site and other sites on the Internet.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Cookies and Tracking
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies for analytics and advertising purposes. You can disable cookies in your browser settings, but this may affect the functionality of our service.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of data collection</li>
                  <li>Contact us with privacy concerns</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at privacy@instafetch.com
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm mt-8">
                  This privacy policy may be updated from time to time. We will notify users of any material changes by posting the new privacy policy on this page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
