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
            <h1 className="mil-mb-60">
              Privacy <span className="mil-thin">Policy</span>
            </h1>
            <p className="mil-text mil-up" style={{ maxWidth: '1200px', fontSize: '16px', lineHeight: '1.8', opacity: 0.8, textAlign: 'justify' }}>
              At Wish Group, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content Section */}
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
                Welcome to Wish Group's Privacy Policy. This policy describes how Wish Group ("we," "our," or "us") collects, uses, and protects your personal information when you visit our website at wishgroup.ae (the "Website") or use our services (collectively, the "Services").
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We are committed to protecting your privacy and ensuring the security of your personal data. By using our Website or Services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Information We Collect */}
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
                2. Information We Collect
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We collect information that you provide directly to us and information that is automatically collected when you use our Website or Services:
              </p>
              
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#3C4C59',
                marginTop: '25px',
                marginBottom: '15px'
              }}>
                2.1. Information You Provide to Us
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                When you interact with our Website or Services, you may provide us with:
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
                  <strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other contact information
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Account Information:</strong> Username, password, and other credentials when you create an account
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Communication Data:</strong> Messages, inquiries, feedback, or other communications you send to us
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Employment Information:</strong> Resume, cover letter, and other information when you apply for a position through our careers page
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Payment Information:</strong> Billing address, payment method details, and transaction information (if applicable)
                </li>
              </ul>

              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#3C4C59',
                marginTop: '25px',
                marginBottom: '15px'
              }}>
                2.2. Information Automatically Collected
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                When you visit our Website, we automatically collect certain information about your device and browsing behavior:
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
                  <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Usage Data:</strong> Pages visited, time spent on pages, clickstream data, and navigation patterns
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Location Data:</strong> General location information based on your IP address
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Cookies and Tracking Technologies:</strong> Information collected through cookies, web beacons, and similar tracking technologies
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
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
                3. How We Use Your Information
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We use the information we collect for various purposes, including:
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
                  <strong>To Provide and Maintain Our Services:</strong> Process your requests, manage your account, and deliver the services you have requested
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Communicate with You:</strong> Respond to your inquiries, provide customer support, send administrative information, and notify you about changes to our services
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Improve Our Services:</strong> Analyze usage patterns, conduct research, and develop new features and functionality
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Personalize Your Experience:</strong> Customize content, recommendations, and advertisements based on your preferences and interests
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Send Marketing Communications:</strong> With your consent, send you promotional materials, newsletters, and other marketing communications
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Process Employment Applications:</strong> Review and evaluate job applications submitted through our careers page
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Ensure Security:</strong> Detect, prevent, and address fraud, security threats, and other harmful activities
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>To Comply with Legal Obligations:</strong> Meet legal requirements, respond to legal processes, and enforce our rights
                </li>
              </ul>
            </div>

            {/* Information Sharing and Disclosure */}
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
                4. Information Sharing and Disclosure
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We do not sell your personal information. We may share your information in the following circumstances:
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
                  <strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, customer service, and marketing assistance
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, government agencies)
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Protection of Rights:</strong> We may disclose information to protect our rights, privacy, safety, or property, or that of our users or others
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>With Your Consent:</strong> We may share your information with third parties when you have given us explicit consent to do so
                </li>
              </ul>
            </div>

            {/* Data Security */}
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
                5. Data Security
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
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
                  Encryption of data in transit and at rest
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Regular security assessments and updates
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Access controls and authentication mechanisms
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Employee training on data protection and privacy
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Secure data storage and backup procedures
                </li>
              </ul>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </div>

            {/* Your Rights */}
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
                6. Your Rights
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Depending on your location, you may have certain rights regarding your personal information, including:
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
                  <strong>Right to Access:</strong> Request access to the personal information we hold about you
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal information
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Erasure:</strong> Request deletion of your personal information under certain circumstances
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Restrict Processing:</strong> Request restriction of processing of your personal information
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Data Portability:</strong> Request transfer of your personal information to another service provider
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Object:</strong> Object to processing of your personal information for certain purposes
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time where we rely on consent to process your information
                </li>
              </ul>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                To exercise any of these rights, please contact us using the contact information provided at the end of this Privacy Policy. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
              </p>
            </div>

            {/* Cookies and Tracking Technologies */}
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
                7. Cookies and Tracking Technologies
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We use cookies and similar tracking technologies to collect and store information about your preferences and browsing behavior. Cookies are small text files that are placed on your device when you visit our Website.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We use cookies for the following purposes:
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
                  <strong>Essential Cookies:</strong> Required for the Website to function properly
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Website
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Functional Cookies:</strong> Remember your preferences and settings
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track campaign effectiveness
                </li>
              </ul>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Website. For more information about our use of cookies, please refer to our <Link to="/cookie-policy" style={{ color: '#A6033F', textDecoration: 'none' }}>Cookie Policy</Link>.
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
                8. Third-Party Links
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Our Website may contain links to third-party websites, services, or applications that are not owned or controlled by Wish Group. This Privacy Policy does not apply to third-party websites or services.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We are not responsible for the privacy practices or content of third-party websites or services. We encourage you to review the privacy policies of any third-party websites or services that you visit.
              </p>
            </div>

            {/* Data Retention */}
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
                9. Data Retention
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                The retention period may vary depending on the type of information and the purpose for which it was collected. For example:
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
                  Account information is retained for as long as your account is active
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Marketing communications data is retained until you unsubscribe or request deletion
                </li>
                <li style={{ marginBottom: '10px' }}>
                  Legal and financial records may be retained for longer periods as required by law
                </li>
              </ul>
            </div>

            {/* Children's Privacy */}
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
                10. Children's Privacy
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Our Website and Services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information from our systems.
              </p>
            </div>

            {/* International Data Transfers */}
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
                11. International Data Transfers
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                By using our Website or Services, you consent to the transfer of your information to countries outside your country of residence. We will take appropriate measures to ensure that your information receives an adequate level of protection in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Changes to This Privacy Policy */}
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
                12. Changes to This Privacy Policy
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information. Your continued use of our Website or Services after any changes to this Privacy Policy constitutes your acceptance of those changes.
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
                13. Contact Us
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#3C4C59',
                opacity: 0.8,
                marginBottom: '15px',
                textAlign: 'justify'
              }}>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy

