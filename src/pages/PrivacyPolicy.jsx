import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function PrivacyPolicy() {
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
              <li>Privacy Policy</li>
            </ul>
            <h1 className="mil-mb-20">
              Privacy <span className="mil-thin">Policy</span>
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
                    1. Introduction
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Welcome to Wish Group. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
                  </p>
                </div>

                {/* Information We Collect */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    2. Information We Collect
                  </h2>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    2.1 Personal Information
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Register for an account or use our services</li>
                    <li style={{ marginBottom: '10px' }}>Contact us through our website, email, or phone</li>
                    <li style={{ marginBottom: '10px' }}>Subscribe to our newsletters or marketing communications</li>
                    <li style={{ marginBottom: '10px' }}>Apply for a job or career opportunity</li>
                    <li style={{ marginBottom: '10px' }}>Participate in surveys, contests, or promotions</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    This information may include your name, email address, phone number, postal address, company name, job title, and any other information you choose to provide.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    2.2 Automatically Collected Information
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    When you visit our website, we automatically collect certain information about your device, including:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>IP address and location data</li>
                    <li style={{ marginBottom: '10px' }}>Browser type and version</li>
                    <li style={{ marginBottom: '10px' }}>Operating system</li>
                    <li style={{ marginBottom: '10px' }}>Pages visited and time spent on pages</li>
                    <li style={{ marginBottom: '10px' }}>Referring website addresses</li>
                    <li style={{ marginBottom: '10px' }}>Device identifiers and mobile network information</li>
                  </ul>
                </div>

                {/* How We Use Your Information */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    3. How We Use Your Information
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>To provide, maintain, and improve our services</li>
                    <li style={{ marginBottom: '10px' }}>To process your requests, transactions, and applications</li>
                    <li style={{ marginBottom: '10px' }}>To communicate with you about our services, updates, and promotional offers</li>
                    <li style={{ marginBottom: '10px' }}>To respond to your inquiries and provide customer support</li>
                    <li style={{ marginBottom: '10px' }}>To analyze website usage and trends to enhance user experience</li>
                    <li style={{ marginBottom: '10px' }}>To detect, prevent, and address technical issues and security threats</li>
                    <li style={{ marginBottom: '10px' }}>To comply with legal obligations and enforce our terms and conditions</li>
                    <li style={{ marginBottom: '10px' }}>To protect our rights, property, and safety, as well as that of our users</li>
                  </ul>
                </div>

                {/* Information Sharing and Disclosure */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    4. Information Sharing and Disclosure
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    4.1 Service Providers
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, email delivery, and customer service.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    4.2 Business Transfers
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    4.3 Legal Requirements
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We may disclose your information if required by law or in response to valid requests by public authorities.
                  </p>
                </div>

                {/* Data Security */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    5. Data Security
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                {/* Your Rights */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    6. Your Rights
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Depending on your location, you may have the following rights regarding your personal information:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}><strong>Access:</strong> Request access to your personal information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Portability:</strong> Request transfer of your personal information</li>
                    <li style={{ marginBottom: '10px' }}><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </div>

                {/* Cookies and Tracking Technologies */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    7. Cookies and Tracking Technologies
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We use cookies and similar tracking technologies to collect and store information about your preferences and activity on our website. For more detailed information about our use of cookies, please refer to our <Link to="/cookie-policy" style={{ color: '#A6033F', textDecoration: 'underline' }}>Cookie Policy</Link>.
                  </p>
                </div>

                {/* Data Retention */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    8. Data Retention
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                  </p>
                </div>

                {/* Children's Privacy */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    9. Children's Privacy
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                  </p>
                </div>

                {/* International Data Transfers */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    10. International Data Transfers
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure that your information receives an adequate level of protection.
                  </p>
                </div>

                {/* Changes to This Privacy Policy */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    11. Changes to This Privacy Policy
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
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
                    12. Contact Us
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy

