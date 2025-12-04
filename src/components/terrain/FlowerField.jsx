import { useMemo } from "react";
import { Billboard, useTexture } from "@react-three/drei";
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

const Flower = ({ position, scale, texture }) => {
  return (
    <Billboard
      position={position}
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false}
    >
      <mesh>
        <planeGeometry args={[scale, scale]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          alphaTest={0.1}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Billboard>
  );
};

export const FlowerField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  count = 150,
  minScale = 0.15,
  maxScale = 0.35,
  flowerTexturePath = "/img/flower/Dandelion.png",
  avoidSteepSlopes = true,
  maxSlope = 0.3,
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
      
      flowerPositions.push({
        position: [
          worldPos[0] + offsetX,
          worldPos[1] + 0.05, // Slightly above terrain to avoid z-fighting
          worldPos[2] + offsetZ
        ],
        scale,
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
        />
      ))}
    </>
  );
};

