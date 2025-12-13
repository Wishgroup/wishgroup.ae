import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Country data (companies only) - Updated to match official documents
const countryData = {
  'uae': {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    flagImage: 'https://flagcdn.com/w320/ae.png',
    companies: [
      { 
        name: 'WISH Group L.L.C', 
        type: 'Investment & Strategic Holdings', 
        sector: 'Investment & Strategic Holdings',
        focus: 'Principal investment arm overseeing global capital deployment, project development, and group-wide initiatives.',
        description: 'Principal investment arm overseeing global capital deployment, project development, and group-wide initiatives.'
      },
      { 
        name: 'Prime WISH Trading L.L.C', 
        type: 'General Trading (Seafood)', 
        sector: 'General Trading (Seafood)',
        focus: 'Specializes in sourcing and exporting prawns, tuna, and sprats to global markets.',
        description: 'Specializes in sourcing and exporting prawns, tuna, and sprats to global markets.'
      },
      { 
        name: 'Al Lincamo International FZC', 
        type: 'General Trading (Commodities & Consumer Goods)', 
        sector: 'General Trading (Commodities & Consumer Goods)',
        focus: 'Imports and exports sugar, garments, food items, and fast-moving consumer goods.',
        description: 'Imports and exports sugar, garments, food items, and fast-moving consumer goods.'
      },
      { 
        name: 'WISH Real Estate Developer L.L.C', 
        type: 'Real Estate Development', 
        sector: 'Real Estate Development',
        focus: 'Develops villas, apartments, and mixed-use real estate properties in the UAE.',
        description: 'Develops villas, apartments, and mixed-use real estate properties in the UAE.'
      }
    ]
  },
  'sri-lanka': {
    name: 'Sri Lanka',
    flag: '🇱🇰',
    flagImage: 'https://flagcdn.com/w320/lk.png',
    companies: [
      { 
        name: 'World Investment Sources Holdings Ltd', 
        type: 'Investment & Strategic Holdings', 
        sector: 'Investment & Strategic Holdings',
        focus: 'Oversees multi-sector projects, capital deployment, and international trading activities.',
        description: 'Oversees multi-sector projects, capital deployment, and international trading activities.'
      },
      { 
        name: 'Prime WISH (Pvt) Ltd', 
        type: 'Seafood Manufacturing & Trading', 
        sector: 'Seafood Manufacturing & Trading',
        focus: 'Processes and exports prawns, tuna, and fish to international markets.',
        description: 'Processes and exports prawns, tuna, and fish to international markets.'
      },
      { 
        name: 'WISH Capital (Pvt) Ltd', 
        type: 'Financial Investments & Trading', 
        sector: 'Financial Investments & Trading',
        focus: 'Engages in financial instruments and capital market investments.',
        description: 'Engages in financial instruments and capital market investments.'
      },
      { 
        name: 'WISH Hospitality Ltd', 
        type: 'Hospitality & Tourism', 
        sector: 'Hospitality & Tourism',
        focus: 'Manages hotel, resort, and tourism-driven ventures.',
        description: 'Manages hotel, resort, and tourism-driven ventures.'
      },
      { 
        name: 'WISH Brands (Pvt) Ltd', 
        type: 'Food & Beverage Manufacturing', 
        sector: 'Food & Beverage Manufacturing',
        focus: 'Produces biscuits, juices, and FMCG goods for domestic and export markets.',
        description: 'Produces biscuits, juices, and FMCG goods for domestic and export markets.'
      },
      { 
        name: 'World Capital Centre Ltd', 
        type: 'Real Estate & Mixed Development', 
        sector: 'Real Estate & Mixed Development',
        focus: 'Develops commercial, residential, and lifestyle-based mixed development projects.',
        description: 'Develops commercial, residential, and lifestyle-based mixed development projects.'
      },
      { 
        name: 'Arena Blue Hotel and Resort Ltd', 
        type: 'Hospitality & Leisure', 
        sector: 'Hospitality & Leisure',
        focus: 'Operates resorts and luxury hospitality properties.',
        description: 'Operates resorts and luxury hospitality properties.'
      },
      { 
        name: 'The One Apparels Corporation Ltd', 
        type: 'Apparel & Textile Manufacturing', 
        sector: 'Apparel & Textile Manufacturing',
        focus: 'Produces apparel and textile products for local and global distribution.',
        description: 'Produces apparel and textile products for local and global distribution.'
      },
      { 
        name: 'WISH HR & Consultancy (Pvt) Ltd', 
        type: 'HR & Professional Services', 
        sector: 'HR & Professional Services',
        focus: 'Provides HR consulting, recruitment, and professional services.',
        description: 'Provides HR consulting, recruitment, and professional services.'
      },
      { 
        name: 'WISH Roamer Pvt Ltd', 
        type: 'Travel & Tourism', 
        sector: 'Travel & Tourism',
        focus: 'Offers travel planning, tourism services, and destination management.',
        description: 'Offers travel planning, tourism services, and destination management.'
      },
      { 
        name: 'WISH Media Corporation Ltd', 
        type: 'Media & Entertainment', 
        sector: 'Media & Entertainment',
        focus: 'Creates digital content, media productions, and entertainment projects.',
        description: 'Creates digital content, media productions, and entertainment projects.'
      }
    ]
  },
  'maldives': {
    name: 'Maldives',
    flag: '🇲🇻',
    flagImage: 'https://flagcdn.com/w320/mv.png',
    companies: [
      { 
        name: 'World Capital Centre Pvt Ltd', 
        type: 'Hospitality & Resort Development', 
        sector: 'Hospitality & Resort Development',
        focus: 'Manages resort properties and leisure development projects.',
        description: 'Manages resort properties and leisure development projects.'
      },
      { 
        name: 'WISH Hospitality Pvt Ltd', 
        type: 'Hospitality & Tourism', 
        sector: 'Hospitality & Tourism',
        focus: 'Operates hotel and tourism ventures in the Maldives.',
        description: 'Operates hotel and tourism ventures in the Maldives.'
      },
      { 
        name: 'WISH Holdings Pvt Ltd', 
        type: 'Seafood Manufacturing & Trading', 
        sector: 'Seafood Manufacturing & Trading',
        focus: 'Processes and exports prawns, tuna, and fish for international markets.',
        description: 'Processes and exports prawns, tuna, and fish for international markets.'
      }
    ]
  },
  'malaysia': {
    name: 'Malaysia',
    flag: '🇲🇾',
    flagImage: 'https://flagcdn.com/w320/my.png',
    companies: [
      { 
        name: 'World Capital Centre Sdn Bhd', 
        type: 'Real Estate & Mixed Development', 
        sector: 'Real Estate & Mixed Development',
        focus: 'Develops mixed-use real estate projects with commercial and residential components.',
        description: 'Develops mixed-use real estate projects with commercial and residential components.'
      }
    ]
  },
  'south-africa': {
    name: 'South Africa',
    flag: '🇿🇦',
    flagImage: 'https://flagcdn.com/w320/za.png',
    companies: [
      { 
        name: 'WISH Capital (Pty) Ltd', 
        type: 'Agricultural & Commodity Trading', 
        sector: 'Agricultural & Commodity Trading',
        focus: 'Trades fruit, spices, fertilizers, and supports agricultural supply chains.',
        description: 'Trades fruit, spices, fertilizers, and supports agricultural supply chains.'
      }
    ]
  },
  'ghana': {
    name: 'Ghana',
    flag: '🇬🇭',
    flagImage: 'https://flagcdn.com/w320/gh.png',
    companies: [
      { 
        name: 'WISH Capital (Pvt) Ltd', 
        type: 'Commodities Trading & Manufacturing', 
        sector: 'Commodities Trading & Manufacturing',
        focus: 'Trades and processes cashews, gold, and energy-related commodities.',
        description: 'Trades and processes cashews, gold, and energy-related commodities.'
      }
    ]
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    flagImage: 'https://flagcdn.com/w320/gb.png',
    companies: [
      { 
        name: 'World Capital Centre Ltd', 
        type: 'Real Estate & Mixed Development', 
        sector: 'Real Estate & Mixed Development',
        focus: 'Manages property investments and mixed development projects in the UK.',
        description: 'Manages property investments and mixed development projects in the UK.'
      }
    ]
  }
}

