#!/usr/bin/env python3
"""
Instagram Video Extractor
A Python script to extract Instagram videos using multiple methods
"""

import sys
import json
import re
import requests
import yt_dlp
from urllib.parse import urlparse, parse_qs
import instaloader
import os
from typing import Dict, Optional, Tuple

class InstagramExtractor:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
    def extract_video_info(self, url: str) -> Dict:
        """
        Extract video information from Instagram URL using multiple methods
        """
        try:
            # Clean the URL
            clean_url = self._clean_url(url)
            
            # Method 1: Try yt-dlp (most reliable)
            result = self._extract_with_ytdlp(clean_url)
            if result:
                return result
            
            # Method 2: Try instaloader
            result = self._extract_with_instaloader(clean_url)
            if result:
                return result
            
            # Method 3: Try direct scraping
            result = self._extract_with_scraping(clean_url)
            if result:
                return result
            
            return {
                'error': 'Could not extract video. The post might be private, not a video, or Instagram has changed their structure.',
                'success': False
            }
            
        except Exception as e:
            return {
                'error': f'Extraction failed: {str(e)}',
                'success': False
            }
    
    def _clean_url(self, url: str) -> str:
        """Clean Instagram URL"""
        if '?' in url:
            url = url.split('?')[0]
        if not url.startswith('http'):
            url = 'https://' + url
        return url
    
    def _extract_with_ytdlp(self, url: str) -> Optional[Dict]:
        """Extract video using yt-dlp"""
        try:
            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                'extract_flat': False,
                'format': 'best[ext=mp4]/best',
                'noplaylist': True,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                if info and 'url' in info:
                    return {
                        'success': True,
                        'video_url': info['url'],
                        'title': info.get('title', 'Instagram Video'),
                        'author': info.get('uploader', 'Instagram User'),
                        'thumbnail_url': info.get('thumbnail', ''),
                        'duration': info.get('duration', 0),
                        'method': 'yt-dlp'
                    }
        except Exception as e:
            print(f"yt-dlp method failed: {e}")
            return None
    
    def _extract_with_instaloader(self, url: str) -> Optional[Dict]:
        """Extract video using instaloader"""
        try:
            L = instaloader.Instaloader(
                download_pictures=False,
                download_videos=False,
                download_video_thumbnails=False,
                download_geotags=False,
                download_comments=False,
                save_metadata=False,
                compress_json=False
            )
            
            # Extract shortcode from URL
            shortcode = self._extract_shortcode(url)
            if not shortcode:
                return None
            
            post = instaloader.Post.from_shortcode(L.context, shortcode)
            
            if post.is_video and post.video_url:
                return {
                    'success': True,
                    'video_url': post.video_url,
                    'title': post.caption[:100] if post.caption else 'Instagram Video',
                    'author': f'@{post.owner_username}' if post.owner_username else 'Instagram User',
                    'thumbnail_url': post.url,
                    'duration': post.video_duration,
                    'method': 'instaloader'
                }
        except Exception as e:
            print(f"instaloader method failed: {e}")
            return None
    
    def _extract_with_scraping(self, url: str) -> Optional[Dict]:
        """Extract video using direct scraping"""
        try:
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            # Look for video URLs in the page content
            video_url = self._find_video_url_in_content(response.text)
            
            if video_url:
                # Extract metadata from page
                title, author, thumbnail = self._extract_metadata(response.text)
                
                return {
                    'success': True,
                    'video_url': video_url,
                    'title': title,
                    'author': author,
                    'thumbnail_url': thumbnail,
                    'method': 'scraping'
                }
        except Exception as e:
            print(f"Scraping method failed: {e}")
            return None
    
    def _extract_shortcode(self, url: str) -> Optional[str]:
        """Extract Instagram shortcode from URL"""
        patterns = [
            r'instagram\.com/p/([^/]+)',
            r'instagram\.com/reel/([^/]+)',
            r'instagram\.com/tv/([^/]+)',
        ]
        
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None
    
    def _find_video_url_in_content(self, content: str) -> Optional[str]:
        """Find video URL in page content"""
        patterns = [
            r'"video_url":"([^"]+)"',
            r'"playback_url":"([^"]+)"',
            r'"url":"([^"]*\.mp4[^"]*)"',
            r'https://[^"]*\.mp4[^"]*',
            r'https://[^"]*cdninstagram[^"]*\.mp4[^"]*',
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content)
            for match in matches:
                if isinstance(match, tuple):
                    match = match[0]
                if '.mp4' in match:
                    return match.replace('\\u0026', '&').replace('\\', '')
        return None
    
    def _extract_metadata(self, content: str) -> Tuple[str, str, str]:
        """Extract title, author, and thumbnail from page content"""
        title = 'Instagram Video'
        author = 'Instagram User'
        thumbnail = ''
        
        try:
            # Extract title from meta tags
            title_match = re.search(r'<meta property="og:title" content="([^"]+)"', content)
            if title_match:
                title = title_match.group(1)
            
            # Extract author from meta tags
            desc_match = re.search(r'<meta property="og:description" content="([^"]+)"', content)
            if desc_match:
                desc = desc_match.group(1)
                if '@' in desc:
                    author = '@' + desc.split('@')[1].split(' ')[0]
            
            # Extract thumbnail from meta tags
            img_match = re.search(r'<meta property="og:image" content="([^"]+)"', content)
            if img_match:
                thumbnail = img_match.group(1)
                
        except Exception as e:
            print(f"Metadata extraction failed: {e}")
        
        return title, author, thumbnail

def main():
    """Main function to handle command line usage"""
    if len(sys.argv) != 2:
        print(json.dumps({
            'error': 'Usage: python instagram_extractor.py <instagram_url>',
            'success': False
        }))
        sys.exit(1)
    
    url = sys.argv[1]
    extractor = InstagramExtractor()
    result = extractor.extract_video_info(url)
    
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
