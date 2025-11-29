import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function NotFound() {
  useScrollAnimations()
  return (
    <>
      <section className="mil-404-banner mil-dark-bg">
        <div className="mi-invert-fix">
          <div className="mil-animation-frame"></div>
          <div className="mil-404-frame">
            <div className="mil-scale-frame">
              <div className="mil-404" data-text="404">
                404
              </div>
            </div>
            <h2 className="mil-404-text mil-h1 mil-muted">Page Not Found</h2>
            <Link to="/" className="mil-button mil-arrow-place mil-mb-60">
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default NotFound

