import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

// API base URL - automatically detect production vs development
const getApiBaseUrl = () => {
  // Check if VITE_API_URL is explicitly set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In production, try to use same domain with /api path or subdomain
  if (import.meta.env.PROD) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    
    // Try api subdomain first (e.g., api.wishgroup.ae)
    if (host.includes('.')) {
      const domainParts = host.split('.');
      if (domainParts.length >= 2) {
        const baseDomain = domainParts.slice(-2).join('.'); // Get domain like 'wishgroup.ae'
        return `${protocol}//api.${baseDomain}`;
      }
    }
    
    // Fallback to /api path on same domain
    return `${protocol}//${host}/api`;
  }
  
  // Development default
  return "http://localhost:5001";
};

const API_BASE_URL = getApiBaseUrl();

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
        }}
        className="app-store-buttons-container"
        >
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

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setSubmitMessage('');
    setSubmitError('');

    // Validate email format
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setPopupMessage('Please enter a valid email address');
      setPopupType('error');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return;
    }

    setIsSubmitting(true);

    // Try multiple API endpoints as fallback
    const tryApiEndpoints = async () => {
      const endpoints = [];
      
      // Primary endpoint
      if (API_BASE_URL) {
        endpoints.push(`${API_BASE_URL}/newsletter/subscribe`);
      }
      
      // Fallback endpoints for production
      if (import.meta.env.PROD) {
        const protocol = window.location.protocol;
        const host = window.location.host;
        
        // Try /api path
        endpoints.push(`${protocol}//${host}/api/newsletter/subscribe`);
        
        // Try api subdomain
        if (host.includes('.')) {
          const domainParts = host.split('.');
          if (domainParts.length >= 2) {
            const baseDomain = domainParts.slice(-2).join('.');
            endpoints.push(`${protocol}//api.${baseDomain}/newsletter/subscribe`);
          }
        }
      }
      
      // Try each endpoint
      for (const endpoint of endpoints) {
        try {
          console.log('Trying API endpoint:', endpoint);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout per attempt
          
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: trimmedEmail }),
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          return response; // Success, return the response
        } catch (error) {
          console.log(`Endpoint ${endpoint} failed:`, error.message);
          // Continue to next endpoint
          continue;
        }
      }
      
      // All endpoints failed
      throw new Error('All API endpoints failed');
    };

    try {
      const response = await tryApiEndpoints();

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Try to parse JSON response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, read as text
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text.substring(0, 100)}`);
      }

      if (data.success) {
        setPopupMessage(data.message || 'Thank you for subscribing! We will keep you updated with the latest news and information.');
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
      
      let errorMessage = 'Unable to process your subscription at this time. ';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please check your connection and try again.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.message.includes('Network request failed') || error.message.includes('Load failed')) {
        // In production, provide alternative contact method
        if (import.meta.env.PROD) {
          errorMessage = 'Thank you for your interest! If you encounter any issues, please contact us directly at info@wishgroup.ae';
        } else {
          errorMessage = 'Unable to connect to the server. Please ensure the backend server is running on port 5001. If the problem persists, you can contact us directly at info@wishgroup.ae';
        }
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Connection error. Please contact us directly at info@wishgroup.ae';
      } else if (error.message) {
        errorMessage = `Error: ${error.message}. Please try again or contact us at info@wishgroup.ae`;
      } else {
        errorMessage = 'An unexpected error occurred. Please try again later or contact us at info@wishgroup.ae';
      }

      setPopupMessage(errorMessage);
      setPopupType('error');
      setShowPopup(true);
      
      // Don't clear email on error so user can retry
      
      setTimeout(() => {
        setShowPopup(false);
      }, 7000); // Show error message a bit longer
      
      // Log detailed error for debugging
      console.error('API URL attempted:', apiUrl);
      console.error('Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* App Promotion Section */}
      <section 
        className="mil-app-promotion-section"
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

      <style>{`
        @media screen and (max-width: 768px) {
          footer.mil-dark-bg {
            padding-top: 60px !important;
            padding-bottom: 40px !important;
          }
          footer .container {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          footer .mil-newsletter-row {
            margin-bottom: 40px !important;
          }
          footer .mil-logo {
            font-size: 24px !important;
            margin-bottom: 20px !important;
          }
          footer .mil-subscribe-form {
            max-width: 100% !important;
          }
          footer .mil-subscribe-form input {
            font-size: 14px !important;
            padding: 10px 45px 10px 15px !important;
          }
          footer .mil-subscribe-form button {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
            min-height: 36px !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          footer .mil-subscribe-form button svg {
            width: 36px !important;
            height: 36px !important;
          }
          footer .mil-subscribe-form button::before,
          footer .mil-subscribe-form button::after {
            display: none !important;
            content: none !important;
          }
          footer .col-md-3 {
            margin-bottom: 30px !important;
            text-align: center !important;
          }
          footer .mil-mb-60 {
            margin-bottom: 30px !important;
          }
          footer h6 {
            font-size: 14px !important;
            margin-bottom: 15px !important;
          }
          footer p {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }
          footer .mil-menu-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          footer .mil-menu-list li {
            margin-bottom: 0 !important;
          }
          footer .mil-menu-list a {
            font-size: 13px !important;
            white-space: normal !important;
          }
          footer .mil-social-icons {
            gap: 15px !important;
          }
          footer .mil-social-icons li {
            margin: 0 5px !important;
          }
          footer .mil-divider {
            margin-bottom: 20px !important;
          }
          footer .mil-text-center {
            font-size: 12px !important;
          }
        }
        @media screen and (max-width: 480px) {
          footer .mil-logo {
            font-size: 20px !important;
          }
          footer .mil-subscribe-form input {
            font-size: 13px !important;
          }
          footer h6 {
            font-size: 13px !important;
          }
          footer p {
            font-size: 12px !important;
          }
        }
        @media screen and (max-width: 992px) {
          footer .mil-app-promotion-section {
            padding: 30px 0 !important;
          }
          footer .mil-app-promotion-section .row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          footer .mil-app-promotion-section .col-md-3,
          footer .mil-app-promotion-section .col-md-6,
          footer .mil-app-promotion-section .col-lg-3,
          footer .mil-app-promotion-section .col-lg-6 {
            width: 100% !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          footer .mil-app-promotion-section img {
            margin: 0 auto !important;
          }
          footer .mil-app-promotion-section h3 {
            font-size: 18px !important;
            margin-bottom: 10px !important;
            text-align: center !important;
          }
          footer .mil-app-promotion-section p {
            font-size: 13px !important;
            text-align: center !important;
          }
          footer .mil-app-promotion-section .col-md-3:last-child {
            justify-content: center !important;
          }
          footer .mil-app-promotion-section .col-md-3:last-child > div {
            justify-content: center !important;
            width: 100% !important;
          }
          footer .mil-app-promotion-section .col-md-3:last-child > div > div {
            justify-content: center !important;
          }
          footer .app-store-buttons-container {
            justify-content: center !important;
          }
        }
        @media screen and (max-width: 768px) {
          footer .mil-app-promotion-section {
            padding: 25px 0 !important;
          }
          footer .mil-app-promotion-section h3 {
            font-size: 16px !important;
            margin-bottom: 8px !important;
          }
          footer .mil-app-promotion-section p {
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
          footer .mil-app-promotion-section img {
            max-height: 120px !important;
          }
        }
        @media screen and (max-width: 480px) {
          footer .mil-app-promotion-section {
            padding: 20px 0 !important;
          }
          footer .mil-app-promotion-section h3 {
            font-size: 14px !important;
          }
          footer .mil-app-promotion-section p {
            font-size: 11px !important;
          }
          footer .mil-app-promotion-section img {
            max-height: 100px !important;
          }
          footer .mil-app-promotion-section img {
            max-height: 100px !important;
          }
        }
        @media screen and (max-width: 768px) {
          footer .mil-app-promotion-section {
            padding: 20px 0 !important;
          }
          footer .mil-app-promotion-section .row {
            flex-direction: column;
            text-align: center;
          }
          footer .mil-app-promotion-section .col-md-3,
          footer .mil-app-promotion-section .col-md-6 {
            margin-bottom: 20px !important;
          }
          footer .mil-app-promotion-section h3 {
            font-size: 16px !important;
          }
          footer .mil-app-promotion-section p {
            font-size: 12px !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
      <footer className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-60">
          {/* Top Section: Logo and Newsletter */}
          <div className="row mil-mb-90 mil-newsletter-row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12 mil-mb-60 text-center">
              <div className="mil-muted mil-logo mil-up mil-mb-30" style={{ textAlign: 'center' }}>Wish Group</div>
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
                  placeholder="ENTER YOUR EMAIL" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNewsletterSubmit(e);
                    }
                  }}
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
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? "Subscribing..." : "Subscribe to newsletter"}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isSubmitting ? 0.6 : 1,
                    width: '36px',
                    height: '36px',
                    transition: 'all 0.3s ease',
                    overflow: 'visible',
                    boxShadow: 'none',
                    outline: 'none',
                    minWidth: '36px',
                    minHeight: '36px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-50%)';
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                >
                  {isSubmitting ? (
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid rgba(166, 3, 63, 0.3)',
                      borderTop: '2px solid #A6033F',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                  ) : (
                    <svg 
                      width="36" 
                      height="36" 
                      viewBox="0 0 36 36" 
                      style={{ 
                        display: 'block',
                        overflow: 'visible'
                      }}
                    >
                      {/* Round circle button */}
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="18" 
                        fill="#A6033F"
                      />
                      {/* Arrow icon inside the circle */}
                      <path 
                        d="M 14 12 L 22 18 L 14 24" 
                        stroke="#ffffff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        fill="none"
                        style={{ 
                          filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.3))'
                        }}
                      />
                    </svg>
                  )}
                </button>
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
                    <a href="https://www.linkedin.com/company/wish-group/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/wish.groupuae?rdid=FFmiND7PiLKa8uyo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B4SSya66E%2F#" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/wishgroupuae/" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@wishgroup-d4y" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <i className="fab fa-youtube"></i>
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

