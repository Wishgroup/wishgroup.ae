import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function PrimeBond() {
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
                <Link to="/project-3">Projects</Link>
              </li>
              <li>Prime Bond Investment</li>
            </ul>
            <h1 className="mil-mb-60">
              PRIME BOND INVESTMENT
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Secure, Commodity-Backed Growth. Invest with Confidence Backed by Real Global Commodities. A stable, high-yield investment opportunity grounded in tangible assets and powered by the global trading strength of Prime Wish Trading LLC — a trusted division of Wish Group.
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
                  src="/img/Project3/investment1.webp"
                  alt="Prime Bond Investment"
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
                }}>A SMARTER WAY TO GROW YOUR CAPITAL</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  What Is <span className="mil-thin">Prime Bond?</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  Prime Bond Investment is a secure, asset-backed investment designed for investors seeking stability, predictability, and real-world value. Instead of speculative instruments, your investment is anchored in high-demand global commodities — from premium seafood to essential agricultural products — creating a foundation for sustainable returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Backed by Tangible Assets Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Backed by Tangible <span className="mil-thin">Global Assets</span>
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#3C4C59',
              opacity: 0.8,
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              Your Investment Has Substance
            </p>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.9',
              color: '#3C4C59',
              opacity: 0.8,
              textAlign: 'justify',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Prime Bond isn't just a financial promise — it's backed by physical commodities with consistent global demand and proven market value.
            </p>
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
                }}>🐟 Premium Tuna</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Sourced from sustainable fisheries with enduring global demand.
                </p>
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
                }}>🍤 Vannamei Prawns</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  High-quality seafood products traded worldwide.
                </p>
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
                }}>🌾 Agricultural Commodities</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Essential products such as tea, sugar, and fruits that remain core drivers of global markets.
                </p>
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
            Each asset class provides diversification, liquidity, and resilience in fluctuating market conditions.
          </p>
        </div>
      </section>

      {/* Why Choose Prime Bond Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Four Pillars <span className="mil-thin">of Confidence</span>
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
                }}>Security Through Real Assets</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Your investment is anchored in commodities with intrinsic market value — not abstract derivatives.
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
                }}>Competitive Returns</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Attractive yield potential supported by Prime Wish's global trading expertise and expansive network.
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
                }}>Global Reach</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Leverage the strength of an established international commodities network for enhanced distribution and opportunities.
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
                }}>Proven Expertise</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Built on the credibility and operational success of Prime Wish Trading LLC within the Wish Group ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Prime Bond Works Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              A Transparent, Four-Step <span className="mil-thin">Growth Pathway</span>
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>1. Investment Initiation</strong>
                You join the Prime Bond platform and allocate capital securely.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>2. Commodity Backing</strong>
                Your investment is strategically allocated into high-demand commodities.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>3. Active Growth</strong>
                Commodities are traded and managed by experienced professionals to create value.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>4. Returns Distribution</strong>
                Investors receive periodic returns based on the agreed terms of their bond.
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
              Join a Growing Community <span className="mil-thin">of Impact-Focused Investors</span>
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
              Prime Bond is ideal for those who seek clarity, real value, and stability in their investment journey — built on the strength of global trade fundamentals and Wish Group's trusted reputation.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Invest Now - Prime Bond"
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
                Invest Now
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Information - Prime Bond"
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
                Request Information
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
              }}>Contact Us</p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: 0
              }}>
                4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive, Business Bay, Dubai, U.A.E. P.O. Box 417425, Dubai
              </p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: '5px 0 0'
              }}>
                Phone: +971 4 259 7167
              </p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: '5px 0 0'
              }}>
                Email: info@wishgroup.ae • info@wishgroup.world
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default PrimeBond

