import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Project4() {
  useScrollAnimations()

  const projectImages = [
    '/img/Project4/Asset 1.png',
    '/img/Project4/economic.jpeg',
    '/img/Project4/iconic structure.jpeg',
    '/img/Project4/last.jpeg',
    '/img/Project4/sustainability.jpeg'
  ]
  
  const galleryImages = projectImages.slice(1)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  // Auto-play carousel for gallery
  const autoPlayIntervalRef = React.useRef(null)

  useEffect(() => {
    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }

    if (!isAutoPlaying) return
    
    // Set up auto-play interval
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 2500) // Change slide every 2.5 seconds

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [isAutoPlaying, galleryImages.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    // Temporarily pause auto-play, then resume after 2.5 seconds
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2500)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    // Temporarily pause auto-play, then resume after 2.5 seconds
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2500)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    // Temporarily pause auto-play, then resume after 2.5 seconds
    setIsAutoPlaying(false)
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2500)
  }

  const handleScrollToProject = (e) => {
    e.preventDefault()
    const projectSection = document.getElementById('project')
    if (projectSection) {
      projectSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleScrollToAchievements = (e) => {
    e.preventDefault()
    const achievementsSection = document.getElementById('achievements')
    if (achievementsSection) {
      achievementsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('get-in-touch')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>
      {/* Banner Section */}
      <div className="mil-inner-banner mil-p-0-120">
        <div className="mil-banner-content mil-up">
          <div className="mil-animation-frame">
            <div className="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
          </div>
          <div className="container">
            <ul className="mil-breadcrumbs mil-mb-60">
              <li>
                <Link to="/">Homepage</Link>
              </li> 
              <li>
                <Link to="/portfolio-1">Portfolio</Link>
              </li>
              <li>Dreams On The Horizon</li> 
            </ul>
            <h1 className="mil-mb-60">
             Dreams On The <span className="mil-thin">Horizon</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              These proposed projects represent the next cycle of planting. They are ambitious, high-impact seeds designed to expand our market leadership and deepen our commitment to equitable global prosperity.
            </p>
            <a 
              href="#achievements" 
              onClick={handleScrollToAchievements}
              className="mil-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                padding: '15px 30px',
                borderRadius: '70px',
                border: '1px solid #8596A6',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                textDecoration: 'none',
                color: '#3C4C59',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.borderColor = '#3C4C59'
                e.currentTarget.style.transform = 'scale(1.02)'
                const arrowCircle = e.currentTarget.querySelector('div')
                const arrow = e.currentTarget.querySelector('svg')
                if (arrowCircle) {
                  arrowCircle.style.borderColor = '#3C4C59'
                }
                if (arrow) {
                  arrow.style.transform = 'translateY(3px)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = '#8596A6'
                e.currentTarget.style.transform = 'scale(1)'
                const arrowCircle = e.currentTarget.querySelector('div')
                const arrow = e.currentTarget.querySelector('svg')
                if (arrowCircle) {
                  arrowCircle.style.borderColor = '#8596A6'
                }
                if (arrow) {
                  arrow.style.transform = 'translateY(0)'
                }
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>View Projects</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid #8596A6',
                transition: 'all 0.3s ease'
              }}>
                <FaArrowDown style={{ 
                  fontSize: '16px',
                  transition: 'transform 0.4s ease',
                  display: 'block',
                  color: '#3C4C59'
                }} />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Completed Projects Section - Futuristic Design */}
      <section id="achievements" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1600px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="mil-center mil-mb-90">
            <p className="mil-text mil-up mil-mb-30" style={{ 
              fontSize: '14px',
              opacity: 0.7,
              fontStyle: 'italic',
              maxWidth: '800px',
              margin: '0 auto'
            }}>The exciting ventures we are preparing to launch.</p>
            <h2 className="mil-up mil-mb-60">Dreams on the
               <span className="mil-thin"> Horizon</span>
            </h2>
          </div>

          <style>{`
            .project-tiles-container {
              display: flex;
              flex-wrap: nowrap;
              gap: 20px;
              justify-content: center;
              width: 100%;
              margin: 0;
            }
            .project-tile-card {
              flex: 1 1 0;
              min-width: 280px;
            }
            @media (max-width: 992px) {
              .project-tiles-container {
                flex-wrap: wrap;
              }
              .project-tile-card {
                flex: 1 1 calc(50% - 10px);
                min-width: calc(50% - 10px);
                max-width: calc(50% - 10px);
              }
            }
            @media (max-width: 768px) {
              .project-tiles-container {
                flex-direction: column;
                gap: 20px;
              }
              .project-tile-card {
                flex: 1 1 100%;
                min-width: 100%;
                max-width: 100%;
              }
              #achievements .container {
                padding-left: 20px !important;
                padding-right: 20px !important;
              }
            }
          `}</style>

          <div className="row project-tiles-container">
            {/* World Capital Centre (WCC) Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <Link to="/project/world-capital-centre" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
                <div
                  className="mil-up"
                  style={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(133, 150, 166, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    display: 'block',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)'
                }}>
                  <img
                    src="/img/Project4/Asset 1.png"
                    alt="World Capital Centre (WCC) - Twin-Tower Development in Colombo"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div 
                    className="project-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(166, 3, 63, 0.3) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: '40px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#3C4C59',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        World Capital <span style={{ fontWeight: 300 }}>Centre (WCC)</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>GLOBAL COMMERCIAL INFRASTRUCTURE • TWIN-TOWER DEVELOPMENT</div>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Planning the launch of iconic, multi-billion-dollar twin-tower developments (e.g., in Colombo) to solidify our role in creating international business hubs that foster cross-border commerce and investment.
                  </p>
                </div>
                </div>
              </Link>
            </div>

            {/* Wish World Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <Link to="/project/wish-world" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
                <div
                  className="mil-up"
                  style={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(133, 150, 166, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    display: 'block',
                    willChange: 'transform',
                    transform: 'translateZ(0)'
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)'
                }}>
                  <img
                    src="/img/Project4/Asset 1.png"
                    alt="Wish World – Entertainment & Theme Park"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div 
                    className="project-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(166, 3, 63, 0.3) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#3C4C59',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        Wish World <span style={{ fontWeight: 300 }}>– Entertainment & Theme Park</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>LEISURE & FAMILY TOURISM</div>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Developing a large-scale entertainment and theme park destination, planting a leisure asset that creates thousands of jobs and provides cultural exchange and high-quality family experiences.
                  </p>
                </div>
                </div>
              </Link>
            </div>

            {/* Global Resource Focus Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  display: 'block',
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)'
                }}>
                  <img
                    src="/img/Project4/economic.jpeg"
                    alt="Global Resource Focus"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div 
                    className="project-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(166, 3, 63, 0.3) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#3C4C59',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        Global Resource <span style={{ fontWeight: 300 }}>Focus</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>TRADE • GHANA/SOUTH AFRICA</div>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Preparing to plant capital in ethical resource trade, ensuring responsible sourcing and commerce that generates significant, sustained economic uplift for our African operational partners.
                  </p>
                </div>
              </div>
            </div>

            {/* Sustainable Food Production Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  display: 'block',
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  const overlay = e.currentTarget.querySelector('.project-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(166, 3, 63, 0.1) 0%, rgba(60, 76, 89, 0.1) 100%)'
                }}>
                  <img
                    src="/img/Project4/sustainability.jpeg"
                    alt="Sustainable Food Production"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                  <div 
                    className="project-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(166, 3, 63, 0.3) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease'
                    }}
                  />
                </div>
                <div style={{ padding: '40px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#3C4C59',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        Sustainable Food <span style={{ fontWeight: 300 }}>Production</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>MANUFACTURING • PRAWN/TUNA/FISH & FMCG</div>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Expanding into essential consumer markets, securing ethical aquaculture and food production to guarantee reliable, healthy, and accessible nutrition globally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="mil-p-120-120 mil-soft-bg project-gallery-section">
        <style>{`
          @media screen and (max-width: 992px) {
            .project-gallery-section {
              padding-top: 40px !important;
              padding-bottom: 40px !important;
            }
            .project-gallery-header {
              margin-bottom: 20px !important;
            }
            .project-carousel-container {
              padding: 0 !important;
            }
          }
        `}</style>
        <div className="container">
          <div className="mil-center mil-mb-90 project-gallery-header">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Project Gallery</span>
            <h2 className="mil-up mil-mb-30">
              Visual <span className="mil-thin">Showcase</span>
            </h2>
          </div>
          {/* Carousel Container */}
          <div 
            className="project-carousel-container"
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0 0 0'
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Carousel Track */}
            <div style={{
              display: 'flex',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform'
            }}>
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    padding: '0 20px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    className="mil-cover-frame mil-up"
                    style={{
                      width: '100%',
                      maxWidth: '800px',
                      margin: '0 auto',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'center center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <img
                      src={image}
                      alt={`World Capital Centre (WCC) ${index + 2}`}
                      className="mil-scale"
                      data-value-1="1"
                      data-value-2="1.1"
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '500px',
                        display: 'block',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
              }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          {/* Indicators/Dots - positioned right below image border, outside carousel */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '800px',
            margin: '15px auto 0',
            padding: '0 20px',
            boxSizing: 'border-box'
          }}>
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === currentIndex ? '40px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  background: index === currentIndex ? '#333' : '#ddd',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <style>{`
          @keyframes scrollRight {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}</style>
      </section>

      {/* Call to Action Section */}
      <section id="get-in-touch" className="mil-p-120-120">
        <div className="container">
          <div className="mil-center">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Get in Touch</span>
            <h2 className="mil-up mil-mb-60">
              Interested in <span className="mil-thin">this project?</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Contact us to learn more about World Capital Centre (WCC) and explore investment opportunities in this groundbreaking $2.45 billion twin-tower development in Colombo.
            </p>
            <a 
              href="#get-in-touch" 
              onClick={handleScrollToContact}
              className="mil-button mil-arrow-place mil-up"
              style={{ textDecoration: 'none' }}
            >
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Project4
