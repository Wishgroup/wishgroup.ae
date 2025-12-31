import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

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
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear status when user starts typing
    if (status || submitError) {
      setStatus('')
      setSubmitError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    // Reset messages
    setStatus('')
    setSubmitError('')

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      setSubmitError('Please fill in all required fields.')
      return
    }

    // Validate email
    if (!formData.email.includes('@')) {
      setSubmitError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/contact/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus(data.message || 'Thank you for your inquiry! We have received it and will get back to you within 24-48 hours. You should receive a confirmation email shortly.')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
      } else {
        setSubmitError(data.message || 'Failed to send inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
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
                {status && (
                  <div className="mil-up mil-glass-note mil-mb-20" style={{
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    color: '#4CAF50',
                    padding: '16px 20px',
                    borderRadius: '12px'
                  }}>
                    {status}
                  </div>
                )}
                {submitError && (
                  <div className="mil-up mil-glass-note mil-mb-20" style={{
                    background: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid rgba(244, 67, 54, 0.3)',
                    color: '#F44336',
                    padding: '16px 20px',
                    borderRadius: '12px'
                  }}>
                    {submitError}
                  </div>
                )}
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
                    <a href="https://www.linkedin.com" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin-in mil-mr-10"></i> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wishgroupuae" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram mil-mr-10"></i> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/wish.groupuae?rdid=23hxL2TwiooZgWXD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B4SSya66E%2F#" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook-f mil-mr-10"></i> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com" className="mil-dark-soft" target="_blank" rel="noreferrer">
                      <i className="fab fa-x-twitter mil-mr-10"></i> X (Twitter)
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

