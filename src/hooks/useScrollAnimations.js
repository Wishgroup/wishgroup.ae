import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    // Appearance animations - improved for mobile
    const appearance = document.querySelectorAll('.mil-up')
    appearance.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: isMobile ? 20 : 40,
          scale: isMobile ? 0.99 : 0.98,
          ease: 'sine',
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.3 : 0.4,
          scrollTrigger: {
            trigger: section,
            start: isMobile ? 'top 90%' : 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false,
          },
        }
      )
    })

    // Scale image animations - optimized for mobile
    const scaleImage = document.querySelectorAll('.mil-scale')
    scaleImage.forEach((section) => {
      const value1 = section.dataset.value1 || 1
      const value2 = isMobile ? Math.min(parseFloat(section.dataset.value2 || 1.2), 1.1) : (section.dataset.value2 || 1.2)
      gsap.fromTo(
        section,
        {
          ease: 'sine',
          scale: value1,
        },
        {
          scale: value2,
          scrollTrigger: {
            trigger: section,
            scrub: isMobile ? 0.5 : true,
            start: isMobile ? 'top 90%' : 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Parallax animations
    const parallaxImage = document.querySelectorAll('.mil-parallax')
    if (window.innerWidth > 960) {
      parallaxImage.forEach((section) => {
        const value1 = section.dataset.value1 || 0
        const value2 = section.dataset.value2 || 0
        gsap.fromTo(
          section,
          {
            ease: 'sine',
            y: value1,
          },
          {
            y: value2,
            scrollTrigger: {
              trigger: section,
              scrub: true,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }

    // Rotate animations - disabled on mobile for performance
    if (!isMobile) {
      const rotate = document.querySelectorAll('.mil-rotate')
      rotate.forEach((section) => {
        const value = section.dataset.value || 360
        gsap.fromTo(
          section,
          {
            ease: 'sine',
            rotate: 0,
          },
          {
            rotate: value,
            scrollTrigger: {
              trigger: section,
              scrub: true,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

