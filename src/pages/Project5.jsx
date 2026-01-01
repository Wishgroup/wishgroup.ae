import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Contacts() {
  useScrollAnimations()

  const tileStyle = {
    padding: '40px',
    borderRadius: '20px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
    border: '1px solid rgba(186, 203, 217, 0.6)',
    boxShadow: '0 20px 60px rgba(60, 76, 89, 0.08)',
  }

  const TileHeading = ({ title, subtitle }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <div style={{ width: '4px', height: '40px', background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)', borderRadius: '2px' }} />
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#3C4C59', margin: 0, lineHeight: '1.2' }}>{title}</h3>
        {subtitle && (
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8596A6', marginTop: '4px', textTransform: 'uppercase' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  )

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('success') // 'success' or 'error'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // Reset popup
    setShowPopup(false)
    setPopupMessage('')

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      setPopupMessage('Please fill in all required fields (Name, Email, and Message).')
      setPopupType('error')
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 5000)
      return
    }

    // Validate email format
    const trimmedEmail = formData.email.trim()
    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setPopupMessage('Please enter a valid email address.')
      setPopupType('error')
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 5000)
      return
    }

    setIsSubmitting(true)

    try {
      // Add timeout to fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      const response = await fetch(`${API_BASE_URL}/contact/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          email: trimmedEmail
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      // Try to parse JSON response
      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const text = await response.text()
        throw new Error(`Unexpected response format: ${text.substring(0, 100)}`)
      }

      if (data.success) {
        setPopupMessage(data.message || 'Thank you for your inquiry! Your details have been submitted successfully. We have received your message and will get back to you within 24-48 hours. A confirmation email has been sent to your email address.')
        setPopupType('success')
        setShowPopup(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
        setTimeout(() => {
          setShowPopup(false)
        }, 7000)
      } else {
        setPopupMessage(data.message || 'Failed to send inquiry. Please try again.')
        setPopupType('error')
        setShowPopup(true)
        setTimeout(() => {
          setShowPopup(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Contact form error:', error)
      
      let errorMessage = 'Unable to process your inquiry at this time. '
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.'
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Network request failed')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again. If the problem persists, you can contact us directly at info@wishgroup.ae'
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Connection error. Please contact us directly at info@wishgroup.ae'
      } else if (error.message) {
        errorMessage = `Error: ${error.message}. Please try again or contact us at info@wishgroup.ae`
      } else {
        errorMessage = 'An unexpected error occurred. Please try again later or contact us at info@wishgroup.ae'
      }

      setPopupMessage(errorMessage)
      setPopupType('error')
      setShowPopup(true)
      setTimeout(() => {
        setShowPopup(false)
      }, 7000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Popup Modal */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease-in'
          }}
          onClick={() => setShowPopup(false)}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              padding: '30px 40px',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              animation: 'slideUp 0.3s ease-out',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              ×
            </button>
            <div style={{
              fontSize: '48px',
              marginBottom: '15px'
            }}>
              {popupType === 'success' ? '✓' : '✕'}
            </div>
            <h3 style={{
              margin: '0 0 15px 0',
              color: popupType === 'success' ? '#4caf50' : '#f44336',
              fontSize: '20px',
              fontWeight: '600'
            }}>
              {popupType === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p style={{
              margin: 0,
              color: '#333',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              {popupMessage}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            transform: translateY(20px);
            opacity: 0;
          }
          to { 
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

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
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <h1 className="mil-mb-60">
              Get <span className="mil-thin">in touch</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="mil-p-120-60 mil-contact-page">
        <div className="container">
          <div className="row mil-mb-60 align-items-stretch">
            <div className="col-lg-7 mil-mb-40 d-flex">
              <div className="mil-up mil-card mil-card-glass h-100" style={{ ...tileStyle, display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
                <TileHeading title="Quick Form" subtitle="We reply fast" />
                <p className="mil-dark-soft mil-mb-30">
                  We reply fast — fill in your details and we will connect you to the right team. We aim to respond within 24–48 hours.
                </p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="row" style={{ flex: 1 }}>
                    <div className="col-md-6 mil-mb-20">
                      <label className="mil-muted d-block mil-mb-10" htmlFor="fullName">Full name</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mil-mb-20">
                      <label className="mil-muted d-block mil-mb-10" htmlFor="email">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mil-mb-20">
                      <label className="mil-muted d-block mil-mb-10" htmlFor="phone">Phone number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="form-control"
                        placeholder="+971..."
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mil-mb-20">
                      <label className="mil-muted d-block mil-mb-10" htmlFor="company">Company / organization (optional)</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="form-control"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12 mil-mb-20">
                      <label className="mil-muted d-block mil-mb-10" htmlFor="message">Message / inquiry</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="4"
                        placeholder="Tell us how we can help"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-center" style={{ marginTop: 'auto' }}>
                      <button 
                        type="submit" 
                        className="mil-button mil-mb-10"
                        disabled={isSubmitting}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5 mil-mb-40">
              <div className="mil-up mil-card mil-card-glass mil-mb-30" style={tileStyle}>
                <TileHeading title="Contact Options" subtitle="Headquarters" />
                <h6 className="mil-muted mil-mb-10">Corporate headquarters — Dubai, UAE</h6>
                <p className="mil-dark-soft mil-mb-20">
                  4004/4005, 40th Floor, Citadel Tower,<br />
                  Al Marasi Drive, Business Bay, Dubai, U.A.E.<br />
                  P.O. Box: 417425, Dubai
                </p>
                <p className="mil-dark-soft mil-mb-10">
                  Phone: <a href="tel:+97142597167" className="mil-dark-soft">+971 4 259 7167</a><br />
                  Fax: <a href="tel:+97142594795" className="mil-dark-soft">+971 4 259 4795</a><br />
                  Email: <a href="mailto:info@wishgroup.ae" className="mil-dark-soft">info@wishgroup.ae</a>
                </p>
              </div>

              <div className="mil-up mil-card mil-card-glass mil-mb-30" style={tileStyle}>
                <TileHeading title="Regional Offices" subtitle="Support" />
                <p className="mil-dark-soft mil-mb-20">
                  For tailored assistance in your region, please use the contacts below or fill out the form and we will direct your request to the right team:
                </p>
                <ul className="mil-list mil-dark-soft">
                  <li>Sri Lanka</li>
                  <li>Maldives</li>
                  <li>Malaysia &amp; Singapore</li>
                  <li>United Kingdom</li>
                  <li>Ghana &amp; South Africa</li>
                </ul>
              </div>

              <div className="mil-up mil-card mil-card-glass" style={tileStyle}>
                <TileHeading title="Connect With Us" subtitle="Follow & Engage" />
                <p className="mil-dark-soft mil-mb-20">
                  Stay updated and join the conversation:
                </p>
                <ul className="mil-list mil-dark-soft mil-mb-30">
                  <li>
                    <a href="https://www.linkedin.com/company/wish-group/posts/?feedView=all" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin-in mil-mr-10"></i> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wishgroupuae/" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram mil-mr-10"></i> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/wish.groupuae?rdid=FFmiND7PiLKa8uyo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B4SSya66E%2F#" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook-f mil-mr-10"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@wishgroup-d4y" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-youtube mil-mr-10"></i> YouTube
                    </a>
                  </li>
                </ul>
                <h6 className="mil-muted mil-mb-10">Head office hours</h6>
                <p className="mil-dark-soft mil-mb-10">
                  Sunday–Thursday: 9:00 AM — 6:00 PM (UAE Time)<br />
                  Saturday: By appointment only<br />
                  Closed on Fridays and public holidays
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-stretch mil-mb-30">
            <div className="col-lg-7 mil-mb-30 d-flex">
              <div className="mil-up mil-card mil-card-glass p-4 h-100" style={{ ...tileStyle, flex: 1 }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
                  <iframe
                    title="Wish Group Headquarters Map"
                    src="https://www.google.com/maps?q=Citadel+Tower+Business+Bay+Dubai&output=embed"
                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-lg-5 mil-mb-30 d-flex">
              <div className="mil-up mil-card mil-card-glass p-4 h-100" style={{ ...tileStyle, flex: 1 }}>
                <h5 className="mil-mb-20">Map &amp; directions</h5>
                <p className="mil-dark-soft mil-mb-20">
                  Find us on Google Maps for easy navigation from Business Bay, Sheikh Zayed Road, and surrounding districts.
                </p>
                <div className="d-flex justify-content-center">
                  <a
                    className="mil-button mil-glass mil-mb-10"
                    style={{ background: 'linear-gradient(120deg, rgba(186,203,217,0.35), rgba(186,203,217,0.2))', color: '#3C4C59' }}
                    href="https://www.google.com/maps/place/Citadel+Tower,+Al+Marasi+Dr+-+Business+Bay+-+Dubai+-+United+Arab+Emirates"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find us on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer minimal />
    </>
  )
}

export default Contacts

