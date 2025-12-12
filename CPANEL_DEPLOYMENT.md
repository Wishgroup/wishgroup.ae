# cPanel Deployment Guide

This guide will help you deploy your Wish Group website to cPanel hosting.

## 📋 Prerequisites

1. cPanel hosting account with access
2. FTP/SFTP credentials or File Manager access
3. Node.js installed locally (for building)
4. Your domain name configured in cPanel

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Build the Production Version

On your local machine, run:

```bash
# Navigate to project root
cd /Users/asan/Downloads/Ashley\ html\ template/ashley

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

This will create an optimized production build in the `dist/` folder.

### Step 2: Prepare Files for Upload

The following files/folders need to be uploaded to cPanel:

**Required Files:**
- `dist/` folder contents (all files inside)
- `.htaccess` file (for React Router support)

**Optional (if using backend):**
- `server/` folder (for Node.js backend - requires Node.js support in cPanel)

### Step 3: Upload Files to cPanel

#### Option A: Using cPanel File Manager

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to `public_html/` (or your domain's root directory)
4. **Delete all existing files** (or backup first if needed)
5. Upload all contents from the `dist/` folder:
   - Select all files in `dist/`
   - Upload to `public_html/`
6. Upload the `.htaccess` file to `public_html/`
7. Ensure `.htaccess` file permissions are set to `644`

#### Option B: Using FTP/SFTP Client

1. Connect to your server using FTP/SFTP (FileZilla, WinSCP, etc.)
2. Navigate to `public_html/` directory
3. Upload all contents from the `dist/` folder
4. Upload the `.htaccess` file
5. Set `.htaccess` permissions to `644`

### Step 4: Configure Environment Variables (if needed)

If your site uses environment variables (API URLs, Auth0, etc.):

1. Create a `.env` file in `public_html/` (if supported)
2. Or configure them in cPanel's Environment Variables section
3. **Note**: For Vite apps, environment variables must be set at build time, not runtime

**Important**: Rebuild your app after changing environment variables:

```bash
# Update .env.production file in project root
VITE_API_URL=https://api.wishwavesclub.com
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id

# Rebuild
npm run build

# Upload new dist/ folder contents
```

### Step 5: Backend Server Setup (Optional)

If you need the Node.js backend server:

#### Option A: Deploy as Subdomain

1. Create a subdomain in cPanel: `api.wishwavesclub.com`
2. Upload `server/` folder contents to subdomain's `public_html/`
3. Configure Node.js app in cPanel:
   - Go to **Node.js** section in cPanel
   - Create new application
   - Set startup file: `server.js`
   - Set application root: `/home/username/api.wishwavesclub.com`
   - Set application URL: `api.wishwavesclub.com`
   - Install dependencies: `npm install`
   - Start application

#### Option B: Deploy as Separate Domain

1. Upload `server/` folder to separate domain's `public_html/`
2. Follow same Node.js configuration steps

#### Environment Variables for Backend

In cPanel Node.js app settings, add environment variables:

```
DEVICE_IP=your-device-ip
DEVICE_PORT=80
PORT=5001
MONGODB_URI=your-mongodb-connection-string
```

### Step 6: Update Frontend API URL

If your backend is on a different domain/subdomain:

1. Update `.env.production` file in project root:
   ```env
   VITE_API_URL=https://api.wishwavesclub.com
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Upload new `dist/` contents

### Step 7: Configure Domain Settings

1. In cPanel, go to **Domains** or **Subdomains**
2. Ensure your domain points to `public_html/`
3. If using SSL, ensure it's enabled (Let's Encrypt in cPanel)

### Step 8: Test Your Deployment

1. Visit your domain: `https://wishwavesclub.com`
2. Test all routes (navigation, protected routes)
3. Test API connections (if backend is deployed)
4. Check browser console for errors

## 🔧 Troubleshooting

### Issue: 403 Forbidden Error

**Solution**: 
- Check file permissions (files: 644, folders: 755)
- Verify `index.html` exists in root
- Try simplified `.htaccess` (see `.htaccess.simple`)
- Check cPanel Directory Privacy settings
- See `TROUBLESHOOTING_403.md` for detailed steps

### Issue: 404 Errors on Routes

**Solution**: Ensure `.htaccess` file is uploaded and has correct permissions (644)

### Issue: Assets Not Loading

**Solution**: 
- Check file paths in browser console
- Ensure all files from `dist/` are uploaded
- Check `.htaccess` rewrite rules

### Issue: API Connection Failed

**Solution**:
- Verify backend server is running
- Check CORS settings in backend
- Verify API URL in frontend build
- Check browser console for specific errors

### Issue: White Screen / Blank Page

**Solution**:
- Check browser console for JavaScript errors
- Verify all files uploaded correctly
- Check file permissions (should be 644 for files, 755 for folders)
- Ensure `index.html` is in root directory

### Issue: Slow Loading

**Solution**:
- Enable Gzip compression in cPanel
- Check `.htaccess` compression settings
- Verify CDN settings if using one

## 📁 File Structure After Deployment

Your `public_html/` should look like this:

```
public_html/
├── .htaccess
├── index.html
├── assets/
│   ├── *.js
│   ├── *.css
│   └── ...
├── css/
│   └── plugins/
├── img/
├── products/
├── Terrain/
├── video.mp4
├── video_2.mp4
└── ... (other static assets)
```

## 🔐 Security Checklist

- [ ] SSL certificate installed and enabled
- [ ] `.htaccess` security headers configured
- [ ] Environment variables properly set
- [ ] Backend API secured (if applicable)
- [ ] File permissions set correctly (644 for files, 755 for folders)
- [ ] Remove any development files from production

## 📝 Post-Deployment

1. **Update Auth0 Settings** (if using):
   - Add production URL to allowed callback URLs
   - Add production URL to allowed logout URLs
   - Add production URL to allowed web origins

2. **Test All Features**:
   - Navigation
   - Protected routes
   - API connections
   - Forms
   - Media loading

3. **Monitor Performance**:
   - Check loading times
   - Monitor error logs in cPanel
   - Set up analytics if needed

## 🆘 Need Help?

If you encounter issues:
1. Check cPanel error logs
2. Check browser console for errors
3. Verify all files uploaded correctly
4. Test API endpoints directly
5. Check file permissions

## 📦 Quick Deployment Checklist

- [ ] Built production version (`npm run build`)
- [ ] Uploaded all `dist/` contents to `public_html/`
- [ ] Uploaded `.htaccess` file
- [ ] Set correct file permissions
- [ ] Configured environment variables (if needed)
- [ ] Deployed backend server (if needed)
- [ ] Updated API URLs in frontend
- [ ] Tested all routes and features
- [ ] SSL certificate installed
- [ ] Updated Auth0 settings (if using)

---

**Note**: Always backup your existing site before deploying!

