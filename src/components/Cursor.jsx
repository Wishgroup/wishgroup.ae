import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

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

    document.addEventListener('pointermove', moveCursor)

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

