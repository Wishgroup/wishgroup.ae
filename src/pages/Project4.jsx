import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Move static data outside component
const PROJECT_IMAGES = [
  '/img/Project4/Asset 1.png',
  '/img/Project4/economic.jpeg',
  '/img/Project4/iconic structure.jpeg',
  '/img/Project4/last.jpeg',
  '/img/Project4/sustainability.jpeg'
]

// Constants
const AUTO_PLAY_DELAY = 2500
const RESUME_DELAY = 2500

function Project4() {
  useScrollAnimations()

  const galleryImages = useMemo(() => PROJECT_IMAGES.slice(1), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Refs for intervals and timeouts
  const autoPlayIntervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

  // Touch swipe state for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const touchStartYRef = useRef(null)
  const carouselContainerRef = useRef(null)

  // Optimized auto-play effect
  useEffect(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
      autoPlayIntervalRef.current = null
    }

    if (!isAutoPlaying || galleryImages.length === 0) return
    
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, AUTO_PLAY_DELAY)

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
        autoPlayIntervalRef.current = null
      }
    }
  }, [isAutoPlaying, galleryImages.length])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [])

  // Memoized handlers
  const pauseAndResume = useCallback(() => {
    setIsAutoPlaying(false)
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, RESUME_DELAY)
  }, [])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
    pauseAndResume()
  }, [pauseAndResume])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    pauseAndResume()
  }, [galleryImages.length, pauseAndResume])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    pauseAndResume()
  }, [galleryImages.length, pauseAndResume])

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0]
    if (!touch) return
    setTouchEnd(null)
    setTouchStart(touch.clientX)
    touchStartYRef.current = touch.clientY
    setIsDragging(true)
    setDragOffset(0)
    setIsAutoPlaying(false)
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!isDragging || touchStart === null) return
    
    const touch = e.touches[0]
    if (!touch) return
    
    setTouchEnd(touch.clientX)
    
    // Calculate drag offset for smooth visual feedback
    const deltaX = touch.clientX - touchStart
    const deltaY = Math.abs(touch.clientY - touchStartYRef.current)
    
    // If horizontal movement is greater than vertical, it's a horizontal swipe
    if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 5) {
      e.preventDefault()
      e.stopPropagation()
      
      // Calculate drag offset (limit to prevent over-scrolling)
      const maxOffset = window.innerWidth * 0.3 // Max 30% of screen width
      const offset = Math.max(-maxOffset, Math.min(maxOffset, deltaX))
      setDragOffset(offset)
    }
  }, [touchStart, isDragging])

  const onTouchEnd = useCallback(() => {
    if (touchStart === null) {
      setIsDragging(false)
      setDragOffset(0)
      pauseAndResume()
      return
    }
    
    const distance = touchStart - (touchEnd || touchStart)
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Reset drag offset
    setDragOffset(0)

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }

    setIsDragging(false)
    setTouchStart(null)
    setTouchEnd(null)
    touchStartYRef.current = null
    pauseAndResume()
  }, [touchStart, touchEnd, goToNext, goToPrevious, pauseAndResume])

  const handleScrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  const handleScrollToAchievements = useCallback((e) => {
    e.preventDefault()
    handleScrollToSection('achievements')
  }, [handleScrollToSection])

  const handleMouseEnterCarousel = useCallback(() => setIsAutoPlaying(false), [])
  const handleMouseLeaveCarousel = useCallback(() => setIsAutoPlaying(true), [])

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

      {/* Dreams on the Horizon Section - Futuristic Design */}
      <section id="achievements" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1400px', paddingLeft: '40px', paddingRight: '40px' }}>
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

          <div className="row" style={{ gap: '20px', justifyContent: 'center', width: '100%', margin: 0 }}>
            {/* World Capital Centre (WCC) Card */}
            <div className="col-12 col-md-6 col-lg-3" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <Link to="/project/world-capital-centre" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
                    transform: 'translateZ(0)',
                    zIndex: 10,
                    pointerEvents: 'auto'
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
            <div className="col-12 col-md-6 col-lg-3" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
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
                  transform: 'translateZ(0)',
                  zIndex: 10,
                  pointerEvents: 'auto'
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
                    src="/img/Project4/amusement-park.jpg"
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
            </div>

            {/* Global Resource Focus Card - Hidden for now */}
            {/* <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
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
            </div> */}

            {/* Sustainable Food Production Card - Hidden for now */}
            {/* <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
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
            </div> */}
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
          @media screen and (max-width: 768px) {
            .project-gallery-section {
              padding-top: 40px !important;
              padding-bottom: 40px !important;
            }
            .project-gallery-header h2 {
              font-size: 24px !important;
              margin-bottom: 20px !important;
            }
            .project-gallery-header .mil-suptitle {
              font-size: 12px !important;
              margin-bottom: 15px !important;
            }
            .project-carousel-container {
              overflow: hidden !important;
              touch-action: pan-x !important;
              -webkit-overflow-scrolling: touch !important;
              cursor: grab;
            }
            .project-carousel-container:active {
              cursor: grabbing;
            }
            .project-carousel-container > div {
              touch-action: pan-x !important;
              -webkit-overflow-scrolling: touch !important;
            }
            .project-carousel-container img {
              height: 300px !important;
              pointer-events: none;
            }
            .project-carousel-container button {
              width: 40px !important;
              height: 40px !important;
              left: 10px !important;
              touch-action: manipulation !important;
            }
            .project-carousel-container button:last-child {
              right: 10px !important;
            }
            .project-carousel-container button svg {
              width: 18px !important;
              height: 18px !important;
            }
          }
          @media screen and (max-width: 480px) {
            .project-carousel-container img {
              height: 250px !important;
            }
            .project-carousel-container button {
              width: 35px !important;
              height: 35px !important;
            }
          }
          /* Ensure tiles are always accessible on mobile */
          @media screen and (max-width: 1200px) {
            .project-tile-card,
            .project-tiles-container,
            .project-tiles-container a,
            #achievements .col-12 {
              position: relative !important;
              z-index: 10 !important;
              pointer-events: auto !important;
              touch-action: manipulation !important;
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
            ref={carouselContainerRef}
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0 0 0',
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onMouseEnter={handleMouseEnterCarousel}
            onMouseLeave={handleMouseLeaveCarousel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
          >
            {/* Carousel Track */}
            <div 
              style={{
                display: 'flex',
                transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
                touchAction: 'pan-x',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none'
              }}
            >
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
                  padding: 0,
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)'
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
        <style>{`
          @media screen and (max-width: 768px) {
            #get-in-touch {
              padding-top: 60px !important;
              padding-bottom: 60px !important;
            }
            #get-in-touch h2 {
              font-size: 24px !important;
              margin-bottom: 30px !important;
            }
            #get-in-touch .mil-suptitle {
              font-size: 12px !important;
              margin-bottom: 20px !important;
            }
            #get-in-touch p {
              font-size: 14px !important;
              margin-bottom: 30px !important;
              padding: 0 15px;
            }
            #get-in-touch .mil-button {
              font-size: 13px !important;
              padding: 12px 24px !important;
            }
          }
        `}</style>
        <div className="container">
          <div className="mil-center">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Get in Touch</span>
            <h2 className="mil-up mil-mb-60">
              Interested in <span className="mil-thin">this project?</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Contact us to learn more about World Capital Centre (WCC) and explore investment opportunities in this groundbreaking $2.45 billion twin-tower development in Colombo.
            </p>
            <Link 
              to="/contact"
              className="mil-button mil-arrow-place mil-up"
              style={{ textDecoration: 'none' }}
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Project4
