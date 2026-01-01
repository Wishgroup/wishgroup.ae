import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FaCircleArrowRight, FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Move static data outside component
const PROJECT_IMAGES = [
  '/img/Project2/Beverley Air/couple.webp',
  '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg',
  '/img/Project2/Wish Brands/wishcasa.webp',
  '/img/Project2/Wish World/track.webp',
]

// Constants
const AUTO_PLAY_DELAY = 2500
const RESUME_DELAY = 2500

function Project2() {
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
              <li>Seeds Taking Root</li> 
            </ul>
            <h1 className="mil-mb-60">
             Seeds <span className="mil-thin">Taking Root</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              This is the phase of intense nurturing, where our strategic investments are actively taking root. These ongoing initiatives are currently receiving diligent oversight and dedicated resources to ensure they grow into successful, market-defining assets.
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
            }}>Active projects currently in motion and growing.</p>
            <h2 className="mil-up mil-mb-60">Seeds Taking
               <span className="mil-thin"> Root</span>
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
            {/* Beverley Air Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px', padding: 0 }}>
              <Link to="/project/beverley-air" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
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
                    src="/img/Project2/Beverley Air/couple.webp"
                    alt="Beverley Air - Private Island Luxury Resort"
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
                      // Fallback to image1.webp if couple.webp fails
                      if (e.currentTarget.src !== '/img/Project2/image1.webp') {
                        e.currentTarget.src = '/img/Project2/image1.webp'
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
                        <span style={{ fontWeight: 300 }}>Beverley Air</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>EXCLUSIVE HOSPITALITY • PRIVATE ISLAND</div>
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
                    An exclusive private island retreat where luxury meets untouched natural beauty. Beverley Air offers the ultimate private island experience with world-class amenities including an 18-hole championship golf course, Ayurveda-International spa, signature fine dining, private movie theatre, art gallery, and natural infinity pool.
                  </p>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginTop: '30px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>18-Hole</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Golf Course</div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>Luxury</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Villas</div>
                    </div>
                  </div>
                </div>
                </div>
              </Link>
            </div>

            {/* The Bay Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px' }}>
              <Link to="/project/the-bay" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
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
                    src="/img/Project2/Bay/lagoon2.jpeg"
                    alt="The Bay - Crystal Lagoon Experiences"
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
                      if (e.currentTarget.src !== '/img/Project2/image1.webp') {
                        e.currentTarget.src = '/img/Project2/image1.webp'
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
                        The <span style={{ fontWeight: 300 }}>Bay</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>LEISURE & TOURISM • LAGOON ACTIVITIES</div>
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
                    Creating integrated lagoon-based leisure and water activities designed to enhance the appeal of our resort properties and contribute to the local entertainment economy.
                  </p>
                </div>
                </div>
              </Link>
            </div>

            {/* Dow Hotel & Resort Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px' }}>
              <Link to="/project/dow-hotel" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
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
                    src="/img/Project2/Crystal Lagoon Experience/toddler-boy-on-beach-with-mother-2024-10-11-05-31-51-utc.jpg"
                    alt="Dow Hotel & Resort"
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
                      if (e.currentTarget.src !== '/img/Project2/image4.webp') {
                        e.currentTarget.src = '/img/Project2/image4.webp'
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
                        Dow Hotel <span style={{ fontWeight: 300 }}>& Resort</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>HOSPITALITY & REAL ESTATE • HOTEL & RESORT</div>
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
                    Strategic development and management of a full-service hotel and resort, growing our operational capacity and establishing a strong presence in key global tourism markets.
                  </p>
                </div>
                </div>
              </Link>
            </div>


            {/* Wish Casa Card */}
            <div className="project-tile-card" style={{ position: 'relative', minHeight: '500px' }}>
              <Link to="/project/wish-brands" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', cursor: 'pointer' }}>
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
                    src="/img/Project2/Wish World/Gemini_Generated_Image_9768dg9768dg9768.png"
                    alt="Wish Casa - Global Food Excellence"
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
                      if (e.currentTarget.src !== '/img/Project2/image6.webp') {
                        e.currentTarget.src = '/img/Project2/image6.webp'
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
                        Wish <span style={{ fontWeight: 300 }}>Casa</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>MANUFACTURING • FOOD PRODUCTION (SRI LANKA)</div>
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
                    Operating a state-of-the-art facility in Puttalam, Sri Lanka, focused on the ethical manufacturing and international distribution of high-quality biscuits and beverages.
                  </p>
                </div>
                </div>
              </Link>
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
                      alt={`Project 2 Gallery ${index + 2}`}
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
              <FaCircleArrowRight />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default React.memo(Project2)
