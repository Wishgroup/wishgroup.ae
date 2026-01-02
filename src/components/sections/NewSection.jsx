import React, { Suspense, useEffect, useRef, useState } from 'react'
const LazyMountainScene = React.lazy(() => import('../terrain/MountainScene').then(mod => ({ default: mod.MountainScene })))
import { OverlayUI } from '../terrain/OverlayUI'

function NewSection() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [hoveredPerson, setHoveredPerson] = useState(null)
  const [shouldRender3D, setShouldRender3D] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const veryLowCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2

    // Allow 3D rendering on mobile (with lower performance settings)
    // Only skip on very low-end devices or if user prefers reduced motion
    // MountainScene will automatically use "low" performance profile on mobile
    if (!prefersReduced && !veryLowCores) {
      setShouldRender3D(true)
    }
  }, [])

  useEffect(() => {
    if (!shouldRender3D || !sectionRef.current) return

    // On mobile, render immediately without waiting for intersection
    if (isMobile) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '120px' }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [shouldRender3D, isMobile])

  const handleReset = () => {
    setSelectedPerson(null)
    if (typeof window !== 'undefined' && window.__resetTerrainCamera) {
      window.__resetTerrainCamera()
    }
  }

  return (
    <section
      ref={sectionRef}
      id="new-section"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: isMobile ? 'auto' : '100vh', 
        overflow: isMobile ? 'visible' : 'hidden',
        backgroundColor: isMobile ? '#ffffff' : 'transparent',
        paddingTop: isMobile ? '60px' : '0',
        paddingBottom: isMobile ? '60px' : '0',
        display: isMobile ? 'flex' : 'block',
        alignItems: isMobile ? 'center' : 'stretch',
        justifyContent: isMobile ? 'center' : 'flex-start',
        minHeight: isMobile ? '60vh' : '100vh',
      }}
    >
      <div
        style={{
          position: isMobile ? 'relative' : 'absolute',
          width: '100%',
          height: isMobile ? '70vh' : '100%',
          maxWidth: isMobile ? '100%' : 'none',
          margin: isMobile ? '0 auto' : '0',
        }}
      >
        {shouldRender3D && isInView ? (
          <>
            <Suspense fallback={<div className="mil-center-loader">Loading 3D scene…</div>}>
              <LazyMountainScene 
                onPersonSelect={setSelectedPerson}
                onPersonHover={setHoveredPerson}
                performanceProfile={isMobile ? "low" : "auto"}
              />
            </Suspense>
            <OverlayUI 
              onReset={handleReset}
              selectedPerson={selectedPerson}
              hoveredPerson={hoveredPerson}
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(180deg, #0f1b2d 0%, #173b5c 60%, #0f1b2d 100%), url(/Terrain/bg_terrain.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(0.2)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dfe7f3',
                textAlign: 'center',
                padding: '1rem',
                backdropFilter: 'blur(2px)',
              }}
            >
              <div>
                <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Interactive 3D view is paused</p>
                <p style={{ opacity: 0.8, maxWidth: 540 }}>
                  We keep the page fast on mobile or low-power devices. Open on desktop to explore the full terrain.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewSection

