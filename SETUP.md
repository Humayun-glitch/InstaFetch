# InstaFetch Setup Guide

This guide will help you set up InstaFetch with Python Instagram video extraction.

## Prerequisites

### Required Software
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Python 3.8+** - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)

### Verify Installation
```bash
# Check Node.js
node --version

# Check Python
python --version

# Check pip
pip --version
```

## Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd instafetch
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Python Dependencies

#### Option A: Automatic Setup (Recommended)
```bash
# On Windows
scripts/setup_python.bat

# On Linux/Mac
chmod +x scripts/setup_python.sh
./scripts/setup_python.sh
```

#### Option B: Manual Setup
```bash
# Install Python packages
pip install -r requirements.txt

# Verify installation
python scripts/test_installation.py
```

### 4. Environment Configuration
```bash
# Copy environment template
cp env.example .env.local
```

Edit `.env.local` with your settings:
```env
# Google AdSense (optional for development)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx

# Development settings
NODE_ENV=development
```

### 5. Test the Installation

#### Test Python Scripts
```bash
# Test the simple downloader
python scripts/instagram_downloader_simple.py "https://www.instagram.com/p/example"

# Test the advanced downloader (if yt-dlp is installed)
python scripts/instagram_downloader.py "https://www.instagram.com/p/example"
```

#### Test the Full Application
```bash
# Start the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Troubleshooting

### Python Issues

#### "Python not found" Error
- Make sure Python is installed and added to PATH
- Try using `python3` instead of `python`
- On Windows, you may need to use `py` command

#### "Module not found" Error
```bash
# Reinstall Python dependencies
pip install -r requirements.txt

# Or install individually
pip install requests yt-dlp
```

#### yt-dlp Installation Issues
```bash
# Try upgrading pip first
pip install --upgrade pip

# Install yt-dlp with specific version
pip install yt-dlp>=2023.12.30
```

### Node.js Issues

#### "Module not found" Error
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Instagram Download
1. Go to http://localhost:3000
2. Paste an Instagram video URL
3. Click "Download"
4. Check the browser console for any errors

### 3. Debug Python Scripts
```bash
# Test individual scripts
python scripts/instagram_downloader_simple.py "https://www.instagram.com/p/your-video-id"

# Check script output
python scripts/test_installation.py
```

## Production Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Python on Vercel
Vercel supports Python through serverless functions. The Python scripts will work in the Vercel environment.

## File Structure
```
instafetch/
├── scripts/
│   ├── instagram_downloader.py          # Advanced Python script (with yt-dlp)
│   ├── instagram_downloader_simple.py    # Simple Python script (requests only)
│   ├── setup_python.sh                   # Linux/Mac setup script
│   ├── setup_python.bat                  # Windows setup script
│   └── test_installation.py              # Installation test script
├── app/
│   └── api/
│       └── extract/
│           └── route.ts                  # Next.js API route (calls Python)
├── requirements.txt                       # Python dependencies
└── package.json                          # Node.js dependencies
```

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Verify all dependencies are installed correctly
3. Test the Python scripts individually
4. Check the GitHub issues for similar problems

## Next Steps

Once setup is complete:

1. **Configure AdSense**: Add your Google AdSense credentials
2. **Test with Real URLs**: Try downloading actual Instagram videos
3. **Customize Branding**: Update colors, logos, and content
4. **Deploy to Production**: Push to Vercel for live deployment
