import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function BeverleyAir() {
  useScrollAnimations()

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
                <Link to="/project-2">Projects</Link>
              </li>
              <li>Beverley Air</li>
            </ul>
            <h1 className="mil-mb-60">
              BEVERLEY AIR
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Where seclusion meets sophistication: bespoke villas, world-class amenities and uninterrupted ocean views.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="row">
            <div className="col-12">
              {/* Image Container - Landscape */}
              <div className="mil-up mil-mb-60" style={{ position: 'relative', width: '100%' }}>
                <img 
                  src="/img/Project2/Beverley Air/couple.webp"
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
                    if (e.currentTarget.src !== '/img/Project2/image1.webp') {
                      e.currentTarget.src = '/img/Project2/image1.webp'
                    }
                  }}
                />
              </div>
              
              {/* Description Container - Same Width */}
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  width: '100%'
                }}
              >
                <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                  letterSpacing: '4px',
                  fontSize: '11px',
                  opacity: 0.8
                }}>YOUR PRIVATE ISLAND SANCTUARY</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Your Private Island, <span className="mil-thin">Reimagined</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  Beverley Air is an exclusive retreat crafted for those who demand privacy without compromise. Every corner of the island is curated — from oceanfront villas to intimate dining — so every stay feels like a personal masterpiece.
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  marginTop: '20px',
                  margin: '20px 0 0',
                  fontStyle: 'italic'
                }}>
                  Handover-ready villas • Championship golf • Ayurveda & wellness • Private marina
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Island Highlights Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>ISLAND HIGHLIGHTS</span>
            <h2 className="mil-up mil-mb-60">
              Exceptional <span className="mil-thin">Amenities</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Oceanfront Villas</strong>
                Private terraces, seamless indoor–outdoor living.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Championship Golf</strong>
                18-hole course carved into coastal landscape.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Ayurveda-International Spa</strong>
                500–800 sqm sanctuary for holistic wellness.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Signature Fine Dining</strong>
                450 sqm restaurant with a curated wine cellar.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Private Cinema</strong>
                Luxury entertainment experience.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Art Gallery</strong>
                Curated exhibition space.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Natural Infinity Pool</strong>
                Ocean-edge infinity pool with lounge cabanas.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Secluded Beaches</strong>
                Private beach access for ultimate privacy.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa & Residence Types Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>RESIDENCES</span>
            <h2 className="mil-up mil-mb-60">
              Residences Designed <span className="mil-thin">for Legacy</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="mil-up"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  height: '100%'
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>The Oceanfront Pavilion</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '15px'
                }}>4–6 beds, private pool, direct beach access.</p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>Ideal for families who seek sanctuary.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="mil-up"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  height: '100%'
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>The Cliffside Manor</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '15px'
                }}>Panoramic views, rooftop terrace, private elevator.</p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>For those who entertain at scale.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div
                className="mil-up"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '40px',
                  height: '100%'
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>The Garden Retreat</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '15px'
                }}>Intimate 2–3 bed villas tucked behind lush landscaping.</p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>Perfect for longer stays.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Experiences Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>EXPERIENCES</span>
            <h2 className="mil-up mil-mb-60">
              Live the Beverley Air <span className="mil-thin">Way</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Wellness Journeys</strong>
                Bespoke Ayurveda programmes, ocean-front yoga, and bespoke detox retreats.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Gastronomic Curation</strong>
                Chef residencies, ocean-to-table menus, private wine pairing evenings.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Sport & Leisure</strong>
                Championship golf tee times, personalized coaching, water-sports concierge.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Cultural & Art</strong>
                Private gallery tours, artist-in-residence dinners, and custom exhibitions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Specs Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Thoughtful Luxury, <span className="mil-thin">Technical Excellence</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Golf Course</strong>
                18 holes designed for both leisure and championship play.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Spa</strong>
                500–800 sqm Ayurveda-international spa with private treatment pavilions.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Dining</strong>
                450 sqm signature restaurant + private dining suites.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Cinema</strong>
                400 sqm private movie theatre with luxury seating.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Art Gallery</strong>
                300 sqm exhibition space.
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Pool</strong>
                Natural ocean-edge infinity pool with lounge cabanas.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Stewardship Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="mil-center mil-mb-90">
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Luxury That Respects <span className="mil-thin">the Sea</span>
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.8,
                  textAlign: 'justify'
                }}>
                  Beverley Air balances opulence with responsibility: coastal conservation initiatives, renewable energy integration, water stewardship, and community-led employment programs. Guests are invited to participate in marine restoration and cultural exchange projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Reserve Your <span className="mil-thin">Private Visit</span>
            </h2>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Book Private Consultation - Beverley Air"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '15px 30px',
                  borderRadius: '70px',
                  background: '#A6033F',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#8a0235'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#A6033F'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Book a Private Consultation
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Download Brochure - Beverley Air"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '15px 30px',
                  borderRadius: '70px',
                  border: '1px solid #8596A6',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#3C4C59',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
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
                Download Brochure
              </a>
            </div>
            <div style={{
              paddingTop: '40px',
              borderTop: '1px solid rgba(133, 150, 166, 0.1)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#8596A6',
                marginBottom: '10px'
              }}>Contact</p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: 0
              }}>
                4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive, Business Bay, Dubai, UAE.
              </p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: '5px 0 0'
              }}>
                T. +971 4 259 7167 • E. info@wishgroup.ae
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default BeverleyAir

