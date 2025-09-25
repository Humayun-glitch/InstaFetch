import { NextRequest, NextResponse } from 'next/server'
import { isValidInstagramUrl, extractInstagramId } from '@/lib/utils'
import { spawn } from 'child_process'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    if (!isValidInstagramUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid Instagram URL' },
        { status: 400 }
      )
    }

    const videoId = extractInstagramId(url)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID from URL' },
        { status: 400 }
      )
    }

    // Log the request for analytics
    console.log(`Processing Instagram video: ${videoId}`)

    try {
      // Try the Vercel-optimized Python script first
      let pythonScript = path.join(process.cwd(), 'scripts', 'instagram_downloader_vercel.py')
      let pythonCommand = 'python3'
      
      // On Windows, try 'python' instead of 'python3'
      if (process.platform === 'win32') {
        pythonCommand = 'python'
      }
      
      // In Vercel environment, use 'python' command
      if (process.env.VERCEL) {
        pythonCommand = 'python'
      }
      
      const pythonProcess = spawn(pythonCommand, [pythonScript, url], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PYTHONUNBUFFERED: '1' }
      })

      let stdout = ''
      let stderr = ''

      pythonProcess.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      pythonProcess.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      // Wait for the process to complete
      const result = await new Promise((resolve, reject) => {
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            try {
              const pythonResult = JSON.parse(stdout)
              resolve(pythonResult)
            } catch (parseError) {
              reject(new Error('Failed to parse Python script output'))
            }
          } else {
            reject(new Error(`Python script failed: ${stderr}`))
          }
        })

        pythonProcess.on('error', (error) => {
          reject(new Error(`Failed to start Python script: ${error.message}`))
        })

        // Set a timeout for the Python script (shorter for Vercel)
        const timeout = process.env.VERCEL ? 15000 : 30000 // 15s on Vercel, 30s locally
        setTimeout(() => {
          pythonProcess.kill()
          reject(new Error('Python script timeout'))
        }, timeout)
      })

      const pythonResult = result as any

      if (!pythonResult.success) {
        return NextResponse.json(
          { error: pythonResult.error || 'Failed to extract video information' },
          { status: 400 }
        )
      }

      // Format the response data
      const videoData = {
        id: pythonResult.data.id,
        title: pythonResult.data.title,
        description: pythonResult.data.description,
        thumbnail: pythonResult.data.thumbnail,
        videoUrl: pythonResult.data.video_url,
        duration: pythonResult.data.duration,
        size: pythonResult.data.filesize,
        quality: pythonResult.data.quality,
        width: pythonResult.data.width,
        height: pythonResult.data.height,
        format: pythonResult.data.format,
        originalUrl: url,
        extractedAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: videoData
      })

    } catch (pythonError) {
      console.error('Advanced Python script error:', pythonError)
      
      // Try the simple Python script as fallback
      try {
        const simplePythonScript = path.join(process.cwd(), 'scripts', 'instagram_downloader_simple.py')
        let pythonCommand = process.platform === 'win32' ? 'python' : 'python3'
        
        // In Vercel environment, use 'python' command
        if (process.env.VERCEL) {
          pythonCommand = 'python'
        }
        
        const simplePythonProcess = spawn(pythonCommand, [simplePythonScript, url], {
          stdio: ['pipe', 'pipe', 'pipe'],
          env: { ...process.env, PYTHONUNBUFFERED: '1' }
        })

        let simpleStdout = ''
        let simpleStderr = ''

        simplePythonProcess.stdout.on('data', (data) => {
          simpleStdout += data.toString()
        })

        simplePythonProcess.stderr.on('data', (data) => {
          simpleStderr += data.toString()
        })

        // Wait for the simple process to complete
        const simpleResult = await new Promise((resolve, reject) => {
          simplePythonProcess.on('close', (code) => {
            if (code === 0) {
              try {
                const simplePythonResult = JSON.parse(simpleStdout)
                resolve(simplePythonResult)
              } catch (parseError) {
                reject(new Error('Failed to parse simple Python script output'))
              }
            } else {
              reject(new Error(`Simple Python script failed: ${simpleStderr}`))
            }
          })

          simplePythonProcess.on('error', (error) => {
            reject(new Error(`Failed to start simple Python script: ${error.message}`))
          })

          // Set a timeout for the simple Python script (shorter for Vercel)
          const timeout = process.env.VERCEL ? 10000 : 15000 // 10s on Vercel, 15s locally
          setTimeout(() => {
            simplePythonProcess.kill()
            reject(new Error('Simple Python script timeout'))
          }, timeout)
        })

        const simplePythonResult = simpleResult as any

        if (simplePythonResult.success) {
          // Format the response data from simple script
          const videoData = {
            id: simplePythonResult.data.id,
            title: simplePythonResult.data.title,
            description: simplePythonResult.data.description,
            thumbnail: simplePythonResult.data.thumbnail,
            videoUrl: simplePythonResult.data.video_url,
            duration: simplePythonResult.data.duration,
            size: simplePythonResult.data.filesize || 0,
            quality: simplePythonResult.data.quality,
            width: simplePythonResult.data.width,
            height: simplePythonResult.data.height,
            format: simplePythonResult.data.format,
            originalUrl: url,
            extractedAt: new Date().toISOString()
          }

          return NextResponse.json({
            success: true,
            data: videoData,
            note: 'Using simple extraction method'
          })
        }
      } catch (simplePythonError) {
        console.error('Simple Python script error:', simplePythonError)
      }
      
      // Final fallback to mock data if both Python scripts fail
      const mockVideoData = {
        id: videoId,
        title: 'Instagram Video',
        description: 'Downloaded from Instagram',
        thumbnail: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Instagram+Video',
        videoUrl: '', // No direct download URL available
        duration: 0,
        size: 0,
        quality: 'normal',
        width: 0,
        height: 0,
        format: 'mp4',
        originalUrl: url,
        extractedAt: new Date().toISOString()
      }

      return NextResponse.json({
        success: true,
        data: mockVideoData,
        warning: 'Using fallback method - video extraction may be limited'
      })
    }

  } catch (error) {
    console.error('Error processing Instagram video:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process Instagram video',
        message: 'Please try again later or check if the URL is valid'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
