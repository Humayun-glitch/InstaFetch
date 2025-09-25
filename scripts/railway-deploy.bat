@echo off
echo 🚀 Deploying InstaFetch to Railway...

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Railway CLI not found. Installing...
    npm install -g @railway/cli
)

REM Login to Railway
echo 🔐 Logging into Railway...
railway login

REM Initialize Railway project
echo 📦 Initializing Railway project...
railway init

REM Set environment variables
echo ⚙️ Setting up environment variables...
railway variables set NODE_ENV=production
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx

REM Deploy to Railway
echo 🚀 Deploying to Railway...
railway up

echo ✅ Deployment complete!
echo 🌐 Your app should be available at the Railway URL
echo.
echo Next steps:
echo 1. Update your AdSense credentials in Railway dashboard
echo 2. Test your Instagram video downloader
echo 3. Configure custom domain (optional)
pause
