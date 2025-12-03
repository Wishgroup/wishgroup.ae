import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mil-dark-bg">
      <div className="mi-invert-fix">
        <div className="container mil-p-120-60">
          <div className="row justify-content-between">
            <div className="col-md-4 col-lg-4 mil-mb-60">
              <div className="mil-muted mil-logo mil-up mil-mb-30">Wish Group.</div>

              <p className="mil-light-soft mil-up mil-mb-30">Subscribe our newsletter:</p>

              <form className="mil-subscribe-form mil-up">
                <input type="text" placeholder="Enter our email" />
                <button type="submit" className="mil-button mil-icon-button-sm mil-arrow-place"></button>
              </form>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="row justify-content-end">
                <div className="col-md-6 col-lg-7">
                  <nav className="mil-footer-menu mil-mb-60">
                    <ul>
                      <li className="mil-up mil-active">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="mil-up">
                        <Link to="/portfolio-1">Portfolio</Link>
                      </li>
                      <li className="mil-up">
                        <Link to="/services">Services</Link>
                      </li>
                      <li className="mil-up">
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li className="mil-up">
                        <Link to="/blog">Blog</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-md-6 col-lg-5">
                  <ul className="mil-menu-list mil-up mil-mb-60">
                    <li>
                      <a href="#." className="mil-light-soft">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#." className="mil-light-soft">
                        Terms and conditions
                      </a>
                    </li>
                    <li>
                      <a href="#." className="mil-light-soft">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="#." className="mil-light-soft">
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-between flex-sm-row-reverse">
            <div className="col-md-7 col-lg-6">
              <div className="row justify-content-between">
                <div className="col-md-6 col-lg-5 mil-mb-60">
                  <h6 className="mil-muted mil-up mil-mb-30">Dubai - U.A.E.</h6>

                  <p className="mil-light-soft mil-up">
                  4004/4005, 40th Floor, Citadel Tower,

Al Marasi Drive Business Bay<span className="mil-no-wrap">Dubai- U.A.E </span>
<br /><span className="mil-no-wrap">P.O.BOX: 417425 , Dubai UAE </span>
                  </p>
                </div>
                <div className="col-md-6 col-lg-5 mil-mb-60">
                  <h6 className="mil-muted mil-up mil-mb-30">Contact Us</h6>

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
              </div>
            </div>
            <div className="col-md-4 col-lg-6 mil-mb-60">
              <div className="mil-vert-between">
                <div className="mil-mb-30">
                  <ul className="mil-social-icons mil-up">
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
                <p className="mil-light-soft mil-up">© Copyright 2025 - Wish Group. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

