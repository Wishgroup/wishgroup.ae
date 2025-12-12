import { useMemo, useRef, useEffect } from "react";
import { useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Enhanced shader material for grass with cursor-responsive wind
const GrassShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    windStrength: { value: 0.3 },
    windSpeed: { value: 1.2 },
    windFrequency: { value: 0.5 },
    cursorPosition: { value: new THREE.Vector3(0, 0, 0) },
    cursorInfluence: { value: 0.0 },
    cursorRadius: { value: 5.0 },
    grassColor: { value: new THREE.Color(0x986611) }, // Golden brown base color
    grassColorVariation: { value: 0.15 },
    lightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.3).normalize() },
    ambientLight: { value: 0.5 },
    diffuseLight: { value: 0.8 },
  },
  vertexShader: `
    uniform float time;
    uniform float windStrength;
    uniform float windSpeed;
    uniform float windFrequency;
    uniform vec3 cursorPosition;
    uniform float cursorInfluence;
    uniform float cursorRadius;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vHeight;
    varying float vWind;
    varying vec2 vUv;
    varying vec3 vWorldPos;
    
    // Multi-layered wind function for more natural movement
    float windWave(float x, float z, float t) {
      float offset = sin(x * 7.3 + z * 11.7) * 50.0;
      float wave1 = sin(t * windSpeed + (x + offset) * windFrequency * 2.0 + (z + offset) * windFrequency * 1.5) * 0.5 + 0.5;
      float wave2 = sin(t * windSpeed * 1.7 + (x + offset) * windFrequency * 3.0 + (z + offset) * windFrequency * 2.0) * 0.3 + 0.5;
      float wave3 = sin(t * windSpeed * 2.3 + (x + offset) * windFrequency * 5.0) * 0.2 + 0.5;
      return (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1);
    }
    
    // Cursor influence function - creates ripple effect
    float cursorWindEffect(vec3 worldPos, vec3 cursorPos, float influence, float radius) {
      float dist = distance(worldPos.xz, cursorPos.xz);
      if (dist > radius) return 0.0;
      
      // Smooth falloff
      float falloff = 1.0 - smoothstep(0.0, radius, dist);
      
      // Direction from cursor to grass
      vec2 dir = normalize(worldPos.xz - cursorPos.xz);
      
      // Animated ripple effect
      float ripple = sin(time * 3.0 - dist * 2.0) * 0.5 + 0.5;
      
      return falloff * influence * ripple * 0.5;
    }
    
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      
      float normalizedHeight = (position.y + 0.2) / 0.4;
      normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
      vHeight = normalizedHeight;
      
      // Base wind effect
      float wind = windWave(worldPos.x, worldPos.z, time);
      
      // Cursor wind effect
      float cursorWind = cursorWindEffect(worldPos.xyz, cursorPosition, cursorInfluence, cursorRadius);
      
      // Combine wind effects
      float combinedWind = wind + cursorWind;
      float heightFactor = pow(normalizedHeight, 1.5);
      float bendAmount = windStrength * heightFactor * (combinedWind - 0.5) * 2.0;
      
      // Random in/out bending (forward/backward) - varies per blade
      float randomSeed = sin(worldPos.x * 12.9898 + worldPos.z * 78.233) * 43758.5453;
      float inOutBend = sin(time * windSpeed * 0.8 + randomSeed) * 0.4 + 0.6;
      float inOutAmount = windStrength * heightFactor * (inOutBend - 0.5) * 1.5;
      
      // Apply wind displacement with smooth easing
      vec3 pos = position;
      // Left/right bending
      pos.x += bendAmount * 0.8;
      // In/out bending (forward/backward) - random per blade
      pos.z += inOutAmount * 0.6 + bendAmount * 0.3 * cos(time * windSpeed * 0.5);
      
      // Additional cursor-based displacement
      if (cursorInfluence > 0.0) {
        float dist = distance(worldPos.xz, cursorPosition.xz);
        if (dist < cursorRadius) {
          vec2 cursorDir = normalize(worldPos.xz - cursorPosition.xz);
          float cursorBend = (1.0 - dist / cursorRadius) * cursorInfluence * heightFactor;
          pos.x += cursorDir.x * cursorBend * 0.5;
          pos.z += cursorDir.y * cursorBend * 0.5;
        }
      }
      
      pos.y -= abs(bendAmount) * 0.1 * heightFactor;
      vWind = combinedWind;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 grassColor;
    uniform float grassColorVariation;
    uniform vec3 lightDirection;
    uniform float ambientLight;
    uniform float diffuseLight;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vHeight;
    varying float vWind;
    varying vec2 vUv;
    varying vec3 vWorldPos;
    
    void main() {
      // New grass color palette (converted from hex to normalized RGB)
      // #62430c, #986611, #342a0e, #dd9a28, #f8e69f
      vec3 color1 = vec3(0.384, 0.263, 0.047);  // #62430c - dark brown
      vec3 color2 = vec3(0.596, 0.4, 0.067);    // #986611 - golden brown
      vec3 color3 = vec3(0.204, 0.165, 0.055);  // #342a0e - very dark brown
      vec3 color4 = vec3(0.867, 0.604, 0.157);  // #dd9a28 - golden yellow
      vec3 color5 = vec3(0.973, 0.902, 0.624);  // #f8e69f - light yellow/cream
      
      // Base color variation based on world position
      float positionVariation = sin(vWorldPos.x * 8.0 + vWorldPos.z * 8.0) * 0.5 + 0.5;
      
      // Height-based color selection (darker at base, lighter at top)
      vec3 color;
      if (vHeight < 0.2) {
        // Base - use darkest colors
        float t = vHeight / 0.2;
        color = mix(color3, color1, t);
      } else if (vHeight < 0.6) {
        // Middle - use medium colors
        float t = (vHeight - 0.2) / 0.4;
        color = mix(color1, color2, t);
      } else if (vHeight < 0.85) {
        // Upper middle - transition to golden
        float t = (vHeight - 0.6) / 0.25;
        color = mix(color2, color4, t);
      } else {
        // Tip - use lightest colors
        float t = (vHeight - 0.85) / 0.15;
        color = mix(color4, color5, t);
      }
      
      // Add position-based variation for natural look
      float posVar = sin(vWorldPos.x * 6.0 + vWorldPos.z * 6.0) * 0.15;
      color = mix(color, mix(color2, color4, 0.5), posVar);
      
      vec3 normal = normalize(vNormal);
      float NdotL = max(dot(normal, lightDirection), 0.0);
      float lighting = ambientLight + (NdotL * diffuseLight);
      
      vec3 viewDir = normalize(-vPosition);
      float rim = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0) * 0.2;
      
      color *= (lighting + rim);
      float baseShadow = mix(0.85, 1.0, smoothstep(0.0, 0.2, vHeight));
      color *= baseShadow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

// Extend Three.js with custom shader material
class GrassMaterial extends THREE.ShaderMaterial {
  constructor() {
    super(GrassShaderMaterial);
  }
}

extend({ GrassMaterial });

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

// Create grass blade geometry
const createGrassBladeGeometry = () => {
  const segments = 8;
  const width = 0.05;
  const height = 0.35;
  
  const geometry = new THREE.PlaneGeometry(width, height, 1, segments);
  const positions = geometry.attributes.position;
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    const normalizedY = (y + height / 2) / height;
    const widthVariation = 1.0 - normalizedY * 0.3;
    const newX = x * widthVariation;
    
    const curveAmount = Math.pow(normalizedY, 1.8) * 0.08;
    const sCurve = Math.sin(normalizedY * Math.PI * 1.5) * curveAmount;
    const lean = normalizedY * 0.02;
    
    positions.setXYZ(i, newX + sCurve, y, z + lean);
  }
  
  geometry.computeVertexNormals();
  const normals = geometry.attributes.normal;
  for (let i = 0; i < normals.count; i++) {
    const nx = normals.getX(i);
    const ny = normals.getY(i);
    const nz = normals.getZ(i);
    normals.setXYZ(i, nx * 0.9, ny, nz * 0.9);
  }
  normals.needsUpdate = true;
  
  return geometry;
};

// Hook to track cursor position in 3D space
const useCursorPosition = () => {
  const { camera, size } = useThree();
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
        cursorPos.current.lerp(intersectPoint, 0.15); // Smooth lerp
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
    // Smooth influence interpolation
    cursorInfluence.current += (targetInfluence.current - cursorInfluence.current) * 0.05;
  });

  return { cursorPos: cursorPos.current, cursorInfluence: cursorInfluence.current };
};

export const InteractiveGrassField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  density = 35000, // Increased density significantly
  minHeight = 0.18,
  maxHeight = 0.38,
  avoidSteepSlopes = true,
  maxSlope = 0.3,
  windStrength = 0.25,
  windSpeed = 1.5,
}) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  const clusterNoise = useMemo(() => createNoise2D(), []); // For uneven clustering
  const { cursorPos, cursorInfluence } = useCursorPosition();
  
  const grassGeometry = useMemo(() => createGrassBladeGeometry(), []);
  
  const { positions, scales, rotations, count } = useMemo(() => {
    const posArray = [];
    const scaleArray = [];
    const rotArray = [];
    
    const attempts = density * 3; // More attempts for uneven spacing
    let placed = 0;
    
    for (let i = 0; i < attempts && placed < density; i++) {
      // Create uneven spacing using noise-based clustering
      // First get a random position
      let x = (Math.random() - 0.5) * width;
      let y = (Math.random() - 0.5) * depth;
      
      // Use noise to create clusters - some areas denser, some sparser
      const clusterValue = clusterNoise(x * 0.3, y * 0.3);
      const clusterThreshold = 0.2; // Adjust for clustering intensity
      
      // Skip positions in sparse areas (below threshold)
      if (clusterValue < clusterThreshold && Math.random() > 0.3) {
        continue;
      }
      
      // Add random jitter for more natural uneven spacing
      x += (Math.random() - 0.5) * 0.4;
      y += (Math.random() - 0.5) * 0.4;
      
      // Ensure still within bounds
      if (Math.abs(x) > width / 2 || Math.abs(y) > depth / 2) {
        continue;
      }
      
      const height = calculateTerrainHeight(x, y, noise2D, heightScale);
      
      if (avoidSteepSlopes) {
        const sampleDistance = 0.2;
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
      const scale = minHeight + Math.random() * (maxHeight - minHeight);
      const rotation = Math.random() * Math.PI * 2;
      
      posArray.push(worldPos[0], worldPos[1] + 0.02, worldPos[2]);
      scaleArray.push(scale);
      rotArray.push(rotation);
      
      placed++;
    }
    
    return {
      positions: new Float32Array(posArray),
      scales: new Float32Array(scaleArray),
      rotations: new Float32Array(rotArray),
      count: placed,
    };
  }, [width, depth, heightScale, density, minHeight, maxHeight, noise2D, clusterNoise, avoidSteepSlopes, maxSlope]);
  
  useEffect(() => {
    if (meshRef.current && count > 0) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const scale = scales[i];
        const rotation = rotations[i];
        
        matrix.makeRotationY(rotation);
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(scale, scale, scale));
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [meshRef, count, positions, scales, rotations]);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.windStrength.value = windStrength;
      materialRef.current.uniforms.windSpeed.value = windSpeed;
      materialRef.current.uniforms.cursorPosition.value.copy(cursorPos);
      materialRef.current.uniforms.cursorInfluence.value = cursorInfluence;
    }
  });
  
  if (count === 0) return null;
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[grassGeometry, null, count]}
      frustumCulled={true}
      renderOrder={1}
    >
      <grassMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        transparent={false}
        depthWrite={true}
        depthTest={true}
      />
    </instancedMesh>
  );
};

