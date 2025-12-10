import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

// Industry data structure for each country
const countryData = {
  'uae': {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    flagImage: 'https://flagcdn.com/w320/ae.png',
    industries: {
      'Trading & Commerce': [
        'International Trade',
        'Commodity Trading',
        'Import/Export Services',
        'Supply Chain Management'
      ],
      'Real Estate': [
        'Mixed-Use Developments',
        'Commercial Properties',
        'Residential Projects',
        'Property Management'
      ],
      'Investment': [
        'Strategic Investments',
        'Portfolio Management',
        'Venture Capital',
        'Private Equity'
      ],
      'Technology': [
        'Digital Solutions',
        'IT Services',
        'Software Development',
        'Tech Consulting'
      ]
    }
  },
  'sri-lanka': {
    name: 'Sri Lanka',
    flag: '🇱🇰',
    flagImage: 'https://flagcdn.com/w320/lk.png',
    industries: {
      'Agriculture & Food': [
        'Tea Production',
        'Spice Export',
        'Agricultural Products',
        'Food Processing'
      ],
      'Trading': [
        'Commodity Trading',
        'Import/Export',
        'Trading Services',
        'Distribution'
      ],
      'Manufacturing': [
        'Textile Manufacturing',
        'Industrial Products',
        'Consumer Goods',
        'Packaging'
      ],
      'Services': [
        'Business Services',
        'Consulting',
        'Logistics',
        'Support Services'
      ]
    }
  },
  'india': {
    name: 'India',
    flag: '🇮🇳',
    flagImage: 'https://flagcdn.com/w320/in.png',
    industries: {
      'Technology & IT': [
        'Software Development',
        'IT Services',
        'Digital Solutions',
        'Tech Consulting'
      ],
      'Manufacturing': [
        'Industrial Manufacturing',
        'Consumer Goods',
        'Automotive Components',
        'Electronics'
      ],
      'Trading': [
        'International Trade',
        'Commodity Trading',
        'Import/Export',
        'Distribution'
      ],
      'Services': [
        'Business Process Outsourcing',
        'Professional Services',
        'Consulting',
        'Financial Services'
      ]
    }
  },
  'united-kingdom': {
    name: 'United Kingdom',
    flag: '🇬🇧',
    flagImage: 'https://flagcdn.com/w320/gb.png',
    industries: {
      'Financial Services': [
        'Investment Banking',
        'Asset Management',
        'Financial Consulting',
        'Wealth Management'
      ],
      'Technology & Innovation': [
        'FinTech Solutions',
        'Software Development',
        'Digital Innovation',
        'Tech Startups'
      ],
      'Trading': [
        'International Trade',
        'Commodity Trading',
        'Import/Export',
        'Trading Services'
      ],
      'Real Estate': [
        'Property Development',
        'Commercial Real Estate',
        'Investment Properties',
        'Property Management'
      ]
    }
  },
  'united-states': {
    name: 'United States',
    flag: '🇺🇸',
    flagImage: 'https://flagcdn.com/w320/us.png',
    industries: {
      'Technology': [
        'Software Development',
        'Cloud Services',
        'Digital Solutions',
        'Tech Innovation'
      ],
      'Investment': [
        'Private Equity',
        'Venture Capital',
        'Strategic Investments',
        'Portfolio Management'
      ],
      'Trading': [
        'International Trade',
        'Commodity Trading',
        'Import/Export',
        'Trading Services'
      ],
      'Services': [
        'Professional Services',
        'Business Consulting',
        'Financial Services',
        'Management Services'
      ]
    }
  },
  'singapore': {
    name: 'Singapore',
    flag: '🇸🇬',
    flagImage: 'https://flagcdn.com/w320/sg.png',
    industries: {
      'Trading & Logistics': [
        'International Trade',
        'Commodity Trading',
        'Supply Chain Management',
        'Logistics Services'
      ],
      'Financial Services': [
        'Investment Management',
        'Financial Consulting',
        'Wealth Management',
        'Corporate Finance'
      ],
      'Technology': [
        'FinTech Solutions',
        'Digital Innovation',
        'Software Development',
        'Tech Services'
      ],
      'Real Estate': [
        'Property Development',
        'Commercial Properties',
        'Investment Properties',
        'Property Management'
      ]
    }
  },
  'australia': {
    name: 'Australia',
    flag: '🇦🇺',
    flagImage: 'https://flagcdn.com/w320/au.png',
    industries: {
      'Mining & Resources': [
        'Mining Operations',
        'Resource Trading',
        'Commodity Export',
        'Mining Services'
      ],
      'Agriculture': [
        'Agricultural Products',
        'Food Export',
        'Livestock Trading',
        'Agricultural Services'
      ],
      'Trading': [
        'International Trade',
        'Commodity Trading',
        'Import/Export',
        'Trading Services'
      ],
      'Real Estate': [
        'Property Development',
        'Commercial Real Estate',
        'Investment Properties',
        'Property Management'
      ]
    }
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

  const categories = Object.keys(country.industries)

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
                  Explore our diverse industries and business operations in {country.name}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries by Category Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up" style={{ 
              letterSpacing: '4px',
              fontSize: '11px',
              opacity: 0.8
            }}>OUR OPERATIONS</span>
            <h2 className="mil-up mil-mb-60">
              Industries by <span className="mil-thin">Category</span>
            </h2>
          </div>

          <div className="row" style={{ gap: '40px', justifyContent: 'center' }}>
            {categories.map((category, categoryIndex) => (
              <div 
                key={category} 
                className="col-12 col-lg-6"
                style={{ position: 'relative' }}
              >
                <div
                  className="mil-up"
                  style={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(133, 150, 166, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '40px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.4)'
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(166, 3, 63, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Category Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '30px'
                  }}>
                    <div style={{
                      width: '4px',
                      height: '40px',
                      background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                      borderRadius: '2px'
                    }} />
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#3C4C59',
                      margin: 0,
                      lineHeight: '1.2'
                    }}>
                      {category}
                    </h3>
                  </div>

                  {/* Industries List */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    {country.industries[category].map((industry, industryIndex) => (
                      <li 
                        key={industryIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '8px',
                          background: 'rgba(166, 3, 63, 0.03)',
                          transition: 'all 0.3s ease',
                          border: '1px solid transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(166, 3, 63, 0.08)'
                          e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.2)'
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(166, 3, 63, 0.03)'
                          e.currentTarget.style.borderColor = 'transparent'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#A6033F',
                          flexShrink: 0
                        }} />
                        <span style={{
                          fontSize: '15px',
                          lineHeight: '1.6',
                          color: '#3C4C59',
                          opacity: 0.9
                        }}>
                          {industry}
                        </span>
                      </li>
                    ))}
                  </ul>
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

