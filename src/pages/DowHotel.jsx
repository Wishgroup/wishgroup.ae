import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function DowHotel() {
  useScrollAnimations()
  
  const tagline1Ref = useRef(null)
  const tagline2Ref = useRef(null)
  const descriptionRef = useRef(null)
  const [isVisible1, setIsVisible1] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisibleDesc, setIsVisibleDesc] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === tagline1Ref.current) {
              setTimeout(() => setIsVisible1(true), 200)
            } else if (entry.target === tagline2Ref.current) {
              setTimeout(() => setIsVisible2(true), 600)
            } else if (entry.target === descriptionRef.current) {
              setTimeout(() => setIsVisibleDesc(true), 1000)
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (tagline1Ref.current) observer.observe(tagline1Ref.current)
    if (tagline2Ref.current) observer.observe(tagline2Ref.current)
    if (descriptionRef.current) observer.observe(descriptionRef.current)

    return () => {
      if (tagline1Ref.current) observer.unobserve(tagline1Ref.current)
      if (tagline2Ref.current) observer.unobserve(tagline2Ref.current)
      if (descriptionRef.current) observer.unobserve(descriptionRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .dowhotel-banner-spacing {
          padding-top: 100px !important;
        }
        @media (max-width: 768px) {
          .dowhotel-banner-spacing {
            padding-top: 140px !important;
          }
        }
      `}</style>
      {/* Banner Section */}
      <div className="mil-inner-banner mil-p-0-120 dowhotel-banner-spacing">
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
                <Link to="/project-2">Seeds Taking Root</Link>
              </li>
              <li>DOW HOTEL & RESORT</li>
            </ul>
            <h1 className="mil-mb-20">
              DOW HOTEL & RESORT
            </h1>
          </div>
        </div>
      </div>

      {/* Photo Section with Taglines and Description */}
      <section className="mil-p-120-120">
        <div className="container" style={{ maxWidth: '1300px' }}>
          <div className="row">
            <div className="col-12">
              <div className="mil-up" style={{ position: 'relative', width: '100%' }}>
                <img 
                  src="/img/Project2/Crystal Lagoon Experience/beautiful-summer-beach-paradise-with-sandy-beach-a-2024-11-25-15-17-03-utc.jpg"
                  alt="Dow Hotel & Resort"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg') {
                      e.currentTarget.src = '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg'
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Tagline Section - Below Image */}
          <div className="mil-center mil-mt-60">
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div 
                ref={tagline1Ref}
                style={{ 
                  fontSize: '24px', 
                  lineHeight: '1.6', 
                  fontWeight: 300,
                  transform: isVisible1 ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible1 ? 0.65 : 0,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Dow Hotel & Resort — Your Coastal Retreat
              </div>
              <p 
                ref={tagline2Ref}
                className="mil-text mil-mb-20" 
                style={{  
                  fontSize: '20px', 
                  lineHeight: '1.8', 
                  marginTop: '16px',
                  transform: isVisible2 ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible2 ? 0.85 : 0,
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Escape. Relax. Rediscover luxury by the sea.
              </p>
              <div 
                ref={descriptionRef}
                style={{
                  transform: isVisibleDesc ? 'translateY(0)' : 'translateY(50px)',
                  opacity: isVisibleDesc ? 1 : 0,
                  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0,
                  marginBottom: '18px'
                }}>
                  Nestled along pristine shores, Dow Hotel & Resort invites you to unwind in a harmonious blend of comfort, style, and seaside serenity.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0,
                  marginBottom: '18px'
                }}>
                  Welcome to Dow — A Haven of Hospitality and Calm. Discover a destination where each moment is designed for relaxation and rejuvenation. At Dow Hotel & Resort, modern comfort meets coastal charm — creating spaces that feel both luxurious and welcoming, whether you're here for leisure or a tranquil getaway.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0
                }}>
                  Rooms & Suites — Comfortably Yours. Each accommodation at Dow is crafted to feel like your personal sanctuary. Thoughtfully appointed interiors, warm lighting, and sweeping views of sea or garden provide the perfect backdrop for rest and reflection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="mil-p-120-120">
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            width: '100%'
          }}>
            {/* Card 1 - Deluxe Sea View Rooms */}
            <div className="mil-up" style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                <img 
                  src="/img/Project2/Crystal Lagoon Experience/beach-with-coral-reef-underwater-view-2024-10-11-04-30-46-utc.jpg"
                  alt="Deluxe Sea View Rooms"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg') {
                      e.currentTarget.src = '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg'
                    }
                  }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  Deluxe Sea View Rooms
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Soft hues and ocean vistas.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Thoughtfully appointed interiors with warm lighting and sweeping sea views.
                </p>
                <a
                  href="mailto:info@wishgroup.ae?subject=View Room Details - Dow Hotel"
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '13px',
                    color: '#A6033F',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  View Room Details & Gallery →
                </a>
              </div>
            </div>

            {/* Card 2 - Family Suites */}
            <div className="mil-up" style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                <img 
                  src="/img/Project2/Crystal Lagoon Experience/beautiful-summer-beach-paradise-with-sandy-beach-a-2024-11-25-15-17-03-utc.jpg"
                  alt="Family Suites"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg') {
                      e.currentTarget.src = '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg'
                    }
                  }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  Family Suites
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Spacious layouts with modern finishes.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Perfect for families seeking comfort and space with premium amenities.
                </p>
                <a
                  href="mailto:info@wishgroup.ae?subject=View Room Details - Dow Hotel"
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '13px',
                    color: '#A6033F',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  View Room Details & Gallery →
                </a>
              </div>
            </div>

            {/* Card 3 - Garden View Rooms */}
            <div className="mil-up" style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '75%', overflow: 'hidden' }}>
                <img 
                  src="/img/Project2/Crystal Lagoon Experience/underwater-scene-with-reef-and-tropical-fish-2025-01-08-09-10-21-utc.jpg"
                  alt="Garden View Rooms"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg') {
                      e.currentTarget.src = '/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg'
                    }
                  }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 8px 0',
                  lineHeight: '1.3'
                }}>
                  Garden View Rooms
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Lush calm with easy access to resort pathways.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Serene garden views providing the perfect backdrop for rest and reflection.
                </p>
                <a
                  href="mailto:info@wishgroup.ae?subject=View Room Details - Dow Hotel"
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '13px',
                    color: '#A6033F',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  View Room Details & Gallery →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality, Advantage, Packaging, CTA */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container" style={{ maxWidth: '1600px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="row" style={{ gap: '24px', justifyContent: 'center', width: '100%', margin: 0 }}>
            
            {/* Accommodation & Comfort Card */}
            <div className="col-12 col-md-4" style={{ position: 'relative', minHeight: '500px', padding: 0, flex: '1 1 0' }}>
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
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
                        Accommodation & <span style={{ fontWeight: 300 }}>Comfort</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Comfortably Yours
                      </p>
                    </div>
                  </div>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '12px' }}>✓ Deluxe Sea View Rooms</li>
                    <li style={{ marginBottom: '12px' }}>✓ Family Suites</li>
                    <li style={{ marginBottom: '12px' }}>✓ Garden View Rooms</li>
                    <li style={{ marginBottom: '12px' }}>✓ Thoughtfully appointed interiors</li>
                  </ul>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify',
                    fontStyle: 'italic'
                  }}>
                    Each accommodation is crafted to feel like your personal sanctuary.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Experiences Card */}
            <div className="col-12 col-md-4" style={{ position: 'relative', minHeight: '500px', padding: 0, flex: '1 1 0' }}>
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
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
                        Signature <span style={{ fontWeight: 300 }}>Experiences</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Moments That Stay With You
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8
                  }}>
                    Dow Hotel & Resort elevates your stay with curated experiences:
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '8px' }}>• Seaside Dining: Fresh, locally inspired cuisine with ocean views</li>
                    <li style={{ marginBottom: '8px' }}>• Sunrise Yoga & Wellness: Gentle mornings curated around your well-being</li>
                    <li style={{ marginBottom: '8px' }}>• Private Beach Access: Serene sands just steps from your room</li>
                    <li style={{ marginBottom: '8px' }}>• Adventure & Activities: Water sports, excursions, and cultural experiences</li>
                  </ul>
                  
                  <a
                    href="mailto:info@wishgroup.ae?subject=See Activities & Packages - Dow Hotel"
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      color: '#A6033F',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    See Activities & Packages →
                  </a>
                </div>
              </div>
            </div>

            {/* Dining & Cuisine Card */}
            <div className="col-12 col-md-4" style={{ position: 'relative', minHeight: '500px', padding: 0, flex: '1 1 0' }}>
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
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
                        Dining & <span style={{ fontWeight: 300 }}>Cuisine</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Flavors Worth Savouring
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8
                  }}>
                    Delight in culinary creations designed to reflect local tastes with international flair. From casual beachfront bites to curated fine dining, each dish is inspired by freshness and crafted with passion.
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '8px' }}>• Panoramic Oceanfront Restaurant</li>
                    <li style={{ marginBottom: '8px' }}>• Beachside Café & Bar</li>
                    <li style={{ marginBottom: '8px' }}>• Seasonal Tasting Menus</li>
                  </ul>
                  
                  <a
                    href="mailto:info@wishgroup.ae?subject=Explore Our Menus - Dow Hotel"
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      color: '#A6033F',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    Explore Our Menus →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Event & Celebration Spaces Section */}
          <div className="row" style={{ gap: '24px', justifyContent: 'center', width: '100%', margin: '40px 0 0 0' }}>
            <div className="col-12 col-md-6" style={{ position: 'relative', minHeight: '400px', padding: 0, flex: '1 1 0' }}>
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
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
                        Event & Celebration <span style={{ fontWeight: 300 }}>Spaces</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Your Moments, Perfectly Hosted
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8
                  }}>
                    Whether planning a destination wedding, corporate retreat, or intimate gathering, Dow offers flexible spaces and expert support to make every event unforgettable.
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '8px' }}>• Oceanside pavilion</li>
                    <li style={{ marginBottom: '8px' }}>• Conference facilities</li>
                    <li style={{ marginBottom: '8px' }}>• Private dining zones</li>
                    <li style={{ marginBottom: '8px' }}>• Customised event planning services</li>
                  </ul>
                  
                  <a
                    href="mailto:info@wishgroup.ae?subject=Plan Your Event - Dow Hotel"
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      color: '#A6033F',
                      textDecoration: 'none',
                      fontWeight: 600
                    }}
                  >
                    Plan Your Event With Us →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mil-center" style={{ paddingTop: '50px' }}>
            <h2 className="mil-up mil-mb-10">Book Your Stay <span className="mil-thin">— Make Your Escape Happen</span></h2>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              Ready to experience Dow Hotel & Resort? Secure your room, explore seasonal offers, or request personalized assistance.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Check Availability - Dow Hotel"
                style={{
                  padding: '14px 24px',
                  borderRadius: '70px',
                  background: '#A6033F',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                Check Availability
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Explore Seasonal Offers - Dow Hotel"
                style={{
                  padding: '14px 24px',
                  borderRadius: '70px',
                  border: '1px solid #8596A6',
                  color: '#3C4C59',
                  textDecoration: 'none',
                  fontWeight: 600,
                  background: '#fff',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Seasonal Offers
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Personalized Assistance - Dow Hotel"
                style={{
                  padding: '14px 24px',
                  borderRadius: '70px',
                  background: '#A6033F',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
              >
                Request Personalized Assistance
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default DowHotel
