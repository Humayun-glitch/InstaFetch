# InstaFetch Vercel Deployment Guide

This guide will help you deploy InstaFetch to Vercel with Python Instagram video extraction.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Python 3.8+ (Vercel supports Python in serverless functions)

## Deployment Steps

### 1. Prepare Your Repository

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Verify all files are included**:
   - `vercel.json` - Vercel configuration
   - `requirements.txt` - Python dependencies
   - `scripts/` - Python scripts
   - All Next.js files

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: instafetch
# - Directory: ./
# - Override settings? No
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Configure Environment Variables

In Vercel Dashboard → Project → Settings → Environment Variables:

```env
# Required
NODE_ENV=production

# Optional (for AdSense)
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx

# Vercel-specific
VERCEL=1
```

### 4. Configure Python Runtime

Vercel will automatically detect Python dependencies from `requirements.txt`.

**Important**: The Python scripts are optimized for Vercel's serverless environment:
- Shorter timeouts (10-15 seconds)
- Minimal dependencies
- Optimized for cold starts

### 5. Test Deployment

1. **Check deployment status** in Vercel dashboard
2. **Test the API endpoint**:
   ```bash
   curl -X POST https://your-app.vercel.app/api/extract \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.instagram.com/p/example"}'
   ```

3. **Test the frontend**:
   - Visit your Vercel URL
   - Try downloading an Instagram video
   - Check browser console for errors

## Vercel-Specific Optimizations

### 1. Python Script Optimization
- **Vercel-optimized script**: `scripts/instagram_downloader_vercel.py`
- **Shorter timeouts**: 10-15 seconds (Vercel limit)
- **Minimal dependencies**: Only `requests` library
- **Error handling**: Graceful fallbacks

### 2. API Route Configuration
- **Function timeout**: 30 seconds (Vercel limit)
- **Memory limit**: 1024MB (Vercel limit)
- **Cold start optimization**: Pre-warmed functions

### 3. Build Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "functions": {
    "app/api/extract/route.ts": {
      "maxDuration": 30
    }
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Python Not Found
**Error**: `Python not found`
**Solution**: 
- Vercel automatically installs Python 3.8+
- Check `requirements.txt` is in root directory
- Verify Python scripts are executable

#### 2. Import Errors
**Error**: `Module not found`
**Solution**:
- Check `requirements.txt` dependencies
- Ensure all imports are available
- Use Vercel-optimized script

#### 3. Timeout Errors
**Error**: `Function timeout`
**Solution**:
- Reduce timeout in Python scripts
- Use simpler extraction methods
- Add more fallback options

#### 4. Build Failures
**Error**: `Build failed`
**Solution**:
- Check `vercel.json` configuration
- Verify all files are committed
- Check Python dependencies

### Debugging

#### 1. Check Function Logs
```bash
# View function logs
vercel logs your-project-name

# View specific function
vercel logs your-project-name --function=api/extract
```

#### 2. Test Python Scripts Locally
```bash
# Test Vercel-optimized script
python scripts/instagram_downloader_vercel.py "https://www.instagram.com/p/example"

# Test simple script
python scripts/instagram_downloader_simple.py "https://www.instagram.com/p/example"
```

#### 3. Check Environment Variables
```bash
# In Vercel dashboard
# Settings → Environment Variables
# Ensure all required variables are set
```

## Performance Optimization

### 1. Cold Start Optimization
- Use Vercel-optimized Python script
- Minimize dependencies
- Optimize imports

### 2. Function Optimization
- Shorter timeouts
- Better error handling
- Graceful fallbacks

### 3. Caching
- Vercel automatically caches static assets
- API responses are cached by default
- Consider adding Redis for video metadata

## Monitoring

### 1. Vercel Analytics
- View function execution times
- Monitor error rates
- Check cold start performance

### 2. Custom Logging
```typescript
// In API route
console.log('Processing video:', videoId);
console.error('Python error:', error);
```

### 3. Health Checks
```bash
# Test API health
curl https://your-app.vercel.app/api/extract \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/p/test"}'
```

## Production Checklist

- [ ] All files committed to GitHub
- [ ] Environment variables configured
- [ ] Python dependencies working
- [ ] API endpoint responding
- [ ] Frontend loading correctly
- [ ] Instagram video extraction working
- [ ] Error handling in place
- [ ] Performance optimized
- [ ] Monitoring configured

## Support

If you encounter issues:

1. Check Vercel function logs
2. Test Python scripts locally
3. Verify environment variables
4. Check GitHub issues
5. Contact Vercel support

## Next Steps

After successful deployment:

1. **Configure custom domain** (optional)
2. **Set up monitoring** and analytics
3. **Optimize performance** based on usage
4. **Add more features** as needed
5. **Scale as traffic grows**

---

**Deployment URL**: `https://your-app.vercel.app`
**Status**: ✅ Ready for production
