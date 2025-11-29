import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Frame() {
  const location = useLocation()

  return (
    <div className="mil-frame">
      <div className="mil-frame-top">
        <Link to="/" className="mil-logo">
          A.
        </Link>
        <div className="mil-menu-btn">
          <span></span>
        </div>
      </div>
      <div className="mil-frame-bottom">
        <div className="mil-current-page"></div>
        <div className="mil-back-to-top">
          <a href="#top" className="mil-link mil-dark mil-arrow-place">
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Frame

