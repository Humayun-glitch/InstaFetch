# InstaFetch - Instagram Video Downloader

Fast, free, and simple Instagram video downloader built with Next.js 15.

## 🚀 Features

- **Fast Downloads**: Lightning-fast Instagram video extraction and download
- **No Registration**: Start downloading immediately without creating an account
- **100% Free**: Completely free with no hidden charges
- **Mobile Responsive**: Works perfectly on all devices
- **SEO Optimized**: Optimized for search engines with proper meta tags
- **AdSense Integration**: Monetization through Google AdSense
- **Analytics Tracking**: Track download counts and user behavior

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Styling**: TailwindCSS with custom gradients
- **Icons**: Lucide React
- **Deployment**: Vercel (frontend), Railway/Render (if needed for backend)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd instafetch
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxx
```

5. Run development server:
```bash
npm run dev
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the following SQL to create the analytics table:

```sql
-- Analytics table for tracking downloads
CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policy for inserting analytics data
CREATE POLICY "Allow insert analytics" ON analytics
  FOR INSERT WITH CHECK (true);

-- Downloads log table
CREATE TABLE download_logs (
  id BIGSERIAL PRIMARY KEY,
  instagram_url TEXT NOT NULL,
  video_url TEXT,
  title TEXT,
  author TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert download_logs" ON download_logs
  FOR INSERT WITH CHECK (true);
```

### Google AdSense Setup

1. Apply for Google AdSense approval
2. Get your AdSense client ID
3. Update the client ID in `app/layout.tsx` and `components/AdSenseAd.tsx`
4. Place ad units strategically on pages

### Instagram Video Extraction

The current implementation uses a mock API. For production, implement actual Instagram video extraction using:

1. **instagram-private-api** npm package
2. **Puppeteer** for web scraping
3. **Third-party APIs** like RapidAPI
4. **yt-dlp** or similar tools

Example implementation in `app/api/extract/route.ts`:

```typescript
// Replace mock implementation with actual extraction
import { IgApiClient } from 'instagram-private-api';

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  
  // Extract video using instagram-private-api or similar
  const videoData = await extractInstagramVideo(url);
  
  return NextResponse.json(videoData);
}
```

## 📱 Pages

- **/** - Landing page with URL input and SEO optimization
- **/download** - Results page with video preview and download link
- **/about** - About page with instructions and FAQ

## 🔍 SEO Features

- Optimized meta tags for Instagram video download keywords
- Open Graph and Twitter Card support
- Structured data markup
- Mobile-first responsive design
- Fast loading with optimized images

## 📊 Analytics & Monitoring

The app includes:
- Download count tracking
- User behavior analytics
- Error logging
- Performance monitoring hooks

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Custom Domain Setup

1. Add custom domain in Vercel
2. Configure DNS records
3. Update `NEXT_PUBLIC_SITE_URL` environment variable

## 🛡 Security & Legal

- Respects Instagram's robots.txt
- Only downloads public videos
- No personal data collection without consent
- GDPR compliant (when properly configured)
- Rate limiting on API endpoints

## 🔄 Future Enhancements

- [ ] Bulk video downloads
- [ ] Video quality selection
- [ ] Download history
- [ ] User accounts (optional)
- [ ] Browser extension
- [ ] API for developers
- [ ] Support for Instagram Stories
- [ ] Video format conversion

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This tool is for educational and personal use only. Users are responsible for complying with Instagram's Terms of Service and applicable copyright laws. The developers are not responsible for any misuse of this tool.