import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthButton from './AuthButton'

// Move static data outside component to prevent recreation on every render
const MENU_ITEMS = [
  {
    title: 'Homepage',
    children: [
      { title: 'Landing page', path: '/' },
      { title: 'Personal', path: '/home-2' },
      { title: 'Portfolio slider', path: '/portfolio-3' },
    ],
  },
  {
    title: 'About Us',
    path: '/about-us',
    children: [
      { title: 'About Us', path: '/about-us' },
    ],
  },
  {
    title: 'Businesses',
    path: '/portfolio-1',
    children: [
      { title: 'Our Businesses', path: '/portfolio-1' },
    ],
  },
  {
    title: 'Projects',
    children: [
      { title: 'Blog List', path: '/blog' },
      { title: 'Publication', path: '/publication' },
    ],
  },
  {
    title: 'Contact us',
    children: [
      { title: 'Team', path: '/team' },
      { title: 'Contact', path: '/contact' },
      { title: '404', path: '/404' },
    ],
  },
  {
    title: 'Attendance',
    path: '/attendance',
    children: [
      { title: 'Staff Attendance', path: '/attendance' },
    ],
  },
]

const PROJECTS = [
  { title: 'Wishes Fulfilled', path: '/project-1' },
  { title: 'Seeds Taking Root', path: '/project-2' },
  { title: 'Partnerships for Impact', path: '/project-3' },
  { title: 'Dreams on the Horizon', path: '/project-4' },
]

// Extract inline styles to constants
const LOGO_STYLE = { height: '56px', width: 'auto' }
const HEADER_STYLE = { display: 'flex', alignItems: 'center', gap: '1rem' }
const NOWRAP_STYLE = { whiteSpace: 'nowrap' }
const USEFUL_LINKS_HEADER_STYLE = { width: 'fit-content', whiteSpace: 'nowrap' }

