# InstaFetch Vercel Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All files committed to Git
- [ ] No TypeScript errors (`npm run lint`)
- [ ] All components working locally
- [ ] Python scripts tested locally
- [ ] API endpoints responding correctly

### ✅ Vercel Configuration
- [ ] `vercel.json` configured correctly
- [ ] `requirements.txt` includes all Python dependencies
- [ ] `.vercelignore` excludes unnecessary files
- [ ] Build scripts configured in `package.json`

### ✅ Python Scripts
- [ ] `scripts/instagram_downloader_vercel.py` - Vercel-optimized
- [ ] `scripts/instagram_downloader_simple.py` - Fallback script
- [ ] Both scripts tested with sample URLs
- [ ] Error handling implemented
- [ ] Timeout configurations set

### ✅ Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `VERCEL=1` (automatically set by Vercel)
- [ ] AdSense credentials (if using ads)
- [ ] Any other required environment variables

## Deployment Steps

### 1. Final Validation
```bash
# Run validation script
node scripts/validate-deployment.js

# Test locally
npm run build
npm start
```

### 2. Git Commit
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Follow prompts:
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
4. Configure settings:
   - **Framework**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 4. Configure Environment Variables
In Vercel Dashboard → Project → Settings → Environment Variables:
```env
NODE_ENV=production
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx
```

### 5. Test Deployment
```bash
# Test API endpoint
curl -X POST https://your-app.vercel.app/api/extract \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/p/example"}'

# Test frontend
# Visit https://your-app.vercel.app
```

## Post-Deployment Checklist

### ✅ Function Testing
- [ ] API endpoint responding
- [ ] Python scripts executing
- [ ] Error handling working
- [ ] Timeout handling working
- [ ] Fallback mechanisms working

### ✅ Frontend Testing
- [ ] Landing page loading
- [ ] Download form working
- [ ] Results page displaying
- [ ] Error messages showing
- [ ] Mobile responsiveness

### ✅ Performance Testing
- [ ] Page load times acceptable
- [ ] API response times acceptable
- [ ] No memory leaks
- [ ] Cold start performance

### ✅ Monitoring Setup
- [ ] Vercel Analytics enabled
- [ ] Function logs accessible
- [ ] Error tracking configured
- [ ] Performance monitoring

## Troubleshooting

### Common Issues

#### Build Failures
- Check `vercel.json` configuration
- Verify all files are committed
- Check Python dependencies
- Review build logs

#### Function Timeouts
- Reduce Python script timeouts
- Optimize extraction methods
- Add more fallback options
- Check Vercel function limits

#### Python Import Errors
- Verify `requirements.txt`
- Check Python version compatibility
- Test scripts locally first
- Review function logs

#### API Errors
- Check environment variables
- Verify Python script paths
- Test with sample URLs
- Review error logs

### Debug Commands
```bash
# Check function logs
vercel logs your-project-name

# Test Python scripts locally
python scripts/instagram_downloader_vercel.py "https://www.instagram.com/p/test"

# Validate deployment
node scripts/validate-deployment.js
```

## Success Criteria

- [ ] ✅ All validations passed
- [ ] ✅ Deployment successful
- [ ] ✅ API endpoints working
- [ ] ✅ Frontend loading correctly
- [ ] ✅ Instagram video extraction working
- [ ] ✅ Error handling functioning
- [ ] ✅ Performance acceptable
- [ ] ✅ Monitoring configured

## Next Steps After Deployment

1. **Configure custom domain** (optional)
2. **Set up monitoring** and analytics
3. **Test with real Instagram URLs**
4. **Optimize performance** based on usage
5. **Add more features** as needed
6. **Scale as traffic grows**

---

**Status**: ✅ Ready for Vercel deployment
**Last Updated**: $(date)
**Version**: 1.0.0
