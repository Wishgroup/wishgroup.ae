import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Cursor() {
  const cursorRef = useRef(null)
  const particlesContainerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Create particles container if it doesn't exist
    if (!particlesContainerRef.current) {
      const container = document.createElement('div')
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
      `
      document.body.appendChild(container)
      particlesContainerRef.current = container
    }

    // Center the cursor image (adjust offset based on pointer hotspot)
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    })

    const moveCursor = (e) => {
      gsap.to(cursor, {
        duration: 0.6,
        ease: 'sine',
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Function to create flower particles on click
    const createFlowerParticles = (x, y) => {
      const container = particlesContainerRef.current
      if (!container) return

      const particleCount = 6 // Number of particles to emit
      const baseSize = 40 // Starting size in pixels
      const minSize = 8 // Ending size in pixels
      const spreadDistance = 80 // How far particles spread

      for (let i = 0; i < particleCount; i++) {
        // Create particle element
        const particle = document.createElement('img')
        particle.src = '/mouse_pointer.png'
        particle.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${baseSize}px;
          height: ${baseSize}px;
          object-fit: contain;
          pointer-events: none;
          transform: translate(-50%, -50%);
        `
        container.appendChild(particle)

        // Calculate random direction and distance
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
        const distance = spreadDistance + (Math.random() - 0.5) * 30
        const endX = x + Math.cos(angle) * distance
        const endY = y + Math.sin(angle) * distance

        // Random rotation
        const rotation = (Math.random() - 0.5) * 720 // -360 to 360 degrees

        // Animate particle: big to small, fade out, move outward
        gsap.fromTo(
          particle,
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
          },
          {
            x: endX - x,
            y: endY - y,
            scale: minSize / baseSize,
            opacity: 0,
            rotation: rotation,
            duration: 0.8 + Math.random() * 0.4, // 0.8 to 1.2 seconds
            ease: 'power2.out',
            onComplete: () => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle)
              }
            },
          }
        )
      }
    }

    // Handle click events
    const handleClick = (e) => {
      createFlowerParticles(e.clientX, e.clientY)
    }

    document.addEventListener('pointermove', moveCursor)
    document.addEventListener('click', handleClick)

    // Cursor hover effects
    const handleMouseOver = (selector, props) => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((el) => {
        el.addEventListener('mouseover', () => {
          gsap.to(cursor, { ...props, duration: 0.2, ease: 'sine' })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { width: 72, height: 72, opacity: 1, duration: 0.2, ease: 'sine' })
        })
      })
    }

    handleMouseOver('.mil-drag, .mil-more, .mil-choose', { width: 96, height: 96, opacity: 1 })
    handleMouseOver('.mil-accent-cursor', { opacity: 1 })

    return () => {
      document.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('click', handleClick)
      // Clean up particles container
      if (particlesContainerRef.current && particlesContainerRef.current.parentNode) {
        particlesContainerRef.current.parentNode.removeChild(particlesContainerRef.current)
      }
    }
  }, [])

  return (
    <div className="mil-ball" ref={cursorRef}>
      <img 
        src="/mouse_pointer.png" 
        alt="cursor" 
        className="mil-cursor-image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
      />
      <span className="mil-icon-1">
        <svg viewBox="0 0 128 128">
          <path d="M106.1,41.9c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2L116.8,61H11.2l14.9-14.9c1.2-1.2,1.2-3.1,0-4.2	c-1.2-1.2-3.1-1.2-4.2,0l-20,20c-1.2,1.2-1.2,3.1,0,4.2l20,20c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2	L11.2,67h105.5l-14.9,14.9c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9l20-20c1.2-1.2,1.2-3.1,0-4.2L106.1,41.9	z" />
        </svg>
      </span>
      <div className="mil-more-text">More</div>
      <div className="mil-choose-text">Сhoose</div>
    </div>
  )
}

export default Cursor

