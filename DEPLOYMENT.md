# 🚀 Deployment Guide - Vercel

This guide covers deploying both the main application and music library micro frontend to **Vercel** for optimal performance and easy CI/CD.

## 📋 Prerequisites

- Both applications built successfully
- Vercel account connected to GitHub
- Understanding of Module Federation configuration
- Independent architecture (no shared dependencies)

## 🏗️ Build Process

### 1. Build Both Applications Independently

```bash
# Build main app
cd main-app
npm run build

# Build music library
cd ../music-library
npm run build
```

This creates:
- `main-app/dist/` - Main application build
- `music-library/dist/` - Music library build with `remoteEntry.js`

### 2. Verify Build Output

Check that both `dist` folders contain:
- `index.html`
- `assets/` folder with JavaScript bundles
- `remoteEntry.js` (in music-library) - **Critical for Module Federation**

## 🌐 Vercel Deployment

### Option 1: Deploy Music Library First (Recommended)

#### Step 1: Deploy Music Library
1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `music-library`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"
6. Note the generated URL (e.g., `https://amazing-music-library.vercel.app`)

#### Step 2: Deploy Main Application
1. Click "New Project" again
2. Import the same GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `main-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click "Deploy"
5. Note the generated URL (e.g., `https://main-app-123.vercel.app`)

### Option 2: Deploy Both Simultaneously

You can also deploy both projects at the same time by creating two separate Vercel projects from the same repository.

## ⚠️ Critical Configuration Updates

### 1. Update Remote URL for Production

**Before building for production**, update the remote URL in `main-app/vite.config.ts`:

```typescript
// Development
'http://localhost:5174/assets/remoteEntry.js'

// Production (update with your actual music library URL)
'https://your-music-library.vercel.app/assets/remoteEntry.js'
```

### 2. Environment Variables (Optional)

Create `.env.production` files for environment-specific configuration:

```bash
# main-app/.env.production
VITE_MUSIC_LIBRARY_URL=https://your-music-library.vercel.app

# music-library/.env.production
VITE_APP_URL=https://your-main-app.vercel.app
```

### 3. CORS Configuration

Vercel automatically handles CORS for you, but ensure both applications are accessible.

## 🔍 Post-Deployment Verification

### 1. Test Music Library Standalone
- Navigate to music library URL directly
- Verify it works independently
- Test all filtering and management features
- Check that `remoteEntry.js` is accessible

### 2. Test Main Application
- Navigate to main app URL
- Login with demo credentials
- Verify music library loads successfully via Module Federation
- Test all features work as expected

### 3. Check Console for Errors
- Open browser developer tools
- Look for Module Federation errors
- Verify no CORS issues
- Check network requests

## 🐛 Troubleshooting

### Common Issues

#### 1. Module Federation Errors
**Problem**: `Failed to load music library`
**Solution**: 
- Verify music library is deployed and accessible
- Check remote URL in main app configuration
- Ensure `remoteEntry.js` is accessible at the production URL

#### 2. 404 Errors
**Problem**: Assets not found
**Solution**:
- Verify build process completed successfully
- Check Vercel deployment logs
- Ensure all assets are uploaded correctly

#### 3. Build Failures
**Problem**: Vercel build fails
**Solution**:
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure build commands are correct

### Debug Steps

1. **Check Vercel Dashboard**: Look for build and deployment logs
2. **Verify URLs**: Ensure remote URLs are correct and accessible
3. **Test Direct Access**: Try accessing music library directly
4. **Check Build Output**: Verify all files are present in Vercel

## 🔄 Continuous Deployment

### GitHub Integration
Vercel automatically deploys when you push to your main branch:

1. **Push to GitHub**: Any push to main branch triggers deployment
2. **Automatic Build**: Vercel builds and deploys automatically
3. **Preview Deployments**: Pull requests get preview deployments

### Manual Deployment
You can also trigger manual deployments from the Vercel dashboard.

## 📱 Performance Optimization

### Vercel Benefits
- **Global CDN**: Automatic content delivery worldwide
- **Edge Functions**: Serverless functions at the edge
- **Automatic HTTPS**: SSL certificates managed automatically
- **Performance Monitoring**: Built-in analytics and monitoring

## 🔒 Security Considerations

### Production Checklist
- [ ] HTTPS enabled automatically by Vercel
- [ ] CORS properly configured
- [ ] Environment variables secured in Vercel dashboard
- [ ] No sensitive data in client-side code
- [ ] Authentication tokens properly handled

## 📊 Monitoring

### Vercel Analytics
- **Performance**: Built-in performance monitoring
- **Errors**: Automatic error tracking
- **Analytics**: Page views and user behavior
- **Uptime**: 99.9% uptime guarantee

### Recommended Tools
- **Performance**: Lighthouse, WebPageTest
- **Errors**: Sentry, LogRocket
- **Analytics**: Google Analytics, Mixpanel

## 🎯 Next Steps

After successful deployment:

1. **Set up monitoring** using Vercel's built-in tools
2. **Configure custom domains** if needed
3. **Add analytics** to track user behavior
4. **Plan scaling** strategy for increased traffic
5. **Consider Vercel Edge Functions** for additional features

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Both applications build successfully
- [ ] Music library has `remoteEntry.js` in build output
- [ ] Main app configuration updated with production music library URL
- [ ] All dependencies properly installed in each app

### Deployment
- [ ] Music library deployed to Vercel
- [ ] Main application deployed to Vercel
- [ ] Both URLs accessible and working
- [ ] Module Federation working in production

### Post-Deployment
- [ ] Test both applications independently
- [ ] Test Module Federation integration
- [ ] Monitor performance and errors
- [ ] Update documentation with live URLs

## 🌟 Live Demo Links

After deployment, update these in your README:

- **Main App**: `https://your-main-app.vercel.app`
- **Music Library**: `https://your-music-library.vercel.app`

---

**Happy Deploying to Vercel! 🚀✨**
