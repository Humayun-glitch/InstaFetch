#!/usr/bin/env python3
"""
Test script to verify Python dependencies are installed correctly
"""

import sys
import json

def test_imports():
    """Test if required modules can be imported"""
    try:
        import requests
        print("✓ requests module available")
    except ImportError:
        print("✗ requests module not found")
        return False
    
    try:
        import yt_dlp
        print("✓ yt-dlp module available")
        return True
    except ImportError:
        print("⚠ yt-dlp module not found (optional)")
        return True

def test_instagram_downloader():
    """Test the Instagram downloader scripts"""
    try:
        # Test the simple downloader
        from instagram_downloader_simple import SimpleInstagramDownloader
        downloader = SimpleInstagramDownloader()
        print("✓ Simple Instagram downloader can be instantiated")
        return True
    except Exception as e:
        print(f"✗ Simple Instagram downloader failed: {e}")
        return False

def main():
    """Main test function"""
    print("Testing InstaFetch Python installation...")
    print("=" * 50)
    
    success = True
    
    # Test imports
    print("\n1. Testing module imports:")
    if not test_imports():
        success = False
    
    # Test Instagram downloader
    print("\n2. Testing Instagram downloader:")
    if not test_instagram_downloader():
        success = False
    
    print("\n" + "=" * 50)
    if success:
        print("✓ All tests passed! Python setup is working correctly.")
        print("\nYou can now test with a real Instagram URL:")
        print("python scripts/instagram_downloader_simple.py 'https://www.instagram.com/p/example'")
    else:
        print("✗ Some tests failed. Please check your Python installation.")
        print("\nTry running:")
        print("pip install -r requirements.txt")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
