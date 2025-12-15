import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function WishHarbourCiprea() {
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
                <Link to="/project-1">Projects</Link>
              </li>
              <li>CIPREA</li>
            </ul>
            <h1 className="mil-mb-60">
              CIPREA
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Crafted in Maldives. Perfected for the World. Immerse yourself in the unmatched purity of Maldivian waters. At CIPREA, every tuna we process is a celebration of nature's finest, elevated through precision, passion, and purpose.
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
                  src="/img/Project1/Ciprea/image.webp"
                  alt="CIPREA Premium Maldivian Tuna"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project1/Ciprea/about.webp') {
                      e.currentTarget.src = '/img/Project1/Ciprea/about.webp'
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
                }}>PREMIUM MALDIVIAN TUNA</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Crafted <span className="mil-thin">With Purpose</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify',
                  fontStyle: 'italic'
                }}>
                  From Himmafushi Island to global markets, we transform ocean harvests into world-class culinary experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About CIPREA Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>ABOUT CIPREA</span>
            <h2 className="mil-up mil-mb-60">
              Born in the Maldives. <span className="mil-thin">Built on Excellence.</span>
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <p style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#3C4C59',
                opacity: 0.8,
                textAlign: 'justify',
                marginBottom: '40px'
              }}>
                CIPREA's state-of-the-art processing facility in Himmafushi, Kaafu Atoll is the heart of our craft. Here, traditional fishing meets world-class standards to create tuna products trusted by chefs, retailers, and distributors worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Highlights Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>OUR SIGNATURE TUNA COLLECTION</span>
            <h2 className="mil-up mil-mb-60">
              Product <span className="mil-thin">Highlights</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            {/* Yellowfin Tuna Card */}
            <div className="col-12 col-md-6 col-lg-5">
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '10px'
                }}>
                  Yellowfin Tuna <span style={{ fontWeight: 300, fontSize: '14px' }}>(Thunnus albacares)</span>
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>Refined. Vibrant. Culinary-grade.</p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  Perfect for premium dishes requiring rich colour, flavour, and texture.
                </p>
                <div>
                  <strong style={{ color: '#3C4C59', fontSize: '14px' }}>Available Cuts:</strong>
                  <ul style={{
                    fontSize: '14px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    opacity: 0.8,
                    marginTop: '10px',
                    paddingLeft: '20px'
                  }}>
                    <li>Saku Blocks</li>
                    <li>Loins</li>
                    <li>Steaks</li>
                    <li>Cubes</li>
                    <li>Custom Cuts on Request</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skipjack Tuna Card */}
            <div className="col-12 col-md-6 col-lg-5">
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '10px'
                }}>
                  Skipjack Tuna <span style={{ fontWeight: 300, fontSize: '14px' }}>(Katsuwonus pelamis)</span>
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>Bold flavour. Reliable quality. Frozen at peak freshness.</p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Ideal for foodservice, mass processing, and international supply chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Certifications Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mil-mb-60">
              <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                letterSpacing: '4px',
                fontSize: '11px',
                opacity: 0.8
              }}>QUALITY & CERTIFICATIONS</span>
              <div style={{
                width: '4px',
                height: '60px',
                background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                borderRadius: '2px',
                marginBottom: '30px'
              }} />
              <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                Food Safety <span className="mil-thin">You Can Trust</span>
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '30px',
                fontStyle: 'italic'
              }}>
                Your peace of mind is our top priority.
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '2',
                color: '#3C4C59',
                opacity: 0.8,
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ marginBottom: '15px' }}>✓ HACCP Certified</li>
                <li style={{ marginBottom: '15px' }}>✓ ISO-Compliant Processes</li>
                <li style={{ marginBottom: '15px' }}>✓ Strict Cold-Chain Integrity</li>
                <li style={{ marginBottom: '15px' }}>✓ Sustainably Sourced Catch</li>
              </ul>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginTop: '30px'
              }}>
                Every tuna begins with responsible harvesting and ends with uncompromised, premium quality.
              </p>
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
                  marginBottom: '30px'
                }}>
                  The CIPREA <span style={{ fontWeight: 300 }}>Advantage</span>
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>Why Partners Choose Us</p>
                <ul style={{
                  fontSize: '15px',
                  lineHeight: '2',
                  color: '#3C4C59',
                  opacity: 0.8,
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '15px' }}>✓ Expert Processing Craftsmanship<br/><span style={{ fontSize: '13px', opacity: 0.7 }}>Precision cuts handled by skilled professionals.</span></li>
                  <li style={{ marginBottom: '15px' }}>✓ Advanced Preservation Methods<br/><span style={{ fontSize: '13px', opacity: 0.7 }}>Freshness locked instantly for superior flavour retention.</span></li>
                  <li style={{ marginBottom: '15px' }}>✓ Sustainable Ocean Practices<br/><span style={{ fontSize: '13px', opacity: 0.7 }}>Fishing with respect for marine ecosystems.</span></li>
                  <li style={{ marginBottom: '15px' }}>✓ Global Delivery Capabilities<br/><span style={{ fontSize: '13px', opacity: 0.7 }}>Consistency across continents, markets, and seasons.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Export Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Packaging & <span className="mil-thin">Export Options</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto 20px'
            }}>
              Built for Every Market
            </p>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Choose a packaging style that fits your business needs:
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
              }}>• Retail-ready packs</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Foodservice bulk cartons</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Custom branding & private labeling</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Temperature-controlled export containers</div>
            </div>
          </div>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#3C4C59',
            opacity: 0.8,
            textAlign: 'center',
            marginTop: '40px',
            fontStyle: 'italic'
          }}>
            From island to international markets — delivered fresh, every time.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Bring CIPREA to <span className="mil-thin">Your Market</span>
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
              Whether you are a distributor, retailer, foodservice provider, or gourmet brand, CIPREA is ready to elevate your product offering.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Price List - CIPREA"
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
                Request Price List
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Partner With Us - CIPREA"
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
                Partner With Us
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Speak to Export Team - CIPREA"
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
                Speak to Our Export Team
              </a>
            </div>
            <div style={{
              marginTop: '60px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(133, 150, 166, 0.1)',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#8596A6',
                marginBottom: '10px'
              }}>Contact Information</p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: 0
              }}>
                4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive, Business Bay, Dubai, UAE. P.O. Box 417425.
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

export default WishHarbourCiprea

