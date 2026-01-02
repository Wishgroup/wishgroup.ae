import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

const countries = [
  { name: 'United Arab Emirates', code: 'uae', flag: '🇦🇪', flagImage: 'https://flagcdn.com/w320/ae.png', description: 'Regional HQ and strategic hub' },
  { name: 'Sri Lanka', code: 'sri-lanka', flag: '🇱🇰', flagImage: 'https://flagcdn.com/w320/lk.png', description: 'Where our journey began' },
  { name: 'Maldives', code: 'maldives', flag: '🇲🇻', flagImage: 'https://flagcdn.com/w320/mv.png', description: 'Indian Ocean gateway' },
  { name: 'Malaysia', code: 'malaysia', flag: '🇲🇾', flagImage: 'https://flagcdn.com/w320/my.png', description: 'ASEAN growth corridor' },
  { name: 'South Africa', code: 'south-africa', flag: '🇿🇦', flagImage: 'https://flagcdn.com/w320/za.png', description: 'Pan-African logistics hub' },
  { name: 'Ghana', code: 'ghana', flag: '🇬🇭', flagImage: 'https://flagcdn.com/w320/gh.png', description: 'West Africa trading gateway' },
  { name: 'United Kingdom', code: 'united-kingdom', flag: '🇬🇧', flagImage: 'https://flagcdn.com/w320/gb.png', description: 'European gateway and innovation center' },
]

function Portfolio1() {
  useScrollAnimations()

  return (
    <>
      {/* Banner Section */}
      <div className="mil-inner-banner mil-p-0-120">
        <style>{`
          /* Ensure tiles are always accessible on mobile */
          @media screen and (max-width: 1200px) {
            .country-tile,
            .countries-grid,
            .countries-grid a {
              position: relative !important;
              z-index: 10 !important;
              pointer-events: auto !important;
              touch-action: manipulation !important;
            }
            
            /* Ensure menu doesn't block when closed */
            .mil-menu-frame:not(.mil-active) {
              z-index: -1 !important;
              pointer-events: none !important;
            }
          }
          
          @media screen and (max-width: 768px) {
            .mil-inner-banner {
              padding-top: 40px !important;
              padding-bottom: 40px !important;
            }
            .mil-inner-banner h1 {
              font-size: 28px !important;
              line-height: 1.2 !important;
              margin-bottom: 20px !important;
            }
            .mil-inner-banner .mil-text {
              font-size: 14px !important;
              line-height: 1.6 !important;
              text-align: left !important;
              padding: 0 10px;
            }
            .mil-breadcrumbs {
              font-size: 12px !important;
              margin-bottom: 20px !important;
            }
          }
          @media screen and (max-width: 480px) {
            .mil-inner-banner {
              padding-top: 30px !important;
              padding-bottom: 30px !important;
            }
            .mil-inner-banner h1 {
              font-size: 24px !important;
              margin-bottom: 15px !important;
            }
            .mil-inner-banner .mil-text {
              font-size: 13px !important;
            }
          }
        `}</style>
        <div className="mil-banner-content mil-up">
          <div className="mil-animation-frame">
            <div className="mil-animation mil-position-4 mil-dark mil-scale" data-value-1="6" data-value-2="1.4"></div>
          </div>
          <div className="container">
            <ul className="mil-breadcrumbs mil-mb-60">
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>Our Businesses</li>
            </ul>
            <h1 className="mil-mb-60">
              Our <span className="mil-thin">Businesses</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '1200px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Explore our global presence across seven countries, each representing a unique opportunity for growth, innovation, and sustainable business development.
            </p>
          </div>
        </div>
      </div>

      {/* Countries Grid Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>{`
          @media screen and (max-width: 768px) {
            .countries-grid-section {
              padding-top: 40px !important;
              padding-bottom: 40px !important;
            }
            .countries-grid-section h2 {
              font-size: 24px !important;
              margin-bottom: 30px !important;
            }
            .countries-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .country-tile {
              min-height: 260px !important;
              padding: 24px 20px !important;
            }
            .country-flag-container {
              width: 100px !important;
              height: 66px !important;
              margin-bottom: 16px !important;
            }
            .country-name {
              font-size: 18px !important;
              margin-bottom: 8px !important;
            }
            .country-description {
              font-size: 12px !important;
            }
          }
          @media screen and (max-width: 480px) {
            .countries-grid-section {
              padding-top: 30px !important;
              padding-bottom: 30px !important;
            }
            .countries-grid-section h2 {
              font-size: 20px !important;
              margin-bottom: 20px !important;
            }
            .countries-grid {
              gap: 16px !important;
            }
            .country-tile {
              min-height: 240px !important;
              padding: 20px 16px !important;
              border-radius: 16px !important;
            }
            .country-flag-container {
              width: 80px !important;
              height: 53px !important;
              margin-bottom: 12px !important;
            }
            .country-name {
              font-size: 16px !important;
              margin-bottom: 6px !important;
            }
            .country-description {
              font-size: 11px !important;
            }
          }
        `}</style>
        <div className="container countries-grid-section" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
           
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">Countries</span>
            </h2>
          </div>

          <div 
            className="countries-grid"
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '30px'
            }}
          >
            {countries.map((country, index) => {
              const isSingleLast = countries.length % 2 === 1 && index === countries.length - 1
              return (
              <Link 
                key={country.code} 
                to={`/country/${country.code}`}
                style={{ 
                  textDecoration: 'none', 
                  display: 'block',
                  gridColumn: isSingleLast ? '1 / -1' : undefined,
                  justifySelf: isSingleLast ? 'center' : undefined,
                  width: '100%'
                }}
              >
                <div
                  className="mil-up country-tile"
                  style={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '320px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(133, 150, 166, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                      e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
                      e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.25)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {/* Flag Image */}
                  <div className="country-flag-container" style={{
                    width: '120px',
                    height: '80px',
                    marginBottom: '24px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid rgba(166, 3, 63, 0.2)',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}>
                    <img 
                      src={country.flagImage}
                      alt={`${country.name} flag`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        e.target.style.display = 'none'
                        const parent = e.target.parentElement
                        if (parent) {
                          parent.innerHTML = `<div style="font-size: 60px;">${country.flag}</div>`
                        }
                      }}
                    />
                  </div>

                  {/* Country Name */}
                  <h3 className="country-name" style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    margin: '0 0 12px 0',
                    lineHeight: '1.2',
                    transition: 'color 0.3s ease'
                  }}>
                    {country.name}
                  </h3>

                  {/* Description */}
                  <p className="country-description" style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#8596A6',
                    margin: 0,
                    opacity: 0.8,
                    fontStyle: 'italic'
                  }}>
                    {country.description}
                  </p>

                  {/* Hover Indicator */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #A6033F, transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} 
                  className="hover-indicator"
                  />
                </div>
              </Link>
              )
            })}
          </div>
        </div>

        {/* CSS for hover indicator */}
        <style>{`
          .country-tile:hover .hover-indicator {
            opacity: 1;
          }
        `}</style>
      </section>

      <Footer />
    </>
  )
}

export default Portfolio1
