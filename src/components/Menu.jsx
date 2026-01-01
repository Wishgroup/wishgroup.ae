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
  const { isMenuActive, setIsMenuActive } = useMenu()
  const [isActive, setIsActive] = useState(false)
  const [isProjectsActive, setIsProjectsActive] = useState(false)
  const location = useLocation()
  const scrollTimeoutRef = useRef(null)
  const menuBtnRef = useRef(null)

  // Sync local state with context
  useEffect(() => {
    setIsMenuActive(isActive)
  }, [isActive, setIsMenuActive])

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
          .mil-menu-frame {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            z-index: 9999 !important;
          }
          
          .mil-menu-frame.mil-active {
            z-index: 9999 !important;
          }
          
          .mil-menu-frame .container {
            padding-top: 100px !important;
            padding-bottom: 40px !important;
            min-height: 100vh;
            pointer-events: all !important;
          }
          
          .mil-menu-content {
            width: 100%;
            pointer-events: all !important;
          }
          
          .mil-main-menu {
            width: 100% !important;
            padding: 20px 0 !important;
            pointer-events: all !important;
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
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
          }
          
          .mil-main-menu ul li.mil-has-children ul {
            width: 100%;
            padding-left: 0;
            text-align: center;
            pointer-events: all !important;
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
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
          }
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
          <div style={HEADER_STYLE}>
            <AuthButton />
            <div className="mil-menu-btn" onClick={handleMenuToggle}>
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
                          {item.children.map((child) => (
                            <li key={child.path || child.title}>
                              {child.path === '/' ? (
                                <Link to={child.path} onClick={(e) => { handleHomepageClick(e); handleMenuLinkClick(); }}>{child.title}</Link>
                              ) : (
                                <Link to={child.path} onClick={handleMenuLinkClick}>{child.title}</Link>
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

