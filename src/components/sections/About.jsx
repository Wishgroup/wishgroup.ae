import React from 'react'
import RotatedCarousel from '../RotatedCarousel'

function About() {
  return (
    <section id="about">
      <div className="container mil-p-120-30">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6 col-xl-5">
            <div className="mil-mb-90">
              <h2 className="mil-up mil-mb-60">
                Discover <br />
                Our <span className="mil-thin">Projects</span>
              </h2>
              <p className="mil-up mil-mb-30">
              At the WISH GROUP, our projects are the tangible realization of our vision for the future, accomplished through global initiatives and human connection. They embody our commitment to Excellence, Integrity, and Service. Our ventures are diverse, encompassing strategic investment sourcing, mixed project developments, real estate, and property development across our country network. We approach each project with diligence to create winning outcomes. We work to make wishes come true and achieve together to become a number one capital company.
              </p>
              {/* <div className="mil-about-quote"> */}
                {/* <div className="mil-avatar mil-up">
                  <img src="/img/faces/customers/2.jpg" alt="Founder" />
                </div> */}
                {/* <h6 className="mil-quote mil-up">
                  Passionately Creating <span className="mil-thin">Design Wonders:</span> Unleashing{' '}
                  <span className="mil-thin">Boundless Creativity</span>
                </h6> */}
              {/* </div> */}
            </div>
          </div>
          <div className="col-lg-5">
            <div className="mil-about-photo mil-mb-90">
              <div className="mil-lines-place"></div>
              <div className="mil-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                <RotatedCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

