#!/bin/bash

# Railway deployment script for InstaFetch
echo "🚀 Deploying InstaFetch to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Initialize Railway project
echo "📦 Initializing Railway project..."
railway init

# Set environment variables
echo "⚙️ Setting up environment variables..."
railway variables set NODE_ENV=production
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at the Railway URL"
echo ""
echo "Next steps:"
echo "1. Update your AdSense credentials in Railway dashboard"
echo "2. Test your Instagram video downloader"
echo "3. Configure custom domain (optional)"
