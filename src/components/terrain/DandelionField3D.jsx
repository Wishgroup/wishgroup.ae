import React, { useRef, useMemo, useEffect } from "react";
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

// Create realistic dandelion stem geometry
const createStemGeometry = () => {
  const geometry = new THREE.CylinderGeometry(0.02, 0.025, 1.0, 12);
  // Add slight taper and curve
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const normalizedY = (y + 0.5) / 1.0;
    // Slight curve for natural look
    const curve = Math.sin(normalizedY * Math.PI) * 0.03;
    positions.setX(i, positions.getX(i) + curve);
  }
  geometry.computeVertexNormals();
  return geometry;
};

// Create realistic dandelion head geometry with seeds
const createDandelionHeadGeometry = () => {
  // Use a more detailed sphere for better appearance
  const geometry = new THREE.SphereGeometry(0.18, 20, 20);
  // Flatten slightly for more realistic fluffy shape
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    // Flatten top and bottom slightly for fluffy appearance
    if (y > 0.06) {
      positions.setY(i, y * 0.85);
    }
    if (y < -0.06) {
      positions.setY(i, y * 0.85);
    }
    // Add slight randomness for natural look
    const noise = (Math.random() - 0.5) * 0.02;
    positions.setX(i, positions.getX(i) + noise);
    positions.setZ(i, positions.getZ(i) + noise);
  }
  geometry.computeVertexNormals();
  return geometry;
};

export const DandelionField3D = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  count = 800,
  avoidSteepSlopes = true,
  maxSlope = 0.3,
}) => {
  const stemMeshRef = useRef(null);
  const headMeshRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);

  // Create geometries once
  const stemGeometry = useMemo(() => createStemGeometry(), []);
  const headGeometry = useMemo(() => createDandelionHeadGeometry(), []);

  // Generate dandelion positions, scales, rotations, and wind offsets
  const { positions, scales, rotations, windOffsets, headRotations, count: finalCount } = useMemo(() => {
    const posArray = [];
    const scaleArray = [];
    const rotArray = [];
    const windOffsetArray = [];
    const headRotArray = [];
    
    const attempts = count * 2;
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

      // Random scale for variety (0.7 to 1.3) - more variation
      const scale = 0.7 + Math.random() * 0.6;
      
      // Random rotation around Y axis
      const rotation = Math.random() * Math.PI * 2;
      
      // Random wind offset for individual movement
      const windOffset = Math.random() * Math.PI * 2;
      
      // Random head rotation
      const headRotation = Math.random() * Math.PI * 2;

      // Small random offset to avoid perfect grid
      const offsetX = (Math.random() - 0.5) * 0.15;
      const offsetZ = (Math.random() - 0.5) * 0.15;

      posArray.push(
        worldPos[0] + offsetX,
        worldPos[1] + 0.02, // Slightly above terrain
        worldPos[2] + offsetZ
      );
      scaleArray.push(scale);
      rotArray.push(rotation);
      windOffsetArray.push(windOffset);
      headRotArray.push(headRotation);

      placed++;
    }

    return {
      positions: new Float32Array(posArray),
      scales: new Float32Array(scaleArray),
      rotations: new Float32Array(rotArray),
      windOffsets: new Float32Array(windOffsetArray),
      headRotations: new Float32Array(headRotArray),
      count: placed,
    };
  }, [width, depth, heightScale, count, noise2D, avoidSteepSlopes, maxSlope]);

  // Initialize instance matrices for stems
  useEffect(() => {
    if (stemMeshRef.current && finalCount > 0) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < finalCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const scale = scales[i];
        const rotation = rotations[i];
        
        matrix.makeRotationY(rotation);
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(scale, scale, scale));
        
        stemMeshRef.current.setMatrixAt(i, matrix);
      }
      stemMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [stemMeshRef, finalCount, positions, scales, rotations]);

  // Initialize instance matrices for heads
  useEffect(() => {
    if (headMeshRef.current && finalCount > 0) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < finalCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1] + 0.5 * scales[i]; // Head position above stem
        const z = positions[i * 3 + 2];
        const scale = scales[i];
        const rotation = rotations[i];
        const headRotation = headRotations[i];
        
        matrix.makeRotationY(rotation);
        matrix.makeRotationZ(headRotation);
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(scale * 0.9, scale * 0.9, scale * 0.9));
        
        headMeshRef.current.setMatrixAt(i, matrix);
      }
      headMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [headMeshRef, finalCount, positions, scales, rotations, headRotations]);

  // Animate stems and heads with wind
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (stemMeshRef.current && finalCount > 0) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < finalCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const scale = scales[i];
        const rotation = rotations[i];
        const windOffset = windOffsets[i];
        
        // Wind sway effect - more pronounced
        const sway = Math.sin(t * 1.5 + windOffset + x * 0.1) * 0.12;
        const swayZ = Math.cos(t * 1.2 + windOffset + z * 0.1) * 0.08;
        
        matrix.makeRotationY(rotation);
        matrix.makeRotationZ(sway);
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(scale, scale, scale));
        
        stemMeshRef.current.setMatrixAt(i, matrix);
      }
      stemMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    
    if (headMeshRef.current && finalCount > 0) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < finalCount; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1] + 0.5 * scales[i];
        const z = positions[i * 3 + 2];
        const scale = scales[i];
        const rotation = rotations[i];
        const headRotation = headRotations[i];
        
        // Head rotation animation - slower, more natural
        const headRot = headRotation + t * 0.2;
        
        matrix.makeRotationY(rotation);
        matrix.makeRotationZ(headRot);
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(scale * 0.9, scale * 0.9, scale * 0.9));
        
        headMeshRef.current.setMatrixAt(i, matrix);
      }
      headMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  if (finalCount === 0) return null;

  return (
    <group>
      {/* Stems using instancing */}
      <instancedMesh
        ref={stemMeshRef}
        args={[stemGeometry, null, finalCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={new THREE.Color().setHSL(110 / 360, 0.7, 0.3)}
          roughness={0.95}
          metalness={0.05}
        />
      </instancedMesh>
      
      {/* Heads using instancing */}
      <instancedMesh
        ref={headMeshRef}
        args={[headGeometry, null, finalCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={new THREE.Color().setHSL(55 / 360, 0.15, 0.98)}
          emissive={new THREE.Color().setHSL(55 / 360, 0.25, 0.95)}
          emissiveIntensity={0.6}
          roughness={0.6}
          metalness={0.0}
        />
      </instancedMesh>
    </group>
  );
};

