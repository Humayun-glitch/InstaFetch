# Railway Deployment Guide for InstaFetch

This guide will help you deploy InstaFetch to Railway, a modern cloud platform that supports both Node.js and Python.

## Prerequisites

- Railway account ([Sign up here](https://railway.app))
- Git repository (GitHub, GitLab, or Bitbucket)
- Railway CLI (optional but recommended)

## Method 1: Deploy via Railway Dashboard (Recommended)

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Railway deployment"
   git push origin main
   ```

2. **Ensure all files are committed**:
   - `railway.json` - Railway configuration
   - `nixpacks.toml` - Build configuration
   - `Procfile` - Process definition
   - `requirements.txt` - Python dependencies
   - `package.json` - Node.js dependencies

### Step 2: Connect to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your InstaFetch repository**
5. **Click "Deploy Now"**

### Step 3: Configure Environment Variables

In the Railway dashboard, go to your project → Variables tab and add:

```env
NODE_ENV=production
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx
```

### Step 4: Configure Build Settings

Railway will automatically detect this as a Next.js project. The build process will:

1. Install Node.js dependencies (`npm install`)
2. Install Python dependencies (`pip install -r requirements.txt`)
3. Build the Next.js application (`npm run build`)
4. Start the application (`npm start`)

## Method 2: Deploy via Railway CLI

### Step 1: Install Railway CLI

```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Or use npx
npx @railway/cli
```

### Step 2: Login and Initialize

```bash
# Login to Railway
railway login

# Initialize project
railway init

# Link to existing project (if you have one)
railway link
```

### Step 3: Set Environment Variables

```bash
# Set production environment
railway variables set NODE_ENV=production

# Set your AdSense credentials
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxx
railway variables set NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=xxxxxxxxxx
```

### Step 4: Deploy

```bash
# Deploy to Railway
railway up

# Or use the npm script
npm run railway:deploy
```

## Method 3: Automated Deployment Script

### Windows
```bash
scripts/railway-deploy.bat
```

### Linux/Mac
```bash
chmod +x scripts/railway-deploy.sh
./scripts/railway-deploy.sh
```

## Configuration Files Explained

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["python3", "pip"]

[phases.install]
cmds = [
  "npm install",
  "pip install -r requirements.txt"
]

[phases.build]
cmds = [
  "npm run build"
]

[start]
cmd = "npm start"
```

### `Procfile`
```
web: npm start
```

## Post-Deployment Configuration

### 1. Update AdSense Settings

1. Go to your Railway project dashboard
2. Navigate to Variables tab
3. Update the AdSense credentials:
   ```
   NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID=your-actual-client-id
   NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID=your-actual-slot-id
   ```

### 2. Test Your Application

1. **Visit your Railway URL** (provided in the dashboard)
2. **Test Instagram video download** with a real URL
3. **Check the logs** for any Python script errors
4. **Verify AdSense ads** are displaying correctly

### 3. Custom Domain (Optional)

1. Go to your Railway project → Settings
2. Click "Custom Domains"
3. Add your domain
4. Configure DNS records as instructed

## Troubleshooting

### Common Issues

#### 1. Python Dependencies Not Installing
```bash
# Check if requirements.txt is in the root directory
ls -la requirements.txt

# Verify Python is available
python --version
```

#### 2. Build Failures
- Check Railway build logs
- Ensure all dependencies are in `package.json` and `requirements.txt`
- Verify Node.js and Python versions are compatible

#### 3. Runtime Errors
- Check Railway deployment logs
- Verify environment variables are set correctly
- Test Python scripts locally first

#### 4. Instagram Video Extraction Not Working
- Check if yt-dlp is installed correctly
- Verify Python script permissions
- Test with simple Instagram URLs first

### Debug Commands

```bash
# Check Railway project status
railway status

# View logs
railway logs

# Connect to Railway shell
railway shell

# Check environment variables
railway variables
```

## Monitoring and Maintenance

### 1. Monitor Performance
- Use Railway dashboard to monitor CPU, memory, and network usage
- Set up alerts for high resource usage
- Monitor error rates and response times

### 2. Update Dependencies
```bash
# Update Node.js dependencies
npm update

# Update Python dependencies
pip install --upgrade -r requirements.txt

# Redeploy
railway up
```

### 3. Scale Your Application
- Railway automatically scales based on traffic
- Monitor usage in the dashboard
- Consider upgrading to a paid plan for higher limits

## Cost Optimization

### Free Tier Limits
- 500 hours of usage per month
- 1GB RAM
- 1GB disk space
- Shared resources

### Paid Plans
- $5/month for hobby plan
- Unlimited usage
- More resources
- Custom domains

## Security Considerations

### 1. Environment Variables
- Never commit sensitive data to Git
- Use Railway's secure environment variable storage
- Rotate API keys regularly

### 2. Rate Limiting
- Implement rate limiting for API endpoints
- Monitor for abuse
- Consider implementing CAPTCHA for high usage

### 3. Data Privacy
- Ensure compliance with Instagram's terms of service
- Implement proper error handling
- Log minimal user data

## Support and Resources

### Railway Documentation
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway GitHub](https://github.com/railwayapp)

### InstaFetch Support
- Check the project README
- Review the setup guide
- Test locally before deploying

## Next Steps

1. **Deploy to Railway** using one of the methods above
2. **Configure your AdSense** credentials
3. **Test with real Instagram URLs**
4. **Set up monitoring** and alerts
5. **Consider custom domain** for branding
6. **Monitor usage** and optimize performance

---

🎉 **Congratulations!** Your InstaFetch application should now be live on Railway!
