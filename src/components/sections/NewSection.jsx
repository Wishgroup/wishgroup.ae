import React, { Suspense, useEffect, useRef, useState } from 'react'
const LazyMountainScene = React.lazy(() => import('../terrain/MountainScene').then(mod => ({ default: mod.MountainScene })))
import { OverlayUI } from '../terrain/OverlayUI'
import AttendanceButton from '../AttendanceButton'

function NewSection() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [hoveredPerson, setHoveredPerson] = useState(null)
  const [attendanceStatuses, setAttendanceStatuses] = useState({})
  const [shouldRender3D, setShouldRender3D] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const isSmallScreen = window.innerWidth < 1024
    const lowCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4

    // Skip heavy 3D on low-power devices and respect reduced-motion
    if (!prefersReduced && !isSmallScreen && !lowCores) {
      setShouldRender3D(true)
    }
  }, [])

  useEffect(() => {
    if (!shouldRender3D || !sectionRef.current) return

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
  }, [shouldRender3D])

  const handleReset = () => {
    setSelectedPerson(null)
    if (typeof window !== 'undefined' && window.__resetTerrainCamera) {
      window.__resetTerrainCamera()
    }
  }

  const handleStatusUpdate = (userId, status) => {
    setAttendanceStatuses(prev => ({
      ...prev,
      [userId]: status
    }))
  }

  return (
    <section
      ref={sectionRef}
      id="new-section"
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
    >
      {shouldRender3D && isInView ? (
        <>
          <Suspense fallback={<div className="mil-center-loader">Loading 3D scene…</div>}>
            <LazyMountainScene 
              onPersonSelect={setSelectedPerson}
              onPersonHover={setHoveredPerson}
            />
          </Suspense>
          <OverlayUI 
            onReset={handleReset}
            selectedPerson={selectedPerson}
            hoveredPerson={hoveredPerson}
          />
          {/* Attendance button - shows for selected person or can be configured for specific user */}
          {selectedPerson && (
            <AttendanceButton 
              userId={selectedPerson.id}
              userName={selectedPerson.name}
              onStatusUpdate={handleStatusUpdate}
            />
          )}
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
    </section>
  )
}

export default NewSection

