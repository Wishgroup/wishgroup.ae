import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMenu } from '../contexts/MenuContext'

function Frame() {
  const location = useLocation()
  const { isMenuActive, toggleMenu } = useMenu()
  const menuBtnRef = useRef(null)

  // Add click handler to menu button - use context toggle
  const handleMenuButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleMenu()
  }
  
  // Update menu button active class based on context state
  useEffect(() => {
    const menuBtn = menuBtnRef.current
    if (menuBtn) {
      if (isMenuActive) {
        menuBtn.classList.add('mil-active')
      } else {
        menuBtn.classList.remove('mil-active')
      }
    }
  }, [isMenuActive])

  return (
    <>
      <style>{`
        .mil-back-to-top {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .mil-back-to-top.menu-active {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Mobile fixes for frame and header */
        @media screen and (max-width: 1200px) {
          .mil-frame {
            z-index: 1000 !important;
            pointer-events: none !important;
          }

          .mil-frame-top {
            pointer-events: all !important;
            position: relative !important;
            z-index: 1001 !important;
            touch-action: manipulation !important;
          }

          .mil-frame-top .mil-logo {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            position: relative !important;
            z-index: 1 !important;
          }

          .mil-frame-top .mil-menu-btn {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            position: relative !important;
            z-index: 1 !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1) !important;
            cursor: pointer !important;
          }
        }

        @media screen and (max-width: 768px) {
          .mil-frame {
            z-index: 1000 !important;
          }

          .mil-frame-top {
            z-index: 1001 !important;
          }
        }
      `}</style>
      <div className="mil-frame">
        <div className="mil-frame-top">
          <Link to="/" className="mil-logo">
            <img src="/logo.png" alt="Wish Group Logo" style={{ height: '56px', width: 'auto' }} />
          </Link>
          <div 
            className="mil-menu-btn" 
            ref={menuBtnRef}
            onClick={handleMenuButtonClick}
            style={{ cursor: 'pointer' }}
          >
            <span></span>
          </div>
        </div>
        <div className="mil-frame-bottom">
          <div className="mil-current-page"></div>
          <div className={`mil-back-to-top ${isMenuActive ? 'menu-active' : ''}`}>
            <a href="#top" className="mil-link mil-dark mil-arrow-place">
              <span>Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Frame

