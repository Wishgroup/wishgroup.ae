# Environment Variables Updated for wishwavesclub.com

All environment variables and documentation have been updated for **wishwavesclub.com**.

## ✅ Updated Files

1. **env.production.template** - Updated with wishwavesclub.com domain
2. **CPANEL_DEPLOYMENT.md** - All domain references updated
3. **QUICK_DEPLOY.md** - Domain references updated
4. **DEPLOYMENT_STRUCTURE.md** - SSH command examples updated

## 🔧 Environment Variables

### Frontend (.env.production)

Create a `.env.production` file in the project root with:

```env
# Backend API URL
VITE_API_URL=https://api.wishwavesclub.com

# Auth0 Configuration (if using)
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_AUDIENCE=your-api-audience-here
```

**To create the file:**
```bash
cp env.production.template .env.production
# Then edit .env.production with your actual values
```

### Backend (server/.env)

For the backend server, create `server/.env`:

```env
DEVICE_IP=10.255.254.49
DEVICE_PORT=80
INOUT=10000
PING=5000
PORT=5001
MONGODB_URI=your-mongodb-connection-string
```

## 🚀 Next Steps

1. **Create .env.production file:**
   ```bash
   cp env.production.template .env.production
   ```

2. **Update Auth0 values** (if using Auth0):
   - Edit `.env.production`
   - Add your Auth0 domain, client ID, and audience

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to cPanel:**
   - Upload `dist/` contents to `public_html/`
   - Upload `.htaccess` file
   - Visit: `https://wishwavesclub.com`

## 📝 Important Notes

- **API URL**: Set to `https://api.wishwavesclub.com` (assumes backend on subdomain)
- **Backend Subdomain**: If deploying backend, use `api.wishwavesclub.com`
- **Environment variables**: Must be set before building (embedded at build time)
- **Rebuild required**: After changing environment variables, run `npm run build` again

## 🔗 URLs

- **Frontend**: `https://wishwavesclub.com`
- **Backend API**: `https://api.wishwavesclub.com` (if deployed)

---

**Ready to deploy!** Follow the steps in `QUICK_DEPLOY.md`

