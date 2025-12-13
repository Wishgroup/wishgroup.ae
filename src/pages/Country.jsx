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
      { name: 'WISH GROUP L.L.C', type: 'Main investment company of group', focus: 'Project and trading' },
      { name: 'PRIME WISH TRADING L.L.C', type: 'General trading company', focus: 'Prawn / tuna / sprats' },
      { name: 'AL LINCAMO INTERNATIONAL FZC', type: 'General trading company', focus: 'Sugar / garments / foods' },
      { name: 'WISH REAL ESTATE DEVELOPER LLC', type: 'Real estate and property development company', focus: 'Villas and apartments' }
    ]
  },
  'sri-lanka': {
    name: 'Sri Lanka',
    flag: '🇱🇰',
    flagImage: 'https://flagcdn.com/w320/lk.png',
    companies: [
      { name: 'WORLD INVESTMENT SOURCES HOLDINGS LTD', type: 'Main investment company of group', focus: 'Project and trading' },
      { name: 'PRIME WISH (PVT) LTD', type: 'Manufacturing and trading company', focus: 'Prawn / tuna / fish' },
      { name: 'WISH CAPITAL (PVT) LTD', type: 'Investment and trading company', focus: 'Finance market and instruments' },
      { name: 'WISH HOSPITALITY LTD', type: 'Hospitality and tourism company', focus: 'Hotel and tourism' },
      { name: 'WISH BRANDS (PVT) LTD', type: 'Manufacturing and trading company', focus: 'Biscuit and juice' },
      { name: 'WORLD CAPITAL CENTRE LTD', type: 'Real estate and property development company', focus: 'Mix development projects' },
      { name: 'ARENA BLUE HOTEL AND RESORT LTD', type: 'Hospitality and resort company', focus: 'Hotel and resorts' },
      { name: 'THE ONE APPARELS CORPORATION LTD', type: 'Manufacturing and trading company', focus: 'Apparel and textiles' },
      { name: 'WISH HR & CONSULTANCY (PVT) LTD', type: 'Consultancy and professional services company', focus: 'Professional services' },
      { name: 'WISH ROAMER PVT LTD', type: 'Travel and tourism company', focus: 'Travel and tourism' },
      { name: 'WISH MEDIA CORPORATION LTD', type: 'Media and entertainment company', focus: 'Media and entertainment' }
    ]
  },
  'maldives': {
    name: 'Maldives',
    flag: '🇲🇻',
    flagImage: 'https://flagcdn.com/w320/mv.png',
    companies: [
      { name: 'WORLD CAPITAL CENTRE PVT LTD', type: 'Hospitality and resort company', focus: 'Hotel and resorts' },
      { name: 'WISH HOSPITALITY PVT LTD', type: 'Hospitality and tourism company', focus: 'Hotel and tourism' },
      { name: 'WISH HOLDINGS PVT LTD', type: 'Manufacturing and trading company', focus: 'Prawn / tuna / fish' }
    ]
  },
  'malaysia': {
    name: 'Malaysia',
    flag: '🇲🇾',
    flagImage: 'https://flagcdn.com/w320/my.png',
    companies: [
      { name: 'WORLD CAPITAL CENTRE SDN BHD', type: 'Real estate and property development company', focus: 'Mix development projects' }
    ]
  },
  'south-africa': {
    name: 'South Africa',
    flag: '🇿🇦',
    flagImage: 'https://flagcdn.com/w320/za.png',
    companies: [
      { name: 'WISH CAPITAL (PTY) LTD', type: 'Manufacturing and trading company', focus: 'Fruit / spices / fertilizer' }
    ]
  },
  'ghana': {
    name: 'Ghana',
    flag: '🇬🇭',
    flagImage: 'https://flagcdn.com/w320/gh.png',
    companies: [
      { name: 'WISH CAPITAL (PVT) LTD', type: 'Manufacturing and trading company', focus: 'Cashew / gold / energy' }
    ]
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    flagImage: 'https://flagcdn.com/w320/gb.png',
    companies: [
      { name: 'WORLD CAPITAL CENTRE LTD', type: 'Real estate and property development company', focus: 'Mix development projects' }
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
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '80px'
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
                  padding: '28px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '200px'
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
                  margin: '0 0 12px 0',
                  lineHeight: '1.3',
                  letterSpacing: '0.2px'
                }}>
                  {company.name}
                </h3>

                {/* Activities/Focus */}
                <div style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#8596A6',
                  opacity: 0.9,
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(133, 150, 166, 0.1)'
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#3C4C59',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    marginBottom: '6px',
                    opacity: 0.7
                  }}>
                    Activities
                  </div>
                  <div style={{ 
                    color: '#3C4C59',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}>
                    {company.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Country

