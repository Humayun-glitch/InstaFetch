import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="instafetch-gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                InstaFetch is designed with privacy in mind. We collect minimal information to provide our service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Instagram URLs that you provide for processing</li>
                <li>Basic usage analytics to improve our service</li>
                <li>Error logs to help us fix issues</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Process your Instagram video download requests</li>
                <li>Improve our service performance and reliability</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Debug technical issues and errors</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Storage and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We take your privacy seriously:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>We do not store your downloaded videos on our servers</li>
                <li>All data transmission is encrypted using HTTPS</li>
                <li>We do not share your personal information with third parties</li>
                <li>Analytics data is anonymized and aggregated</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li><strong>Google AdSense:</strong> For displaying advertisements (subject to Google's privacy policy)</li>
                <li><strong>Vercel:</strong> For hosting our application (subject to Vercel's privacy policy)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Request information about the data we collect</li>
                <li>Request deletion of your data</li>
                <li>Opt out of analytics tracking</li>
                <li>Contact us with privacy concerns</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
