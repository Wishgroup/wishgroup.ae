# Auth0 Setup Instructions

This application has been configured with Auth0 authentication. Follow these steps to complete the setup:

## 1. Create an Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Navigate to **Applications** > **Applications**
3. Click **Create Application**
4. Choose **Single Page Web Applications**
5. Click **Create**

## 2. Configure Application Settings

**IMPORTANT**: You must configure these URLs in your Auth0 Application settings, or you will get a "Callback URL mismatch" error.

In your Auth0 Dashboard, go to **Applications** > **Applications** > **Wish Group main** > **Settings**

Scroll down to the **Application URIs** section and configure:

1. **Allowed Callback URLs**: 
   - Add: `http://localhost:4000`
   - (Add your production URL when deploying: `https://your-production-domain.com`)
   - **Note**: This must match exactly, including the protocol (http/https) and port number

2. **Allowed Logout URLs**: 
   - Add: `http://localhost:4000`
   - (Add your production URL when deploying: `https://your-production-domain.com`)

3. **Allowed Web Origins**: 
   - Add: `http://localhost:4000`
   - (Add your production URL when deploying: `https://your-production-domain.com`)

**After making these changes, click "Save Changes" at the bottom of the page.**

## 3. Create Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-api-audience
```

### Where to find these values:

- **VITE_AUTH0_DOMAIN**: Found in your Auth0 Application settings (e.g., `dev-abc123.us.auth0.com`)
- **VITE_AUTH0_CLIENT_ID**: Found in your Auth0 Application settings
- **VITE_AUTH0_AUDIENCE**: (Optional) Only needed if you're using Auth0 API. Leave empty or omit if not using an API.

## 4. Using Protected Routes

To protect a route, wrap it with the `ProtectedRoute` component:

```jsx
import ProtectedRoute from './components/ProtectedRoute'

<Route 
  path="/protected-page" 
  element={
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  } 
/>
```

## 5. Using Auth0 in Components

You can use Auth0 hooks in any component:

```jsx
import { useAuth0 } from '@auth0/auth0-react'

function MyComponent() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0()
  
  // Your component logic
}
```

## 6. Available Auth0 Features

- **Login/Logout**: The `AuthButton` component is already added to the Menu
- **User Profile**: Access user information via `user` object
- **Protected Routes**: Use `ProtectedRoute` component to protect pages
- **Authentication State**: Check `isAuthenticated` to conditionally render content

## 7. Restart Development Server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## Troubleshooting

### "Callback URL mismatch" or "Redirect URI mismatch" Error

This is the most common error. It means the redirect URL your app is sending doesn't match what's configured in Auth0.

**Solution:**
1. Check what URL your app is using:
   - Development: `http://localhost:4000` (check your `vite.config.js` for the port)
   - The app uses `window.location.origin` as the redirect URI
   
2. Go to Auth0 Dashboard > Applications > Your App > Settings
3. In **Allowed Callback URLs**, make sure you have added:
   - `http://localhost:4000` (for development)
   - Include the exact protocol (http or https) and port number
   - Separate multiple URLs with commas (no spaces)

4. Click **Save Changes** at the bottom of the page

5. Clear your browser cache and try again

**Common mistakes:**
- Forgetting to click "Save Changes" after adding URLs
- Using `https://` instead of `http://` for localhost
- Missing the port number (e.g., using `http://localhost` instead of `http://localhost:4000`)
- Adding extra spaces or incorrect formatting

### Other Common Errors

- **"Invalid state" error**: Make sure your callback URLs are correctly configured in Auth0
- **Environment variables not loading**: Make sure the `.env` file is in the root directory and restart the dev server
- **"Login failed"**: Check that your domain and client ID in `.env` match your Auth0 application settings

