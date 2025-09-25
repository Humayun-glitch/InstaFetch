'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AdSenseAd } from '@/components/AdSenseAd'
import { StructuredData } from '@/components/StructuredData'
import { isValidInstagramUrl } from '@/lib/utils'
import { Download, Sparkles, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      return
    }

    if (!isValidInstagramUrl(url)) {
      alert('Please enter a valid Instagram URL')
      return
    }

    setIsLoading(true)
    
    try {
      // Redirect to download page with the URL as a parameter
      const encodedUrl = encodeURIComponent(url)
      router.push(`/download?url=${encodedUrl}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="instafetch-gradient-text">InstaFetch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                Fast, free, and simple Instagram video downloads
              </p>
              <p className="text-lg text-gray-500">
                Download Instagram videos in seconds with our lightning-fast service
              </p>
            </div>

            {/* Main Download Form */}
            <Card className="max-w-2xl mx-auto mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Download Instagram Video</CardTitle>
                <CardDescription className="text-center">
                  Paste your Instagram video URL below and get instant access to download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="url"
                      placeholder="https://www.instagram.com/p/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !url.trim()}
                      className="instafetch-gradient text-white hover:opacity-90"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* AdSense Banner Ad */}
            <div className="max-w-4xl mx-auto mb-12">
              <AdSenseAd 
                slot="1234567890" 
                className="w-full h-32"
                style={{ display: 'block', width: '100%', height: '120px' }}
              />
            </div>
          </div>

          {/* Features Section */}
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
                  <Sparkles className="w-6 h-6 text-white" />
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

          {/* How it Works */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Copy Instagram URL</h3>
                <p className="text-gray-600">
                  Copy the Instagram video URL from your browser or mobile app
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Paste & Process</h3>
                <p className="text-gray-600">
                  Paste the URL into our downloader and let us process it instantly
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Download</h3>
                <p className="text-gray-600">
                  Get your high-quality video file ready for download
                </p>
              </div>
            </div>
          </div>

          {/* AdSense Rectangle Ad */}
          <div className="max-w-4xl mx-auto mb-16">
            <AdSenseAd 
              slot="0987654321" 
              className="w-full"
              style={{ display: 'block', width: '100%', height: '250px' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
