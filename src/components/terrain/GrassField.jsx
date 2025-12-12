import { useMemo, useRef, useEffect } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Enhanced shader material for grass with advanced wind animation
const GrassShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    windStrength: { value: 0.3 },
    windSpeed: { value: 1.2 },
    windFrequency: { value: 0.5 },
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
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying float vHeight;
    varying float vWind;
    varying vec2 vUv;
    varying vec3 vWorldPos;
    
    // Multi-layered wind function for more natural movement
    float windWave(float x, float z, float t) {
      // Create unique offset from position for variation
      float offset = sin(x * 7.3 + z * 11.7) * 50.0;
      
      // Primary wind wave
      float wave1 = sin(t * windSpeed + (x + offset) * windFrequency * 2.0 + (z + offset) * windFrequency * 1.5) * 0.5 + 0.5;
      
      // Secondary wind wave (smaller, faster)
      float wave2 = sin(t * windSpeed * 1.7 + (x + offset) * windFrequency * 3.0 + (z + offset) * windFrequency * 2.0) * 0.3 + 0.5;
      
      // Tertiary wind wave (very small, very fast)
      float wave3 = sin(t * windSpeed * 2.3 + (x + offset) * windFrequency * 5.0) * 0.2 + 0.5;
      
      return (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1);
    }
    
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      
      // Get world position for wind calculation
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;
      
      // Normalize height to 0-1 range (assuming grass blade goes from -height/2 to height/2)
      float normalizedHeight = (position.y + 0.2) / 0.4; // Adjust based on actual blade height
      normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
      
      vHeight = normalizedHeight;
      
      // Calculate wind effect with multiple layers using world position
      float wind = windWave(worldPos.x, worldPos.z, time);
      
      // Wind effect increases with height (top of blade bends more)
      float heightFactor = pow(normalizedHeight, 1.5); // Exponential for more natural bend
      float bendAmount = windStrength * heightFactor * (wind - 0.5) * 2.0;
      
      // Apply wind displacement
      // Wind primarily affects X (sideways), with slight Z component
      vec3 pos = position;
      pos.x += bendAmount * 0.8;
      pos.z += bendAmount * 0.3 * cos(time * windSpeed * 0.5);
      
      // Slight vertical compression at bend points for realism
      pos.y -= abs(bendAmount) * 0.1 * heightFactor;
      
      vWind = wind;
      
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
      
      // Lighting calculation
      vec3 normal = normalize(vNormal);
      float NdotL = max(dot(normal, lightDirection), 0.0);
      
      // Ambient + diffuse lighting
      float lighting = ambientLight + (NdotL * diffuseLight);
      
      // Add slight rim lighting for depth
      vec3 viewDir = normalize(-vPosition);
      float rim = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.0) * 0.2;
      
      color *= (lighting + rim);
      
      // Subtle shadow at the base
      float baseShadow = mix(0.85, 1.0, smoothstep(0.0, 0.2, vHeight));
      color *= baseShadow;
      
      // Alpha for smooth edges (if using transparency)
      float alpha = 1.0;
      
      gl_FragColor = vec4(color, alpha);
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

// Helper function to calculate terrain height at a given position
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

