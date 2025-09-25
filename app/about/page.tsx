import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AdSenseAd } from '@/components/AdSenseAd'
import { HelpCircle, Shield, Zap, Download, Smartphone, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="instafetch-gradient-text">About InstaFetch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The fastest, most reliable way to download Instagram videos. 
            Built with simplicity and user experience in mind.
          </p>
        </div>

        {/* AdSense Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <AdSenseAd 
            slot="1234567890" 
            className="w-full"
            style={{ display: 'block', width: '100%', height: '120px' }}
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download Instagram videos in seconds with our optimized processing system
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>100% Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                No hidden fees, no registration required. Download as many videos as you want
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <CardTitle>High Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get the best quality Instagram videos with our advanced extraction technology
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How to Use InstaFetch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Copy Instagram URL</h3>
              <p className="text-gray-600">
                Open Instagram and copy the URL of the video you want to download. 
                You can do this from your browser or mobile app.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Paste & Process</h3>
              <p className="text-gray-600">
                Paste the Instagram URL into our downloader and click the download button. 
                We'll process the video instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-gray-600">
                Once processed, click the download button to save the video to your device. 
                It's that simple!
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  Is InstaFetch really free?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! InstaFetch is completely free to use. You can download as many Instagram videos as you want without any charges or hidden fees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  Do I need to create an account?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No account required! You can start downloading Instagram videos immediately without any registration or sign-up process.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  What video formats are supported?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We support MP4 format, which is compatible with all devices and platforms. The videos are downloaded in their original quality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  Can I download private Instagram videos?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, you can only download public Instagram videos. Private or restricted content cannot be accessed through our service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  Is it safe to use InstaFetch?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! InstaFetch is completely safe and secure. We don't store your videos or personal information. All processing is done securely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  Can I use it on mobile devices?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! InstaFetch works perfectly on all devices including smartphones, tablets, and desktop computers. Our interface is fully responsive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AdSense Rectangle */}
        <div className="max-w-4xl mx-auto mb-16">
          <AdSenseAd 
            slot="0987654321" 
            className="w-full"
            style={{ display: 'block', width: '100%', height: '250px' }}
          />
        </div>

        {/* Supported Platforms */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Works on All Platforms</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6" />
              <span>Mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6" />
              <span>Web Browser</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-6 h-6" />
              <span>Desktop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
