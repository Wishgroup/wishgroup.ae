import React, { useEffect } from 'react'
import gsap from 'gsap'

function Preloader() {
  useEffect(() => {
    const timeline = gsap.timeline()

    timeline.to('.mil-preloader-animation', {
      opacity: 1,
    })

    timeline.fromTo(
      '.mil-animation-1 .mil-h3',
      {
        y: '30px',
        opacity: 0,
      },
      {
        y: '0px',
        opacity: 1,
        stagger: 0.4,
      }
    )

    timeline.to('.mil-animation-1 .mil-h3', {
      opacity: 0,
      y: '-30',
    }, '+=.3')

    timeline.fromTo(
      '.mil-reveal-box',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        x: '-30',
        duration: 0.1,
      }
    )

    timeline.to('.mil-reveal-box', {
      width: '100%',
      x: 0,
      duration: 0.45,
    }, '+=.1')

    timeline.to('.mil-reveal-box', {
      right: '0',
    })

    timeline.to('.mil-reveal-box', {
      width: '0%',
      duration: 0.3,
    })

    timeline.fromTo(
      '.mil-animation-2 .mil-h3',
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      '-=.5'
    )

    timeline.to('.mil-animation-2 .mil-h3', {
      opacity: 0,
      y: '-30',
      duration: 0.6,
    }, '+=.5')

    timeline.to('.mil-preloader', {
      opacity: 0,
      duration: 0.8,
      ease: 'sine',
    }, '+=.2')

    timeline.fromTo(
      '.mil-up',
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
        ease: 'sine',
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'sine',
        onComplete: () => {
          document.querySelector('.mil-preloader')?.classList.add('mil-hidden')
        },
      },
      '-=1'
    )
  }, [])

  return (
    <div className="mil-preloader">
      <div className="mil-preloader-animation">
        <div className="mil-pos-abs mil-animation-1">
          <p className="mil-h3 mil-muted mil-thin">We make</p>
          <p className="mil-h3 mil-muted"><strong>a Wish</strong></p>
        </div>
        <div className="mil-pos-abs mil-animation-2">
          <div className="mil-reveal-frame">
            <p className="mil-reveal-box"></p>
            <p className="mil-h3 mil-muted mil-thin">Since 2000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader

