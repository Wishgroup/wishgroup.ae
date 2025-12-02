import React, { useState } from 'react'
import { MountainScene } from '../terrain/MountainScene'
import { OverlayUI } from '../terrain/OverlayUI'

function NewSection() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [hoveredPerson, setHoveredPerson] = useState(null)

  const handleReset = () => {
    setSelectedPerson(null)
    if (typeof window !== 'undefined' && window.__resetTerrainCamera) {
      window.__resetTerrainCamera()
    }
  }

  return (
    <section id="new-section" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <MountainScene 
        onPersonSelect={setSelectedPerson}
        onPersonHover={setHoveredPerson}
      />
      <OverlayUI 
        onReset={handleReset}
        selectedPerson={selectedPerson}
        hoveredPerson={hoveredPerson}
      />
    </section>
  )
}

export default NewSection

