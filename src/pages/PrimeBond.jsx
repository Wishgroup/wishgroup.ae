import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function PrimeBond() {
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
              <li>PRIME BOND INVESTMENT</li>
            </ul>
            <h1 className="mil-mb-20">
              PRIME BOND INVESTMENT
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
                  src="/img/Project3/One Bond/Logo.png"
                  alt="Prime Bond Investment"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: '#fff',
                    padding: '40px',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project3/investment1.webp') {
                      e.currentTarget.src = '/img/Project3/investment1.webp'
                      e.currentTarget.style.objectFit = 'cover'
                      e.currentTarget.style.padding = '0'
                      e.currentTarget.style.backgroundColor = 'transparent'
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
                What Is Prime Bond?
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
                Secure, Commodity-Backed Growth. Invest with Confidence.
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
                  Prime Bond Investment is a secure, asset-backed investment designed for investors seeking stability, predictability, and real-world value. Instead of speculative instruments, your investment is anchored in high-demand global commodities — from premium seafood to essential agricultural products — creating a foundation for sustainable returns.
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
                  A stable, high-yield investment opportunity grounded in tangible assets and powered by the global trading strength of Prime Wish Trading LLC — a trusted division of Wish Group.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0
                }}>
                  About Prime Bond — Your investment isn't just a financial promise — it's backed by physical commodities with consistent global demand and proven market value. Each asset class provides diversification, liquidity, and resilience in fluctuating market conditions.
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
            {/* Card 1 - Premium Tuna */}
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
                  src="/img/Project3/One Bond/two-fresh-slices-of-raw-tuna-fillet-with-spices-an-2024-12-13-01-43-34-utc.jpg"
                  alt="Premium Tuna"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project3/investment1.webp') {
                      e.currentTarget.src = '/img/Project3/investment1.webp'
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
                  Premium Tuna
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Sourced from sustainable fisheries.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  High-demand commodity with enduring global market value and consistent demand.
                </p>
              </div>
            </div>

            {/* Card 2 - Vannamei Prawns */}
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
                  src="/img/Project3/One Bond/raw-seafood-fresh-shrimps-prawns-on-gray-plate-w-2024-12-01-11-12-31-utc.jpg"
                  alt="Vannamei Prawns"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project3/investment1.webp') {
                      e.currentTarget.src = '/img/Project3/investment1.webp'
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
                  Vannamei Prawns
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  High-quality seafood products.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Traded worldwide with proven market liquidity and strong demand fundamentals.
                </p>
              </div>
            </div>

            {/* Card 3 - Agricultural Commodities */}
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
                  src="/img/Project3/One Bond/green-locusts-devouring-a-large-barley-insect-pes-2025-04-02-05-26-37-utc.jpg"
                  alt="Agricultural Commodities"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project3/investment1.webp') {
                      e.currentTarget.src = '/img/Project3/investment1.webp'
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
                  Agricultural Commodities
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Essential products for global markets.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Tea, sugar, and fruits that remain core drivers of global markets with stable demand.
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
            
            {/* Security & Assets Card */}
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
                        Security Through <span style={{ fontWeight: 300 }}>Real Assets</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Your Investment Has Substance
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
                    <li style={{ marginBottom: '12px' }}>✓ Backed by tangible commodities</li>
                    <li style={{ marginBottom: '12px' }}>✓ Consistent global demand</li>
                    <li style={{ marginBottom: '12px' }}>✓ Proven market value</li>
                    <li style={{ marginBottom: '12px' }}>✓ Diversification & liquidity</li>
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
                    Your investment is anchored in commodities with intrinsic market value — not abstract derivatives.
                  </p>
                </div>
              </div>
            </div>

            {/* The Prime Bond Advantage Card */}
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
                        Four Pillars <span style={{ fontWeight: 300 }}>of Confidence</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Why Investors Choose Prime Bond
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {[
                      { title: 'Security Through Real Assets', desc: 'Anchored in commodities with intrinsic market value — not abstract derivatives.' },
                      { title: 'Competitive Returns', desc: 'Attractive yield potential supported by Prime Wish\'s global trading expertise.' },
                      { title: 'Global Reach', desc: 'Leverage the strength of an established international commodities network.' },
                      { title: 'Proven Expertise', desc: 'Built on the credibility and operational success of Prime Wish Trading LLC.' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ marginBottom: '16px' }}>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 600, color: '#3C4C59', fontSize: '15px' }}>✔ {item.title}</p>
                        <p style={{ margin: 0, color: '#8596A6', fontSize: '13px', lineHeight: '1.5' }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Process Card */}
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
                        A Transparent, <span style={{ fontWeight: 300 }}>Four-Step Pathway</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        How Prime Bond Works
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
                    A clear investment journey:
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '8px' }}>• Investment Initiation — Join and allocate capital securely</li>
                    <li style={{ marginBottom: '8px' }}>• Commodity Backing — Strategic allocation into high-demand commodities</li>
                    <li style={{ marginBottom: '8px' }}>• Active Growth — Managed by experienced professionals</li>
                    <li style={{ marginBottom: '8px' }}>• Returns Distribution — Periodic returns based on agreed terms</li>
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
                    Ideal for those who seek clarity, real value, and stability in their investment journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mil-center" style={{ paddingTop: '50px' }}>
            <h2 className="mil-up mil-mb-10">Join a Growing Community <span className="mil-thin">of Impact-Focused Investors</span></h2>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              Prime Bond is ideal for those who seek clarity, real value, and stability in their investment journey — built on the strength of global trade fundamentals and Wish Group's trusted reputation.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Invest Now - Prime Bond"
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
                Invest Now
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Information - Prime Bond"
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
                Request Information
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default PrimeBond
