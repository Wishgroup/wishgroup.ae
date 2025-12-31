import React, { useEffect, useState } from 'react'
// AUTH0 DISABLED - Using mock hook
// import { useAuth0 } from '@auth0/auth0-react'
import { useAuth0 } from '../../utils/mockAuth0'

function Banner() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const [shouldUseVideo, setShouldUseVideo] = useState(false)

  useEffect(() => {
    const updateVideoPreference = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 768

      // Skip autoplay video on mobile or when reduced motion is preferred
      setShouldUseVideo(!prefersReducedMotion && !isMobile)
    }

    // Initial check
    updateVideoPreference()

    // Listen for window resize
    const handleResize = () => {
      updateVideoPreference()
    }

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMediaChange = () => {
      updateVideoPreference()
    }

    // Add event listeners
    window.addEventListener('resize', handleResize)
    
    // Modern browsers support addEventListener on MediaQueryList
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleMediaChange)
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [])

  const handleSignUp = () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        screen_hint: 'signup',
      })
    }
  }

  return (
    <section className="mil-banner mil-dark-bg">
      <div className="mi-invert-fix" style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Video Background (deferred on mobile/reduced-motion users) */}
        {shouldUseVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/cloud.jpg"
            aria-label="Background video of clouds"
            onError={(e) => {
              // Fallback to static image if video fails to load
              console.warn('Video failed to load, falling back to static image')
              setShouldUseVideo(false)
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 0.3
            }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/cloud.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
              opacity: 0.45
            }}
          />
        )}
        
        <div className="mil-animation-frame">
          <div className="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6"></div>
          <div className="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1"></div>
          <div className="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1"></div>
        </div>

        <div className="mil-gradient"></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="mil-banner-content mil-up">
            <h1 className="mil-muted mil-mb-60">
              <span className="mil-thin">We make a </span><strong>Wish</strong>
            </h1>
            <div className="row">
              <div className="col-md-7 col-lg-5">
                <p className="mil-light-soft mil-mb-60 ">
                This is where aspiration meets dedication. We partner with you to turn your long-term vision into tangible reality, ensuring the stability needed to see every dream take root.
                </p>
              </div>
            </div>

            <a href="#about" className="mil-button mil-arrow-place mil-btn-space">
              <span>What we do</span>
            </a>

            <div className="mil-circle-text">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 300 300"
                enableBackground="new 0 0 300 300"
                xmlSpace="preserve"
                className="mil-ct-svg mil-rotate"
                data-value="360"
              >
                <defs>
                  <path id="circlePath" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 " />
                </defs>
                <circle cx="150" cy="100" r="75" fill="none" />
                <g>
                  <use xlinkHref="#circlePath" fill="none" />
                  <text style={{ letterSpacing: '6.5px' }}>
                    <textPath xlinkHref="#circlePath">Scroll down - Scroll down - </textPath>
                  </text>
                </g>
              </svg>
              <a href="#about" className="mil-button mil-arrow-place mil-icon-button mil-arrow-down"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

