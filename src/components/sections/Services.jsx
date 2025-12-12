import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

function Services() {
  const imageRefs = useRef([])

  const services = [
    {
      title: 'Real Estate',
      description: 'Comprehensive real estate solutions including property development, investment opportunities, and premium commercial and residential projects.',
      image: '/products/belimal.jpeg',
    },
    {
      title: 'Fishery',
      description: 'Sustainable fishery operations with premium seafood products, including fresh catches and processed marine products for global markets.',
      image: '/products/dryfish.jpeg',
    },
    {
      title: 'Trading',
      description: 'Global trading services connecting markets worldwide, specializing in premium products and commodities with excellence and reliability.',
      image: '/products/prawns.jpeg',
    },
  ]

  const handleMouseEnter = (index) => {
    const imageElement = imageRefs.current[index]
    if (imageElement) {
      gsap.fromTo(
        imageElement,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'sine',
        }
      )
    }
  }

  const handleMouseLeave = (index) => {
    const imageElement = imageRefs.current[index]
    if (imageElement) {
      gsap.to(imageElement, {
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.4,
        ease: 'sine',
      })
    }
  }

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
              <span className="mil-text-image">
                <img src="/img/photo/2.jpg" alt="team" />
              </span>
              <h2 className="mil-h1 mil-muted mil-center">
                Industries we are <span className="mil-thin">in</span>
              </h2>
            </div>
          </div>

          <div className="row mil-services-grid m-0">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-4 mil-services-grid-item p-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Link to="/service" className="mil-service-card-sm mil-up">
                  <div
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="mil-service-hover-image"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      transform: 'translateY(40px) scale(0.98)',
                      pointerEvents: 'none',
                      overflow: 'hidden',
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 100%)',
                      }}
                    />
                  </div>
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <h5 className="mil-muted mil-mb-30">{service.title}</h5>
                    <p className="mil-light-soft mil-mb-30">{service.description}</p>
                    <div className="mil-button mil-icon-button-sm mil-arrow-place"></div>
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

