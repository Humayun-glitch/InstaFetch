# InstaFetch - Instagram Video Downloader

A production-ready Instagram video downloader micro-SaaS built with Next.js 15, TypeScript, and TailwindCSS.

## Features

- 🚀 **Fast & Free**: Download Instagram videos in seconds
- 📱 **Mobile-First**: Responsive design that works on all devices
- 🎨 **Modern UI**: Clean, minimal design with purple/blue gradient accents
- 🔒 **Privacy-Focused**: No registration required, no data storage
- 📊 **AdSense Ready**: Built-in Google AdSense integration
- ⚡ **Serverless**: Deployed entirely on Vercel

## Tech Stack

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **UI Components**: shadcn/ui
- **Backend**: Next.js API Routes (Python integration ready)
- **Hosting**: Vercel
- **Styling**: TailwindCSS with custom gradients

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Python 3.8+ (for Instagram video extraction)
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instafetch
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
# On Windows
scripts/setup_python.bat

# On Linux/Mac
chmod +x scripts/setup_python.sh
./scripts/setup_python.sh
```

4. Set up environment variables:
```bash
cp env.example .env.local
```

5. Update the `.env.local` file with your Google AdSense credentials:
```env
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx
```

6. Run the development server:
```bash
npm run dev
```

7. Test the Python Instagram downloader:
```bash
# Test with a sample Instagram URL
python scripts/instagram_downloader.py "https://www.instagram.com/p/example"

# Or test the simple version
python scripts/instagram_downloader_simple.py "https://www.instagram.com/p/example"
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
instafetch/
├── app/                    # Next.js 15 app directory
│   ├── api/               # API routes
│   │   └── extract/       # Instagram video extraction API
│   ├── about/             # About page
│   ├── download/          # Download results page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── AdSenseAd.tsx      # Google AdSense component
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header
│   └── StructuredData.tsx # SEO structured data
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Configuration

### Google AdSense Setup

1. Create a Google AdSense account
2. Get your AdSense client ID and slot IDs
3. Update the environment variables in `.env.local`
4. Replace the placeholder slot IDs in the components with your actual slot IDs

### Instagram Video Extraction

The application includes two Python scripts for Instagram video extraction:

1. **Advanced Script** (`scripts/instagram_downloader.py`):
   - Uses `yt-dlp` for robust video extraction
   - Supports multiple video formats and qualities
   - Better error handling and metadata extraction

2. **Simple Script** (`scripts/instagram_downloader_simple.py`):
   - Lightweight implementation using only `requests`
   - Fallback when `yt-dlp` is not available
   - Basic HTML parsing for video information

The API route automatically tries the advanced script first, then falls back to the simple script if needed.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## Features Overview

### Landing Page (`/`)
- Hero section with download form
- Feature highlights
- How it works section
- Google AdSense integration
- SEO optimized

### Download Page (`/download`)
- Video information display
- Download functionality
- Error handling
- AdSense integration

### About Page (`/about`)
- Service description
- FAQ section
- Usage instructions
- Platform support

### Privacy & Terms
- Comprehensive privacy policy
- Terms of service
- Legal compliance

## Customization

### Branding
- Update the gradient colors in `tailwind.config.ts`
- Modify the logo and favicon
- Customize the color scheme

### AdSense Integration
- Replace placeholder slot IDs with your actual AdSense slots
- Adjust ad placement and styling
- Configure ad types and formats

## API Endpoints

### POST `/api/extract`
Extracts Instagram video information and returns download links.

**Request:**
```json
{
  "url": "https://www.instagram.com/p/..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "video_id",
    "title": "Video Title",
    "description": "Video Description",
    "thumbnail": "thumbnail_url",
    "videoUrl": "download_url",
    "duration": 30,
    "size": 1048576,
    "quality": "normal"
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact us through the website.

---

Built with ❤️ by InstaFetch Team
