import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function WorldCapitalCentre() {
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
              <li>World Capital Centre</li>
            </ul>
            <h1 className="mil-mb-60">
              WORLD CAPITAL CENTRE
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '800px', fontSize: '15px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Colombo's Next Global Icon. Asia's tallest visionary development. A new landmark for business, lifestyle and opportunity. A $2.5B mixed-use landmark rising in the heart of Colombo, designed to become a global destination for investment, commerce and culture.
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
                  src="/img/Project4/iconic structure.jpeg"
                  alt="World Capital Centre"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                    aspectRatio: '16/9'
                  }}
                  onError={(e) => {
                    if (e.currentTarget.src !== '/img/Project4/economic.jpeg') {
                      e.currentTarget.src = '/img/Project4/economic.jpeg'
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
                }}>REDEFINING THE SKYLINE OF ASIA</span>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px',
                  marginBottom: '30px'
                }} />
                <h2 className="mil-up mil-mb-30" style={{ fontSize: '32px' }}>
                  A Landmark of <span className="mil-thin">Transformation</span>
                </h2>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  margin: 0,
                  textAlign: 'justify'
                }}>
                  World Capital Centre is an ambitious architectural flagship developed by Al Aman World Capital Centre Pvt Ltd and backed by the global reach of Wish Group. This visionary project aims to transform Colombo's cityscape with an iconic skyscraper presence that blends innovation, sustainability, and economic impact.
                </p>
              </div>
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
                  To elevate Colombo into a world capital market — a hub that inspires global investment, connectivity, and prosperity.
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
                  To collaborate with world-class architects, engineers, and urban planners to deliver a project marked by cutting-edge design, remarkable structural standards, and enduring value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Project <span className="mil-thin">Highlights</span>
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
                  marginBottom: '20px'
                }}>Iconic Architecture</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  World Capital Centre is designed to be Asia's tallest tower, showcasing pioneering engineering, signature aesthetics, and unmatched skyline presence.
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
                  marginBottom: '20px'
                }}>Urban Impact</h3>
                <ul style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  listStyle: 'none',
                  padding: 0
                }}>
                  <li style={{ marginBottom: '12px' }}>• Economic Catalyst: Attracts global business and significant job creation.</li>
                  <li style={{ marginBottom: '12px' }}>• Mixed-Use Appeal: Integrates business, leisure, retail, and recreational experiences.</li>
                  <li style={{ marginBottom: '12px' }}>• Tourism Magnet: A destination that draws both visitors and investors.</li>
                </ul>
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
                  marginBottom: '20px'
                }}>Sustainability & Innovation</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8
                }}>
                  With advanced green building technology and energy-efficient design, World Capital Centre reflects a future-ready vision of development that prioritises environmental stewardship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Advantages Section */}
      <section className="mil-p-120-120 mil-soft-bg">
        <div className="container">
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60" style={{ fontSize: '32px' }}>
              Why Invest in World Capital <span className="mil-thin">Centre</span>
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ Prime Location</strong>
                Secures a prestigious address in Colombo's fast-growing urban core.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ Global Visibility</strong>
                Elevates Sri Lanka's profile as an international business hub.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ Long-Term Value</strong>
                Designed for enduring functional and financial appreciation.
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
                <strong style={{ display: 'block', marginBottom: '10px', color: '#3C4C59' }}>✓ Community Impact</strong>
                Creates jobs, supports local enterprises, and strengthens regional economies.
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mil-center" style={{ paddingTop: '50px' }}>
            <h2 className="mil-up mil-mb-10">Be a Part of Asia's Next <span className="mil-thin">Iconic Address</span></h2>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
              World Capital Centre stands as more than just a development — it is a symbol of global ambition, inclusivity, and connected opportunity.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="mailto:info@wishgroup.ae?subject=Learn About Investment Options - World Capital Centre"
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
                Learn About Investment Options
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Request Project Brochure - World Capital Centre"
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
                Request Project Brochure
              </a>
              <a
                href="mailto:info@wishgroup.ae?subject=Contact Our Team - World Capital Centre"
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
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default WorldCapitalCentre

