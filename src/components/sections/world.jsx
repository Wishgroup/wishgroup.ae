import React from 'react'

function IntroSection() {
  return (
    <section className="mil-intro-section mil-p-120-0">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5 mil-mb-60">
            <h2 className="mil-up mil-mb-30">
              Welcome to <span className="mil-thin">Our World</span>
            </h2>
            <p className="mil-up mil-mb-30 mil-text-lg">
              We create exceptional experiences that transform ideas into reality. 
              Our passion for innovation drives everything we do.
            </p>
          </div>
          <div className="col-lg-6 mil-mb-60">
            <div className="mil-up">
              <p className="mil-text-lg mil-light-soft">
                With years of expertise and a commitment to excellence, we deliver 
                solutions that exceed expectations and drive meaningful results.
              </p>
            </div>
          </div>
        </div>
        <div className="row mil-mt-60">
          <div className="col-lg-12 mil-mb-60">
            <div className="mil-up">
              <img src="/img/world.jpg" alt="World" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