function Menu() {
  const [isActive, setIsActive] = useState(false)
  const [isProjectsActive, setIsProjectsActive] = useState(false)
  const location = useLocation()
  const scrollTimeoutRef = useRef(null)
  const menuBtnRef = useRef(null)

  // Memoize handlers to prevent unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    setIsActive((prev) => !prev)
  }, [])

  const handleProjectsClick = useCallback((e) => {
    e.preventDefault()
    setIsProjectsActive((prev) => !prev)
  }, [])

  const handleHomepageClick = useCallback((e) => {
    const savedScrollPosition = sessionStorage.getItem('homepage_scroll_position')
    
    if (location.pathname === '/') {
      e.preventDefault()
      if (savedScrollPosition) {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'smooth'
        })
      }
    }
  }, [location.pathname])

  const handleProjectLinkClick = useCallback(() => {
    setIsProjectsActive(false)
  }, [])

  // Optimized scroll position saving function
  const saveScrollPosition = useCallback(() => {
    if (location.pathname === '/') {
      const scrollY = window.scrollY || window.pageYOffset
      sessionStorage.setItem('homepage_scroll_position', scrollY.toString())
    }
  }, [location.pathname])

  // Combined menu button and scroll position effects
  useEffect(() => {
    // Menu button setup
    const menuBtn = document.querySelector('.mil-menu-btn')
    if (menuBtn) {
      menuBtnRef.current = menuBtn
      menuBtn.addEventListener('click', handleMenuToggle)
      
      // Update class based on state
      if (isActive) {
        menuBtn.classList.add('mil-active')
      } else {
        menuBtn.classList.remove('mil-active')
      }
    }

    return () => {
      if (menuBtnRef.current) {
        menuBtnRef.current.removeEventListener('click', handleMenuToggle)
      }
    }
  }, [isActive, handleMenuToggle])

  // Close menu on location change
  useEffect(() => {
    setIsActive(false)
    setIsProjectsActive(false)
  }, [location.pathname])

  // Optimized scroll position tracking - combined and throttled
  useEffect(() => {
    // Save on menu state change
    if (isActive) {
      saveScrollPosition()
    }

    // Throttled scroll handler
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(saveScrollPosition, 100)
    }

    // Interaction handler
    const handleInteraction = () => {
      saveScrollPosition()
    }

    // Only add listeners if on homepage
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('click', handleInteraction, { passive: true })
      window.addEventListener('touchstart', handleInteraction, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [location.pathname, isActive, saveScrollPosition])

  // Memoize menu items rendering
  const menuItems = useMemo(() => MENU_ITEMS, [])
  const projects = useMemo(() => PROJECTS, [])

  // Memoize active class name
  const menuFrameClassName = useMemo(() => 
    `mil-menu-frame ${isActive ? 'mil-active' : ''}`, 
    [isActive]
  )

  return (
    <div className={menuFrameClassName}>
      <div className="mil-frame-top">
        <Link to="/" className="mil-logo" onClick={handleHomepageClick}>
          <img src="/logo.png" alt="Wish Group Logo" style={LOGO_STYLE} />
        </Link>
        <div style={HEADER_STYLE}>
          <AuthButton />
          <div className="mil-menu-btn">
            <span></span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mil-menu-content">
          <div className="row">
            <div className="col-xl-5">
              <nav className="mil-main-menu">
                <ul>
                  {menuItems.map((item) => {
                    const isProjects = item.title === 'Projects'
                    const isHomepage = item.title === 'Homepage'
                    const itemClassName = `mil-has-children ${isProjects && isProjectsActive ? 'mil-active' : ''}`
                    
                    return (
                      <li key={item.title} className={itemClassName}>
                        {isHomepage ? (
                          <Link to="/" onClick={handleHomepageClick}>{item.title}</Link>
                        ) : isProjects ? (
                          <a href="#." onClick={handleProjectsClick}>{item.title}</a>
                        ) : item.path ? (
                          <Link to={item.path}>{item.title}</Link>
                        ) : (
                          <a href="#.">{item.title}</a>
                        )}
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.path || child.title}>
                              {child.path === '/' ? (
                                <Link to={child.path} onClick={handleHomepageClick}>{child.title}</Link>
                              ) : (
                                <Link to={child.path}>{child.title}</Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
            <div className="col-xl-7">
              <div className="mil-menu-right-frame">
                <div className="mil-animation-in">
                  <div className="mil-animation-frame">
                    <div className="mil-animation mil-position-1 mil-scale" data-value-1="2" data-value-2="2"></div>
                  </div>
                </div>
                <div className="mil-menu-right">
                  <div className="row">
                    <div className="col-lg-8 mil-mb-60">
                      <ul className="mil-menu-list">
                        {projects.map((project, index) => (
                          <li 
                            key={project.path}
                            className={`mil-project-item ${isProjectsActive ? 'mil-animate-in' : ''}`}
                            style={{ 
                              transitionDelay: isProjectsActive ? `${0.1 + index * 0.1}s` : '0s'
                            }}
                          >
                            <Link 
                              to={project.path} 
                              className="mil-light-soft"
                              style={NOWRAP_STYLE}
                              onClick={handleProjectLinkClick}
                            >
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mil-divider mil-mb-60"></div>
                  <div className="row justify-content-between">
                    <div className="col-lg-6 mil-mb-60">
                      <h6 className="mil-muted mil-mb-30" style={USEFUL_LINKS_HEADER_STYLE}>Useful links</h6>
                      <ul className="mil-menu-list">
                      <li>
                          <Link to="/news" className="mil-light-soft" style={NOWRAP_STYLE}>
                            New & Gallery
                          </Link>
                        </li>
                        <li>
                          <Link to="/careers" className="mil-light-soft" style={NOWRAP_STYLE}>
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy" className="mil-light-soft" style={NOWRAP_STYLE}>
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link to="/terms-and-conditions" className="mil-light-soft" style={NOWRAP_STYLE}>
                            Terms and conditions
                          </Link>
                        </li>
                        <li>
                          <Link to="/cookie-policy" className="mil-light-soft" style={NOWRAP_STYLE}>
                            Cookie Policy
                          </Link>
                        </li>
                       </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu

