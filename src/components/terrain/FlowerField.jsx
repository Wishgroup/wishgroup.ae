import { useMemo, useRef } from "react";
import { Billboard, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Helper function to calculate terrain height at a given position
// This matches the terrain generation logic
const calculateTerrainHeight = (x, y, noise2D, heightScale = 0.3) => {
  let height = 0;
  let amplitude = 1;
  let frequency = 0.15;
  
  for (let octave = 0; octave < 6; octave++) {
    height += noise2D(x * frequency, y * frequency) * amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  
  return height * heightScale;
};

// Transform terrain coordinates to world space
// Terrain is rotated [-Math.PI / 2.2, 0, 0] and positioned at [0, -1, 0]
// PlaneGeometry lies in XY plane, with height in Z
const terrainToWorldPosition = (x, y, height) => {
  // Terrain local position: (x, y, height) where x,y are plane coords, height is Z
  const localPos = new THREE.Vector3(x, y, height);
  
  // Apply terrain rotation around X axis
  const rotationX = -Math.PI / 2.2;
  localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationX);
  
  // Apply terrain position offset
  localPos.add(new THREE.Vector3(0, -1, 0));
  
  return [localPos.x, localPos.y, localPos.z];
};

const Flower = ({ position, scale, texture, randomOffset, windStrength = 0.2, windSpeed = 1.5 }) => {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  
  // Random initial rotation for variety
  const initialRotation = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Calculate wind effect with random offset for each flower
      const windWave = Math.sin(time * windSpeed + randomOffset) * 0.5 + 0.5;
      const bendAmount = windStrength * (windWave - 0.5) * 2.0;
      
      // Apply random left/right bending (rotate around Y axis)
      const bendAngle = bendAmount * 0.3; // Max 0.3 radians (~17 degrees)
      groupRef.current.rotation.y = initialRotation + bendAngle;
      
      // Slight forward/backward tilt for more natural movement
      groupRef.current.rotation.x = Math.sin(time * windSpeed * 0.7 + randomOffset) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        {/* Use circle geometry for round texture */}
        <circleGeometry args={[scale, 32]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export const FlowerField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  count = 150,
  minScale = 0.15,
  maxScale = 0.35,
  flowerTexturePath = "/Terrain/Flower.png",
  avoidSteepSlopes = true,
  maxSlope = 0.3,
  windStrength = 0.2,
  windSpeed = 1.5,
}) => {
  const texture = useTexture(flowerTexturePath);
  const noise2D = useMemo(() => createNoise2D(), []);
  
  // Generate flower positions
  const flowers = useMemo(() => {
    const flowerPositions = [];
    const attempts = count * 3; // Try more positions than needed
    let placed = 0;
    
    for (let i = 0; i < attempts && placed < count; i++) {
      // Random position within terrain bounds
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * depth;
      
      // Calculate terrain height at this position
      const height = calculateTerrainHeight(x, y, noise2D, heightScale);
      
      // Optional: Avoid steep slopes by checking nearby heights
      if (avoidSteepSlopes) {
        const sampleDistance = 0.3;
        const h1 = calculateTerrainHeight(x + sampleDistance, y, noise2D, heightScale);
        const h2 = calculateTerrainHeight(x - sampleDistance, y, noise2D, heightScale);
        const h3 = calculateTerrainHeight(x, y + sampleDistance, noise2D, heightScale);
        const h4 = calculateTerrainHeight(x, y - sampleDistance, noise2D, heightScale);
        
        const slopeX = Math.abs(h1 - h2) / (sampleDistance * 2);
        const slopeY = Math.abs(h3 - h4) / (sampleDistance * 2);
        const maxSlopeValue = Math.max(slopeX, slopeY);
        
        if (maxSlopeValue > maxSlope) {
          continue; // Skip this position, too steep
        }
      }
      
      // Transform to world position
      const worldPos = terrainToWorldPosition(x, y, height);
      
      // Random scale for variety
      const scale = minScale + Math.random() * (maxScale - minScale);
      
      // Small random offset to avoid perfect grid
      const offsetX = (Math.random() - 0.5) * 0.1;
      const offsetZ = (Math.random() - 0.5) * 0.1;
      
      // Random offset for wind animation (each flower moves differently)
      const randomOffset = Math.random() * 100.0;
      
      flowerPositions.push({
        position: [
          worldPos[0] + offsetX,
          worldPos[1] + 0.05, // Slightly above terrain to avoid z-fighting
          worldPos[2] + offsetZ
        ],
        scale,
        randomOffset,
      });
      
      placed++;
    }
    
    return flowerPositions;
  }, [width, depth, heightScale, count, minScale, maxScale, noise2D, avoidSteepSlopes, maxSlope]);
  
  return (
    <>
      {flowers.map((flower, index) => (
        <Flower
          key={index}
          position={flower.position}
          scale={flower.scale}
          texture={texture}
          randomOffset={flower.randomOffset}
          windStrength={windStrength}
          windSpeed={windSpeed}
        />
      ))}
    </>
  );
};

