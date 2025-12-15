import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function WishWorld() {
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
                <Link to="/project-4">Projects</Link>
              </li>
              <li>Wish World</li>
            </ul>
            <h1 className="mil-mb-60">
              WISH WORLD
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              A universe of opportunity. A world of shared growth. A global ecosystem of innovation, connection, and purpose — where capital, people, and vision converge to shape a future of shared prosperity.
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
                  src="/img/Project2/Wish World/track.webp"
                  alt="Wish World"
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
                }}>EXPLORE WISH WORLD</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  Where Vision Meets <span className="mil-thin">Global Impact</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  A global ecosystem of innovation, connection, and purpose — where capital, people, and vision converge to shape a future of shared prosperity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is WISH WORLD Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>WHAT IS WISH WORLD?</span>
            <h2 className="mil-up mil-mb-60">
              A Global Platform for Growth <span className="mil-thin">and Purpose</span>
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
                marginBottom: '30px'
              }}>
                Wish World is the beating heart of the WISH Group ecosystem — a curated network of businesses, communities, and initiatives spanning industries, cultures, and continents. Here, ideas are funded, relationships are forged, and collective impact is created.
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#3C4C59',
                opacity: 0.8,
                textAlign: 'justify',
                fontStyle: 'italic',
                marginBottom: '40px'
              }}>
                Our philosophy: One Capital World — where global ambition finds a human-centric anchor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footprint Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Our Global <span className="mil-thin">Footprint</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Where We Are, and What We Do
            </p>
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>UAE</strong>
                Strategic Investment & Trading Hub
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Sri Lanka</strong>
                Diversified Industries & Hospitality
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Maldives</strong>
                Tourism & Marine-Centric Ventures
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Ghana & South Africa</strong>
                Commodities & Trade
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>Malaysia & UK</strong>
                Real Estate Development
              </div>
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
            Wish World connects an expanding suite of businesses that operate across key regions. Each entity contributes to economic development, community empowerment, and strategic progress.
          </p>
        </div>
      </section>

      {/* The Pillars of Wish World Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              A Connected Framework <span className="mil-thin">of Purpose</span>
            </h2>
          </div>
          <div className="row" style={{ gap: '30px', justifyContent: 'center' }}>
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
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Global Empowerment</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  We nurture growth in every market we touch, building opportunity through investment, training, and community engagement.
                </p>
              </div>
            </div>
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
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Capital Meets Humanity</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Our ecosystem is built on the belief that financial strength should amplify human potential — not replace it.
                </p>
              </div>
            </div>
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
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Diverse Industries, Shared Success</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  From finance to hospitality, real estate to media — our businesses are united by impact, not just assets.
                </p>
              </div>
            </div>
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
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '15px'
                }}>Innovation for Tomorrow</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  We embrace forward-thinking strategies and sustainable technologies to future-proof growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Wish World Works Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Your Gateway <span className="mil-thin">to Opportunity</span>
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
              Wish World operates as both:
            </p>
            <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ A Strategic Network</strong>
                  Where partners collaborate, scale, and co-create
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ A Resource Platform</strong>
                  Offering capital, guidance, and shared expertise
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
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ A Global Brand</strong>
                  Representing trust, reliability, and human-first business
                </div>
              </div>
            </div>
            <div className="row" style={{ gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Invest</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Partner</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Innovate</div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  fontSize: '15px',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>✓ Scale</div>
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
              Be Part of the One Capital <span className="mil-thin">World</span>
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
              Whether you're an investor, entrepreneur, community leader, or visionary — Wish World is built for those ready to create meaningful progress.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Become a Partner - Wish World"
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
                Become a Partner
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Learn More About Membership - Wish World"
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
                Learn More About Membership
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Contact Our Team - Wish World"
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
                Contact Our Team
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

export default WishWorld

