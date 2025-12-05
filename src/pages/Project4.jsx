import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCircleArrowRight, FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Project4() {
  useScrollAnimations()

  const handleScrollToVentures = (e) => {
    e.preventDefault()
    const venturesSection = document.getElementById('future-ventures')
    if (venturesSection) {
      venturesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('get-in-touch')
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

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
                <Link to="/portfolio-1">Portfolio</Link>
              </li>
              <li>Dreams on the Horizon</li> 
            </ul>
            <h1 className="mil-mb-60">
             Dreams on the <span className="mil-thin">Horizon</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
            Dreams on the Horizon represents the exciting ventures we are preparing to launch. These forward-thinking initiatives embody our vision for the future, combining innovation, sustainability, and strategic growth. Each project is carefully planned to create lasting value and transformative impact.
            </p>
            <a 
              href="#future-ventures" 
              onClick={handleScrollToVentures}
              className="mil-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                padding: '15px 30px',
                borderRadius: '70px',
                border: '1px solid #8596A6',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                textDecoration: 'none',
                color: '#3C4C59',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minWidth: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.borderColor = '#3C4C59'
                e.currentTarget.style.transform = 'scale(1.02)'
                const arrowCircle = e.currentTarget.querySelector('div')
                const arrow = e.currentTarget.querySelector('svg')
                if (arrowCircle) {
                  arrowCircle.style.borderColor = '#3C4C59'
                }
                if (arrow) {
                  arrow.style.transform = 'translateY(3px)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = '#8596A6'
                e.currentTarget.style.transform = 'scale(1)'
                const arrowCircle = e.currentTarget.querySelector('div')
                const arrow = e.currentTarget.querySelector('svg')
                if (arrowCircle) {
                  arrowCircle.style.borderColor = '#8596A6'
                }
                if (arrow) {
                  arrow.style.transform = 'translateY(0)'
                }
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>View Future Ventures</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '1px solid #8596A6',
                transition: 'all 0.3s ease'
              }}>
                <FaArrowDown style={{ 
                  fontSize: '16px',
                  transition: 'transform 0.4s ease',
                  display: 'block',
                  color: '#3C4C59'
                }} />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Future Ventures Section */}
      <section id="future-ventures" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>FUTURE VENTURES</span>
            <h2 className="mil-up mil-mb-60">Visionary &
               <span className="mil-thin">Transformative</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'justify' }}>
              Our future ventures represent the next generation of innovation and growth. These carefully planned initiatives are designed to create transformative impact and open new possibilities for sustainable development.
            </p>
          </div>

          <div className="row" style={{ gap: '40px', justifyContent: 'center' }}>
            {/* Venture Card 1 */}
            <div className="col-12 col-lg-5" style={{ position: 'relative' }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  display: 'block'
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
                        Innovation <span style={{ fontWeight: 300 }}>Pipeline</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>NEXT GENERATION • FORWARD-THINKING</div>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Our innovation pipeline includes cutting-edge projects that leverage emerging technologies and sustainable practices. These ventures are designed to set new industry standards and create lasting value.
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginTop: '30px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>Future</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Focused</div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>Visionary</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Approach</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Venture Card 2 */}
            <div className="col-12 col-lg-5" style={{ position: 'relative' }}>
              <div
                className="mil-up"
                style={{
                  position: 'relative',
                  height: '100%',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'default',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  display: 'block'
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
                        Strategic <span style={{ fontWeight: 300 }}>Growth</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>EXPANSION • OPPORTUNITY</div>
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    color: '#3C4C59',
                    margin: 0,
                    opacity: 0.8,
                    textAlign: 'justify'
                  }}>
                    Our strategic growth initiatives are designed to expand our reach and impact. These ventures open new markets, create opportunities, and position Wish Group for continued success.
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginTop: '30px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>Transformative</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Impact</div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>New</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Possibilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="get-in-touch" className="mil-p-120-120">
        <div className="container">
          <div className="mil-center">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Get in Touch</span>
            <h2 className="mil-up mil-mb-60">
              Interested in <span className="mil-thin">our future ventures?</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Contact us to learn more about our upcoming projects and explore early investment opportunities.
            </p>
            <a 
              href="#get-in-touch" 
              onClick={handleScrollToContact}
              className="mil-button mil-arrow-place mil-up"
              style={{ textDecoration: 'none' }}
            >
              <span>Contact Us</span>
              <FaCircleArrowRight />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Project4