// Helper function to map company types to industries
const getIndustryForCompany = (companyType) => {
  const type = companyType.toLowerCase()
  if (type.includes('real estate') || type.includes('property development') || type.includes('development')) {
    return 'Development'
  }
  if (type.includes('investment') || type.includes('capital') || type.includes('finance')) {
    return 'Investment'
  }
  if (type.includes('trading') || type.includes('manufacturing') || type.includes('trading company')) {
    return 'Trading'
  }
  // Default fallback
  if (type.includes('hospitality') || type.includes('tourism') || type.includes('hotel')) {
    return 'Development' // Hospitality can be considered development
  }
  return 'Trading' // Default to trading
}

// Industry definitions
const industryDefinitions = {
  Development: {
    title: 'Development',
    description: 'Transforming visions into reality through innovative real estate and infrastructure projects. We specialize in mixed-use developments, sustainable communities, and landmark structures that create lasting value.',
    image: '/img/photo/2.jpg',
    link: '/portfolio-1',
  },
  Investment: {
    title: 'Investment',
    description: 'Strategic investment solutions that drive growth and create opportunities. We connect capital with promising ventures across diverse sectors, delivering sustainable returns and meaningful impact.',
    image: '/img/photo/2.jpg',
    link: '/portfolio-2',
  },
  Trading: {
    title: 'Trading',
    description: 'Global trading operations connecting markets worldwide. We facilitate international commerce, sourcing premium products and delivering excellence across borders with integrity and reliability.',
    image: '/img/photo/2.jpg',
    link: '/portfolio-3',
  },
}

// Function to get industries present in a country
const getIndustriesForCountry = (companies) => {
  const industriesSet = new Set()
  companies.forEach(company => {
    const industry = getIndustryForCompany(company.type)
    industriesSet.add(industry)
  })
  return Array.from(industriesSet).map(industryName => industryDefinitions[industryName])
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
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <section id="businesses-section" className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <h2 className="mil-up mil-mb-60">
              Businesses in <span className="mil-thin">{country.name}</span>
            </h2>
            <p className="mil-text mil-up" style={{ maxWidth: '700px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, margin: '0 auto' }}>
              We operate {country.companies.length} {country.companies.length === 1 ? 'business' : 'businesses'} in {country.name}.
            </p>
          </div>

          {/* Company Tiles - Matching Existing Design Tone */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '80px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              width: '100%',
              maxWidth: '1400px'
            }}>
            {country.companies.map((company, index) => (
              <div
                key={index}
                className="mil-up"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  borderRadius: '24px',
                  padding: '32px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '220px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
                  e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.25)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Company Name */}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: 0,
                  lineHeight: '1.3',
                  letterSpacing: '0.2px',
                  textAlign: 'center',
                  width: '100%'
                }}>
                  {company.name}
                </h3>

                {/* Sector */}
                {company.sector && (
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      background: 'rgba(166, 3, 63, 0.1)',
                      color: '#A6033F',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {company.sector}
                    </span>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Country

