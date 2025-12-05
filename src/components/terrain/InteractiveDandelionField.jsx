import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Helper function to calculate terrain height
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
const terrainToWorldPosition = (x, y, height) => {
  const localPos = new THREE.Vector3(x, y, height);
  const rotationX = -Math.PI / 2.2;
  localPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), rotationX);
  localPos.add(new THREE.Vector3(0, -1, 0));
  return [localPos.x, localPos.y, localPos.z];
};

// Create realistic dandelion stem geometry
const createStemGeometry = () => {
  const geometry = new THREE.CylinderGeometry(0.02, 0.025, 1.0, 12);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const normalizedY = (y + 0.5) / 1.0;
    const curve = Math.sin(normalizedY * Math.PI) * 0.03;
    positions.setX(i, positions.getX(i) + curve);
  }
  geometry.computeVertexNormals();
  return geometry;
};

// Create realistic dandelion head geometry
const createDandelionHeadGeometry = () => {
  const geometry = new THREE.SphereGeometry(0.18, 20, 20);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    if (y > 0.06) {
      positions.setY(i, y * 0.85);
    }
    if (y < -0.06) {
      positions.setY(i, y * 0.85);
    }
    const noise = (Math.random() - 0.5) * 0.02;
    positions.setX(i, positions.getX(i) + noise);
    positions.setZ(i, positions.getZ(i) + noise);
  }
  geometry.computeVertexNormals();
  return geometry;
};

// Hook to track cursor position in 3D space
const useCursorPosition = () => {
  const { camera } = useThree();
  const cursorPos = useRef(new THREE.Vector3(0, 0, 0));
  const cursorInfluence = useRef(0.0);
  const targetInfluence = useRef(0.0);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const canvas = event.target;
      if (!canvas || canvas.tagName !== 'CANVAS') return;
      
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Raycast to find ground position (terrain is at y = -1, rotated)
      raycaster.setFromCamera(mouse, camera);
      
      // Create a plane at the terrain level
      const planeNormal = new THREE.Vector3(0, 1, 0);
      const planePoint = new THREE.Vector3(0, -1, 0);
      const plane = new THREE.Plane();
      plane.setFromNormalAndCoplanarPoint(planeNormal, planePoint);
      
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);
      
      if (intersectPoint && !isNaN(intersectPoint.x)) {
        cursorPos.current.lerp(intersectPoint, 0.15);
        targetInfluence.current = 1.0;
      }
    };

    const handleMouseLeave = () => {
      targetInfluence.current = 0.0;
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [camera, raycaster, mouse]);

  useFrame(() => {
    cursorInfluence.current += (targetInfluence.current - cursorInfluence.current) * 0.05;
  });

  return { cursorPos: cursorPos.current, cursorInfluence: cursorInfluence.current };
};

export const InteractiveDandelionField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  count = 1000,
  avoidSteepSlopes = true,
  maxSlope = 0.3,
}) => {
  const stemMeshRef = useRef(null);
  const headMeshRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  const { cursorPos, cursorInfluence } = useCursorPosition();

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
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * depth;
      const height = calculateTerrainHeight(x, y, noise2D, heightScale);

      if (avoidSteepSlopes) {
        const sampleDistance = 0.3;
        const h1 = calculateTerrainHeight(x + sampleDistance, y, noise2D, heightScale);
        const h2 = calculateTerrainHeight(x - sampleDistance, y, noise2D, heightScale);
        const h3 = calculateTerrainHeight(x, y + sampleDistance, noise2D, heightScale);
        const h4 = calculateTerrainHeight(x, y - sampleDistance, noise2D, heightScale);

        const slopeX = Math.abs(h1 - h2) / (sampleDistance * 2);
        const slopeY = Math.abs(h3 - h4) / (sampleDistance * 2);
        const maxSlopeValue = Math.max(slopeX, slopeY);

        if (maxSlopeValue > maxSlope) continue;
      }

      const worldPos = terrainToWorldPosition(x, y, height);
      const scale = 0.7 + Math.random() * 0.6;
      const rotation = Math.random() * Math.PI * 2;
      const windOffset = Math.random() * Math.PI * 2;
      const headRotation = Math.random() * Math.PI * 2;

      const offsetX = (Math.random() - 0.5) * 0.15;
      const offsetZ = (Math.random() - 0.5) * 0.15;

      posArray.push(
        worldPos[0] + offsetX,
        worldPos[1] + 0.02,
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
        const y = positions[i * 3 + 1] + 0.5 * scales[i];
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

  // Animate stems and heads with wind and cursor
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
        
        // Base wind sway
        let sway = Math.sin(t * 1.5 + windOffset + x * 0.1) * 0.12;
        let swayZ = Math.cos(t * 1.2 + windOffset + z * 0.1) * 0.08;
        
        // Cursor influence - smooth ripple effect
        if (cursorInfluence > 0.01) {
          const dandelionPos = new THREE.Vector3(x, y, z);
          const dist = dandelionPos.distanceTo(cursorPos);
          const cursorRadius = 6.0;
          
          if (dist < cursorRadius) {
            const falloff = 1.0 - (dist / cursorRadius);
            const cursorDir = new THREE.Vector3()
              .subVectors(dandelionPos, cursorPos)
              .normalize();
            
            // Animated ripple
            const ripple = Math.sin(t * 3.0 - dist * 2.0) * 0.5 + 0.5;
            const cursorSway = falloff * cursorInfluence * ripple * 0.3;
            
            sway += cursorDir.x * cursorSway;
            swayZ += cursorDir.z * cursorSway;
          }
        }
        
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
        
        // Base head rotation
        let headRot = headRotation + t * 0.2;
        
        // Cursor influence on head
        if (cursorInfluence > 0.01) {
          const dandelionPos = new THREE.Vector3(x, y, z);
          const dist = dandelionPos.distanceTo(cursorPos);
          const cursorRadius = 6.0;
          
          if (dist < cursorRadius) {
            const falloff = 1.0 - (dist / cursorRadius);
            const ripple = Math.sin(t * 4.0 - dist * 1.5) * 0.5 + 0.5;
            headRot += falloff * cursorInfluence * ripple * 0.5;
          }
        }
        
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
          color={new THREE.Color().setHSL(120 / 360, 0.75, 0.35)}
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
          color={new THREE.Color(1.0, 1.0, 1.0)}
          emissive={new THREE.Color(1.0, 0.98, 0.95)}
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.0}
        />
      </instancedMesh>
    </group>
  );
};

