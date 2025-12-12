import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const industries = [
    {
      title: 'Development',
      description: 'Transforming visions into reality through innovative real estate and infrastructure projects. We specialize in mixed-use developments, sustainable communities, and landmark structures that create lasting value.',
      image: '/img/photo/2.jpg',
      link: '/portfolio-1',
    },
    {
      title: 'Investment',
      description: 'Strategic investment solutions that drive growth and create opportunities. We connect capital with promising ventures across diverse sectors, delivering sustainable returns and meaningful impact.',
      image: '/img/photo/2.jpg',
      link: '/portfolio-2',
    },
    {
      title: 'Trading',
      description: 'Global trading operations connecting markets worldwide. We facilitate international commerce, sourcing premium products and delivering excellence across borders with integrity and reliability.',
      image: '/img/photo/2.jpg',
      link: '/portfolio-3',
    },
  ]

  return (
    <section id="services" className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="mil-animation-frame">
          <div
            className="mil-animation mil-position-1 mil-scale"
            data-value-1="2.4"
            data-value-2="1.4"
            style={{ top: '300px', right: '-100px' }}
          ></div>
        </div>
        <div style={{ width: '100%', paddingTop: '60px', paddingBottom: '120px', paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="mil-mb-60" style={{ marginTop: '0', maxWidth: '1200px', margin: '0 auto 60px auto' }}>
            <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <h2 className="mil-h1 mil-muted mil-center">
                Our <span className="mil-thin">Industries</span>
              </h2>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            maxWidth: '1400px', 
            margin: '0 auto',
            justifyContent: 'center'
          }}>
            {industries.map((industry, index) => (
              <div
                key={index}
                className="mil-up"
                style={{
                  position: 'relative',
                  minHeight: '400px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  flex: '1 1 calc(33.333% - 14px)',
                  minWidth: '300px',
                  maxWidth: '450px',
                }}
                onMouseEnter={(e) => {
                  setHoveredIndex(index)
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(166, 3, 63, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.35)'
                }}
                onMouseLeave={(e) => {
                  setHoveredIndex(null)
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                }}
              >
                <Link 
                  to={industry.link} 
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    display: 'block',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '400px',
                    overflow: 'hidden'
                  }}>
                    {/* Background Image */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${industry.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    />
                    
                    {/* Gradient Overlay - darker on hover */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: hoveredIndex === index 
                          ? 'linear-gradient(135deg, rgba(166, 3, 63, 0.7) 0%, rgba(60, 76, 89, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(166, 3, 63, 0.2) 0%, rgba(60, 76, 89, 0.3) 100%)',
                        transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />

                    {/* Content - only visible on hover */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '60px',
                      color: '#ffffff',
                      opacity: hoveredIndex === index ? 1 : 0,
                      transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: hoveredIndex === index ? 'auto' : 'none'
                    }}>
                      <div style={{
                        width: '4px',
                        height: '60px',
                        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%)',
                        borderRadius: '2px',
                        marginBottom: '30px'
                      }} />
                      
                      <h3 style={{
                        fontSize: '48px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: '0 0 20px 0',
                        lineHeight: '1.2',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                      }}>
                        {industry.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '18px',
                        lineHeight: '1.8',
                        color: 'rgba(255, 255, 255, 0.9)',
                        margin: 0,
                        maxWidth: '600px',
                        textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
                      }}>
                        {industry.description}
                      </p>

                      <div style={{
                        marginTop: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                      }}>
                        <span>Explore</span>
                        <span style={{
                          width: '40px',
                          height: '2px',
                          background: '#ffffff',
                          display: 'inline-block',
                          transition: 'width 0.3s ease'
                        }} />
                        <span style={{ fontSize: '20px' }}>→</span>
                      </div>
                    </div>

                    {/* Title only - visible when not hovered */}
                    <div style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: '40px',
                      right: '40px',
                      zIndex: 2,
                      opacity: hoveredIndex === index ? 0 : 1,
                      transform: hoveredIndex === index ? 'translateY(20px)' : 'translateY(0)',
                      transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      pointerEvents: 'none'
                    }}>
                      <h3 style={{
                        fontSize: '36px',
                        fontWeight: 600,
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.2',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                      }}>
                        {industry.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services

