import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Sample vacant positions - can be replaced with API data
const vacantPositions = [
  {
    id: 1,
    title: 'Senior Graphics Designer',
    department: 'Media and Digital Marketing Department',
    location: 'Dubai, UAE',
    type: 'Full-time',
    description: 'We are seeking a creative and experienced Senior Graphics Designer to lead our visual design initiatives. The ideal candidate will have 5+ years of experience in graphic design, brand identity, and digital marketing materials. Proficiency in Adobe Creative Suite and strong portfolio required.',
  },
  {
    id: 2,
    title: 'Tech Lead',
    department: 'IT Department',
    location: 'Dubai, UAE',
    type: 'Full-time',
    description: 'Lead our technical team in developing innovative solutions and driving technology strategy. The ideal candidate will have 7+ years of software development experience, strong leadership skills, and expertise in modern tech stacks. Experience in managing cross-functional teams essential.',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    department: 'IT Department',
    location: 'Colombo, Sri Lanka',
    type: 'Full-time',
    description: 'Join our development team to build scalable web applications and digital solutions. We are looking for a developer with 3+ years of experience in both frontend and backend technologies, including React, Node.js, and database management. Strong problem-solving skills required.',
  },
  {
    id: 4,
    title: 'Frontend Engineer',
    department: 'IT Department',
    location: 'Kuala Lumpur, Malaysia',
    type: 'Full-time',
    description: 'Create exceptional user experiences through modern frontend development. The ideal candidate will have 3+ years of experience with React, JavaScript, CSS, and responsive design. Knowledge of UI/UX principles and modern frontend frameworks preferred.',
  },
  {
    id: 5,
    title: 'Backend Engineer',
    department: 'IT Department',
    location: 'Dubai, UAE',
    type: 'Full-time',
    description: 'Design and develop robust backend systems and APIs to support our digital infrastructure. We are seeking a developer with 3+ years of experience in server-side technologies, database design, and cloud services. Strong understanding of system architecture and scalability required.',
  },
]

