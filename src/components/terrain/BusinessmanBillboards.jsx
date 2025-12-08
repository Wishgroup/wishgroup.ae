import { Billboard, useTexture, Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const peopleData = [
  { 
    id: 1,
    name: "Mr. Gerard Algama",
    role: "Brand Manager",
    description: "Leading brand strategy and marketing initiatives.",
    position: [-7, 0.5, 4], 
    scale: 4,
    image: "/Terrain/brandmanager.png",
    isOnline: true,
    isOccupied: true
  },
  { 
    id: 2,
    name: "Mr. Havindu Wickramarathne",
    role: "Project Manager",
    description: "Overseeing project execution and delivery.",
    position: [6, 0.5, 5], 
    scale: 4,
    image: "/Terrain/Projectmanager.png",
    isOnline: false,
    isOccupied: false
  },
  { 
    id: 3,
    name: "Manjima TV",
    role: "Accountant",
    description: "Managing financial operations and accounting.",
    position: [2, 0.5, -7], 
    scale: 4,
    image: "/Terrain/Accountant.png",
    isOnline: true,
    isOccupied: true
  },
  { 
    id: 4,
    name: "Ahmed Moulana",
    role: "Chairman",
    description: "Leading the organization with strategic vision and governance.",
    position: [0, 0.5, 5], 
    scale: 4,
    image: "/Terrain/chairman.png",
    isOnline: true,
    isOccupied: false
  },
  { 
    id: 5,
    name: "Andrew Fernando",
    role: "Events and Entertainment Manager",
    description: "Managing events and entertainment operations.",
    position: [-10, 0.5, -6], 
    scale: 4,
    image: "/Terrain/eventsandentertainmentmanager.png",
    isOnline: false,
    isOccupied: true
  },
  { 
    id: 6,
    name: "Arundathi Mahakumbura",
    role: "HR Manager",
    description: "Overseeing human resources and talent management.",
    position: [8, 0.5, -4], 
    scale: 4,
    image: "/Terrain/hrmanager.png",
    isOnline: true,
    isOccupied: true
  },
  { 
    id: 7,
    name: "Mr. Danushka Ambalangodage",
    role: "Senior Accountant",
    description: "Managing senior financial operations and accounting.",
    position: [5, 0.5, 2.5], 
    scale: 4,
    image: "/Terrain/SeniorAccountant.png",
    isOnline: false,
    isOccupied: false
  },
  { 
    id: 8,
    name: "Asan Egodagamage",
    role: "Head of IT",
    description: "Leading IT infrastructure and technology initiatives.",
    position: [-5, 0.5, -2.5], 
    scale: 4,
    image: "/Terrain/headofit.png",
    isOnline: true,
    isOccupied: true
  },
];

// Plumbob component - Sims-style diamond indicator
// Position should be the top center of the image head
const Plumbob = ({ position, isOnline, isOccupied }) => {
  const plumbobRef = useRef(null);
  const glowRef = useRef(null);
  const groupRef = useRef(null);
  
  // Convert 5px padding to 3D units (approximately 0.075 units)
  const padding = 0.075;
  
  // Color based on online status
  const color = isOnline ? new THREE.Color(0x00ff00) : new THREE.Color(0xff0000);
  const glowColor = isOnline ? new THREE.Color(0x00ff88) : new THREE.Color(0xff4444);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation - only Y axis, keeping X and Z at 0 for center alignment
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.position.x = 0;
      groupRef.current.position.z = 0;
    }
    
    if (plumbobRef.current) {
      // Slow rotation around Y axis
      plumbobRef.current.rotation.y += 0.01;
    }
    
    if (glowRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 0.7;
      glowRef.current.material.emissiveIntensity = pulse * 1.5;
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });
  
  // Position: center X, top of image + padding, same Z
  // The position passed is already the top center of the image head
  const plumbobY = position[1] + padding;
  
  return (
    <Billboard
      position={[position[0], plumbobY, position[2]]}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <group ref={groupRef}>
        {/* Outer glow layer - centered at origin */}
        <mesh ref={glowRef}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={glowColor}
            emissive={glowColor}
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Main plumbob diamond - centered at origin */}
        <mesh ref={plumbobRef}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Inner highlight - centered at origin */}
        <mesh position={[0, 0.05, 0]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial
            color={new THREE.Color(0xffffff)}
            emissive={new THREE.Color(0xffffff)}
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Billboard>
  );
};

