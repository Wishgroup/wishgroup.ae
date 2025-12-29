# GitHub Version Control Guide for cPanel Deployment

This guide helps you manage your project with GitHub while deploying to cPanel.

## 📋 Current Status

✅ **GitHub Repository**: Connected to `https://github.com/Wishgroup/wishgroup.ae.git`  
✅ **Local Repository**: Initialized and synced  
✅ **Remote**: Configured as `origin`

## 🔄 Daily Workflow

### 1. Pull Latest Changes from GitHub

Before starting work, always pull the latest changes:

```bash
cd "/Users/asan/Wish Group Web/wishgroup.ae"
git pull origin main
```

### 2. Make Your Changes

Edit files as needed in your project.

### 3. Check What Changed

```bash
git status                    # See modified files
git diff                      # See detailed changes
```

### 4. Stage Your Changes

```bash
# Stage specific files
git add src/pages/Home.jsx

# Or stage all changes
git add .
```

### 5. Commit Your Changes

```bash
git commit -m "Description of your changes"
```

**Good commit messages:**
- `"Remove Services component from Home page"`
- `"Update attendance API endpoint"`
- `"Fix navigation menu styling"`

### 6. Push to GitHub

```bash
git push origin main
```

## 🚀 Deployment Workflow: GitHub → cPanel

### Option A: Manual Deployment (Current Method)

1. **Pull latest from GitHub** (if working on multiple machines):
   ```bash
   git pull origin main
   ```

2. **Build for production**:
   ```bash
   npm install          # Install/update dependencies
   npm run build        # Create production build
   ```

3. **Upload to cPanel**:
   - Upload `dist/` folder contents to `public_html/`
   - Upload `.htaccess` file
   - Set permissions (644 for files, 755 for folders)

### Option B: Automated Deployment (Recommended)

Set up GitHub Actions or cPanel Git Version Control for automatic deployment.

#### Using cPanel Git Version Control

1. **In cPanel**:
   - Go to **Git Version Control**
   - Click **Create**
   - Repository URL: `https://github.com/Wishgroup/wishgroup.ae.git`
   - Repository Path: `public_html/`
   - Branch: `main`
   - Auto-Deploy: Enable

2. **For each deployment**:
   - In cPanel Git Version Control, click **Pull or Deploy**
   - This pulls from GitHub and updates your live site

3. **Note**: You'll still need to build locally and commit the `dist/` folder, OR:
   - Set up a build process on the server
   - Use GitHub Actions to build and deploy automatically

## 📁 What to Commit vs. Ignore

### ✅ Always Commit:
- Source code (`src/`, `server/`)
- Configuration files (`package.json`, `vite.config.js`)
- Documentation (`.md` files)
- `.gitignore`, `.htaccess`
- SCSS files

### ❌ Never Commit (already in `.gitignore`):
- `node_modules/`
- `dist/` (build output - optional, can commit if needed)
- `.env` files (sensitive data)
- `.DS_Store`
- IDE files

## 🔀 Branching Strategy (Optional)

For better organization, consider using branches:

```bash
# Create a new branch for a feature
git checkout -b feature/new-section

# Make changes, commit
git add .
git commit -m "Add new section"

# Push branch to GitHub
git push origin feature/new-section

# Merge to main (on GitHub or locally)
git checkout main
git merge feature/new-section
git push origin main
```

## 🔐 Security Best Practices

1. **Never commit sensitive data**:
   - API keys
   - Passwords
   - `.env` files with real credentials
   - Database connection strings

2. **Use environment templates**:
   - Commit `env.production.template`
   - Keep actual `.env` files local only

3. **Review changes before committing**:
   ```bash
   git diff --staged    # Review what you're about to commit
   ```

## 📊 Useful Git Commands

```bash
# View commit history
git log --oneline

# See what changed in a file
git diff src/pages/Home.jsx

# Undo changes (before staging)
git restore src/pages/Home.jsx

# Undo staged changes
git restore --staged src/pages/Home.jsx

# View remote repository info
git remote -v

# Check branch status
git status

# See differences between local and remote
git fetch
git log HEAD..origin/main
```

## 🆘 Troubleshooting

### Issue: "Your branch is behind 'origin/main'"

**Solution**:
```bash
git pull origin main
```

### Issue: Merge conflicts

**Solution**:
1. Git will mark conflicts in files
2. Open files and look for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. Resolve conflicts manually
4. Stage resolved files: `git add .`
5. Complete merge: `git commit`

### Issue: Accidentally committed wrong files

**Solution**:
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Or discard changes completely
git reset --hard HEAD~1
```

### Issue: Need to update remote URL

**Solution**:
```bash
git remote set-url origin https://github.com/Wishgroup/wishgroup.ae.git
```

## 🔄 Syncing with cPanel

### Recommended Workflow:

1. **Development**:
   - Make changes locally
   - Test locally
   - Commit and push to GitHub

2. **Deployment**:
   - Pull from GitHub (if using cPanel Git)
   - OR: Build locally and upload `dist/` folder
   - Test on live site

3. **Version Control**:
   - All source code in GitHub
   - Production builds deployed to cPanel
   - Keep both in sync

## 📝 Quick Reference Card

```bash
# Daily workflow
git pull                    # Get latest changes
# ... make changes ...
git add .                   # Stage changes
git commit -m "message"     # Commit changes
git push                    # Push to GitHub

# Check status
git status                  # See what changed
git diff                    # See detailed changes
git log --oneline           # See commit history
```

## 🎯 Next Steps

1. ✅ Commit your current changes
2. ✅ Push to GitHub
3. ✅ Set up cPanel Git Version Control (optional)
4. ✅ Establish deployment workflow
5. ✅ Document your process

---

**Remember**: Always pull before you push, and test before you deploy!

