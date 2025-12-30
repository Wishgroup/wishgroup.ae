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
            <h1 className="mil-mb-60">
              Terms and <span className="mil-thin">Conditions</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '1200px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              Welcome to Wish Group. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before using our website or services.
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Content Section */}
      <section className="mil-p-120-120" style={{ 
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(60, 76, 89, 0.02) 50%, rgba(255, 255, 255, 0) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div 
            className="mil-up"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(133, 150, 166, 0.2)',
              borderRadius: '24px',
              padding: '60px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Last Updated */}
            <div style={{
              marginBottom: '40px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(133, 150, 166, 0.2)'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#8596A6',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                1. Introduction
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Welcome to Wish Group. These Terms and Conditions ("Terms") govern your access to and use of our website located at wishgroup.ae (the "Website") and all related services, content, and features offered by Wish Group (collectively, the "Services").
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                textAlign: 'justify'
              }}>
                By accessing or using our Website or Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Website or Services.
              </p>
            </div>

            {/* Definitions */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                2. Definitions
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                In these Terms, the following definitions apply:
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                paddingLeft: '25px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong>"Company"</strong> or <strong>"Wish Group"</strong> or <strong>"We"</strong> or <strong>"Us"</strong> refers to Wish Group, headquartered in Business Bay, Dubai, United Arab Emirates.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>"User"</strong> or <strong>"You"</strong> refers to any individual or entity accessing or using the Company's Website or Services.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>"Services"</strong> refers to all products, services, content, and features offered by the Company through the Website or otherwise.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>"Content"</strong> refers to all text, graphics, images, music, software, audio, video, information, or other materials available on the Website.
                </li>
              </ul>
            </div>

            {/* Use of Services */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                3. Use of Services
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                <strong>Eligibility:</strong> You must be at least 18 years old or the legal age of majority in your jurisdiction to use our Services. By using our Services, you represent and warrant that you meet this age requirement.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                <strong>Account Responsibility:</strong> If you create an account with us, you are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                <strong>Prohibited Activities:</strong> You agree not to engage in any of the following prohibited activities:
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                paddingLeft: '25px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '10px' }}>
                  Violating any applicable local, state, national, or international law or regulation
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Infringing upon or violating our intellectual property rights or the intellectual property rights of others
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Transmitting any malicious code, viruses, or harmful data
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Attempting to gain unauthorized access to our systems or networks
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Interfering with or disrupting the Website or Services
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Collecting or harvesting information about other users without their consent
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Using the Website or Services for any illegal or unauthorized purpose
                </li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                4. Intellectual Property Rights
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                All content on this Website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Wish Group or its content suppliers and is protected by United Arab Emirates and international copyright, trademark, and other intellectual property laws.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without our prior written consent, except as follows:
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                paddingLeft: '25px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '10px' }}>
                  Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials
                </li>
                <li style={{ marginBottom: '10px' }}>
                  You may store files that are automatically cached by your web browser for display enhancement purposes
                </li>
                <li style={{ marginBottom: '10px' }}>
                  You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use
                </li>
              </ul>
            </div>

            {/* Privacy Policy */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                5. Privacy Policy
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Your use of our Website and Services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review our <Link to="/privacy-policy" style={{ color: '#A6033F', textDecoration: 'none' }}>Privacy Policy</Link>, which also governs your use of the Website and Services, to understand our practices.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                6. Limitation of Liability
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                To the fullest extent permitted by applicable law, Wish Group, its affiliates, officers, directors, employees, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                paddingLeft: '25px',
                marginBottom: '15px'
              }}>
                <li style={{ marginBottom: '10px' }}>
                  Your use or inability to use the Website or Services
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Any unauthorized access to or use of our servers and/or any personal information stored therein
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Any interruption or cessation of transmission to or from the Website
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Website by any third party
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Website
                </li>
              </ul>
            </div>

            {/* Disclaimer of Warranties */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                7. Disclaimer of Warranties
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                The Website and Services are provided on an "as is" and "as available" basis. Wish Group makes no representations or warranties of any kind, express or implied, as to the operation of the Website or the information, content, materials, or products included on the Website.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                To the fullest extent permissible by applicable law, Wish Group disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. Wish Group does not warrant that the Website, its servers, or email sent from Wish Group are free of viruses or other harmful components.
              </p>
            </div>

            {/* Indemnification */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                8. Indemnification
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                You agree to defend, indemnify, and hold harmless Wish Group, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Website or Services, or your violation of these Terms.
              </p>
            </div>

            {/* Third-Party Links */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                9. Third-Party Links
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Our Website may contain links to third-party websites or services that are not owned or controlled by Wish Group. Wish Group has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                You acknowledge and agree that Wish Group shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
            </div>

            {/* Termination */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                10. Termination
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We may terminate or suspend your access to the Website and Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Upon termination, your right to use the Website and Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Website and Services.
              </p>
            </div>

            {/* Governing Law */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                11. Governing Law
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                These Terms and Conditions are governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Website or Services shall be subject to the exclusive jurisdiction of the courts of Dubai, United Arab Emirates.
              </p>
            </div>

            {/* Changes to Terms */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                12. Changes to Terms
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                By continuing to access or use our Website or Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Website and Services.
              </p>
            </div>

            {/* Severability */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                13. Severability
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Website and Services, and supersede and replace any prior agreements we might have between us regarding the Website and Services.
              </p>
            </div>

            {/* Contact Information */}
            <div style={{
              marginTop: '60px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(133, 150, 166, 0.2)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#3C4C59',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '4px',
                  height: '30px',
                  background: 'linear-gradient(180deg, #A6033F 0%, rgba(166, 3, 63, 0.5) 100%)',
                  borderRadius: '2px'
                }} />
                14. Contact Us
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div style={{
                background: 'rgba(166, 3, 63, 0.05)',
                borderRadius: '12px',
                padding: '30px',
                marginTop: '20px'
              }}>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  marginBottom: '10px',
                  fontWeight: 600
                }}>
                  Wish Group
                </p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '10px'
                }}>
                  4004/4005, 40th Floor, Citadel Tower,<br />
                  Al Marasi Drive Business Bay<br />
                  Dubai - U.A.E<br />
                  P.O. BOX: 417425, Dubai UAE
                </p>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#3C4C59',
                  opacity: 0.8,
                  marginBottom: '10px'
                }}>
                  <strong>Email:</strong> <a href="mailto:info@wishgroup.ae" style={{ color: '#A6033F', textDecoration: 'none' }}>info@wishgroup.ae</a><br />
                  <strong>Phone:</strong> +971 4259 7167 / +971 4259 4795
                </p>
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

