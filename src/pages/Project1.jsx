import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Project1() {
  useScrollAnimations()

  const projectImages = [
    '/img/works/1/1.jpg',
    '/img/works/1/2.jpg',
    '/img/works/1/3.jpg',
    '/img/works/1/4.jpg',
    '/img/works/1/5.jpg',
    '/img/works/1/6.jpg',
    '/img/works/1/7.jpg',
  ]
  
  const galleryImages = projectImages.slice(1)
  const additionalImages = projectImages.slice(4)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Additional images strip state
  const [additionalScrollPosition, setAdditionalScrollPosition] = useState(0)
  const [isAdditionalPaused, setIsAdditionalPaused] = useState(false)
  const additionalStripRef = React.useRef(null)
  const additionalAnimationRef = React.useRef(null)
  const additionalIsDragging = React.useRef(false)
  const additionalStartX = React.useRef(0)
  const additionalScrollLeft = React.useRef(0)

  // Auto-play carousel for gallery
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryImages.length])

  // Continuous animation for additional images strip
  useEffect(() => {
    if (isAdditionalPaused || additionalIsDragging.current) return

    const animate = () => {
      if (!isAdditionalPaused && !additionalIsDragging.current) {
        setAdditionalScrollPosition((prev) => {
          const newPos = prev + 0.5 // Adjust speed here
          const maxScroll = additionalStripRef.current ? additionalStripRef.current.scrollWidth - additionalStripRef.current.clientWidth : 0
          return newPos >= maxScroll ? 0 : newPos // Loop back to start
        })
      }
      additionalAnimationRef.current = requestAnimationFrame(animate)
    }

    additionalAnimationRef.current = requestAnimationFrame(animate)
    return () => {
      if (additionalAnimationRef.current) {
        cancelAnimationFrame(additionalAnimationRef.current)
      }
    }
  }, [isAdditionalPaused])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    setIsAutoPlaying(false)
  }

  // Handle mouse drag for additional images
  const handleAdditionalMouseDown = (e) => {
    additionalIsDragging.current = true
    setIsAdditionalPaused(true)
    additionalStartX.current = e.pageX - (additionalStripRef.current?.offsetLeft || 0)
    additionalScrollLeft.current = additionalScrollPosition
  }

  const handleAdditionalMouseMove = (e) => {
    if (!additionalIsDragging.current || !additionalStripRef.current) return
    e.preventDefault()
    const x = e.pageX - (additionalStripRef.current.offsetLeft || 0)
    const walk = (x - additionalStartX.current) * 2 // Scroll speed multiplier
    const newPosition = additionalScrollLeft.current - walk
    const maxScroll = additionalStripRef.current.scrollWidth - additionalStripRef.current.clientWidth
    setAdditionalScrollPosition(Math.max(0, Math.min(newPosition, maxScroll)))
  }

  const handleAdditionalMouseUp = () => {
    additionalIsDragging.current = false
    setIsAdditionalPaused(false)
  }

  const handleAdditionalMouseLeave = () => {
    additionalIsDragging.current = false
    if (!additionalIsDragging.current) {
      setIsAdditionalPaused(false)
    }
  }

  // Handle wheel scroll for additional images
  const handleAdditionalWheel = (e) => {
    if (!additionalStripRef.current) return
    e.preventDefault()
    setIsAdditionalPaused(true)
    const delta = e.deltaY > 0 ? 50 : -50
    const newPosition = additionalScrollPosition + delta
    const maxScroll = additionalStripRef.current.scrollWidth - additionalStripRef.current.clientWidth
    setAdditionalScrollPosition(Math.max(0, Math.min(newPosition, maxScroll)))
    
    // Resume auto-scroll after a delay
    setTimeout(() => setIsAdditionalPaused(false), 2000)
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
              <li>Trade Centre</li>
            </ul>
            <h1 className="mil-mb-60">
              Trade <span className="mil-thin">Centre</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
              Trade Centre is a main land development project in the Maldives, Sri Lanka, and the Hawaii Islands. A strategic investment initiative that combines luxury real estate development with sustainable tourism infrastructure.
            </p>
            <a 
              href="#project" 
              onClick={handleScrollToProject}
              className="mil-link mil-dark mil-arrow-place mil-down-arrow mil-up"
            >
              <span>View Project</span>
            </a>
          </div>
        </div>
      </div>

      {/* Project Overview Section */}
      <section id="project" className="mil-p-120-120">
        <div className="container">
          <div className="row justify-content-between align-items-start mil-mb-90">
            <div className="col-12 col-md-6 col-lg-7 mil-mb-30" style={{ 
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: 0,
              marginTop: 0
            }}>
              <div className="mil-cover-frame mil-up" style={{ 
                width: '100%', 
                maxWidth: '100%',
                overflow: 'hidden',
                marginTop: 0,
                paddingTop: 0
              }}>
                <img  
                  src={projectImages[0]} 
                  alt="Trade Centre" 
                  className="mil-scale"   
                  data-value-1="1" 
                  data-value-2="1.1" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    marginTop: 0,
                    paddingTop: 0,
                    paddingRight: '50px',
                    verticalAlign: 'top'
                  }} 
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5 mil-mb-30" style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingTop: 0,
              marginTop: 0
            }}>
              <div className="mil-mb-60" style={{ marginTop: 0, paddingTop: 0 }}>
                <h2 className="mil-up mil-mb-30" style={{ marginTop: 0, paddingTop: 0, lineHeight: '1.2' }}>
                  Project <span className="mil-thin">Overview</span>
                </h2>
                <p className="mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
                  Trade Centre represents a landmark development initiative spanning three strategic locations: the pristine Maldives, the culturally rich Sri Lanka, and the tropical paradise of Hawaii Islands. This ambitious project combines luxury real estate development with world-class commercial infrastructure.
                </p>  
                <p className="mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
                  Our vision is to create integrated trade centers that serve as hubs for international business, tourism, and sustainable development. Each location has been carefully selected for its unique advantages and strategic importance in global trade routes.
                </p>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 mil-mb-30">
                  <div className="mil-icon-box mil-up">
                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h5 className="mil-mb-15">Strategic Locations</h5>
                    <p className="mil-text-sm">Three prime locations across Maldives, Sri Lanka, and Hawaii Islands</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 mil-mb-30">
                  <div className="mil-icon-box mil-up">
                    <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}>
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h5 className="mil-mb-15">Global Reach</h5>
                    <p className="mil-text-sm">Connecting international markets and trade routes</p>
                  </div>
                </div>
              </div>
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
          <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '20px 0'
          }}>
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
                      style={{
                        width: '100%',
                        height: 'auto',
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

            {/* Indicators/Dots */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '30px',
              zIndex: 10,
              position: 'relative'
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

      {/* Features Section */}
      <section className="mil-p-120-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-6 col-lg-6 mil-mb-60">
              <div className="mil-mb-60">
                <h2 className="mil-up mil-mb-30">
                  Key <span className="mil-thin">Features</span>
                </h2>
                <p className="mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
                  Trade Centre is designed to be a comprehensive development that integrates commercial, residential, and hospitality components. Each location offers unique advantages while maintaining consistent quality and service standards.
                </p>
              </div>
              <div className="mil-up">
                <ul className="mil-list mil-mb-30" style={{ maxWidth: '600px', marginLeft:'50px', marginRight: 'auto',textAlign: 'justify' }}>
                  <li>Luxury residential complexes</li>
                  <li>World-class commercial spaces</li>
                  <li>International trade facilities</li>
                  <li>Sustainable infrastructure</li>
                  <li>Premium hospitality services</li>
                  <li>Strategic investment opportunities</li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mil-mb-60">
              <div className="mil-cover-frame mil-up">
                <img src={projectImages[4]} alt="Trade Centre Features" className="mil-scale" data-value-1="1" data-value-2="1.1" style={{ width: '100%', height: 'auto', display: 'block',paddingLeft: '50px'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Images Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          {/* Animated Scrolling Strip */}
          <div
            ref={additionalStripRef}
            onMouseDown={handleAdditionalMouseDown}
            onMouseMove={handleAdditionalMouseMove}
            onMouseUp={handleAdditionalMouseUp}
            onMouseLeave={handleAdditionalMouseLeave}
            onWheel={handleAdditionalWheel}
            onMouseEnter={() => setIsAdditionalPaused(true)}
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              padding: '20px 0',
              cursor: additionalIsDragging.current ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '30px',
                transform: `translateX(-${additionalScrollPosition}px)`,
                transition: isAdditionalPaused || additionalIsDragging.current ? 'none' : 'transform 0.1s linear',
                willChange: 'transform'
              }}
            >
              {/* Duplicate images for seamless loop */}
              {[...additionalImages, ...additionalImages, ...additionalImages].map((image, index) => (
                <div
                  key={index}
                  className="mil-cover-frame mil-up"
                  style={{
                    flex: '0 0 auto',
                    width: 'clamp(300px, 35vw, 500px)',
                    minWidth: '300px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transformOrigin: 'center center',
                    pointerEvents: additionalIsDragging.current ? 'none' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!additionalIsDragging.current) {
                      e.currentTarget.style.transform = 'scale(1.05) translateY(-10px)'
                      e.currentTarget.style.zIndex = '10'
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    e.currentTarget.style.zIndex = '1'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <img
                    src={image}
                    alt={`Trade Centre ${(index % additionalImages.length) + 5}`}
                    className="mil-scale"
                    data-value-1="1"
                    data-value-2="1.1"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: '8px',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      draggable: false
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Scroll hint overlay */}
            {isAdditionalPaused && !additionalIsDragging.current && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                pointerEvents: 'none',
                zIndex: 20,
                opacity: 0.8
              }}>
                Scroll or drag to navigate
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mil-p-120-120">
        <div className="container">
          <div className="mil-center">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Get in Touch</span>
            <h2 className="mil-up mil-mb-60">
              Interested in <span className="mil-thin">this project?</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Contact us to learn more about Trade Centre and explore investment opportunities across our strategic locations.
            </p>
            <Link to="/contact" className="mil-button mil-button-lg mil-arrow-place mil-up">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Project1
