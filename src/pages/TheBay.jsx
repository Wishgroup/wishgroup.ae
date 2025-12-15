import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function TheBay() {
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
              <li>The Bay</li>
            </ul>
            <h1 className="mil-mb-60">
              THE BAY
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Where everyday elegance meets coastal serenity. An exclusive waterfront destination offering premium residences, curated amenities, and an elevated lifestyle — all in harmony with the rhythm of the sea.
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
                  src="/img/Project2/Crystal Lagoon Experience/lagoon2.jpeg"
                  alt="The Bay - Waterfront Luxury Living"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
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
                }}>WATERFRONT LUXURY LIVING</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  A Life Inspired <span className="mil-thin">by the Water</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  The Bay is more than a collection of residences — it's a lifestyle destination where architecture, nature, and community converge. Designed for those who appreciate refinement and balance, this waterfront enclave brings premium living to life with a mindful blend of comfort, design, and exclusivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Defined by Design Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Timeless Elegance Meets <span className="mil-thin">Modern Living</span>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.9',
              color: '#3C4C59',
              opacity: 0.8,
              textAlign: 'justify',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              At The Bay, each residence is crafted with purpose — embracing natural light, open spaces, and panoramic water views. Thoughtful design and premium finishes create spaces where every moment feels intentional.
            </p>
            <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Spacious floor plans</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Floor-to-ceiling windows</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Private balconies with bay views</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Premium interior finishes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Amenities Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Everyday Luxury, <span className="mil-thin">Every Day</span>
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.9',
              color: '#3C4C59',
              opacity: 0.8,
              textAlign: 'justify',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Life at The Bay is elevated by exceptional amenities designed to nurture well-being, connection, and leisure:
            </p>
            <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
              <div className="col-12 col-md-6 col-lg-4">
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Infinity Pool & Sun Deck</strong>
                  Relax with uninterrupted water views.
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Private Marina Access</strong>
                  Seamless connection between life and sea.
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Fitness & Wellness Pavilion</strong>
                  Workout, unwind, and rejuvenate.
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Lush Landscaped Walkways</strong>
                  Serene paths for morning walks or evening reflection.
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Exclusive Lounge Spaces</strong>
                  Curated areas to gather, socialize, or simply be.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waterfront Living Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="mil-center mil-mb-90">
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Your Sanctuary <span className="mil-thin">by the Sea</span>
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.8,
                  textAlign: 'justify',
                  marginBottom: '30px'
                }}>
                  Wake up to soft ocean breezes. End your day with golden waterfront sunsets. The Bay brings harmony to your everyday — where each residence is a private escape and every view is a promise of calm.
                </p>
                <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
                  <div className="col-12 col-md-6">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Spectacular bay vistas</div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Serene, low-density community</div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Thoughtfully designed public spaces</div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Tailored privacy and comfort</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Lifestyle Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="mil-center mil-mb-90">
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Live Where Life <span className="mil-thin">Feels Better</span>
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.8,
                  textAlign: 'justify',
                  marginBottom: '30px'
                }}>
                  Strategically positioned to offer the best of both worlds — the peaceful embrace of waterfront living and the convenience of urban access.
                </p>
                <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
                  <div className="col-12 col-md-4">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Minutes from business and cultural hubs</div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Close to premium dining and leisure</div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      fontSize: '15px',
                      color: '#3C4C59',
                      opacity: 0.8
                    }}>• Easy access to major transportation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Make The Bay <span className="mil-thin">Your Home</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto 40px',
              textAlign: 'justify'
            }}>
              Opportunities here are limited — each residence crafted for exclusivity and enduring value.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Download Brochure - The Bay"
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
                Download Brochure
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Pricing - The Bay"
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
                Request Pricing
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Book a Viewing - The Bay"
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
                Book a Viewing
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

export default TheBay

