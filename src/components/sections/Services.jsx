import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

function Services() {
  const imageRefs = useRef([])

  const services = [
    {
      title: 'Tea Leaves',
      description: 'Premium quality tea leaves, carefully harvested and processed to deliver the finest quality tea with rich, complex flavors.',
      image: '/products/belimal.jpeg',
    },
    {
      title: 'Dry Sprat',
      description: 'Fresh, high-grade dry sprats sourced from pristine waters, perfect for culinary excellence and premium seafood experiences.',
      image: '/products/dryfish.jpeg',
    },
    {
      title: 'Prawns',
      description: 'Premium prawns of exceptional quality, hand-selected and processed to maintain their natural sweetness and firm texture.',
      image: '/products/prawns.jpeg',
    },
    {
      title: 'Yellowfin Tuna',
      description: 'Premium quality yellowfin tuna, sustainably caught and carefully processed to preserve its rich flavor and nutritional value.',
      image: '/products/yfin.jpg',
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
                  Premium quality products sourced from the finest
                  <br /> origins, delivered with excellence and care.
                </span>
              </div>
            </div>

            <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
              <span className="mil-text-image">
                <img src="/img/photo/2.jpg" alt="team" />
              </span>
              <h2 className="mil-h1 mil-muted mil-center">
                Our Premium and Unique <span className="mil-thin">Products</span>
              </h2>
            </div>
          </div>

          <div className="row mil-services-grid m-0">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-md-6 col-lg-3 mil-services-grid-item p-0"
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