const PersonBillboard = ({ 
  person, 
  onPersonClick, 
  onPersonHover 
}) => {
  const texture = useTexture(person.image);
  
  const handleClick = (e) => {
    e.stopPropagation();
    if (onPersonClick && person) {
      onPersonClick(person);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (onPersonHover && person) {
      onPersonHover(person);
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'default';
    if (onPersonHover) {
      onPersonHover(null);
    }
  };
  
  return (
    <>
      <Billboard
        position={person.position}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <mesh 
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[person.scale, person.scale * 1.2]} />
          <meshBasicMaterial 
            map={texture} 
            transparent 
            alphaTest={0.5}
            depthWrite={true}
          />
        </mesh>
      </Billboard>
      
      <Text
        position={[person.position[0], person.position[1] + person.scale * 0.65, person.position[2]]}
        fontSize={0.15}
        color="#000000"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {person.name}
      </Text>
      
      {/* Plumbob indicator on top of image head */}
      <Plumbob 
        position={[
          person.position[0], 
          person.position[1] + (person.scale * 1.2) / 2, 
          person.position[2]
        ]}
        isOnline={person.isOnline}
        isOccupied={person.isOccupied}
      />
    </>
  );
};

export const BusinessmanBillboards = ({ onPersonClick, onPersonHover }) => {
  const [people, setPeople] = useState(peopleData);
  
  // Expose people data for plumbob overlay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__peopleData = people;
    }
  }, [people]);

  useEffect(() => {
    // Load saved status from localStorage on mount
    const loadSavedStatus = () => {
      const savedStatus = localStorage.getItem('employeeStatus');
      if (savedStatus) {
        try {
          const statusMap = JSON.parse(savedStatus);
          setPeople(prev => prev.map(person => ({
            ...person,
            isOnline: statusMap[person.id]?.isOnline ?? person.isOnline
          })));
        } catch (e) {
          console.error('Error loading saved status:', e);
        }
      }
    };

    loadSavedStatus();

    // Listen for custom event when admin updates status
    const handleStatusUpdate = (event) => {
      const statusMap = event.detail;
      setPeople(prev => prev.map(person => ({
        ...person,
        isOnline: statusMap[person.id]?.isOnline ?? person.isOnline
      })));
    };

    // Listen for storage changes (for real-time updates across tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'employeeStatus') {
        try {
          const statusMap = JSON.parse(e.newValue || '{}');
          setPeople(prev => prev.map(person => ({
            ...person,
            isOnline: statusMap[person.id]?.isOnline ?? person.isOnline
          })));
        } catch (error) {
          console.error('Error parsing storage update:', error);
        }
      }
    };

    // Listen for custom event
    window.addEventListener('employeeStatusUpdated', handleStatusUpdate);
    
    // Listen for storage events (works across tabs)
    window.addEventListener('storage', handleStorageChange);

    // Poll localStorage periodically as fallback (in case events don't fire)
    const pollInterval = setInterval(() => {
      const savedStatus = localStorage.getItem('employeeStatus');
      if (savedStatus) {
        try {
          const statusMap = JSON.parse(savedStatus);
          setPeople(prev => {
            let updated = false;
            const newPeople = prev.map(person => {
              const newStatus = statusMap[person.id]?.isOnline ?? person.isOnline;
              if (newStatus !== person.isOnline) {
                updated = true;
              }
              return {
                ...person,
                isOnline: newStatus
              };
            });
            return updated ? newPeople : prev;
          });
        } catch (e) {
          // Silent fail
        }
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener('employeeStatusUpdated', handleStatusUpdate);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <>
      {people.map((person) => (
        <PersonBillboard
          key={person.id}
          person={person}
          onPersonClick={onPersonClick}
          onPersonHover={onPersonHover}
        />
      ))}
    </>
  );
};

