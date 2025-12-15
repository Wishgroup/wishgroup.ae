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
        <div className="container mil-p-120-0">
          <div className="mil-mb-120">
            <div className="row">
              <div className="col-lg-10">
                <span className="mil-suptitle mil-light-soft mil-suptitle-right mil-up">
                  Diverse industries with expertise and innovation
                  <br /> delivering excellence across multiple sectors.
                </span>
              </div>
            </div>

            <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <h2 className="mil-h1 mil-muted mil-center">
                Industries we are <span className="mil-thin">in</span>
              </h2>
            </div>
          </div>

          <div className="row mil-services-grid" style={{ 
            maxWidth: '1400px', 
            margin: '0 auto',
          }}>
            {industries.map((industry, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 mil-services-grid-item p-0 mil-up"
                style={{
                  animationDelay: `${index * 0.1}s`
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
                    height: '500px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    boxShadow: hoveredIndex === index 
                      ? '0 20px 60px rgba(0, 0, 0, 0.4)' 
                      : '0 10px 30px rgba(0, 0, 0, 0.2)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
                  }}>
                    {/* Background Image */}
                    <div
                      className="mil-parallax"
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
                      <div style={{
                        width: '4px',
                        height: '60px',
                        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%)',
                        borderRadius: '2px',
                        marginBottom: '20px'
                      }} />
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

