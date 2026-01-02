import React, { useCallback } from 'react'
// AUTH0 DISABLED - Using mock hook
// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '../utils/mockAuth0'

// Extract inline styles to constants
const CONTAINER_STYLE = { display: 'flex', alignItems: 'center', gap: '1rem' }
const AVATAR_STYLE = { width: '32px', height: '32px', borderRadius: '50%' }
const TEXT_STYLE = { color: '#fff' }
const BUTTON_STYLE = {
  padding: '8px 16px',
  backgroundColor: 'transparent',
  border: '1px solid #fff',
  color: '#fff',
  cursor: 'pointer',
  borderRadius: '4px',
  pointerEvents: 'auto',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'rgba(255, 255, 255, 0.1)',
  position: 'relative',
  zIndex: 1,
}

function AuthButton() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()

  const handleLogout = useCallback(() => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }, [logout])

  const handleLogin = useCallback(() => {
    loginWithRedirect()
  }, [loginWithRedirect])

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return (
      <div style={CONTAINER_STYLE}>
        {user?.picture && (
          <img
            src={user.picture}
            alt={user?.name}
            style={AVATAR_STYLE}
          />
        )}
        <span style={TEXT_STYLE}>{user?.name || user?.email}</span>
        <button onClick={handleLogout} style={BUTTON_STYLE}>
          Log Out
        </button>
      </div>
    )
  }

  return (
    <button onClick={handleLogin} style={BUTTON_STYLE}>
      Log In
    </button>
  )
}

export default AuthButton


