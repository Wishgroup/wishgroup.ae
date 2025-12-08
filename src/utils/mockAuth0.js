// Mock Auth0 hook - AUTH0 DISABLED
// This provides mock values so components don't break when Auth0 is disabled
// Uncomment the real useAuth0 import and remove this file to re-enable Auth0

export const useAuth0 = () => {
  return {
    isAuthenticated: true, // Always authenticated when Auth0 is disabled
    isLoading: false,
    user: {
      name: 'Guest User',
      email: 'guest@example.com'
    },
    loginWithRedirect: (options) => {
      // Mock login - just navigate to the returnTo path if provided
      if (options?.appState?.returnTo) {
        window.location.href = options.appState.returnTo
      } else if (sessionStorage.getItem('auth0_returnTo')) {
        window.location.href = sessionStorage.getItem('auth0_returnTo')
      }
    },
    logout: (options) => {
      // Mock logout - do nothing
      console.log('Logout called (Auth0 disabled)')
    },
    getAccessTokenSilently: async () => {
      return 'mock-token'
    }
  }
}

