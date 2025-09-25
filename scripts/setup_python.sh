#!/bin/bash

# Setup script for Python dependencies
echo "Setting up Python environment for InstaFetch..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "Error: pip3 is not installed. Please install pip3."
    exit 1
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt

# Check if yt-dlp is working
echo "Testing yt-dlp installation..."
python3 -c "import yt_dlp; print('yt-dlp is working correctly')"

echo "Python setup completed successfully!"
echo ""
echo "To test the Instagram downloader:"
echo "python3 scripts/instagram_downloader.py 'https://www.instagram.com/p/example'"
