import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function TermsAndConditions() {
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
              <li>Terms and Conditions</li>
            </ul>
            <h1 className="mil-mb-20">
              Terms and <span className="mil-thin">Conditions</span>
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
                    1. Agreement to Terms
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    By accessing or using the Wish Group website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These Terms and Conditions constitute a legally binding agreement between you and Wish Group. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting.
                  </p>
                </div>

                {/* Use of Website */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    2. Use of Website
                  </h2>
                  
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    2.1 Permitted Use
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You may use our website for lawful purposes only. You agree to use the website in accordance with all applicable laws, regulations, and these Terms and Conditions.
                  </p>

                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: 600, 
                    color: '#3C4C59', 
                    marginTop: '25px',
                    marginBottom: '15px'
                  }}>
                    2.2 Prohibited Activities
                  </h3>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You agree not to:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Use the website in any way that violates any applicable law or regulation</li>
                    <li style={{ marginBottom: '10px' }}>Attempt to gain unauthorized access to any portion of the website or any systems or networks connected to the website</li>
                    <li style={{ marginBottom: '10px' }}>Interfere with or disrupt the website or servers or networks connected to the website</li>
                    <li style={{ marginBottom: '10px' }}>Use any robot, spider, or other automatic device to access the website</li>
                    <li style={{ marginBottom: '10px' }}>Reproduce, duplicate, copy, sell, or exploit any portion of the website without express written permission</li>
                    <li style={{ marginBottom: '10px' }}>Transmit any viruses, malware, or other harmful code</li>
                    <li style={{ marginBottom: '10px' }}>Collect or harvest any information from the website</li>
                  </ul>
                </div>

                {/* Intellectual Property */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    3. Intellectual Property Rights
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Wish Group or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You may not modify, reproduce, distribute, create derivative works, publicly display, or otherwise use any content from this website without our prior written consent.
                  </p>
                </div>

                {/* User Accounts */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    4. User Accounts
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If you create an account on our website, you are responsible for:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Maintaining the confidentiality of your account credentials</li>
                    <li style={{ marginBottom: '10px' }}>All activities that occur under your account</li>
                    <li style={{ marginBottom: '10px' }}>Providing accurate and complete information when creating your account</li>
                    <li style={{ marginBottom: '10px' }}>Notifying us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We reserve the right to suspend or terminate your account at any time for violation of these Terms and Conditions or for any other reason we deem necessary.
                  </p>
                </div>

                {/* Services and Products */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    5. Services and Products
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We strive to provide accurate descriptions of our services and products. However, we do not warrant that product descriptions or other content on this website are accurate, complete, reliable, current, or error-free.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We reserve the right to modify, suspend, or discontinue any service or product at any time without prior notice.
                  </p>
                </div>

                {/* Disclaimer of Warranties */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    6. Disclaimer of Warranties
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    THE WEBSITE AND ALL INFORMATION, CONTENT, MATERIALS, AND SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY REPRESENTATIONS OR WARRANTIES OF ANY KIND.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We do not warrant that:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>The website will be uninterrupted, secure, or error-free</li>
                    <li style={{ marginBottom: '10px' }}>The results obtained from the use of the website will be accurate or reliable</li>
                    <li style={{ marginBottom: '10px' }}>Any errors in the website will be corrected</li>
                    <li style={{ marginBottom: '10px' }}>The website or the server that makes it available are free of viruses or other harmful components</li>
                  </ul>
                </div>

                {/* Limitation of Liability */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    7. Limitation of Liability
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WISH GROUP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Your use or inability to use the website</li>
                    <li style={{ marginBottom: '10px' }}>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                    <li style={{ marginBottom: '10px' }}>Any interruption or cessation of transmission to or from the website</li>
                    <li style={{ marginBottom: '10px' }}>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the website</li>
                  </ul>
                </div>

                {/* Indemnification */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    8. Indemnification
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    You agree to indemnify, defend, and hold harmless Wish Group, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:
                  </p>
                  <ul style={{ fontSize: '16px', color: '#3C4C59', marginLeft: '20px', marginBottom: '15px' }}>
                    <li style={{ marginBottom: '10px' }}>Your use of and access to the website</li>
                    <li style={{ marginBottom: '10px' }}>Your violation of any term of these Terms and Conditions</li>
                    <li style={{ marginBottom: '10px' }}>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                    <li style={{ marginBottom: '10px' }}>Any claim that your use of the website caused damage to a third party</li>
                  </ul>
                </div>

                {/* Links to Third-Party Websites */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    9. Links to Third-Party Websites
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Our website may contain links to third-party websites that are not owned or controlled by Wish Group. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    By using our website, you expressly release Wish Group from any and all liability arising from your use of any third-party website.
                  </p>
                </div>

                {/* Governing Law */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    10. Governing Law and Jurisdiction
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Any disputes arising out of or relating to these Terms and Conditions or the use of this website shall be subject to the exclusive jurisdiction of the courts of the United Arab Emirates.
                  </p>
                </div>

                {/* Severability */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    11. Severability
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If any provision of these Terms and Conditions is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ 
                    fontSize: '28px', 
                    fontWeight: 600, 
                    color: '#A6033F', 
                    marginBottom: '20px',
                    lineHeight: '1.3'
                  }}>
                    12. Changes to Terms
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    We reserve the right to modify these Terms and Conditions at any time. We will notify users of any material changes by posting the new Terms and Conditions on this page and updating the "Last Updated" date.
                  </p>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    Your continued use of the website after any such changes constitutes your acceptance of the new Terms and Conditions.
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
                    13. Contact Us
                  </h2>
                  <p style={{ fontSize: '16px', color: '#3C4C59', marginBottom: '15px' }}>
                    If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions

