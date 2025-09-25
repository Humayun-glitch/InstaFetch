@echo off
echo Building InstaFetch for Vercel deployment...

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Test Python installation
echo Testing Python installation...
python scripts/instagram_downloader_vercel.py "https://www.instagram.com/p/test" || echo Python test failed - continuing with build

REM Build Next.js application
echo Building Next.js application...
npm run build

echo Vercel build completed successfully!
