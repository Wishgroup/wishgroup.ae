import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCircleArrowRight, FaArrowDown } from 'react-icons/fa6'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Project3() {
  useScrollAnimations()

  const handleScrollToPartnerships = (e) => {
    e.preventDefault()
    const partnershipsSection = document.getElementById('partnerships')
    if (partnershipsSection) {
      partnershipsSection.scrollIntoView({ 
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
              <li>Partnerships for Impact</li> 
            </ul>
            <h1 className="mil-mb-60">
             Partnerships <span className="mil-thin">for Impact</span>
            </h1>
            <p className="mil-text mil-up mil-mb-30" style={{ maxWidth: '600px', marginLeft: 0, marginRight: 'auto',textAlign: 'justify' }}>
            Partnerships for Impact showcases Wish Group's strategic collaborations that build shared, sustainable potential. Through meaningful partnerships with industry leaders, innovative startups, and community organizations, we create synergies that drive positive change and deliver exceptional value to all stakeholders.
            </p>
            <a 
              href="#partnerships" 
              onClick={handleScrollToPartnerships}
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
              <span style={{ whiteSpace: 'nowrap' }}>View Partnerships</span>
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

      {/* Partnerships Section */}
      <section id="partnerships" className="mil-p-120-120" style={{ 
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
            }}>STRATEGIC PARTNERSHIPS</span>
            <h2 className="mil-up mil-mb-60">Collaborative &
               <span className="mil-thin">Sustainable</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'justify' }}>
              Our partnerships are built on trust, shared values, and a commitment to creating sustainable impact. We collaborate with organizations that share our vision of excellence and innovation.
            </p>
          </div>

          <div className="row" style={{ gap: '40px', justifyContent: 'center' }}>
            {/* Partnership Card 1 */}
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
                        Industry <span style={{ fontWeight: 300 }}>Leaders</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>STRATEGIC ALLIANCES • EXCELLENCE</div>
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
                    We partner with industry leaders who share our commitment to excellence and innovation. These strategic alliances enable us to leverage combined expertise and resources to deliver exceptional results.
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
                      }}>Trust</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Based</div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: '#A6033F',
                        lineHeight: '1'
                      }}>Shared</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Values</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnership Card 2 */}
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
                        Community <span style={{ fontWeight: 300 }}>Impact</span>
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#8596A6',
                        marginTop: '4px',
                        textTransform: 'uppercase'
                      }}>SUSTAINABLE • MEANINGFUL</div>
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
                    Our community partnerships focus on creating sustainable, meaningful impact. We work closely with local organizations to address real needs and build lasting positive change.
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
                      }}>Sustainable</div>
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
                      }}>Positive</div>
                      <div style={{
                        fontSize: '12px',
                        color: '#8596A6',
                        marginTop: '6px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                      }}>Change</div>
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
              Interested in <span className="mil-thin">partnership opportunities?</span>
            </h2>
            <p className="mil-text mil-up mil-mb-60" style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Contact us to explore how we can collaborate to create shared value and sustainable impact.
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

export default Project3
