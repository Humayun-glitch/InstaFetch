'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AdSenseAd } from '@/components/AdSenseAd'
import { Download, ArrowLeft, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import { isValidInstagramUrl, formatFileSize } from '@/lib/utils'

interface VideoData {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  size: number
  quality: string
  originalUrl: string
  extractedAt: string
}

export default function DownloadPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const url = searchParams.get('url')

  useEffect(() => {
    if (!url) {
      setError('No URL provided')
      setIsLoading(false)
      return
    }

    if (!isValidInstagramUrl(url)) {
      setError('Invalid Instagram URL')
      setIsLoading(false)
      return
    }

    fetchVideoData(url)
  }, [url])

  const fetchVideoData = async (instagramUrl: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: instagramUrl }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process video')
      }

      setVideoData(result.data)
    } catch (err) {
      console.error('Error fetching video data:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!videoData?.videoUrl) return

    try {
      setIsDownloading(true)
      
      // Create a temporary link to trigger download
      const link = document.createElement('a')
      link.href = videoData.videoUrl
      link.download = `instagram_video_${videoData.id}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download error:', err)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleRetry = () => {
    if (url) {
      fetchVideoData(url)
    }
  }

  const handleNewDownload = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Processing Video</h2>
            <p className="text-gray-600">Extracting video information...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-2">
              <Button onClick={handleRetry} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={handleNewDownload} variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No Video Data</h2>
            <p className="text-gray-600 mb-6">Unable to load video information</p>
            <Button onClick={handleNewDownload} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Video Ready for Download!</h1>
          <p className="text-gray-600">Your Instagram video has been processed successfully</p>
        </div>

        {/* AdSense Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <AdSenseAd 
            slot="1234567890" 
            className="w-full"
            style={{ display: 'block', width: '100%', height: '120px' }}
          />
        </div>

        {/* Video Info Card */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Video Information</CardTitle>
            <CardDescription>
              Video details and download options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Preview */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={videoData.thumbnail}
                  alt={videoData.title}
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{videoData.title}</h3>
                  <p className="text-gray-600">{videoData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="ml-2">{videoData.duration}s</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="ml-2">{formatFileSize(videoData.size)}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Quality:</span>
                    <span className="ml-2 capitalize">{videoData.quality}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Format:</span>
                    <span className="ml-2">MP4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full md:w-auto instafetch-gradient text-white hover:opacity-90"
                size="lg"
              >
                {isDownloading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Downloading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Video
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AdSense Rectangle */}
        <div className="max-w-4xl mx-auto mb-8">
          <AdSenseAd 
            slot="0987654321" 
            className="w-full"
            style={{ display: 'block', width: '100%', height: '250px' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleNewDownload} variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Download Another Video
            </Button>
            <Button onClick={handleRetry} variant="outline" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
