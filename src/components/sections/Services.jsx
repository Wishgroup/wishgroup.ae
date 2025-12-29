import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const industries = [
    {
      title: 'Real Estate',
      description: 'Comprehensive real estate solutions including property development, investment opportunities, and premium commercial and residential projects.',
      image: '/products/belimal.jpeg',
      link: '/services/real-estate',
    },
    {
      title: 'Fishery',
      description: 'Sustainable fishery operations with premium seafood products, including fresh catches and processed marine products for global markets.',
      image: '/products/dryfish.jpeg',
      link: '/services/fishery',
    },
    {
      title: 'Trading',
      description: 'Global trading services connecting markets worldwide, specializing in premium products and commodities with excellence and reliability.',
      image: '/products/prawns.jpeg',
      link: '/services/trading',
    },
  ]

  return (
    <section id="services" className="mil-dark-bg" style={{ paddingTop: '10%', paddingBottom: '10%' }}>
      <div className="mi-invert-fix">
        <div className="container mil-p-120-0">
          <div className="mil-mb-90">
            {/* Section Title */}
            <div className="mil-center mil-mb-60">
              <h2 className="mil-up" style={{ 
                fontSize: '48px', 
                fontWeight: 600, 
                color: '#ffffff',
                marginBottom: '20px'
              }}>
                Our Services
              </h2>
            </div>

            {/* Industries Grid - Responsive for Desktop and Mobile */}
            <div className="row" style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              justifyContent: 'center',
              margin: 0
            }}>
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-lg-4"
                  style={{
                    padding: '0 15px',
                    marginBottom: '30px'
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
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
                      height: '350px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
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
                          transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
                          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
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
                        padding: '40px',
                        color: '#ffffff',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform: hoveredIndex === index ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: hoveredIndex === index ? 'auto' : 'none'
                      }}>
                        <div style={{
                          width: '4px',
                          height: '40px',
                          background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%)',
                          borderRadius: '2px',
                          marginBottom: '20px'
                        }} />
                        
                        <h3 style={{
                          fontSize: '36px',
                          fontWeight: 600,
                          color: '#ffffff',
                          margin: '0 0 15px 0',
                          lineHeight: '1.2',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                        }}>
                          {industry.title}
                        </h3>
                        
                        <p style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: 'rgba(255, 255, 255, 0.9)',
                          margin: 0,
                          maxWidth: '100%',
                          textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
                        }}>
                          {industry.description}
                        </p>

                        <div style={{
                          marginTop: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '14px',
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
                        bottom: '30px',
                        left: '30px',
                        zIndex: 2,
                        opacity: hoveredIndex === index ? 0 : 1,
                        transform: hoveredIndex === index ? 'translateY(20px)' : 'translateY(0)',
                        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <span style={{
                          fontSize: '28px',
                          fontWeight: 600,
                          color: '#ffffff',
                          lineHeight: '1',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                        }}>
                          |
                        </span>
                        <h3 style={{
                          fontSize: '28px',
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
      </div>
    </section>
  )
}

export default Services

