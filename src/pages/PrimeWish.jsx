import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function PrimeWish() {
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
              <li>Prime Wish Trading LLC</li>
            </ul>
            <h1 className="mil-mb-60">
              PRIME WISH TRADING LLC
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Premium. Trusted. Global. Prime Wish connects the world to high-quality seafood and food products, combining rigorous food-safety standards with an agile global distribution network.
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
                  src="/img/Project1/Prime Wish/prawns1.webp"
                  alt="Prime Wish Trading LLC"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project1/Prime Wish/prawns3.webp') {
                      e.currentTarget.src = '/img/Project1/Prime Wish/prawns3.webp'
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
                }}>THE PRIME OF YOUR PLATE</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Prime Wish <span className="mil-thin">— The Prime of Your Plate</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  Premium tuna, prawns, and food products sourced responsibly, processed with care, and delivered on time — from the UAE to global markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Prime Wish Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>ABOUT PRIME WISH</span>
            <h2 className="mil-up mil-mb-60">
              Connecting global markets <span className="mil-thin">with premium food products.</span>
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
                Prime Wish Trading LLC is a UAE-based exporter and manufacturer specializing in high-quality seafood and FMCG under the PRIME WISH brand. We partner with trusted suppliers in the Maldives and Sri Lanka and serve retailers, distributors, and HORECA clients worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>PRODUCT SHOWCASE</span>
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">Product Range</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            {/* Wish Tuna Card */}
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
                  marginBottom: '20px'
                }}>
                  Wish Tuna <span style={{ fontWeight: 300 }}>— Premium Canned & Processed Tuna</span>
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  <strong>What it is:</strong> Tuna sourced from the natural oceans of the Maldives and Sri Lanka, processed under strict hygiene and safety controls.
                </p>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#3C4C59', fontSize: '14px' }}>Variants:</strong>
                  <span style={{ fontSize: '14px', color: '#3C4C59', opacity: 0.8, marginLeft: '10px' }}>
                    Brine • Sunflower Oil • Water
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#3C4C59', fontSize: '14px' }}>Packaging Options:</strong>
                  <span style={{ fontSize: '14px', color: '#3C4C59', opacity: 0.8, marginLeft: '10px' }}>
                    Retail packs • Bulk • Private label
                  </span>
                </div>
              </div>
            </div>

            {/* Prime Prawns Card */}
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
                  marginBottom: '20px'
                }}>
                  Prime Prawns <span style={{ fontWeight: 300 }}>— Vannamei (Frozen & Processed)</span>
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  <strong>What it is:</strong> Fresh, firm-textured Vannamei prawns sourced from trusted farms, processed to international standards.
                </p>
                <div style={{ marginBottom: '15px' }}>
                  <strong style={{ color: '#3C4C59', fontSize: '14px' }}>Key Features:</strong>
                  <span style={{ fontSize: '14px', color: '#3C4C59', opacity: 0.8, marginLeft: '10px' }}>
                    Multiple sizes • Flexible packaging • Private labeling options
                  </span>
                </div>
                <div>
                  <strong style={{ color: '#3C4C59', fontSize: '14px' }}>Ideal for:</strong>
                  <span style={{ fontSize: '14px', color: '#3C4C59', opacity: 0.8, marginLeft: '10px' }}>
                    Retail shelves • Wholesale distributors • Foodservice & HORECA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Supply Chain Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mil-mb-60">
              <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                letterSpacing: '4px',
                fontSize: '11px',
                opacity: 0.8
              }}>QUALITY & SUPPLY CHAIN</span>
              <div style={{
                width: '4px',
                height: '60px',
                background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                borderRadius: '2px',
                marginBottom: '30px'
              }} />
              <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                Highest Food Safety <span className="mil-thin">Standards</span>
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '30px'
              }}>
                We maintain robust quality controls across harvesting, processing, freezing, and cold-chain logistics. Our protocols ensure product integrity from catch to container.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                fontStyle: 'italic'
              }}>
                Prime Wish prioritizes sourcing practices that respect marine ecosystems and partner communities.
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
                  marginBottom: '20px'
                }}>
                  Global Presence <span style={{ fontWeight: 300 }}>& Network</span>
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>Local support — global reach.</p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  Prime Wish maintains strategic representation across key markets to provide on-ground support and timely logistics:
                </p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Dubai • Sri Lanka • Singapore • Malaysia • Ghana • South Africa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Prime Wish Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Why <span className="mil-thin">Prime Wish?</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Industry Expertise</h4>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Teams with deep experience in fisheries, cold-chain, and international trade.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Reliability</h4>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Timely shipments and scalable supply options.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Customization</h4>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Private label and tailored packaging to match your market needs.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Sustainability</h4>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>Commitment to responsible sourcing and long-term partnerships.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Export Solutions Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Packaging & <span className="mil-thin">Export Solutions</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Options for every channel:
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
              }}>Retail-ready cans</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>Retail pouches</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>Bulk cartons for foodservice</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>Private label programs</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>Temperature-controlled container shipments</div>
            </div>
          </div>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.8',
            color: '#3C4C59',
            opacity: 0.7,
            textAlign: 'center',
            marginTop: '30px'
          }}>
            All configurable to market and regulatory requirements.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center">
            <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
              Ready to source <span className="mil-thin">premium seafood?</span>
            </h2>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Price List - Prime Wish"
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
                Request a Price List
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Contact Export Team - Prime Wish"
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
                Contact Our Export Team
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
              }}>Address</p>
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

export default PrimeWish

