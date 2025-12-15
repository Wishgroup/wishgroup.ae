import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function WishBrands() {
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
              <li>Wish Brands</li>
            </ul>
            <h1 className="mil-mb-60">
              WISH BRANDS
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Global Food Excellence, Made in Sri Lanka. Premium biscuits and beverages crafted with modern automation, world-class food safety, and sustainable practices.
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
                  src="/img/Project2/Wish Brands/wishcasa.webp"
                  alt="Wish Brands - Wish Casa Manufacturing"
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
                }}>WISH CASA MANUFACTURING DIVISION</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  World-Class Food Production <span className="mil-thin">in Puttalam</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  Our fully integrated manufacturing hub in Puttalam, Sri Lanka, is designed for high-throughput biscuit and beverage production. The facility brings together automation, strict hygiene controls and eco-aware processes to ensure consistent product quality for local and export markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Wish Brands Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>ABOUT WISH BRANDS</span>
            <h2 className="mil-up mil-mb-60">
              Global Food Excellence, <span className="mil-thin">Made in Sri Lanka</span>
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
                Wish Brands is the Wish Group's food manufacturing and trading arm, delivering premium biscuits, juices, and beverages to international markets. Operating across Sri Lanka, UAE, UK, Malaysia, Maldives and Singapore, our products combine contemporary taste trends with responsible production and export-ready quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>PRODUCT CATEGORIES</span>
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">Product Range</span>
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '20px'
                }}>
                  Biscuit Range
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  Hard biscuits • Soft biscuits • Cream-filled sandwich biscuits • Cookies • Wafers
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>
                  High-speed automated lines produce consistent texture and shelf life tailored for retail and private-label clients.
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '20px'
                }}>
                  Juices & Beverages
                </h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '20px'
                }}>
                  Juice drinks • Carbonated beverages • Energy drinks • Sparkling & spring water
                </p>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#8596A6',
                  fontStyle: 'italic'
                }}>
                  Formulations prioritise natural ingredients and modern nutrition trends, with scalable batching for branded and private-label distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Wish Casa Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Why Choose <span className="mil-thin">Wish Casa?</span>
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
                }}>Food Safety & Quality</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Stringent hygiene protocols and international food-safety standards at every stage — from raw material intake to packaging.
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
                }}>Automation & Consistency</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Advanced automated production lines deliver predictable yields, precise portioning, and reliable lead times for large orders.
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
                }}>Sustainability & Responsibility</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  Eco-conscious manufacturing practices that minimise waste and reduce environmental impact, aligned with our corporate vision for responsible growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Manufacturing <span className="mil-thin">Capabilities</span>
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
              }}>• High-speed biscuit ovens & enrobing lines</div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Automated cream-filling and wafer production cells</div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Beverage blending, carbonating and aseptic filling lines</div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• In-line metal detection, X-ray inspection and batch traceability systems</div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div style={{
                padding: '30px',
                textAlign: 'center',
                fontSize: '15px',
                color: '#3C4C59',
                opacity: 0.8
              }}>• Flexible packaging options: retail, bulk, and private label</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '20px'
                }}>Vision</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  To be a globally respected brand offering sustainable, affordable and high-quality food through innovation and ethical manufacturing.
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
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  marginBottom: '20px'
                }}>Mission</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  To operate a fully integrated food production facility for biscuits and juices that meets world-class standards in hygiene, automation and environmental responsibility.
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
              Scale with a Trusted <span className="mil-thin">Manufacturing Partner</span>
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
              Whether you're a retailer, distributor or private-label brand, Wish Casa offers turnkey production, labeling and export services.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Capability Pack - Wish Brands"
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
                Request a Capability Pack
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Contact Our Team - Wish Brands"
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
              }}>Factory & Corporate Address</p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: 0
              }}>
                4004/4005, 40th Floor, Citadel Tower, Al Marasi Drive, Business Bay, Dubai, U.A.E. P.O. Box 417425, Dubai.
              </p>
              <p style={{
                fontSize: '14px',
                color: '#3C4C59',
                opacity: 0.8,
                margin: '5px 0 0'
              }}>
                Tel: +971 4 259 7167 • Email: info@wishgroup.ae / info@wishgroup.world
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default WishBrands

