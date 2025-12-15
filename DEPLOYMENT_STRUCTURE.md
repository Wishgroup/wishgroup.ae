# Deployment File Structure

This document shows the exact file structure needed for cPanel deployment.

## 📦 Files to Upload

### Main Directory (public_html/)

```
public_html/
├── .htaccess                    ← REQUIRED: React Router support
├── index.html                   ← Main HTML file
│
├── assets/                      ← JavaScript and CSS bundles
│   ├── index-*.js
│   ├── index-*.css
│   ├── Home-*.js
│   ├── Home-*.css
│   └── ... (all other JS/CSS files)
│
├── css/                         ← CSS plugins
│   └── plugins/
│       ├── bootstrap-grid.css
│       ├── fancybox.min.css
│       ├── font-awesome.min.css
│       └── swiper.min.css
│
├── img/                         ← Images
│   ├── flower/
│   ├── Logos/
│   └── projects/
│
├── products/                    ← Product images
│   ├── belimal.jpeg
│   ├── dryfish.jpeg
│   ├── prawns.jpeg
│   └── yfin.jpg
│
├── Terrain/                     ← Terrain assets
│   ├── Accountant.png
│   ├── brandmanager.png
│   ├── chairman.png
│   └── ... (all terrain images)
│
├── video.mp4                    ← Video files
├── video_2.mp4
├── cloud.jpg
├── grass.jpg
├── logo.png
├── mouse_pointer.png
├── wishwaveslogo.png
└── world_map.png
```

## 🔄 Upload Process

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Copy Files
Copy everything from `dist/` folder to `public_html/`

### Step 3: Copy .htaccess
Copy `.htaccess` from project root to `public_html/`

## 📋 File Permissions

After uploading, set these permissions:

- **Files**: `644`
- **Folders**: `755`
- **.htaccess**: `644`

## ⚠️ Important Notes

1. **Do NOT upload**:
   - `node_modules/`
   - `src/`
   - `server/` (unless deploying backend separately)
   - `.git/`
   - `package.json`
   - `vite.config.js`
   - Development files

2. **Must upload**:
   - Everything from `dist/` folder
   - `.htaccess` file

3. **Backend Server** (if needed):
   - Deploy `server/` folder separately
   - Use subdomain or separate domain
   - Requires Node.js support in cPanel

## 🎯 Quick Upload Commands (if using SSH)

If you have SSH access:

```bash
# From project root
cd dist
scp -r * username@wishwavesclub.com:~/public_html/
cd ..
scp .htaccess username@wishwavesclub.com:~/public_html/
```

## 📊 Size Estimates

- Main bundle: ~500KB - 2MB (compressed)
- Images: Varies (optimize before upload)
- Videos: Large (consider CDN for videos)

## ✅ Verification

After upload, verify:
1. `index.html` exists in root
2. `.htaccess` exists in root
3. `assets/` folder contains JS/CSS files
4. All images are accessible
5. No 404 errors in browser console

