import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMenu } from '../contexts/MenuContext'

function Frame() {
  const location = useLocation()
  const { isMenuActive } = useMenu()

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
      `}</style>
      <div className="mil-frame">
        <div className="mil-frame-top">
          <Link to="/" className="mil-logo">
            <img src="/logo.png" alt="Wish Group Logo" style={{ height: '56px', width: 'auto' }} />
          </Link>
          <div className="mil-menu-btn">
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

