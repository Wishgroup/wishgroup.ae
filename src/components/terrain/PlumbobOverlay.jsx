import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { peopleData } from "./BusinessmanBillboards";

// Component that tracks 3D positions and projects them to screen coordinates
// This must be rendered inside the Canvas
export const PlumbobPositionTracker = ({ onPositionsUpdate }) => {
  const { camera, size } = useThree();
  const [people, setPeople] = useState(peopleData);
  
  // Convert 5px padding to 3D units (approximately 0.075 units)
  const padding = 0.075;
  
  useEffect(() => {
    // Load people data from window
    const loadPeople = () => {
      if (typeof window !== 'undefined' && window.__peopleData) {
        setPeople(window.__peopleData);
      }
    };
    
    loadPeople();
    
    // Poll for people data updates
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.__peopleData) {
        setPeople(window.__peopleData);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useFrame(() => {
    if (!people.length || !onPositionsUpdate) return;
    
    const newPositions = {};
    const vector = new THREE.Vector3();
    
    people.forEach((person) => {
      // Calculate position at top of image head with padding
      const imageTopY = person.position[1] + (person.scale * 1.2) / 2;
      const plumbobY = imageTopY + padding;
      
      vector.set(
        person.position[0],
        plumbobY,
        person.position[2]
      );
      
      // Project 3D to 2D screen coordinates
      vector.project(camera);
      
      const x = (vector.x * 0.5 + 0.5) * size.width;
      const y = (-vector.y * 0.5 + 0.5) * size.height;
      
      // Only show if in front of camera
      newPositions[person.id] = {
        x,
        y,
        isOnline: person.isOnline,
        isOccupied: person.isOccupied,
        attendanceStatus: person.attendanceStatus,
        visible: vector.z < 1
      };
    });
    
    onPositionsUpdate(newPositions);
  });
  
  return null;
};

// HTML overlay component that renders plumbobs
// This is rendered outside the Canvas and scrolls with the page
export const PlumbobOverlay = ({ positions = {} }) => {
  const [people, setPeople] = useState(peopleData);
  const [scrollOffset, setScrollOffset] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    // Load people data from window
    const loadPeople = () => {
      if (typeof window !== 'undefined' && window.__peopleData) {
        setPeople(window.__peopleData);
      }
    };
    
    loadPeople();
    
    // Poll for people data updates
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.__peopleData) {
        setPeople(window.__peopleData);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Update scroll offset on scroll and resize
    const updateScrollOffset = () => {
      const sectionElement = document.getElementById('new-section');
      if (sectionElement) {
        const rect = sectionElement.getBoundingClientRect();
        setScrollOffset({
          top: window.scrollY + rect.top,
          left: window.scrollX + rect.left
        });
      }
    };
    
    updateScrollOffset();
    window.addEventListener('scroll', updateScrollOffset, true);
    window.addEventListener('resize', updateScrollOffset);
    
    return () => {
      window.removeEventListener('scroll', updateScrollOffset, true);
      window.removeEventListener('resize', updateScrollOffset);
    };
  }, []);
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      {people.map((person) => {
        const pos = positions[person.id];
        if (!pos || !pos.visible) return null;
        
        // Get attendance status from person data
        const personData = people.find(p => p.id === person.id);
        const attendanceStatus = personData?.attendanceStatus;
        
        // Color based on attendance status (priority) or online status
        let color, glowColor;
        if (attendanceStatus) {
          if (attendanceStatus.checkedIn && !attendanceStatus.checkedOut) {
            // Checked in (green)
            color = '#00ff00';
            glowColor = '#00ff88';
          } else if (attendanceStatus.checkedIn && attendanceStatus.checkedOut) {
            // Checked out (orange/yellow)
            color = '#ffaa00';
            glowColor = '#ffcc44';
          } else {
            // Not checked in (red)
            color = '#ff0000';
            glowColor = '#ff4444';
          }
        } else {
          // Fallback to online status
          color = pos.isOnline ? '#00ff00' : '#ff0000';
          glowColor = pos.isOnline ? '#00ff88' : '#ff4444';
        }
        
        return (
          <div
            key={person.id}
            style={{
              position: 'absolute',
              left: `${pos.x + scrollOffset.left}px`,
              top: `${pos.y + scrollOffset.top}px`,
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              pointerEvents: 'none',
              transition: 'opacity 0.2s, transform 0.1s'
            }}
          >
            <style>{`
              @keyframes plumbobPulse${person.id} {
                0%, 100% { 
                  opacity: 1;
                  transform: translate(-50%, -50%) scale(1);
                }
                50% { 
                  opacity: 0.8;
                  transform: translate(-50%, -50%) scale(1.1);
                }
              }
              
              @keyframes plumbobFloat${person.id} {
                0%, 100% { 
                  transform: translate(-50%, -50%) translateY(0);
                }
                50% { 
                  transform: translate(-50%, -50%) translateY(-3px);
                }
              }
            `}</style>
            {/* Outer glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '18px',
                height: '18px',
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${glowColor}88 0%, ${glowColor}44 50%, transparent 100%)`,
                borderRadius: '50%',
                animation: `plumbobPulse${person.id} 2s ease-in-out infinite`,
                filter: 'blur(2px)'
              }}
            />
            {/* Main plumbob - diamond shape using CSS */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '12px',
                height: '12px',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                background: color,
                boxShadow: `
                  0 0 8px ${color}88,
                  0 0 4px ${glowColor},
                  inset 0 0 4px rgba(255, 255, 255, 0.3)
                `,
                animation: `plumbobFloat${person.id} 3s ease-in-out infinite`
              }}
            />
            {/* Inner highlight */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '6px',
                height: '6px',
                transform: 'translate(-50%, -50%) rotate(45deg)',
                background: 'rgba(255, 255, 255, 0.4)',
                boxShadow: 'inset 0 0 2px rgba(255, 255, 255, 0.6)'
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

