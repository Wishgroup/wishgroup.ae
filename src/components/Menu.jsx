import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthButton from './AuthButton'
import { useMenu } from '../contexts/MenuContext'

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
    path: '/contact',
    children: [
      { title: 'Get in touch', path: '/contact' },
      { title: 'Team', path: '/team' },
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
  const { isMenuActive, setIsMenuActive, toggleMenu } = useMenu()
  const [isActive, setIsActive] = useState(false)
  const [isProjectsActive, setIsProjectsActive] = useState(false)
  const location = useLocation()
  const scrollTimeoutRef = useRef(null)
  const menuBtnRef = useRef(null)
  const isInternalChangeRef = useRef(false)

  // Sync local state with context - only when changed internally
  useEffect(() => {
    if (isInternalChangeRef.current) {
      setIsMenuActive(isActive)
      isInternalChangeRef.current = false
    }
  }, [isActive, setIsMenuActive])

  // Listen to context changes (when Frame button is clicked)
  useEffect(() => {
    if (isMenuActive !== isActive && !isInternalChangeRef.current) {
      setIsActive(isMenuActive)
    }
  }, [isMenuActive, isActive])

  // Memoize handlers to prevent unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    isInternalChangeRef.current = true
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
    setIsActive(false) // Close menu when project link is clicked
  }, [])

  const handleMenuLinkClick = useCallback(() => {
    setIsActive(false) // Close menu when any menu link is clicked
    setIsProjectsActive(false)
  }, [])

  // Optimized scroll position saving function
  const saveScrollPosition = useCallback(() => {
    if (location.pathname === '/') {
      const scrollY = window.scrollY || window.pageYOffset
      sessionStorage.setItem('homepage_scroll_position', scrollY.toString())
    }
  }, [location.pathname])

  // Update menu button active class
  useEffect(() => {
    const menuBtn = document.querySelector('.mil-menu-btn')
    if (menuBtn) {
      menuBtnRef.current = menuBtn
      // Update class based on state
      if (isActive) {
        menuBtn.classList.add('mil-active')
      } else {
        menuBtn.classList.remove('mil-active')
      }
    }
  }, [isActive])

  // Close menu on location change
  useEffect(() => {
    setIsActive(false)
    setIsProjectsActive(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isActive) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      // Restore scrolling
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isActive])

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
    <>
      <style>{`
        /* Mobile fixes for header frame-top */
        @media screen and (max-width: 1200px) {
          /* Only show frame-top when menu is active */
          .mil-menu-frame:not(.mil-active) .mil-frame-top {
            display: none !important;
            pointer-events: none !important;
            visibility: hidden !important;
          }
          
          .mil-menu-frame.mil-active .mil-frame-top {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 90px !important;
            z-index: 1002 !important;
            pointer-events: all !important;
            touch-action: manipulation !important;
            background-color: rgba(18, 18, 18, 0.95) !important;
            backdrop-filter: blur(8px) !important;
            border-bottom: solid 1px rgba(255, 255, 255, 0.1) !important;
            padding: 0 30px !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            visibility: visible !important;
          }

          .mil-menu-frame .mil-frame-top .mil-logo {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            position: relative !important;
            z-index: 1 !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1) !important;
          }

          .mil-menu-frame .mil-frame-top > div {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            position: relative !important;
            z-index: 1 !important;
            display: flex !important;
            align-items: center !important;
            gap: 1rem !important;
          }

          .mil-menu-frame .mil-frame-top .mil-menu-btn {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            position: relative !important;
            z-index: 1 !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1) !important;
            cursor: pointer !important;
          }
        }

        @media screen and (max-width: 768px) {
          .mil-frame-top .mil-logo img {
            height: 40px !important;
            width: auto !important;
          }
          .mil-frame-top {
            padding: 0 20px !important;
          }
        }
        @media screen and (max-width: 480px) {
          .mil-frame-top .mil-logo img {
            height: 36px !important;
          }
          .mil-frame-top {
            padding: 0 15px !important;
          }
        }
        
        /* Mobile menu panel styles */
        @media screen and (max-width: 1200px) {
          /* Menu frame when closed - completely hidden */
          .mil-menu-frame:not(.mil-active) {
            z-index: -1 !important;
            pointer-events: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            display: none !important;
          }
          
          .mil-menu-frame:not(.mil-active) * {
            pointer-events: none !important;
          }
          
          /* Menu frame when active - fully visible */
          .mil-menu-frame.mil-active {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            z-index: 1001 !important;
            pointer-events: all !important;
            visibility: visible !important;
            opacity: 1 !important;
            display: block !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            background-color: rgba(18, 18, 18, 1) !important;
          }
          
          /* Ensure tiles and interactive elements are above menu when closed */
          .country-tile,
          .project-tile-card,
          .mil-cover-frame,
          .countries-grid,
          .project-tiles-container,
          .countries-grid a,
          .project-tiles-container a {
            position: relative !important;
            z-index: 10 !important;
            pointer-events: auto !important;
            touch-action: manipulation !important;
          }
          
          /* Ensure all page content is accessible */
          section,
          .container,
          main {
            position: relative !important;
            z-index: 1 !important;
          }
          
          .mil-menu-frame.mil-active .container {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
            min-height: 100vh;
            pointer-events: all !important;
            position: relative !important;
            z-index: 1 !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          .mil-menu-frame.mil-active .mil-menu-content {
            width: 100%;
            pointer-events: all !important;
            position: relative !important;
            z-index: 1 !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          .mil-menu-frame.mil-active .mil-main-menu {
            width: 100% !important;
            padding: 20px 0 !important;
            pointer-events: all !important;
            position: relative !important;
            z-index: 1 !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
          }
          
          .mil-main-menu ul {
            width: 100%;
            pointer-events: all !important;
          }
          
          .mil-main-menu ul li {
            width: 100%;
            text-align: center;
            pointer-events: all !important;
          }
          
          .mil-main-menu ul li a {
            width: 100%;
            justify-content: center;
            padding: 10px 20px;
            pointer-events: all !important;
            cursor: pointer;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            position: relative !important;
            z-index: 1 !important;
          }
          
          .mil-main-menu ul li.mil-has-children ul {
            width: 100%;
            padding-left: 0;
            text-align: center;
            pointer-events: all !important;
            max-height: 0 !important;
            overflow: hidden !important;
            transition: max-height 0.4s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out !important;
            opacity: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            display: block !important;
          }
          
          .mil-main-menu ul li.mil-has-children.mil-active ul {
            max-height: 1000px !important;
            opacity: 1 !important;
            padding-top: 15px !important;
            padding-bottom: 15px !important;
            pointer-events: all !important;
            visibility: visible !important;
          }
          
          /* Ensure all submenu items are visible when parent is active */
          .mil-main-menu ul li.mil-has-children.mil-active ul li {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
          
          .mil-main-menu ul li.mil-has-children ul li {
            width: 100%;
            pointer-events: all !important;
          }
          
          .mil-main-menu ul li.mil-has-children ul li a {
            width: 100%;
            justify-content: center;
            padding: 8px 20px;
            pointer-events: all !important;
            cursor: pointer;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
            position: relative !important;
            z-index: 1 !important;
          }
          
          /* Hide right column projects on mobile - show in submenu instead */
          .mil-desktop-menu-right {
            display: none !important;
          }
          
          .mil-menu-right-frame {
            display: none !important;
          }
          
          /* Hide Blog List and Publication on mobile for Projects menu */
          .mil-main-menu ul li.mil-has-children.mil-active ul li.mil-desktop-only-child {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          
          /* Ensure only mobile project items are visible when Projects is active on mobile */
          .mil-main-menu ul li.mil-has-children.mil-active ul li:not(.mil-mobile-project-item) {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Show desktop-only children on desktop */
          @media screen and (min-width: 1201px) {
            .mil-main-menu ul li.mil-has-children ul li.mil-desktop-only-child {
              display: block !important;
              visibility: visible !important;
            }
          }
          
          /* Style for projects in mobile submenu */
          .mil-mobile-project-item {
            width: 100% !important;
            pointer-events: all !important;
            margin-bottom: 8px !important;
          }
          
          .mil-mobile-project-item a {
            width: 100% !important;
            justify-content: center !important;
            padding: 10px 20px !important;
            pointer-events: all !important;
            cursor: pointer !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1) !important;
            position: relative !important;
            z-index: 1 !important;
            font-size: 14px !important;
            display: block !important;
            text-align: center !important;
            color: rgba(255, 255, 255, 0.7) !important;
            transition: color 0.3s ease !important;
          }
          
          .mil-mobile-project-item a:hover,
          .mil-mobile-project-item a:active {
            color: rgba(255, 255, 255, 1) !important;
          }
          
          /* Animation for projects appearing in submenu */
          .mil-mobile-project-item {
            animation: slideDown 0.3s ease-out forwards;
            opacity: 0;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Stagger animation for each project item */
          .mil-mobile-project-item:nth-child(1) { animation-delay: 0.1s; }
          .mil-mobile-project-item:nth-child(2) { animation-delay: 0.2s; }
          .mil-mobile-project-item:nth-child(3) { animation-delay: 0.3s; }
          .mil-mobile-project-item:nth-child(4) { animation-delay: 0.4s; }
        }
        
        @media screen and (max-width: 768px) {
          .mil-menu-frame .container {
            padding-top: 90px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          
          .mil-main-menu ul li {
            margin-bottom: 20px !important;
          }
          
          .mil-main-menu ul li a {
            font-size: 18px !important;
          }
          
          .mil-main-menu ul li.mil-has-children ul li {
            margin-bottom: 10px !important;
          }
          
          .mil-main-menu ul li.mil-has-children ul li a {
            font-size: 14px !important;
          }
        }
      `}</style>
      <div className={menuFrameClassName}>
        <div className="mil-frame-top">
          <Link to="/" className="mil-logo" onClick={handleHomepageClick}>
            <img src="/logo.png" alt="Wish Group Logo" style={LOGO_STYLE} />
          </Link>
          <div style={{...HEADER_STYLE, position: 'relative', zIndex: 1, pointerEvents: 'auto', touchAction: 'manipulation'}}>
            <div style={{position: 'relative', zIndex: 1, pointerEvents: 'auto', touchAction: 'manipulation'}}>
              <AuthButton />
            </div>
            <div className="mil-menu-btn" onClick={handleMenuToggle} style={{position: 'relative', zIndex: 1, pointerEvents: 'auto', touchAction: 'manipulation'}}>
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
                          <Link to="/" onClick={(e) => { handleHomepageClick(e); handleMenuLinkClick(); }}>{item.title}</Link>
                        ) : isProjects ? (
                          <a href="#." onClick={handleProjectsClick}>{item.title}</a>
                        ) : item.path ? (
                          <Link to={item.path} onClick={handleMenuLinkClick}>{item.title}</Link>
                        ) : (
                          <a href="#.">{item.title}</a>
                        )}
                        <ul>
                          {/* On mobile, hide Blog List and Publication for Projects menu item */}
                          {isProjects ? (
                            // For Projects: Only show actual projects on mobile, hide children
                            <>
                              {/* Render children but hide them on mobile */}
                              {item.children.map((child) => (
                                <li key={child.path || child.title} className="mil-desktop-only-child">
                                  {child.path === '/' ? (
                                    <Link to={child.path} onClick={(e) => { handleHomepageClick(e); handleMenuLinkClick(); }}>{child.title}</Link>
                                  ) : (
                                    <Link to={child.path} onClick={handleMenuLinkClick}>{child.title}</Link>
                                  )}
                                </li>
                              ))}
                              {/* Show projects in submenu on mobile when Projects is clicked */}
                              {isProjectsActive && (
                                <>
                                  {projects.map((project) => (
                                    <li key={project.path} className="mil-mobile-project-item">
                                      <Link 
                                        to={project.path} 
                                        onClick={handleProjectLinkClick}
                                        className="mil-light-soft"
                                      >
                                        {project.title}
                                      </Link>
                                    </li>
                                  ))}
                                </>
                              )}
                            </>
                          ) : (
                            // For other menu items: Show children normally
                            item.children.map((child) => (
                              <li key={child.path || child.title}>
                                {child.path === '/' ? (
                                  <Link to={child.path} onClick={(e) => { handleHomepageClick(e); handleMenuLinkClick(); }}>{child.title}</Link>
                                ) : (
                                  <Link to={child.path} onClick={handleMenuLinkClick}>{child.title}</Link>
                                )}
                              </li>
                            ))
                          )}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
            <div className="col-xl-7 mil-desktop-menu-right">
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
                          <Link to="/news" className="mil-light-soft" style={NOWRAP_STYLE} onClick={handleMenuLinkClick}>
                            New & Gallery
                          </Link>
                        </li>
                        <li>
                          <Link to="/careers" className="mil-light-soft" style={NOWRAP_STYLE} onClick={handleMenuLinkClick}>
                            Careers
                          </Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy" className="mil-light-soft" style={NOWRAP_STYLE} onClick={handleMenuLinkClick}>
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link to="/terms-and-conditions" className="mil-light-soft" style={NOWRAP_STYLE} onClick={handleMenuLinkClick}>
                            Terms and conditions
                          </Link>
                        </li>
                        <li>
                          <Link to="/cookie-policy" className="mil-light-soft" style={NOWRAP_STYLE} onClick={handleMenuLinkClick}>
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
    </>
  )
}

export default Menu

