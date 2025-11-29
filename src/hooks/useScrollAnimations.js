import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    // Appearance animations
    const appearance = document.querySelectorAll('.mil-up')
    appearance.forEach((section) => {
      gsap.fromTo(
        section,
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
          duration: 0.4,
          scrollTrigger: {
            trigger: section,
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Scale image animations
    const scaleImage = document.querySelectorAll('.mil-scale')
    scaleImage.forEach((section) => {
      const value1 = section.dataset.value1 || 1
      const value2 = section.dataset.value2 || 1.2
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
            scrub: true,
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

    // Rotate animations
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

