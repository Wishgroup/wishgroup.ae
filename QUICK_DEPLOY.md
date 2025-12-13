# Quick Deployment Checklist

Follow these steps in order for a successful cPanel deployment.

## ✅ Pre-Deployment Checklist

- [ ] Node.js installed locally
- [ ] All dependencies installed (`npm install`)
- [ ] cPanel access credentials ready
- [ ] Domain configured in cPanel
- [ ] SSL certificate installed (recommended)

## 🚀 Deployment Steps

### 1. Build Production Version

```bash
# Navigate to project root
cd /Users/asan/Downloads/Ashley\ html\ template/ashley

# Build for production
npm run build
```

**Expected Output**: A `dist/` folder with optimized files

### 2. Prepare Environment Variables (if needed)

If you need to configure API URLs or Auth0:

```bash
# Copy template
cp env.production.template .env.production

# Edit .env.production with your values
# Then rebuild:
npm run build
```

### 3. Upload to cPanel

**Option A: File Manager**
1. Login to cPanel
2. Open **File Manager**
3. Navigate to `public_html/`
4. Delete existing files (backup first!)
5. Upload all contents from `dist/` folder
6. Upload `.htaccess` file to root

**Option B: FTP/SFTP**
1. Connect via FTP client
2. Navigate to `public_html/`
3. Upload all `dist/` contents
4. Upload `.htaccess`

### 4. Set File Permissions

- Files: `644`
- Folders: `755`
- `.htaccess`: `644`

### 5. Test Your Site

Visit: `https://wishwavesclub.com`

Check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All routes accessible
- [ ] Images load correctly
- [ ] No console errors

## 🔧 Backend Deployment (If Needed)

If you need the Node.js backend:

1. **Create Subdomain** in cPanel: `api.wishwavesclub.com`
2. **Upload Server Files** to subdomain's `public_html/`
3. **Configure Node.js App** in cPanel:
   - Startup file: `server.js`
   - Application root: subdomain directory
   - Install dependencies
   - Add environment variables
   - Start application
4. **Update Frontend** API URL and rebuild

## 📝 Post-Deployment

- [ ] Update Auth0 settings (if using)
- [ ] Test all features
- [ ] Monitor error logs
- [ ] Set up backups

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| 404 on routes | Check `.htaccess` is uploaded |
| Assets not loading | Verify all files uploaded |
| API errors | Check backend URL and CORS |
| White screen | Check browser console for errors |

## 📞 Need Help?

Refer to `CPANEL_DEPLOYMENT.md` for detailed instructions.

