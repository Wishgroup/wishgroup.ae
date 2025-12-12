import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Country data (companies only)
const countryData = {
  'uae': {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    flagImage: 'https://flagcdn.com/w320/ae.png',
    companies: [
      { name: 'Wish Group L.L.C', type: 'Main investment company of group', focus: 'Project and trading' },
      { name: 'Prime Wish Trading L.L.C', type: 'General trading company', focus: 'Prawn / tuna / sprats' },
      { name: 'AL LINCAMO International FZC', type: 'General trading company', focus: 'Sugar / garments / foods' },
      { name: 'Wish Real Estate Developer LLC', type: 'Real estate and property development company', focus: 'Villas and apartments' }
    ]
  },
  'sri-lanka': {
    name: 'Sri Lanka',
    flag: '🇱🇰',
    flagImage: 'https://flagcdn.com/w320/lk.png',
    companies: [
      { name: 'World Investment Sources Holdings Ltd', type: 'Main investment company of group', focus: 'Project and trading' },
      { name: 'Prime Wish (Pvt) Ltd', type: 'Manufacturing and trading company', focus: 'Prawn / tuna / fish' },
      { name: 'Wish Capital (Pvt) Ltd', type: 'Investment and trading company', focus: 'Finance market and instruments' },
      { name: 'Wish Hospitality Ltd', type: 'Hospitality and tourism company', focus: 'Hotel and tourism' },
      { name: 'Wish Brands (Pvt) Ltd', type: 'Manufacturing and trading company', focus: 'Biscuit and juice' },
      { name: 'World Capital Centre Ltd', type: 'Real estate and property development company', focus: 'Mix development projects' },
      { name: 'Arena Blue Hotel and Resort Ltd', type: 'Hospitality and resort company', focus: 'Hotel and resorts' },
      { name: 'The One Apparels Corporation Ltd', type: 'Manufacturing and trading company', focus: 'Apparel and textiles' },
      { name: 'Wish HR & Consultancy (Pvt) Ltd', type: 'Consultancy and professional services company', focus: 'Professional services' },
      { name: 'Wish Roamer Pvt Ltd', type: 'Travel and tourism company', focus: 'Travel and tourism' },
      { name: 'Wish Media Corporation Ltd', type: 'Media and entertainment company', focus: 'Media and entertainment' }
    ]
  },
  'maldives': {
    name: 'Maldives',
    flag: '🇲🇻',
    flagImage: 'https://flagcdn.com/w320/mv.png',
    companies: [
      { name: 'World Capital Centre Pvt Ltd', type: 'Hospitality and resort company', focus: 'Hotel and resorts' },
      { name: 'Wish Hospitality Pvt Ltd', type: 'Hospitality and resort company', focus: 'Hotel and tourism' },
      { name: 'Wish Holdings Pvt Ltd', type: 'Manufacturing and trading company', focus: 'Prawn / tuna / fish' }
    ]
  },
  'malaysia': {
    name: 'Malaysia',
    flag: '🇲🇾',
    flagImage: 'https://flagcdn.com/w320/my.png',
    companies: [
      { name: 'World Capital Centre SDN BHD', type: 'Real estate and property development company', focus: 'Mix development projects' }
    ]
  },
  'south-africa': {
    name: 'South Africa',
    flag: '🇿🇦',
    flagImage: 'https://flagcdn.com/w320/za.png',
    companies: [
      { name: 'Wish Capital (Pty) Ltd', type: 'Manufacturing and trading company', focus: 'Fruit / spices / fertilizer' }
    ]
  },
  'ghana': {
    name: 'Ghana',
    flag: '🇬🇭',
    flagImage: 'https://flagcdn.com/w320/gh.png',
    companies: [
      { name: 'Wish Capital (Pvt) Ltd', type: 'Manufacturing and trading company', focus: 'Cashew / gold / energy' }
    ]
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    flagImage: 'https://flagcdn.com/w320/gb.png',
    companies: [
      { name: 'World Capital Centre Ltd', type: 'Real estate and property development company', focus: 'Mix development projects' }
    ]
  }
}

function Country() {
  useScrollAnimations()
  const { countryCode } = useParams()
  const country = countryData[countryCode]

  if (!country) {
    return (
      <>
        <div className="container mil-p-120-30">
          <h1>Country Not Found</h1>
          <p>The requested country page does not exist.</p>
          <Link to="/portfolio-1" style={{ color: '#A6033F' }}>
            Return to Our Businesses
          </Link>
        </div>
        <Footer />
      </>
    )
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
                <Link to="/portfolio-1">Our Businesses</Link>
              </li>
              <li>{country.name}</li>
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
              <div style={{
                width: '100px',
                height: '67px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid rgba(166, 3, 63, 0.3)',
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
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div style="font-size: 50px;">${country.flag}</div>`
                  }}
                />
              </div>
              <div>
                <h1 className="mil-mb-20">
                  {country.name}
                </h1>
                <p className="mil-text" style={{ maxWidth: '600px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8 }}>
                  Explore our companies and operating focus in {country.name}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>OUR COMPANIES</span>
            <h2 className="mil-up mil-mb-60">
              Companies in <span className="mil-thin">{country.name}</span>
            </h2>
            <p className="mil-text mil-up" style={{ maxWidth: '700px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, margin: '0 auto' }}>
              We operate {country.companies.length} {country.companies.length === 1 ? 'company' : 'companies'} across various industries in {country.name}.
            </p>
          </div>

          {/* Companies Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {country.companies.map((company, index) => (
              <div
                key={index}
                className="mil-up"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: '32px',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#A6033F',
                  letterSpacing: '1px',
                  marginBottom: '16px',
                  textTransform: 'uppercase'
                }}>
                  {company.type}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {company.name}
                </h3>
                <div style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: '#8596A6',
                  opacity: 0.9
                }}>
                  <strong style={{ color: '#3C4C59' }}>Focus:</strong> {company.focus}
                </div>
              </div>
            ))}
          </div>

          {/* Industries Section */}
          {(() => {
            const uniqueTypes = [...new Set(country.companies.map(c => c.type))]
            return uniqueTypes.length > 0 && (
              <div>
                <div className="mil-center mil-mb-60">
                  <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
                    letterSpacing: '4px',
                    fontSize: '11px',
                    opacity: 0.8
                  }}>INDUSTRIES</span>
                  <h2 className="mil-up mil-mb-30">
                    Industries We <span className="mil-thin">Operate In</span>
                  </h2>
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  justifyContent: 'center'
                }}>
                  {uniqueTypes.map((type, index) => (
                    <div
                      key={index}
                      className="mil-up"
                      style={{
                        padding: '12px 24px',
                        borderRadius: '50px',
                        background: 'rgba(166, 3, 63, 0.08)',
                        border: '1px solid rgba(166, 3, 63, 0.2)',
                        fontSize: '14px',
                        color: '#3C4C59',
                        fontWeight: 500,
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(166, 3, 63, 0.15)'
                        e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(166, 3, 63, 0.08)'
                        e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.2)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Country

