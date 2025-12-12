# Fixing 403 Forbidden Error

If you're seeing a **403 Forbidden** error after deploying to cPanel, follow these steps:

## 🔍 Common Causes

1. **Incorrect file permissions**
2. **Missing index.html**
3. **.htaccess configuration issues**
4. **Directory listing restrictions**
5. **cPanel security settings**

## ✅ Step-by-Step Fix

### Step 1: Check File Permissions

In cPanel File Manager:

1. Select all files in `public_html/`
2. Right-click → **Change Permissions**
3. Set:
   - **Files**: `644`
   - **Folders**: `755`
   - **.htaccess**: `644`

Or via SSH:
```bash
find public_html/ -type f -exec chmod 644 {} \;
find public_html/ -type d -exec chmod 755 {} \;
chmod 644 public_html/.htaccess
```

### Step 2: Verify index.html Exists

1. Check that `index.html` exists in `public_html/` root
2. Verify it's not empty
3. Check file permissions (should be `644`)

### Step 3: Try Simplified .htaccess

If the main `.htaccess` is causing issues:

1. **Backup** current `.htaccess`
2. **Replace** with `.htaccess.simple` (rename it to `.htaccess`)
3. Test the site

The simplified version removes potentially problematic directives.

### Step 4: Check cPanel Settings

1. **Directory Privacy**: 
   - Go to **Directory Privacy** in cPanel
   - Ensure `public_html/` is NOT password protected

2. **Indexes**:
   - Directory indexes should be disabled (this is normal)
   - But `index.html` must exist

3. **Hotlink Protection**:
   - Temporarily disable to test
   - Go to **Hotlink Protection** in cPanel

### Step 5: Test Without .htaccess

Temporarily rename `.htaccess` to `.htaccess.bak`:

1. Rename `.htaccess` to `.htaccess.bak`
2. Test if site loads (routes won't work, but homepage should)
3. If it works, the issue is with `.htaccess` configuration

### Step 6: Check Error Logs

In cPanel:

1. Go to **Metrics** → **Errors**
2. Check for specific error messages
3. Look for permission-related errors

## 🔧 Quick Fixes

### Fix 1: Minimal .htaccess

Replace `.htaccess` with this minimal version:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Fix 2: Add Directory Index

Add this to `.htaccess` at the top:

```apache
DirectoryIndex index.html
```

### Fix 3: Disable Security Headers Temporarily

Comment out the security headers section in `.htaccess`:

```apache
# Security headers
# <IfModule mod_headers.c>
#   Header set X-Content-Type-Options "nosniff"
#   Header set X-Frame-Options "SAMEORIGIN"
#   Header set X-XSS-Protection "1; mode=block"
# </IfModule>
```

## 📋 Checklist

- [ ] File permissions: Files `644`, Folders `755`
- [ ] `index.html` exists in root
- [ ] `.htaccess` has correct permissions (`644`)
- [ ] Directory Privacy is NOT enabled for `public_html/`
- [ ] Tried simplified `.htaccess`
- [ ] Checked cPanel error logs
- [ ] Tested without `.htaccess` (temporarily)

## 🆘 Still Not Working?

### Option 1: Contact Hosting Support

Provide them:
- Domain: `wishwavesclub.com`
- Error: 403 Forbidden
- File permissions you've set
- Whether it works without `.htaccess`

### Option 2: Check Apache Configuration

Some hosts have restrictions on `.htaccess` directives. Ask your host:
- Are `mod_rewrite` and `mod_headers` enabled?
- Are there any `.htaccess` restrictions?

### Option 3: Alternative Deployment

If `.htaccess` continues to cause issues:

1. Deploy without `.htaccess` initially
2. Test that static files load
3. Add `.htaccess` rules one by one
4. Test after each addition

## ✅ Verification

After applying fixes:

1. Clear browser cache
2. Visit: `https://wishwavesclub.com`
3. Check browser console (F12) for errors
4. Test a few routes

---

**Most Common Solution**: File permissions (644 for files, 755 for folders)

