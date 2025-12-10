import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({ 
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      refreshPriority: -1 
    })

    // Appearance animations - batch DOM queries and use once: true
    const appearance = document.querySelectorAll('.mil-up')
    if (appearance.length > 0) {
      appearance.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'sine',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true, // Only animate once for better performance
            },
          }
        )
      })
    }

    // Scale image animations - use will-change for better performance
    const scaleImage = document.querySelectorAll('.mil-scale')
    if (scaleImage.length > 0) {
      scaleImage.forEach((section) => {
        const value1 = section.dataset.value1 || 1
        const value2 = section.dataset.value2 || 1.2
        section.style.willChange = 'transform'
        gsap.fromTo(
          section,
          {
            scale: value1,
          },
          {
            scale: value2,
            ease: 'sine',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5, // Smoother scrubbing
            },
          }
        )
      })
    }

    // Parallax animations - only on desktop
    if (window.innerWidth > 960) {
      const parallaxImage = document.querySelectorAll('.mil-parallax')
      if (parallaxImage.length > 0) {
        parallaxImage.forEach((section) => {
          const value1 = section.dataset.value1 || 0
          const value2 = section.dataset.value2 || 0
          section.style.willChange = 'transform'
          gsap.fromTo(
            section,
            {
              y: value1,
            },
            {
              y: value2,
              ease: 'sine',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          )
        })
      }
    }

    // Rotate animations
    const rotate = document.querySelectorAll('.mil-rotate')
    if (rotate.length > 0) {
      rotate.forEach((section) => {
        const value = section.dataset.value || 360
        section.style.willChange = 'transform'
        gsap.fromTo(
          section,
          {
            rotate: 0,
          },
          {
            rotate: value,
            ease: 'sine',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
      })
    }

    return () => {
      // Cleanup all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

