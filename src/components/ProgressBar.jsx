import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProgressBar() {
  useEffect(() => {
    gsap.to('.mil-progress', {
      height: '100%',
      ease: 'sine',
      scrollTrigger: {
        scrub: 0.3,
      },
    })
  }, [])

  return (
    <div className="mil-progress-track">
      <div className="mil-progress"></div>
    </div>
  )
}

export default ProgressBar

