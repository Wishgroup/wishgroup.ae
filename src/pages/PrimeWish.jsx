import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function PrimeWish() {
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
                <Link to="/project-1">Wishes FulFilled</Link>
              </li>
              <li>PRIME WISH</li>
            </ul>
            <h1 className="mil-mb-20">
              PRIME WISH
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
                The Prime of Your Plate
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
                Premium. Trusted. Global.
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
                  Prime Wish Trading LLC — The Prime of Your Plate. Premium. Trusted. Global. We connect the world to high-quality seafood and food products, combining rigorous food-safety standards with an agile global distribution network.
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
                  From the UAE to global markets, Prime Wish specializes in premium tuna, prawns, and food products sourced responsibly, processed with care, and delivered on time.
                </p>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.9',
                  color: '#3C4C59',
                  opacity: 0.9,
                  textAlign: 'justify',
                  margin: 0
                }}>
                  About Prime Wish — A UAE-based exporter and manufacturer specializing in high-quality seafood and FMCG under the PRIME WISH brand. We partner with trusted suppliers in the Maldives and Sri Lanka and serve retailers, distributors, and HORECA clients worldwide.
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
            {/* Card 1 - Wish Tuna */}
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
                  src="/img/Project1/Prime Wish/primetune.webp"
                  alt="Wish Tuna"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/products/yfin.jpg') {
                      e.currentTarget.src = '/products/yfin.jpg'
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
                  Wish Tuna
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Premium canned & processed tuna. Sourced from natural oceans.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: '0 0 12px 0',
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Tuna sourced from the Maldives and Sri Lanka, processed under strict hygiene and safety controls.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Variants:
                  </p>
                  <ul style={{
                    fontSize: '13px',
                    color: '#3C4C59',
                    margin: 0,
                    paddingLeft: '20px',
                    lineHeight: '1.8',
                    opacity: 0.8
                  }}>
                    <li>Brine</li>
                    <li>Sunflower Oil</li>
                    <li>Water</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 - Prime Prawns */}
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
                  src="/img/Project1/Prime Wish/prawns3.webp"
                  alt="Prime Prawns"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/products/prawns.jpeg') {
                      e.currentTarget.src = '/products/prawns.jpeg'
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
                  Prime Prawns
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Vannamei. Frozen & processed. Fresh, firm-textured.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: '0 0 16px 0',
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Sourced from trusted farms, processed to international standards.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: '0 0 8px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Key Features:
                  </p>
                  <ul style={{
                    fontSize: '13px',
                    color: '#3C4C59',
                    margin: 0,
                    paddingLeft: '20px',
                    lineHeight: '1.8',
                    opacity: 0.8
                  }}>
                    <li>Multiple sizes available</li>
                    <li>Flexible packaging options</li>
                    <li>Private labeling available</li>
                    <li>Ideal for retail & HORECA</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 - Premium Tea (if available) */}
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
                  src="/img/Project1/Prime Wish/tea.webp"
                  alt="Premium Tea"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project1/Prime Wish/prawns1.webp') {
                      e.currentTarget.src = '/img/Project1/Prime Wish/prawns1.webp'
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
                  Premium Tea
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#8596A6',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5',
                  fontStyle: 'italic'
                }}>
                  Quality tea products for global markets.
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  Premium tea selections sourced from trusted suppliers, packaged for retail and wholesale distribution.
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
            
            {/* Quality & Certifications Card */}
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
                        Quality & <span style={{ fontWeight: 300 }}>Certifications</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Food Safety You Can Trust
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
                    <li style={{ marginBottom: '12px' }}>✓ HACCP Certified</li>
                    <li style={{ marginBottom: '12px' }}>✓ ISO-Compliant Processes</li>
                    <li style={{ marginBottom: '12px' }}>✓ Strict Cold-Chain Integrity</li>
                    <li style={{ marginBottom: '12px' }}>✓ Sustainably Sourced Products</li>
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
                    Every product begins with responsible sourcing and ends with uncompromised, premium quality.
                  </p>
                </div>
              </div>
            </div>

            {/* The Prime Wish Advantage Card */}
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
                        The Prime Wish <span style={{ fontWeight: 300 }}>Advantage</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Why Partners Choose Us
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    {[
                      { title: 'Industry Expertise', desc: 'Teams with deep experience in fisheries, cold-chain, and international trade.' },
                      { title: 'Reliability & Timeliness', desc: 'Timely shipments and scalable supply options for every market.' },
                      { title: 'Customization Options', desc: 'Private label and tailored packaging to match your market needs.' },
                      { title: 'Global Network', desc: 'Strategic representation across Dubai, Sri Lanka, Singapore, Malaysia, Ghana, and South Africa.' },
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

            {/* Packaging & Export Card */}
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
                        Packaging & <span style={{ fontWeight: 300 }}>Export Options</span>
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#8596A6',
                        margin: '8px 0 0 0',
                        opacity: 0.8
                      }}>
                        Built for Every Market
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
                    Choose a packaging style that fits your business needs:
                  </p>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 20px 0',
                    lineHeight: '2',
                    color: '#3C4C59',
                    opacity: 0.9
                  }}>
                    <li style={{ marginBottom: '8px' }}>• Retail-ready cans & pouches</li>
                    <li style={{ marginBottom: '8px' }}>• Foodservice bulk cartons</li>
                    <li style={{ marginBottom: '8px' }}>• Custom branding & private labeling</li>
                    <li style={{ marginBottom: '8px' }}>• Temperature-controlled export containers</li>
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
                    From UAE to international markets — delivered fresh, every time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mil-center">
            <h2 className="mil-up mil-mb-10">Bring Prime Wish to <span className="mil-thin">Your Market</span></h2>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              Whether you are a distributor, retailer, foodservice provider, or gourmet brand, Prime Wish is ready to elevate your product offering.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Price List - Prime Wish"
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
                Request Price List
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Partner With Us - Prime Wish"
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
                Partner With Us
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Speak to Export Team - Prime Wish"
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
                Speak to Our Export Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default PrimeWish
