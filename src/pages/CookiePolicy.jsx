import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function CookiePolicy() {
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
              <li>Cookie Policy</li>
            </ul>
            <h1 className="mil-mb-20">
              Cookie <span className="mil-thin">Policy</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '800px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8 }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="row">
            <div className="col-12">
              <div className="mil-up" style={{ 
                background: '#fff',
                borderRadius: '24px',
                padding: '60px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                lineHeight: '1.8',
                color: '#3C4C59'
              }}>
                {/* Introduction */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    1. What Are Cookies?
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps us provide you with a better experience when you browse our website and allows us to improve our services.
                  </p>
                </div>

                {/* How We Use Cookies */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    2. How We Use Cookies
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We use cookies for various purposes, including:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>To enable certain functions of the website</li>
                    <li style={{ marginBottom: '10px' }}>To provide analytics and help us understand how visitors interact with our website</li>
                    <li style={{ marginBottom: '10px' }}>To store your preferences and personalize your experience</li>
                    <li style={{ marginBottom: '10px' }}>To improve the performance and security of our website</li>
                    <li style={{ marginBottom: '10px' }}>To remember your login information and preferences</li>
                    <li style={{ marginBottom: '10px' }}>To deliver targeted advertising and marketing communications</li>
                  </ul>
                </div>

                {/* Types of Cookies We Use */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    3. Types of Cookies We Use
                  </h2>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    3.1 Essential Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the website to work.
                  </p>
                  <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '15px', fontStyle: 'italic' }}>
                    Examples: Session cookies, authentication cookies, security cookies
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    3.2 Performance and Analytics Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works.
                  </p>
                  <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '15px', fontStyle: 'italic' }}>
                    Examples: Google Analytics cookies, page view tracking, user flow analysis
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    3.3 Functionality Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                  </p>
                  <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '15px', fontStyle: 'italic' }}>
                    Examples: Language preferences, region settings, user interface customization
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    3.4 Targeting and Advertising Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These cookies are used to deliver advertisements that are relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.
                  </p>
                  <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '15px', fontStyle: 'italic' }}>
                    Examples: Ad targeting cookies, remarketing cookies, social media cookies
                  </p>
                </div>

                {/* First-Party vs Third-Party Cookies */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    4. First-Party vs Third-Party Cookies
                  </h2>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    4.1 First-Party Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    First-party cookies are set directly by our website. These cookies are used to remember your preferences and improve your experience on our website.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    4.2 Third-Party Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Third-party cookies are set by domains other than our website. These are typically used for advertising and analytics purposes. We work with trusted third-party service providers who may set cookies on our website.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Examples of third-party services we may use include:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Google Analytics for website analytics</li>
                    <li style={{ marginBottom: '10px' }}>Social media platforms for sharing and integration</li>
                    <li style={{ marginBottom: '10px' }}>Advertising networks for targeted advertising</li>
                  </ul>
                </div>

                {/* Cookie Duration */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    5. Cookie Duration
                  </h2>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    5.1 Session Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Session cookies are temporary cookies that are deleted when you close your browser. They are used to maintain your session while you navigate through our website.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    5.2 Persistent Cookies
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Persistent cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and improve your experience across multiple visits to our website.
                  </p>
                </div>

                {/* Managing Cookies */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    6. Managing Cookies
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
                  </p>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    6.1 Browser Settings
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You can control cookies through your browser settings. However, please note that disabling cookies may affect the functionality of our website and your ability to access certain features.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Instructions for managing cookies in popular browsers:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                    <li style={{ marginBottom: '10px' }}><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li style={{ marginBottom: '10px' }}><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                    <li style={{ marginBottom: '10px' }}><strong>Microsoft Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
                  </ul>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    6.2 Cookie Consent
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    When you first visit our website, you may be presented with a cookie consent banner. You can choose to accept all cookies, reject non-essential cookies, or customize your cookie preferences.
                  </p>
                </div>

                {/* Do Not Track Signals */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    7. Do Not Track Signals
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As a result, our website does not currently respond to DNT signals.
                  </p>
                </div>

                {/* Updates to This Cookie Policy */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    8. Updates to This Cookie Policy
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.
                  </p>
                </div>

                {/* Contact Us */}
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    9. Contact Us
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                  </p>
                  <div style={{ 
                    background: 'rgba(166, 3, 63, 0.05)', 
                    padding: '20px', 
                    borderRadius: '12px',
                    marginTop: '20px'
                  }}>
                    <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '8px' }}>
                      <strong>Wish Group</strong>
                    </p>
                    <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '8px' }}>
                      Email: <a href="mailto:info@wishgroup.ae" style={{ color: '#A6033F', textDecoration: 'none' }}>info@wishgroup.ae</a>
                    </p>
                    <p style={{ fontSize: '16px', color: '#8596A6', marginBottom: '0' }}>
                      Website: <a href="https://wishgroup.ae" target="_blank" rel="noopener noreferrer" style={{ color: '#A6033F', textDecoration: 'none' }}>www.wishgroup.ae</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CookiePolicy

