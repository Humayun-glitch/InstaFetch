import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate Instagram URL
    const instagramRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
    if (!instagramRegex.test(url)) {
      return NextResponse.json(
        { error: 'Invalid Instagram URL. Please provide a valid Instagram post or reel URL.' },
        { status: 400 }
      );
    }

    // Use Python script for extraction
    const result = await extractWithPython(url);
    
    if (result.success) {
      // Log the extraction for analytics
      console.log('Video extracted:', { url, timestamp: new Date().toISOString() });
      
      return NextResponse.json({
        videoUrl: result.video_url,
        thumbnailUrl: result.thumbnail_url || 'https://via.placeholder.com/500x500?text=Instagram+Video',
        title: result.title || 'Instagram Video',
        author: result.author || 'Instagram User'
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to extract video. Please try again or check if the URL is valid.' },
        { status: 404 }
      );
    }
    
  } catch (error: any) {
    console.error('Video extraction error:', error);
    
    return NextResponse.json(
      { error: 'Failed to extract video. Please try again or check if the URL is valid.' },
      { status: 500 }
    );
  }
}

async function extractWithPython(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(process.cwd(), 'instagram_extractor.py');
    const python = spawn('python', [pythonScript, url]);
    
    let output = '';
    let error = '';
    
    python.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    python.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    python.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output);
          resolve(result);
        } catch (parseError) {
          console.error('Failed to parse Python output:', parseError);
          resolve({ success: false, error: 'Failed to parse extraction result' });
        }
      } else {
        console.error('Python script failed:', error);
        resolve({ success: false, error: 'Python extraction failed' });
      }
    });
    
    python.on('error', (err) => {
      console.error('Failed to start Python process:', err);
      resolve({ success: false, error: 'Failed to start Python process' });
    });
    
    // Set timeout for Python process
    setTimeout(() => {
      python.kill();
      resolve({ success: false, error: 'Python extraction timed out' });
    }, 30000); // 30 second timeout
  });
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}