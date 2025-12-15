import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function DowHotel() {
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
              <li>Dow Hotel & Resort</li>
            </ul>
            <h1 className="mil-mb-60">
              DOW HOTEL & RESORT
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Escape. Relax. Rediscover luxury by the sea. Nestled along pristine shores, Dow Hotel & Resort invites you to unwind in a harmonious blend of comfort, style, and seaside serenity.
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
                  src="/img/Project2/image3.webp"
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
                    if (e.currentTarget.src !== '/img/Project2/image4.webp') {
                      e.currentTarget.src = '/img/Project2/image4.webp'
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
                }}>WELCOME TO DOW</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  A Haven of Hospitality <span className="mil-thin">and Calm</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  Discover a destination where each moment is designed for relaxation and rejuvenation. At Dow Hotel & Resort, modern comfort meets coastal charm — creating spaces that feel both luxurious and welcoming, whether you're here for leisure or a tranquil getaway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms & Suites Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>ACCOMMODATION</span>
            <h2 className="mil-up mil-mb-60">
              Rooms & <span className="mil-thin">Suites</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Comfortably Yours
            </p>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(133, 150, 166, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                height: '100%'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Deluxe Sea View Rooms</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Soft hues and ocean vistas.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(133, 150, 166, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                height: '100%'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Family Suites</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Spacious layouts with modern finishes.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(133, 150, 166, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                padding: '40px',
                height: '100%'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Garden View Rooms</h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Lush calm with easy access to resort pathways.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{
              fontSize: '14px',
              color: '#8596A6',
              fontStyle: 'italic'
            }}>
              Each accommodation at Dow is crafted to feel like your personal sanctuary. Thoughtfully appointed interiors, warm lighting, and sweeping views of sea or garden provide the perfect backdrop for rest and reflection.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Experiences Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>EXPERIENCES</span>
            <h2 className="mil-up mil-mb-60">
              Signature <span className="mil-thin">Experiences</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto',
              fontStyle: 'italic'
            }}>
              Moments That Stay With You
            </p>
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Seaside Dining</strong>
                Fresh, locally inspired cuisine with ocean views.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Sunrise Yoga & Wellness</strong>
                Gentle mornings curated around your well-being.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Private Beach Access</strong>
                Serene sands just steps from your room.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Adventure & Activities</strong>
                Water sports, excursions, and cultural experiences.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dining & Cuisine Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mil-mb-60">
              <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                letterSpacing: '4px',
                fontSize: '11px',
                opacity: 0.8
              }}>DINING & CUISINE</span>
              <div style={{
                width: '4px',
                height: '60px',
                background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                borderRadius: '2px',
                marginBottom: '30px'
              }} />
              <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                Flavors Worth <span className="mil-thin">Savouring</span>
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '30px'
              }}>
                Delight in culinary creations designed to reflect local tastes with international flair. From casual beachfront bites to curated fine dining, each dish is inspired by freshness and crafted with passion.
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '2',
                color: '#3C4C59',
                opacity: 0.8,
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '15px' }}>✓ Panoramic Oceanfront Restaurant</li>
                <li style={{ marginBottom: '15px' }}>✓ Beachside Café & Bar</li>
                <li style={{ marginBottom: '15px' }}>✓ Seasonal Tasting Menus</li>
              </ul>
            </div>
            <div className="col-lg-6 mil-mb-60">
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
                  padding: '40px'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '20px'
                }}>
                  Event & Celebration <span style={{ fontWeight: 300 }}>Spaces</span>
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>Your Moments, Perfectly Hosted</p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  Whether planning a destination wedding, corporate retreat, or intimate gathering, Dow offers flexible spaces and expert support to make every event unforgettable.
                </p>
                <ul style={{
                  fontSize: '15px',
                  lineHeight: '2',
                  color: '#3C4C59',
                  opacity: 0.8,
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '15px' }}>✓ Oceanside pavilion</li>
                  <li style={{ marginBottom: '15px' }}>✓ Conference facilities</li>
                  <li style={{ marginBottom: '15px' }}>✓ Private dining zones</li>
                  <li style={{ marginBottom: '15px' }}>✓ Customised event planning services</li>
                </ul>
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
              Make Your Escape <span className="mil-thin">Happen</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              Ready to experience Dow Hotel & Resort? Secure your room, explore seasonal offers, or request personalized assistance.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Check Availability - Dow Hotel"
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
                Check Availability
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Reservation Specialist - Dow Hotel"
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
                Speak With a Reservation Specialist
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
                4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive, Business Bay, Dubai, UAE
              </p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: '5px 0 0'
              }}>
                +971 4 259 7167 • info@wishgroup.ae
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default DowHotel