// Create a more detailed and realistic grass blade geometry
const createGrassBladeGeometry = () => {
  const segments = 8; // More segments for smoother curves
  const width = 0.05;
  const height = 0.35;
  
  const geometry = new THREE.PlaneGeometry(width, height, 1, segments);
  const positions = geometry.attributes.position;
  
  // Create curved grass blade with natural shape
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);
    
    // Normalize y to 0-1 range (from -height/2 to height/2)
    const normalizedY = (y + height / 2) / height;
    
    // Create natural curve - wider at base, narrower at top
    const widthVariation = 1.0 - normalizedY * 0.3; // Taper from base to top
    const newX = x * widthVariation;
    
    // Add slight S-curve for natural grass shape
    const curveAmount = Math.pow(normalizedY, 1.8) * 0.08;
    const sCurve = Math.sin(normalizedY * Math.PI * 1.5) * curveAmount;
    
    // Slight forward lean
    const lean = normalizedY * 0.02;
    
    positions.setXYZ(i, newX + sCurve, y, z + lean);
  }
  
  // Compute normals for proper lighting
  geometry.computeVertexNormals();
  
  // Smooth normals for better appearance
  const normals = geometry.attributes.normal;
  for (let i = 0; i < normals.count; i++) {
    const nx = normals.getX(i);
    const ny = normals.getY(i);
    const nz = normals.getZ(i);
    // Slightly adjust normals for better lighting
    normals.setXYZ(i, nx * 0.9, ny, nz * 0.9);
  }
  normals.needsUpdate = true;
  
  return geometry;
};

export const GrassField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  density = 15000, // Much higher density for realistic coverage
  minHeight = 0.15,
  maxHeight = 0.35,
  avoidSteepSlopes = true,
  maxSlope = 0.3,
  windStrength = 0.2,
  windSpeed = 1.5,
}) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  
  // Create base grass blade geometry
  const grassGeometry = useMemo(() => createGrassBladeGeometry(), []);
  
  // Generate grass blade positions and attributes
  const { positions, scales, rotations, randomOffsets, count } = useMemo(() => {
    const posArray = [];
    const scaleArray = [];
    const rotArray = [];
    const offsetArray = [];
    
    const attempts = density * 2;
    let placed = 0;
    
    for (let i = 0; i < attempts && placed < density; i++) {
      // Random position within terrain bounds
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * depth;
      
      // Calculate terrain height
      const height = calculateTerrainHeight(x, y, noise2D, heightScale);
      
      // Avoid steep slopes
      if (avoidSteepSlopes) {
        const sampleDistance = 0.2;
        const h1 = calculateTerrainHeight(x + sampleDistance, y, noise2D, heightScale);
        const h2 = calculateTerrainHeight(x - sampleDistance, y, noise2D, heightScale);
        const h3 = calculateTerrainHeight(x, y + sampleDistance, noise2D, heightScale);
        const h4 = calculateTerrainHeight(x, y - sampleDistance, noise2D, heightScale);
        
        const slopeX = Math.abs(h1 - h2) / (sampleDistance * 2);
        const slopeY = Math.abs(h3 - h4) / (sampleDistance * 2);
        const maxSlopeValue = Math.max(slopeX, slopeY);
        
        if (maxSlopeValue > maxSlope) {
          continue;
        }
      }
      
      // Transform to world position
      const worldPos = terrainToWorldPosition(x, y, height);
      
      // Random scale for variety
      const scale = minHeight + Math.random() * (maxHeight - minHeight);
      
      // Random rotation around Y axis
      const rotation = Math.random() * Math.PI * 2;
      
      // Random offset for wind variation (each blade moves slightly differently)
      const randomOffset = Math.random() * 100.0;
      
      posArray.push(worldPos[0], worldPos[1] + 0.02, worldPos[2]);
      scaleArray.push(scale);
      rotArray.push(rotation);
      offsetArray.push(randomOffset);
      
      placed++;
    }
    
    return {
      positions: new Float32Array(posArray),
      scales: new Float32Array(scaleArray),
      rotations: new Float32Array(rotArray),
      randomOffsets: new Float32Array(offsetArray),
      count: placed,
    };
  }, [width, depth, heightScale, density, minHeight, maxHeight, noise2D, avoidSteepSlopes, maxSlope]);
  
  // Initialize instance matrices
  useEffect(() => {
    if (meshRef.current && count > 0) {
      const matrix = new THREE.Matrix4();
      
      // Set instance matrices
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
  
  // Update shader uniforms for wind animation
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.windStrength.value = windStrength;
      materialRef.current.uniforms.windSpeed.value = windSpeed;
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
