import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Move static data outside component
const PROJECT_IMAGES = [
  '/img/Project1/WishHoldings/image.webp',
  '/img/Project1/WishHoldings/about.webp',
  '/img/Project1/WishHoldings/skipjacktuna.webp',
  '/img/works/tuna2.webp',
  '/img/Project1/Prime Wish/prawns1.webp',
  '/img/Project1/Prime Wish/prawns3.webp',
  '/img/Project1/Prime Wish/primetune.webp',
  ]

// Constants
const AUTO_PLAY_DELAY = 2500
const RESUME_DELAY = 2500

function Project1() {
  useScrollAnimations()

  const galleryImages = useMemo(() => PROJECT_IMAGES.slice(1), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Refs for intervals and timeouts
  const autoPlayIntervalRef = useRef(null)
  const resumeTimeoutRef = useRef(null)

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

  const handleScrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  const handleScrollToProject = useCallback((e) => {
    e.preventDefault()
    handleScrollToSection('project')
  }, [handleScrollToSection])

  const handleScrollToAchievements = useCallback((e) => {
    e.preventDefault()
    handleScrollToSection('achievements')
  }, [handleScrollToSection])

  const handleScrollToContact = useCallback((e) => {
    e.preventDefault()
    handleScrollToSection('get-in-touch')
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
              <li>
                <Link to="/portfolio-1">Portfolio</Link>
              </li>
              <li>Wishes FulFilled</li> 
            </ul>
            <h1 className="mil-mb-60">
             Wishes <span className="mil-thin">Fulfilled</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              These projects represent the successful completion of a growth cycle—the tangible harvest that proves the efficacy of our strategy. They stand as enduring proof of our ability to execute complex visions, manage international capital, and deliver enduring, high-quality value.
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
        <div className="container" style={{ maxWidth: '1400px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="mil-center mil-mb-90">
            <p className="mil-text mil-up mil-mb-30" style={{ 
              fontSize: '14px',
              opacity: 0.7,
              fontStyle: 'italic',
              maxWidth: '800px',
              margin: '0 auto'
            }}>Our track record of successful, lasting developments.</p>
            <h2 className="mil-up mil-mb-60">Completed
               <span className="mil-thin"> Projects</span>
            </h2>
          </div>

          <div className="row" style={{ gap: '20px', justifyContent: 'center', width: '100%', margin: 0 }}>
            {/* Wish Harbour – Ciprea Phase Card */}
            <div className="col-12 col-md-6 col-lg-3" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <Link to="/project/wish-harbour-ciprea" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
                    src="/img/Project1/Ciprea/image.webp"
                    alt="Wish Harbour – Ciprea Phase"
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
                    onError={(e) => {
                      if (e.currentTarget.src !== '/img/Project1/Ciprea/about.webp') {
                        e.currentTarget.src = '/img/Project1/Ciprea/about.webp'
                      }
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
                        Wish Harbour <span style={{ fontWeight: 300 }}>– Ciprea Phase</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>REAL ESTATE • RESIDENTIAL DEVELOPMENT</div>
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
                    Successfully delivered a foundational phase of a mix-use community focused on quality, integrated living. This confirmed our capacity to transform raw land into high-value residential assets.
                  </p>
                </div>
              </div>
              </Link>
            </div>

            {/* Prime Wish Card */}
            <div className="col-12 col-md-6 col-lg-3" style={{ position: 'relative', minHeight: '500px' }}>
              <Link to="/project/prime-wish" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
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
                    src="/img/Project1/Prime Wish/prawns1.webp"
                    alt="Prime Wish"
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
                    onError={(e) => {
                      if (e.currentTarget.src !== '/img/Project1/Prime Wish/prawns3.webp') {
                        e.currentTarget.src = '/img/Project1/Prime Wish/prawns3.webp'
                      }
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
                        Prime <span style={{ fontWeight: 300 }}>Wish</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>MIX-USE COMMERCIAL & LEISURE</div>
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
                    Delivered a flagship project designed as a central destination for commerce and leisure. This venture now generates stable returns and serves as a major hub for business activity.
                  </p>
                </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Project Gallery</span>
            <h2 className="mil-up mil-mb-30">
              Visual <span className="mil-thin">Showcase</span>
            </h2>
          </div>
          {/* Carousel Container */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0 0 0'
            }}
            onMouseEnter={handleMouseEnterCarousel}
            onMouseLeave={handleMouseLeaveCarousel}
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
                      alt={`Trade Centre ${index + 2}`}
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
              Contact us to learn more about Trade Centre and explore investment opportunities across our strategic locations.
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

export default Project1
