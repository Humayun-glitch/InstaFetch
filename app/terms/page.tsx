import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Terms of Service - InstaFetch',
  description: 'Terms of Service for InstaFetch Instagram Video Downloader. Read our terms and conditions.',
  robots: 'index, follow',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Terms of Service
              </h1>
              
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By using InstaFetch, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Service Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  InstaFetch is a free web service that allows users to download Instagram videos. We provide this service for personal, non-commercial use only.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  User Responsibilities
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Use the service only for lawful purposes</li>
                  <li>Respect Instagram's terms of service</li>
                  <li>Do not download copyrighted content without permission</li>
                  <li>Do not use the service for commercial purposes</li>
                  <li>Do not attempt to circumvent any security measures</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Prohibited Uses
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may not use InstaFetch:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The service and its original content, features, and functionality are and will remain the exclusive property of InstaFetch and its licensors. The service is protected by copyright, trademark, and other laws.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Disclaimer
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, InstaFetch excludes all representations, warranties, conditions and terms relating to our service and the use of this service.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  In no event shall InstaFetch, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Changes to Terms
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about these Terms of Service, please contact us at legal@instafetch.com
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
