import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Menu() {
  const [isActive, setIsActive] = useState(false)
  const location = useLocation()

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
  }, [location])

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
      title: 'Portfolio',
      children: [
        { title: 'Grid type 1', path: '/portfolio-1' },
        { title: 'Grid type 2', path: '/portfolio-2' },
        { title: 'Slider', path: '/portfolio-3' },
      ],
    },
    {
      title: 'Services',
      children: [
        { title: 'Services List', path: '/services' },
        { title: 'Single service', path: '/service' },
      ],
    },
    {
      title: 'Newsletter',
      children: [
        { title: 'Blog List', path: '/blog' },
        { title: 'Publication', path: '/publication' },
      ],
    },
    {
      title: 'Other pages',
      children: [
        { title: 'Team', path: '/team' },
        { title: 'Contact', path: '/contact' },
        { title: '404', path: '/404' },
      ],
    },
  ]

  const projects = [
    { title: 'Interior design studio', path: '/project-1' },
    { title: 'Home Security Camera', path: '/project-2' },
    { title: 'Kemia Honest Skincare', path: '/project-3' },
    { title: 'Cascade of Lava', path: '/project-4' },
    { title: 'Air Pro by Molekule', path: '/project-5' },
    { title: "Tony's Chocolonely", path: '/project-6' },
  ]

  return (
    <div className={`mil-menu-frame ${isActive ? 'mil-active' : ''}`}>
      <div className="mil-frame-top">
        <Link to="/" className="mil-logo">
          <img src="/logo.png" alt="Wish Group Logo" style={{ height: '56px', width: 'auto' }} />
        </Link>
        <div className="mil-menu-btn">
          <span></span>
        </div>
      </div>
      <div className="container">
        <div className="mil-menu-content">
          <div className="row">
            <div className="col-xl-5">
              <nav className="mil-main-menu">
                <ul>
                  {menuItems.map((item, index) => (
                    <li key={index} className="mil-has-children">
                      <a href="#.">{item.title}</a>
                      <ul>
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link to={child.path}>{child.title}</Link>
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
                      <h6 className="mil-muted mil-mb-30">Projects</h6>
                      <ul className="mil-menu-list">
                        {projects.map((project, index) => (
                          <li key={index}>
                            <Link to={project.path} className="mil-light-soft">
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-4 mil-mb-60">
                      <h6 className="mil-muted mil-mb-30">Useful links</h6>
                      <ul className="mil-menu-list">
                        <li>
                          <a href="#." className="mil-light-soft">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft">
                            Terms and conditions
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft">
                            Cookie Policy
                          </a>
                        </li>
                        <li>
                          <a href="#." className="mil-light-soft">
                            Careers
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mil-divider mil-mb-60"></div>
                  <div className="row justify-content-between">
                    <div className="col-lg-6 mil-mb-60">
                      <h6 className="mil-muted mil-mb-30">Dubai, U.A.E.</h6>
                      <p className="mil-light-soft mil-up">
                        4004/4005, 40th Floor, Citadel Tower,<br />
                        Al Marasi Drive Business Bay, Dubai- U.A.E.<br />
                        P.O.BOX: 417425, Dubai UAE<br />
                        <span className="mil-no-wrap">+971 4259 7167</span> / <span className="mil-no-wrap">+971 4259 4795</span>
                      </p>
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

