import React, { useState } from 'react'
import { MountainScene } from '../terrain/MountainScene'
import { OverlayUI } from '../terrain/OverlayUI'
import AttendanceButton from '../AttendanceButton'

function NewSection() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [hoveredPerson, setHoveredPerson] = useState(null)
  const [attendanceStatuses, setAttendanceStatuses] = useState({})

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
      {/* Attendance button - shows for selected person or can be configured for specific user */}
      {selectedPerson && (
        <AttendanceButton 
          userId={selectedPerson.id}
          userName={selectedPerson.name}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </section>
  )
}

export default NewSection

