import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Globe from 'react-globe.gl'

gsap.registerPlugin(ScrollTrigger)

function IntroSection() {
  const textRef = useRef(null)
  const globeContainerRef = useRef(null)
  const [globeData, setGlobeData] = useState([])
  const [polygonsData, setPolygonsData] = useState([])

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

    // Animate globe
    if (globeContainerRef.current) {
      gsap.fromTo(
        globeContainerRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: globeContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === textRef.current) {
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
            <h2 className="mil-up mil-mb-30">Welcome to Our World</h2>
            <p className="mil-up mil-mb-60 mil-text-lg">
              We create exceptional experiences that transform ideas into reality. 
              Our passion for innovation drives everything we do.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div 
              ref={globeContainerRef}
              style={{ 
                width: '100%', 
                height: '500px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: '40px'
              }}
            >
              <Globe
                globeImageUrl={null}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={false}
                showGlobe={true}
                showGraticules={true}
                graticuleColor="rgba(120,120,120,0.2)"
                polygonsData={polygonsData}
                polygonAltitude={0.01}
                polygonCapColor={() => '#6B7280'}
                polygonSideColor={() => '#4B5563'}
                polygonStrokeColor={() => '#374151'}
                pointOfView={{ lat: 0, lng: 0, altitude: 2 }}
                animateIn={true}
                enablePointerInteraction={true}
                globeMaterial={{
                  color: '#6B7280',
                  emissive: '#9CA3AF',
                  emissiveIntensity: 0.2,
                  roughness: 1.0,
                  metalness: 0.0,
                }}
                htmlElementsData={globeData}
                htmlElement={(d) => {
                  const el = document.createElement('div')
                  el.innerHTML = ''
                  el.style.width = '0px'
                  el.style.height = '0px'
                  return el
                }}
                onGlobeReady={(globe) => {
                  if (globe && globe.controls) {
                    globe.controls().autoRotate = true
                    globe.controls().autoRotateSpeed = 0.5
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection

