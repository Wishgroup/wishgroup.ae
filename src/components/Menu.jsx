import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthButton from './AuthButton'

function Menu() {
  const [isActive, setIsActive] = useState(false)
  const [isProjectsActive, setIsProjectsActive] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const menuBtn = document.querySelectorAll('.mil-menu-btn')
    const handleClick = () => {
      setIsActive((prev) => !prev)
    }

    menuBtn.forEach((btn) => {
      btn?.addEventListener('click', handleClick)
    })

    // Update menu button classes
    menuBtn.forEach((btn) => {
      if (isActive) {
        btn.classList.add('mil-active')
      } else {
        btn.classList.remove('mil-active')
      }
    })

    return () => {
      menuBtn.forEach((btn) => {
        btn?.removeEventListener('click', handleClick)
      })
    }
  }, [isActive])

  useEffect(() => {
    setIsActive(false)
    setIsProjectsActive(false)
  }, [location])

  // Save scroll position when menu state changes
  useEffect(() => {
    if (location.pathname === '/') {
      const scrollY = window.scrollY || window.pageYOffset
      sessionStorage.setItem('homepage_scroll_position', scrollY.toString())
    }
  }, [isActive, location])

  // Track scroll position and save to sessionStorage
  useEffect(() => {
    const saveScrollPosition = () => {
      if (location.pathname === '/') {
        const scrollY = window.scrollY || window.pageYOffset
        sessionStorage.setItem('homepage_scroll_position', scrollY.toString())
      }
    }

    // Save scroll position on scroll (throttled)
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(saveScrollPosition, 100)
    }

    // Save scroll position on user interactions
    const handleInteraction = () => {
      saveScrollPosition()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleInteraction, { passive: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [location])

  const handleProjectsClick = (e) => {
    e.preventDefault()
    setIsProjectsActive((prev) => !prev)
  }

  const handleHomepageClick = (e) => {
    const savedScrollPosition = sessionStorage.getItem('homepage_scroll_position')
    
    if (location.pathname === '/') {
      // Already on homepage, prevent navigation and just restore scroll position
      e.preventDefault()
      if (savedScrollPosition) {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'smooth'
        })
      }
    } else {
      // Allow Link to navigate naturally, scroll will be restored by Home component
      // No need to prevent default - let React Router handle navigation
    }
  }

  const menuItems = [
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
      children: [
        { title: 'Services List', path: '/services' },
        { title: 'Single service', path: '/service' },
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

  const projects = [
    { title: 'Wishes Fulfilled', path: '/project-1' },
    { title: 'Seeds Taking Root', path: '/project-2' },
    { title: 'Partnerships for Impact', path: '/project-3' },
    { title: 'Dreams on the Horizon', path: '/project-4' },
  ]

  return (
    <div className={`mil-menu-frame ${isActive ? 'mil-active' : ''}`}>
      <div className="mil-frame-top">
        <Link to="/" className="mil-logo" onClick={handleHomepageClick}>
          <img src="/logo.png" alt="Wish Group Logo" style={{ height: '56px', width: 'auto' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  {menuItems.map((item, index) => (
                    <li 
                      key={index} 
                      className={`mil-has-children ${item.title === 'Projects' && isProjectsActive ? 'mil-active' : ''}`}
                    >
                      {item.title === 'Homepage' ? (
                        <Link to="/" onClick={handleHomepageClick}>{item.title}</Link>
                      ) : item.title === 'Projects' ? (
                        <a href="#." onClick={handleProjectsClick}>{item.title}</a>
                      ) : item.path ? (
                        <Link to={item.path}>{item.title}</Link>
                      ) : (
                        <a href="#.">{item.title}</a>
                      )}
                      <ul>
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            {child.path === '/' ? (
                              <Link to={child.path} onClick={handleHomepageClick}>{child.title}</Link>
                            ) : (
                              <Link to={child.path}>{child.title}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
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
                            key={index}
                            className={`mil-project-item ${isProjectsActive ? 'mil-animate-in' : ''}`}
                            style={{ 
                              transitionDelay: isProjectsActive ? `${0.1 + index * 0.1}s` : '0s'
                            }}
                          >
                            <Link 
                              to={project.path} 
                              className="mil-light-soft"
                              style={{ whiteSpace: 'nowrap' }}
                              onClick={() => setIsProjectsActive(false)}
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
                      <h6 className="mil-muted mil-mb-30" style={{ width: 'fit-content' ,whiteSpace: 'nowrap' }}>Useful links</h6>
                      <ul className="mil-menu-list">
                        <li>
                          <a href="#." className="mil-light-soft" style={{ whiteSpace: 'nowrap' }}>
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft" style={{ whiteSpace: 'nowrap' }}>
                            Terms and conditions
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft" style={{ whiteSpace: 'nowrap' }}>
                            Cookie Policy
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft" style={{ whiteSpace: 'nowrap' }}>
                            Careers
                          </a>
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

