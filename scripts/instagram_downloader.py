#!/usr/bin/env python3
"""
Instagram Video Downloader
A Python script to extract and download Instagram videos using yt-dlp
"""

import json
import sys
import os
import re
import requests
from urllib.parse import urlparse, parse_qs
import subprocess
import tempfile
from typing import Dict, Optional, Any

class InstagramDownloader:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
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
    
    def get_video_info_ytdlp(self, url: str) -> Dict[str, Any]:
        """Get video information using yt-dlp"""
        try:
            # Use yt-dlp to extract video information
            cmd = [
                'yt-dlp',
                '--dump-json',
                '--no-download',
                '--no-warnings',
                url
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            
            if result.returncode != 0:
                raise Exception(f"yt-dlp failed: {result.stderr}")
            
            # Parse the JSON output
            video_info = json.loads(result.stdout)
            
            # Extract relevant information
            formats = video_info.get('formats', [])
            video_format = None
            
            # Find the best video format (prefer mp4, then by quality)
            for fmt in formats:
                if fmt.get('ext') == 'mp4' and fmt.get('vcodec') != 'none':
                    if not video_format or fmt.get('height', 0) > video_format.get('height', 0):
                        video_format = fmt
            
            if not video_format:
                # Fallback to any video format
                for fmt in formats:
                    if fmt.get('vcodec') != 'none':
                        video_format = fmt
                        break
            
            if not video_format:
                raise Exception("No suitable video format found")
            
            return {
                'id': video_info.get('id', ''),
                'title': video_info.get('title', 'Instagram Video'),
                'description': video_info.get('description', ''),
                'thumbnail': video_info.get('thumbnail', ''),
                'video_url': video_format.get('url', ''),
                'duration': video_info.get('duration', 0),
                'width': video_format.get('width', 0),
                'height': video_format.get('height', 0),
                'filesize': video_format.get('filesize', 0),
                'format': video_format.get('ext', 'mp4'),
                'quality': f"{video_format.get('height', 0)}p" if video_format.get('height') else 'normal'
            }
            
        except subprocess.TimeoutExpired:
            raise Exception("Request timeout - Instagram may be blocking the request")
        except json.JSONDecodeError:
            raise Exception("Invalid response from Instagram")
        except Exception as e:
            raise Exception(f"Failed to extract video info: {str(e)}")
    
    def get_video_info_requests(self, url: str) -> Dict[str, Any]:
        """Alternative method using requests (fallback)"""
        try:
            # This is a simplified approach - in production you'd need more sophisticated scraping
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            # Extract basic info from HTML (this is a simplified version)
            # In a real implementation, you'd parse the JSON-LD or meta tags
            video_id = self.extract_video_id(url)
            
            return {
                'id': video_id or 'unknown',
                'title': 'Instagram Video',
                'description': 'Downloaded from Instagram',
                'thumbnail': '',
                'video_url': '',  # Would need more complex extraction
                'duration': 0,
                'width': 0,
                'height': 0,
                'filesize': 0,
                'format': 'mp4',
                'quality': 'normal'
            }
            
        except requests.RequestException as e:
            raise Exception(f"Failed to fetch video info: {str(e)}")
    
    def download_video(self, url: str, output_path: str = None) -> Dict[str, Any]:
        """Download Instagram video and return information"""
        try:
            # First try yt-dlp method
            try:
                video_info = self.get_video_info_ytdlp(url)
            except Exception:
                # Fallback to requests method
                video_info = self.get_video_info_requests(url)
            
            # If we have a video URL, we can provide it for download
            if video_info.get('video_url'):
                return {
                    'success': True,
                    'data': video_info
                }
            else:
                return {
                    'success': False,
                    'error': 'Could not extract video URL'
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
            'error': 'Usage: python instagram_downloader.py <instagram_url>'
        }))
        sys.exit(1)
    
    url = sys.argv[1]
    downloader = InstagramDownloader()
    
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
