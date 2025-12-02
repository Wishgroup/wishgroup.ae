import React from 'react'
import Footer from '../components/Footer'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Contact() {
  useScrollAnimations()
  return (
    <>
      <section>
        <div className="container mil-p-120-30">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="mil-up mil-mb-60">
                Contact <span className="mil-thin">Us</span>
              </h2>
              <div className="mil-up mil-mb-60">
                <h6 className="mil-muted mil-mb-30">Address</h6>
                <p className="mil-dark-soft">
                  4004/4005, 40th Floor, Citadel Tower,<br />
                  Al Marasi Drive Business Bay, Dubai- U.A.E.<br />
                  P.O.BOX: 417425, Dubai UAE
                </p>
              </div>
              <div className="mil-up mil-mb-60">
                <h6 className="mil-muted mil-mb-30">Phone</h6>
                <p className="mil-dark-soft">
                  <a href="tel:+97142597167" className="mil-dark-soft">+971 4259 7167</a><br />
                  <a href="tel:+97142594795" className="mil-dark-soft">+971 4259 4795</a>
                </p>
              </div>
              <div className="mil-up mil-mb-60">
                <h6 className="mil-muted mil-mb-30">Email</h6>
                <p className="mil-dark-soft">
                  <a href="mailto:info@wishgroup.ae" className="mil-dark-soft">info@wishgroup.ae</a><br />
                  <a href="mailto:info@wishgroup.world" className="mil-dark-soft">info@wishgroup.world</a>
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

export default Contact

