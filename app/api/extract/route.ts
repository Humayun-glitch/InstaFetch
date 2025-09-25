import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

    // Extract video using JavaScript-based approach
    const result = await extractVideo(url);
    
    if (result.success) {
      console.log('Video extracted:', { url, timestamp: new Date().toISOString() });
      
      return NextResponse.json({
        videoUrl: result.videoUrl,
        thumbnailUrl: result.thumbnailUrl || 'https://via.placeholder.com/500x500?text=Instagram+Video',
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

async function extractVideo(url: string): Promise<any> {
  try {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ];

    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];

    const response = await axios.get(url, {
      headers: {
        'User-Agent': randomUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Try to find video URL in meta tags
    let videoUrl = $('meta[property="og:video"]').attr('content') || 
                   $('meta[property="og:video:secure_url"]').attr('content');

    // If no video URL found, try to extract from JSON-LD
    if (!videoUrl) {
      const jsonLdScripts = $('script[type="application/ld+json"]');
      jsonLdScripts.each((i, script) => {
        try {
          const jsonData = JSON.parse($(script).html() || '{}');
          if (jsonData['@type'] === 'VideoObject' && jsonData.contentUrl) {
            videoUrl = jsonData.contentUrl;
            return false; // Break the loop
          }
        } catch (e) {
          // Continue to next script
        }
      });
    }

    // Try to extract from window._sharedData
    if (!videoUrl) {
      const scriptContent = $('script').text();
      const sharedDataMatch = scriptContent.match(/window\._sharedData\s*=\s*({.+?});/);
      if (sharedDataMatch) {
        try {
          const sharedData = JSON.parse(sharedDataMatch[1]);
          const media = sharedData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
          if (media?.is_video && media?.video_url) {
            videoUrl = media.video_url;
          }
        } catch (e) {
          // Continue with other methods
        }
      }
    }

    if (!videoUrl) {
      return { success: false, error: 'Could not find video URL. The post might be private or not a video.' };
    }

    // Extract other metadata
    const title = $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="description"]').attr('content') || 
                  'Instagram Video';
    
    const thumbnailUrl = $('meta[property="og:image"]').attr('content') || 
                         $('meta[property="og:image:secure_url"]').attr('content');

    // Try to extract author from various sources
    let author = 'Instagram User';
    const authorMeta = $('meta[property="og:description"]').attr('content');
    if (authorMeta) {
      const authorMatch = authorMeta.match(/by\s+@?(\w+)/i);
      if (authorMatch) {
        author = authorMatch[1];
      }
    }

    return {
      success: true,
      videoUrl,
      thumbnailUrl,
      title,
      author
    };

  } catch (error: any) {
    console.error('Extraction error:', error);
    return { 
      success: false, 
      error: 'Failed to extract video. Please try again or check if the URL is valid.' 
    };
  }
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