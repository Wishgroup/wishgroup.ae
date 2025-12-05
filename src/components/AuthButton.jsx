import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

function AuthButton() {
  // Auth0 disabled - hiding auth button
  // const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()

  // if (isLoading) {
  //   return null
  // }

  // if (isAuthenticated) {
  //   return (
  //     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  //       {user?.picture && (
  //         <img
  //           src={user.picture}
  //           alt={user?.name}
  //           style={{
  //             width: '32px',
  //             height: '32px',
  //             borderRadius: '50%',
  //           }}
  //         />
  //       )}
  //       <span style={{ color: '#fff' }}>{user?.name || user?.email}</span>
  //       <button
  //         onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
  //         style={{
  //           padding: '8px 16px',
  //           backgroundColor: 'transparent',
  //           border: '1px solid #fff',
  //           color: '#fff',
  //           cursor: 'pointer',
  //           borderRadius: '4px',
  //         }}
  //       >
  //         Log Out
  //       </button>
  //     </div>
  //   )
  // }

  // return (
  //   <button
  //     onClick={() => loginWithRedirect()}
  //     style={{
  //       padding: '8px 16px',
  //       backgroundColor: 'transparent',
  //       border: '1px solid #fff',
  //       color: '#fff',
  //       cursor: 'pointer',
  //       borderRadius: '4px',
  //     }}
  //   >
  //     Log In
  //   </button>
  // )

  // Auth0 disabled - return null to hide button
  return null
}

export default AuthButton


