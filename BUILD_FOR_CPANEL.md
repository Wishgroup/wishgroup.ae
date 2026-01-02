# 🚀 Building for cPanel Deployment

This guide explains how to build your project for cPanel deployment.

## Quick Build

Simply run:

```bash
npm run build
```

This will:
1. ✅ Build your React app with Vite
2. ✅ Automatically copy `.htaccess` to the `dist/` folder
3. ✅ Prepare all files needed for cPanel deployment

## What Gets Built

After running `npm run build`, your `dist/` folder will contain:

- ✅ All optimized JavaScript and CSS bundles
- ✅ All static assets (images, videos, etc.)
- ✅ `index.html` (entry point)
- ✅ `.htaccess` (automatically copied for React Router support)

## Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to cPanel:**
   - Upload **all contents** of the `dist/` folder to `public_html/`
   - The `.htaccess` file is already included in `dist/`

3. **Set file permissions:**
   - Files: `644`
   - Folders: `755`
   - `.htaccess`: `644`

4. **Test your site:**
   - Visit your domain
   - Check all routes work correctly

## Build Configuration

The build is configured in `vite.config.js` with:
- ✅ Relative paths (`base: './'`) for cPanel compatibility
- ✅ Automatic `.htaccess` copying via Vite plugin
- ✅ Optimized production build with minification
- ✅ Code splitting for better performance

## Troubleshooting

### `.htaccess` not copied?

The build process automatically copies `.htaccess`. If it's missing:
1. Check that `.htaccess` exists in the project root
2. Run the copy script manually: `node scripts/copy-deployment-files.js`

### Build fails?

1. Make sure all dependencies are installed: `npm install`
2. Check for any TypeScript/ESLint errors
3. Verify Node.js version is compatible

### Files missing in dist?

- Static files from `public/` folder are automatically copied by Vite
- Check that files exist in the `public/` folder if they're not appearing

## Environment Variables

If you need to set environment variables:

1. Create `.env.production` file (use `env.production.template` as reference)
2. Rebuild: `npm run build`
3. Environment variables are baked into the build at build time

## Next Steps

After building, see:
- **QUICK_DEPLOY.md** - Quick deployment checklist
- **CPANEL_DEPLOYMENT.md** - Detailed deployment guide

---

**Note**: Always test your build locally with `npm run preview` before deploying!


