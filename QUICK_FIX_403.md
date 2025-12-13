# Quick Fix: 403 Forbidden Error

## 🚨 Immediate Steps (Do These First)

### 1. Fix File Permissions in cPanel

**File Manager Method:**
1. Login to cPanel → **File Manager**
2. Navigate to `public_html/`
3. Select **ALL files and folders**
4. Right-click → **Change Permissions**
5. Set:
   - **Files**: `644` ✓
   - **Folders**: `755` ✓
   - Click **Change Permissions**

**This fixes 90% of 403 errors!**

### 2. Verify index.html Exists

- Check `public_html/index.html` exists
- File size should NOT be 0 bytes
- Permissions should be `644`

### 3. Try Simplified .htaccess

If still getting 403:

1. In File Manager, rename `.htaccess` to `.htaccess.backup`
2. Upload `.htaccess.simple` and rename it to `.htaccess`
3. Set permissions to `644`
4. Test site

## ✅ Quick Checklist

```
[ ] Files: 644 permissions
[ ] Folders: 755 permissions  
[ ] .htaccess: 644 permissions
[ ] index.html exists in root
[ ] index.html is not empty
[ ] Directory Privacy NOT enabled
```

## 🔄 If Still Not Working

1. **Temporarily remove .htaccess**:
   - Rename to `.htaccess.bak`
   - Test if homepage loads
   - If yes → `.htaccess` issue
   - If no → file permission or missing file issue

2. **Check cPanel Error Logs**:
   - Go to **Metrics** → **Errors**
   - Look for specific error messages

3. **Contact Hosting Support**:
   - Tell them: "403 Forbidden on wishwavesclub.com"
   - Mention you've set permissions (644/755)
   - Ask if mod_rewrite is enabled

## 📝 Most Common Solution

**File Permissions** - This fixes it 90% of the time!

Set via SSH (if you have access):
```bash
cd ~/public_html
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 644 .htaccess
```

---

**Need more help?** See `TROUBLESHOOTING_403.md` for detailed steps.

