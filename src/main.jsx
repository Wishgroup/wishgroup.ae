import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Auth0Provider } from '@auth0/auth0-react' // AUTH0 DISABLED
import App from './App'
import './styles/main.scss'

// AUTH0 DISABLED - Uncomment below to re-enable
// const domain = import.meta.env.VITE_AUTH0_DOMAIN
// const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
// const audience = import.meta.env.VITE_AUTH0_AUDIENCE

// const onRedirectCallback = (appState) => {
//   // Store the returnTo path - AuthRedirectHandler will handle navigation
//   const returnTo = appState?.returnTo || sessionStorage.getItem('auth0_returnTo')
//   if (returnTo) {
//     sessionStorage.setItem('auth0_returnTo', returnTo)
//   }
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AUTH0 DISABLED - Uncomment below to re-enable */}
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience || undefined,
      }}
      onRedirectCallback={onRedirectCallback}
    > */}
      <App />
    {/* </Auth0Provider> */}
  </React.StrictMode>
)

