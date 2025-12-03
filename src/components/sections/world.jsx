import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Globe3D from '../Globe3D'

gsap.registerPlugin(ScrollTrigger)

function IntroSection() {
  const textRef = useRef(null)
  const globeRef = useRef(null)

  useEffect(() => {
    // Animate text elements
    if (textRef.current) {
      const textElements = textRef.current.querySelectorAll('.mil-up')
      textElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }

    // Animate globe container
    if (globeRef.current) {
      gsap.fromTo(
        globeRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: globeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && (trigger.vars.trigger === textRef.current || trigger.vars.trigger === globeRef.current)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section className="mil-intro-section mil-p-120-0">
      <div className="container">
        <div className="row justify-content-center" ref={textRef}>
          <div className="col-lg-8 col-xl-7 text-center mil-mb-60">
            <h2 className="mil-up mil-mb-30">
              <span className="mil-thin">Welcome to</span> <strong>Our World</strong>
            </h2>
            <p className="mil-up mil-mb-60 mil-text-lg">
              We create exceptional experiences that transform ideas into reality. 
              Our passion for innovation drives everything we do.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div ref={globeRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px', opacity: 0 }}>
              <Globe3D width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

