import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

export const Terrain = ({
  width = 20,
  depth = 20,
  widthSegments = 200,
  depthSegments = 200,
  heightScale = 1.5,
  wireframe = false,
}) => {
  const meshRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  
  const { geometry, colors } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, depth, widthSegments, depthSegments);
    const positions = geo.attributes.position;
    const colorArray = new Float32Array(positions.count * 3);
    
    // Color palette for grassy cream field
    const deepColor = new THREE.Color().setHSL(80 / 360, 0.4, 0.55);
    const lowColor = new THREE.Color().setHSL(75 / 360, 0.45, 0.6);
    const midColor = new THREE.Color().setHSL(70 / 360, 0.35, 0.7);
    const highColor = new THREE.Color().setHSL(55 / 360, 0.4, 0.8);
    const peakColor = new THREE.Color().setHSL(45 / 360, 0.35, 0.88);
    
    let minHeight = Infinity;
    let maxHeight = -Infinity;
    
    // First pass: calculate heights and find min/max
    const heights = [];
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Multi-octave noise for more natural terrain
      let height = 0;
      let amplitude = 1;
      let frequency = 0.15;
      
      for (let octave = 0; octave < 6; octave++) {
        height += noise2D(x * frequency, y * frequency) * amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      
      height *= heightScale;
      heights.push(height);
      
      minHeight = Math.min(minHeight, height);
      maxHeight = Math.max(maxHeight, height);
    }
    
    // Second pass: set heights and colors
    for (let i = 0; i < positions.count; i++) {
      const height = heights[i];
      positions.setZ(i, height);
      
      // Normalize height for color
      const normalizedHeight = (height - minHeight) / (maxHeight - minHeight);
      
      // Color based on elevation
      let color;
      if (normalizedHeight < 0.2) {
        color = deepColor.clone().lerp(lowColor, normalizedHeight / 0.2);
      } else if (normalizedHeight < 0.4) {
        color = lowColor.clone().lerp(midColor, (normalizedHeight - 0.2) / 0.2);
      } else if (normalizedHeight < 0.7) {
        color = midColor.clone().lerp(highColor, (normalizedHeight - 0.4) / 0.3);
      } else {
        color = highColor.clone().lerp(peakColor, (normalizedHeight - 0.7) / 0.3);
      }
      
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }
    
    geo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    geo.computeVertexNormals();
    
    return { geometry: geo, colors: colorArray };
  }, [width, depth, widthSegments, depthSegments, heightScale, noise2D]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1, 0]}>
      <meshStandardMaterial
        vertexColors
        wireframe={wireframe}
        side={THREE.DoubleSide}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

