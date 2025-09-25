#!/bin/bash

# Vercel build script for InstaFetch
echo "Building InstaFetch for Vercel deployment..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Test Python installation
echo "Testing Python installation..."
python scripts/instagram_downloader_vercel.py "https://www.instagram.com/p/test" || echo "Python test failed - continuing with build"

# Build Next.js application
echo "Building Next.js application..."
npm run build

echo "Vercel build completed successfully!"