function Careers() {
  useScrollAnimations()
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handlePositionClick = (position) => {
    setSelectedPosition(position)
    setFormData(prev => ({ ...prev, position: position.title }))
    // Scroll to form
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.position) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    if (!formData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`${API_BASE_URL}/careers/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: data.message || 'Thank you for your application! We have received it and will review it shortly.' })
        setFormData({ name: '', email: '', phone: '', position: '', coverLetter: '' })
        setSelectedPosition(null)
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit application. Please try again.' })
      }
    } catch (error) {
      console.error('Application submission error:', error)
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
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
              <li>Careers</li>
            </ul>
            <h1 className="mil-mb-60">
              Join Our <span className="mil-thin">Team</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '1200px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              At Wish Group, we believe in fostering talent and providing opportunities for growth. Explore our current openings and become part of a dynamic team that's making a difference across the globe.
            </p>
          </div>
        </div>
      </div>

      {/* Vacant Positions Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className="mil-center mil-mb-90">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Open Positions</span>
            <h2 className="mil-up mil-mb-30">
              Current <span className="mil-thin">Vacancies</span>
            </h2>
            <p className="mil-text mil-up" style={{ maxWidth: '800px', margin: '0 auto', opacity: 0.8 }}>
              Discover exciting career opportunities across our global network
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginTop: '60px'
          }}>
            {vacantPositions.map((position, index) => (
              <div
                key={position.id}
                className="mil-up"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(133, 150, 166, 0.2)',
                  borderRadius: '24px',
                  padding: '40px',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  animationDelay: `${index * 0.1}s`
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
                <div style={{ marginBottom: '20px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    background: 'rgba(166, 3, 63, 0.1)',
                    color: '#A6033F',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '16px'
                  }}>
                    {position.department}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#3C4C59',
                  margin: '0 0 12px 0',
                  lineHeight: '1.3'
                }}>
                  {position.title}
                </h3>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#8596A6',
                    fontSize: '14px'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {position.location}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#8596A6',
                    fontSize: '14px'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {position.type}
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: '#8596A6',
                  margin: '0 0 20px 0'
                }}>
                  {position.description}
                </p>

                <button
                  onClick={() => handlePositionClick(position)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#A6033F',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px'
                  }}
                >
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="mil-p-120-120 mil-soft-bg">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="mil-center mil-mb-60">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Apply Now</span>
            <h2 className="mil-up mil-mb-30">
              Job <span className="mil-thin">Application</span>
            </h2>
            <p className="mil-text mil-up" style={{ opacity: 0.8 }}>
              {selectedPosition 
                ? `Apply for the position of ${selectedPosition.title}`
                : 'Fill out the form below to apply for a position. You can also click "Apply Now" on any position above to pre-fill the position field.'}
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(133, 150, 166, 0.2)',
            borderRadius: '24px',
            padding: '60px 40px',
            transition: 'all 0.4s ease'
          }}>
            {submitStatus && (
              <div style={{
                padding: '16px 20px',
                marginBottom: '30px',
                borderRadius: '12px',
                background: submitStatus.type === 'success' 
                  ? 'rgba(76, 175, 80, 0.1)' 
                  : 'rgba(244, 67, 54, 0.1)',
                border: `1px solid ${submitStatus.type === 'success' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)'}`,
                color: submitStatus.type === 'success' ? '#4CAF50' : '#F44336',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#3C4C59',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Full Name <span style={{ color: '#A6033F' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(133, 150, 166, 0.3)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    color: '#3C4C59',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#A6033F'
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.3)'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#3C4C59',
                    fontSize: '14px',
                    fontWeight: 500
                  }}>
                    Email Address <span style={{ color: '#A6033F' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(133, 150, 166, 0.3)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '14px',
                      color: '#3C4C59',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A6033F'
                      e.currentTarget.style.outline = 'none'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.3)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#3C4C59',
                    fontSize: '14px',
                    fontWeight: 500
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(133, 150, 166, 0.3)',
                      background: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '14px',
                      color: '#3C4C59',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#A6033F'
                      e.currentTarget.style.outline = 'none'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.3)'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#3C4C59',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Position Applied For <span style={{ color: '#A6033F' }}>*</span>
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Senior Graphics Designer"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(133, 150, 166, 0.3)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    color: '#3C4C59',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#A6033F'
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.3)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#3C4C59',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(133, 150, 166, 0.3)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    color: '#3C4C59',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#A6033F'
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.3)'
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '14px 40px',
                    borderRadius: '30px',
                    background: isSubmitting ? '#8596A6' : '#A6033F',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(166, 3, 63, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mil-p-120-120 mil-soft-bg" style={{ background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="mil-center mil-mb-60">
            <span className="mil-suptitle mil-suptitle-2 mil-mb-30 mil-up">Get in Touch</span>
            <h2 className="mil-up mil-mb-30">
              Recruitment <span className="mil-thin">Contact</span>
            </h2>
            <p className="mil-text mil-up" style={{ opacity: 0.8 }}>
              For general inquiries about career opportunities, please contact our recruitment team.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(133, 150, 166, 0.2)',
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center',
            transition: 'all 0.4s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(166, 3, 63, 0.5)'
            e.currentTarget.style.boxShadow = '0 24px 64px rgba(166, 3, 63, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(133, 150, 166, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            <div style={{
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(166, 3, 63, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A6033F" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>

            <h3 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#3C4C59',
              margin: '0 0 16px 0'
            }}>
              Recruitment Team
            </h3>

            <a
              href="mailto:careers@wishgroup.ae"
              style={{
                fontSize: '20px',
                color: '#A6033F',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              careers@wishgroup.ae
            </a>

            <p style={{
              fontSize: '14px',
              color: '#8596A6',
              margin: '20px 0 0 0',
              lineHeight: '1.7'
            }}>
              We review all applications and will contact suitable candidates for further consideration. Thank you for your interest in joining Wish Group.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Careers

