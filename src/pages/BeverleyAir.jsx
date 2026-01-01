import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function BeverleyAir() {
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
        .beverleyair-banner-spacing {
          padding-top: 100px !important;
        }
        @media (max-width: 768px) {
          .beverleyair-banner-spacing {
            padding-top: 140px !important;
          }
        }
      `}</style>
      {/* Banner Section */}
      <div className="mil-inner-banner mil-p-0-120 beverleyair-banner-spacing">
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
              <li>Beverley Air</li>
            </ul>
            <h1 className="mil-mb-20">
              BEVERLEY AIR 
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
                  src="/img/Project2/Beverley Air/beautiful-beach-with-jetty-2024-10-18-05-31-20-utc.jpg"
                  alt="Beverley Air - Private Island Sanctuary"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Beverley Air/couple.webp') {
                      e.currentTarget.src = '/img/Project2/Beverley Air/couple.webp'
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
                Your Private Island Sanctuary
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
                Where seclusion meets sophistication: bespoke villas, world-class amenities and uninterrupted ocean views.
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
                  Beverley Air is an exclusive retreat crafted for those who demand privacy without compromise. Every corner of the island is curated — from oceanfront villas to intimate dining — so every stay feels like a personal masterpiece.
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
                  Handover-ready villas, championship golf, Ayurveda & wellness, and private marina access. Designed for those who demand privacy without compromise, Beverley Air balances opulence with responsibility through coastal conservation initiatives, renewable energy integration, and community-led employment programs.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0
                }}>
                  About Beverley Air — Your Private Island, Reimagined. Limited residences — by invitation. Each villa and residence type is thoughtfully designed to create moments of pure luxury, from the Oceanfront Pavilion with private terraces and seamless indoor–outdoor living, to the Cliffside Manor with panoramic views and rooftop terraces, to the intimate Garden Retreat villas tucked behind lush landscaping.
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
            {/* Card 1 - Oceanfront Pavilion */}
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
                  src="/img/Project2/Beverley Air/beach-sea-sand-sun-umbrella-seat-chair-seascape-pa-2025-03-09-07-41-57-utc.jpg"
                  alt="Oceanfront Pavilion"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Beverley Air/couple.webp') {
                      e.currentTarget.src = '/img/Project2/Beverley Air/couple.webp'
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
                  The Oceanfront Pavilion
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  4–6 beds, private pool, direct beach access.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Ideal for families who seek sanctuary with private terraces and seamless indoor–outdoor living.
                </p>
              </div>
            </div>

            {/* Card 2 - Cliffside Manor */}
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
                  src="/img/Project2/Beverley Air/relax-2024-12-02-13-44-43-utc.jpg"
                  alt="Cliffside Manor"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Beverley Air/couple.webp') {
                      e.currentTarget.src = '/img/Project2/Beverley Air/couple.webp'
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
                  The Cliffside Manor
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Panoramic views, rooftop terrace, private elevator.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  For those who entertain at scale with breathtaking ocean vistas.
                </p>
              </div>
            </div>

            {/* Card 3 - Garden Retreat */}
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
                  src="/img/Project2/Beverley Air/palm-trees-and-hammock-on-a-tropical-beach-island-2024-12-04-07-48-19-utc.jpg"
                  alt="Garden Retreat"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project2/Beverley Air/couple.webp') {
                      e.currentTarget.src = '/img/Project2/Beverley Air/couple.webp'
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
                  The Garden Retreat
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Intimate 2–3 bed villas tucked behind lush landscaping.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Perfect for longer stays with serene garden views and easy access to resort pathways.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quality, Advantage, Packaging, CTA */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container" style={{ maxWidth: '1600px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="row" style={{ gap: '24px', justifyContent: 'center', width: '100%', margin: 0 }}>
            
            {/* Facilities & Specs Card */}
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
                        Facilities & <span style={{ fontWeight: 300 }}>Specs</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Thoughtful Luxury, Technical Excellence
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Every amenity at Beverley Air is designed to create moments of pure luxury and relaxation, from championship golf to world-class wellness.
                  </p>
                  
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: '0 0 12px 0',
                    opacity: 0.9
                  }}>
                    Highlights:
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '12px' }}>✔ 18-Hole Championship Golf Course</li>
                    <li style={{ marginBottom: '12px' }}>✔ Ayurveda-International Spa (500–800 sqm)</li>
                    <li style={{ marginBottom: '12px' }}>✔ Signature Fine Dining (450 sqm)</li>
                    <li style={{ marginBottom: '12px' }}>✔ Private Movie Theatre (400 sqm)</li>
                    <li style={{ marginBottom: '12px' }}>✔ Art Gallery (300 sqm)</li>
                    <li style={{ marginBottom: '12px' }}>✔ Natural Infinity Pool</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Curated Experiences Card */}
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
                        Curated <span style={{ fontWeight: 300 }}>Experiences</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Live the Beverley Air Way
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
                    Life at Beverley Air is elevated by exceptional experiences designed to nurture well-being, connection, and leisure:
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {[
                      { title: 'Wellness Journeys', desc: 'Bespoke Ayurveda programmes, ocean-front yoga, and bespoke detox retreats.' },
                      { title: 'Gastronomic Curation', desc: 'Chef residencies, ocean-to-table menus, private wine pairing evenings.' },
                      { title: 'Sport & Leisure', desc: 'Championship golf tee times, personalized coaching, water-sports concierge.' },
                      { title: 'Cultural & Art', desc: 'Private gallery tours, artist-in-residence dinners, and custom exhibitions.' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ marginBottom: '12px' }}>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#3C4C59', fontSize: '15px' }}>• {item.title}</p>
                        <p style={{ margin: 0, color: '#8596A6', fontSize: '13px', lineHeight: '1.5' }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <a
                    href="mailto:info@wishgroup.ae?subject=Explore Experiences - Beverley Air"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      borderRadius: '70px',
                      border: '1px solid #A6033F',
                      color: '#A6033F',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#A6033F'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#A6033F'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    Explore Experiences
                  </a>
                </div>
              </div>
            </div>

            {/* Sustainability & Stewardship Card */}
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
                        Sustainability & <span style={{ fontWeight: 300 }}>Stewardship</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Luxury That Respects the Sea
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Strategically positioned as a private island sanctuary, Beverley Air offers the best of both worlds — the peaceful embrace of secluded living and the convenience of world-class amenities.
                  </p>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8,
                    textAlign: 'justify',
                    fontStyle: 'italic'
                  }}>
                    Beverley Air balances opulence with responsibility: coastal conservation initiatives, renewable energy integration, water stewardship, and community-led employment programs. Guests are invited to participate in marine restoration and cultural exchange projects.
                  </p>
                  
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: '0 0 16px 0',
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Key Living Benefits: Spectacular ocean vistas • Serene, low-density community • Thoughtfully designed public spaces • Tailored privacy and comfort
                  </p>
                  
                  <a
                    href="mailto:info@wishgroup.ae?subject=Learn About Sustainability - Beverley Air"
                    style={{
                      display: 'inline-block',
                      padding: '10px 20px',
                      borderRadius: '70px',
                      border: '1px solid #A6033F',
                      color: '#A6033F',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      marginTop: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#A6033F'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#A6033F'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mil-center" style={{ paddingTop: '50px' }}>
            <h2 className="mil-up mil-mb-10">Make Beverley Air <span className="mil-thin">Your Sanctuary</span></h2>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              Opportunities here are limited — each residence crafted for exclusivity and enduring value.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Download Brochure - Beverley Air"
                style={{
                  padding: '14px 24px',
                  borderRadius: '70px',
                  background: '#A6033F',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8a0233'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#A6033F'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Download Brochure
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Pricing - Beverley Air"
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#A6033F'
                  e.currentTarget.style.color = '#A6033F'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#8596A6'
                  e.currentTarget.style.color = '#3C4C59'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Request Pricing
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Book a Viewing - Beverley Air"
                style={{
                  padding: '14px 24px',
                  borderRadius: '70px',
                  background: '#A6033F',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8a0233'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#A6033F'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Book a Viewing
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BeverleyAir

