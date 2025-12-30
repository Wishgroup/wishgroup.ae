import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Constants for clock styles
const CLOCK_NUMBER_STYLE = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  fontFamily: 'monospace',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.76), 0 0 20px rgba(255, 255, 255, 0.475)'
}

const CLOCK_SEPARATOR_STYLE = {
  color: '#ffffff',
  fontSize: '20px',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.76)'
}

// Simple Countdown Clock Component
function FlipperClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const { hours, minutes, seconds } = useMemo(() => {
    const h = time.getHours().toString().padStart(2, '0')
    const m = time.getMinutes().toString().padStart(2, '0')
    const s = time.getSeconds().toString().padStart(2, '0')
    return { hours: h, minutes: m, seconds: s }
  }, [time])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      height: '50px',
      transform: 'scaleX(1.02)'
    }}>
      <span style={CLOCK_NUMBER_STYLE}>{hours}</span>
      <span style={CLOCK_SEPARATOR_STYLE}>:</span>
      <span style={CLOCK_NUMBER_STYLE}>{minutes}</span>
      <span style={CLOCK_SEPARATOR_STYLE}>:</span>
      <span style={CLOCK_NUMBER_STYLE}>{seconds}</span>
    </div>
  )
}

// Flipping Container Component
function FlippingContainer() {
  const [showClock, setShowClock] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowClock(prev => !prev)
    }, 5000) // Toggle every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '50px',
      perspective: '1000px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: showClock ? 'rotateX(0deg)' : 'rotateX(180deg)'
      }}>
        {/* Clock side - front */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}>
          <FlipperClock />
        </div>
        
        {/* App Store badges side - back */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <a 
            href="https://play.google.com/store/apps" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              backgroundColor: '#000000',
              borderRadius: '6px',
              padding: '6px 12px',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
              height: '40px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z" fill="#00D9FF"/>
                  <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z" fill="#00D9FF"/>
                  <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="#00D9FF"/>
                  <path d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z" fill="#00D9FF"/>
                </svg>
              </div>
              <div style={{ color: '#ffffff', fontSize: '10px', lineHeight: '1.2' }}>
                GET IT ON<br />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>Google Play</span>
              </div>
            </div>
          </a>
          <a 
            href="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              backgroundColor: '#000000',
              borderRadius: '6px',
              padding: '6px 12px',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
              height: '40px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                marginRight: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
              </div>
              <div style={{ color: '#ffffff', fontSize: '10px', lineHeight: '1.2' }}>
                Download on the<br />
                <span style={{ fontSize: '13px', fontWeight: '600' }}>App Store</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success'); // 'success' or 'error'

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setSubmitMessage('');
    setSubmitError('');

    // Validate email
    if (!email || !email.includes('@')) {
      setPopupMessage('Please enter a valid email address');
      setPopupType('error');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPopupMessage(data.message || 'Thank you for contacting Wish Group. You will be attended by our customer service team in short due.');
        setPopupType('success');
        setShowPopup(true);
        setEmail(''); // Clear the input
        // Hide popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      } else {
        setPopupMessage(data.message || 'Failed to subscribe. Please try again.');
        setPopupType('error');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setPopupMessage('Network error. Please check your connection and try again.');
      setPopupType('error');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              maxWidth: '400px',
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
              fontSize: popupType === 'success' ? '48px' : '48px',
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

      {/* App Promotion Section */}
      <section 
        style={{ 
          backgroundColor: '#126771', 
          padding: '40px 0',
          width: '100%'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Logo */}
            <div className="col-md-3 col-lg-3">
              <img 
                src="/wishwaveslogo.png" 
                alt="Wish Waves Logo" 
                style={{ 
                  maxHeight: '150px', 
                  width: 'auto',
                  objectFit: 'contain'
                }} 
              />
            </div>
            
            {/* Middle: Promotional Text */}
            <div className="col-md-6 col-lg-6 text-center">
              <h3 style={{ 
                color: '#ffffff', 
                textTransform: 'uppercase',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px',
                letterSpacing: '1px'
              }}>
                GET THE APP
              </h3>
              <p style={{ 
                color: '#ffffff', 
                fontSize: '16px',
                margin: 0,
                lineHeight: '1.5'
              }}>
                The best trip is the one we havent - Where lifestyle, ocean experiences, and trusted value come together —
                <br />
                inviting you on a journey beyond the waves.
              </p>
            </div>
            
            {/* Right: Flipper Clock Timer / App Store Icons */}
            <div className="col-md-3 col-lg-3" style={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
              <FlippingContainer />
            </div>
          </div>
        </div>
      </section>

      <footer className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-60">
          {/* Top Section: Logo and Newsletter */}
          <div className="row mil-mb-90 mil-newsletter-row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12 mil-mb-60 text-center">
              <div className="mil-muted mil-logo mil-up mil-mb-30" style={{ textAlign: 'center' }}>Wish Waves</div>
              <p className="mil-light-soft mil-up mil-mb-30" style={{ textAlign: 'center' }}>Subscribe for News and Information</p>
              <form className="mil-subscribe-form mil-up" onSubmit={handleNewsletterSubmit} style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                alignItems: 'center',
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 20px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '16px',
                    outline: 'none',
                    textTransform: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }}
                />
                <button 
                  type="submit" 
                  className="mil-button mil-icon-button-sm mil-arrow-place"
                  disabled={isSubmitting}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isSubmitting ? 0.6 : 1
                  }}
                ></button>
              </form>
            </div>
          </div>

          {/* Middle Section: Address, Contact, Useful Links, and Follow Us */}
          <div className="row justify-content-center text-center mil-mb-60" style={{ rowGap: '30px' }}>
            <div className="col-md-3 mil-mb-40 footer-mobile-center">
              <h6 className="mil-muted mil-up mil-mb-20">Dubai - U.A.E.</h6>
              <p className="mil-light-soft mil-up">
                4004/4005, 40th Floor, Citadel Tower,
                <br />
                Al Marasi Drive Business Bay
                <br />
                <span className="mil-no-wrap">Dubai - U.A.E</span>
                <br />
                <span className="mil-no-wrap">P.O. BOX: 417425, Dubai UAE</span>
              </p>
            </div>
            <div className="col-md-3 mil-mb-40 footer-mobile-center">
              <h6 className="mil-muted mil-up mil-mb-20">Contact Us</h6>
              <p className="mil-light-soft mil-up">
                <span className="mil-no-wrap">+971 4259 7167</span>
                <br />
                <span className="mil-no-wrap">+971 4259 4795</span>
                <br />
                <a href="mailto:info@wishgroup.ae" className="mil-light-soft">info@wishgroup.ae</a>
                <br />
                <a href="mailto:info@wishgroup.world" className="mil-light-soft">info@wishgroup.world</a>
              </p>
            </div>
            <div className="col-md-3 mil-mb-40 footer-mobile-center">
              <h6 className="mil-muted mil-up mil-mb-20">Useful links</h6>
              <ul className="mil-menu-list" style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/news" className="mil-light-soft" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    New & Gallery
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/careers" className="mil-light-soft" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Careers
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/privacy-policy" className="mil-light-soft" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Privacy Policy
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/terms-and-conditions" className="mil-light-soft" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Terms and conditions
                  </Link>
                </li>
                <li style={{ marginBottom: '0' }}>
                  <Link to="/cookie-policy" className="mil-light-soft" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mil-mb-40 footer-mobile-center" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <h6 className="mil-muted mil-up" style={{ margin: 0, textAlign: 'center', whiteSpace: 'nowrap' }}>Follow Us</h6>
                <ul className="mil-social-icons mil-up" style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 0 }}>
                  <li>
                    <a href="https://www.linkedin.com/company/wish-group" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/wishgroup" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/wishgroup" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wishgroup" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="row">
            <div className="col-12">
              <div className="mil-divider mil-mb-30"></div>
              <p className="mil-light-soft mil-up mil-text-center">© Copyright 2025 - Wish Group. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer

