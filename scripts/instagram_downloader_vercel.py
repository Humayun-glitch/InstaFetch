#!/usr/bin/env python3
"""
Vercel-optimized Instagram Video Downloader
Optimized for serverless environments with minimal dependencies
"""

import json
import sys
import re
import requests
from urllib.parse import urlparse, parse_qs
from typing import Dict, Optional, Any

class VercelInstagramDownloader:
    def __init__(self):
        self.session = requests.Session()
        # Optimized headers for serverless environment
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; InstaFetch/1.0; +https://instafetch.app)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
        })
        # Set timeout for serverless environment
        self.timeout = 10
    
    def extract_video_id(self, url: str) -> Optional[str]:
        """Extract video ID from Instagram URL"""
        patterns = [
            r'instagram\.com/p/([A-Za-z0-9_-]+)',
            r'instagram\.com/reel/([A-Za-z0-9_-]+)',
            r'instagram\.com/tv/([A-Za-z0-9_-]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None
    
    def extract_video_info_from_html(self, html: str, video_id: str) -> Dict[str, Any]:
        """Extract video information from Instagram HTML page"""
        try:
            # Look for JSON-LD structured data
            json_ld_pattern = r'<script type="application/ld\+json">(.*?)</script>'
            json_ld_matches = re.findall(json_ld_pattern, html, re.DOTALL)
            
            for json_ld in json_ld_matches:
                try:
                    data = json.loads(json_ld)
                    if isinstance(data, dict) and 'videoObject' in data:
                        video_obj = data['videoObject']
                        return {
                            'id': video_id,
                            'title': video_obj.get('name', 'Instagram Video'),
                            'description': video_obj.get('description', ''),
                            'thumbnail': video_obj.get('thumbnailUrl', ''),
                            'video_url': video_obj.get('contentUrl', ''),
                            'duration': video_obj.get('duration', 0),
                            'width': video_obj.get('width', 0),
                            'height': video_obj.get('height', 0),
                            'format': 'mp4',
                            'quality': 'normal'
                        }
                except json.JSONDecodeError:
                    continue
            
            # Look for meta tags (more reliable in serverless)
            title_match = re.search(r'<meta property="og:title" content="([^"]*)"', html)
            description_match = re.search(r'<meta property="og:description" content="([^"]*)"', html)
            image_match = re.search(r'<meta property="og:image" content="([^"]*)"', html)
            video_match = re.search(r'<meta property="og:video" content="([^"]*)"', html)
            
            # Try to find video URL in script tags
            video_url = ''
            if not video_match:
                # Look for video URLs in script content
                video_pattern = r'"video_url":"([^"]*)"'
                video_url_match = re.search(video_pattern, html)
                if video_url_match:
                    video_url = video_url_match.group(1)
            
            return {
                'id': video_id,
                'title': title_match.group(1) if title_match else 'Instagram Video',
                'description': description_match.group(1) if description_match else '',
                'thumbnail': image_match.group(1) if image_match else '',
                'video_url': video_match.group(1) if video_match else video_url,
                'duration': 0,
                'width': 0,
                'height': 0,
                'format': 'mp4',
                'quality': 'normal'
            }
            
        except Exception as e:
            raise Exception(f"Failed to parse HTML: {str(e)}")
    
    def get_video_info(self, url: str) -> Dict[str, Any]:
        """Get video information from Instagram URL"""
        try:
            video_id = self.extract_video_id(url)
            if not video_id:
                raise Exception("Could not extract video ID from URL")
            
            # Fetch the Instagram page with optimized settings
            response = self.session.get(url, timeout=self.timeout)
            response.raise_for_status()
            
            # Extract video information from HTML
            video_info = self.extract_video_info_from_html(response.text, video_id)
            
            # If no direct video URL found, provide a fallback
            if not video_info.get('video_url'):
                video_info['video_url'] = f"https://instagram.com/p/{video_id}/"
                video_info['note'] = 'Direct download URL not available - Instagram may require authentication'
            
            return video_info
            
        except requests.RequestException as e:
            raise Exception(f"Failed to fetch Instagram page: {str(e)}")
        except Exception as e:
            raise Exception(f"Failed to extract video info: {str(e)}")
    
    def download_video(self, url: str) -> Dict[str, Any]:
        """Download Instagram video and return information"""
        try:
            video_info = self.get_video_info(url)
            
            return {
                'success': True,
                'data': video_info
            }
                
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

def main():
    """Main function to handle command line usage"""
    if len(sys.argv) != 2:
        print(json.dumps({
            'success': False,
            'error': 'Usage: python instagram_downloader_vercel.py <instagram_url>'
        }))
        sys.exit(1)
    
    url = sys.argv[1]
    downloader = VercelInstagramDownloader()
    
    try:
        result = downloader.download_video(url)
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()
