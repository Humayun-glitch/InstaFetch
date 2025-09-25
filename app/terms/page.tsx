import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="instafetch-gradient-text">Terms of Service</span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By using InstaFetch, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                InstaFetch is a free service that allows users to download Instagram videos. 
                Our service:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Processes public Instagram video URLs</li>
                <li>Provides download links for Instagram videos</li>
                <li>Is provided free of charge</li>
                <li>Is supported by advertisements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                When using InstaFetch, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Only download content you have permission to download</li>
                <li>Respect copyright laws and intellectual property rights</li>
                <li>Not use the service for illegal or unauthorized purposes</li>
                <li>Not attempt to circumvent any security measures</li>
                <li>Not abuse or overload our servers</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                You may not use InstaFetch to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Download copyrighted content without permission</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to reverse engineer our service</li>
                <li>Use automated tools to abuse our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We strive to provide reliable service, but we cannot guarantee 100% uptime. 
                We reserve the right to modify, suspend, or discontinue the service at any time 
                without notice.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                InstaFetch is provided "as is" without any warranties. We do not guarantee 
                that the service will be error-free, uninterrupted, or that it will meet your 
                requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                In no event shall InstaFetch be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising out of your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be 
                effective immediately upon posting. Your continued use of the service 
                constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us 
                through our website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
