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
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
           
            <h2 className="mil-up mil-mb-60">
              Our <span className="mil-thin">Countries</span>
            </h2>
          </div>

          <div 
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
                    e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                    e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
                    e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.25)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {/* Flag Image */}
                  <div style={{
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
                        e.target.parentElement.innerHTML = `<div style="font-size: 60px;">${country.flag}</div>`
                      }}
                    />
                  </div>

                  {/* Country Name */}
                  <h3 style={{
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
                  <p style={{
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
