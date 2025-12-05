import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Vertex shader
const vertexShader = `
varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;
uniform float iTime;

void main() {
  vUv = uv;
  cloudUV = uv;
  vColor = color;
  vec3 cpos = position;

  float waveSize = 10.0;
  float tipDistance = 0.3;
  float centerDistance = 0.1;

  if (color.x > 0.6) {
    cpos.x += sin((iTime / 500.0) + (uv.x * waveSize)) * tipDistance;
  } else if (color.x > 0.0) {
    cpos.x += sin((iTime / 500.0) + (uv.x * waveSize)) * centerDistance;
  }

  cloudUV.x += iTime / 20000.0;
  cloudUV.y += iTime / 10000.0;

  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(cpos, 1.0);
  gl_Position = mvPosition;
}
`;

// Fragment shader
const fragmentShader = `
uniform sampler2D textures[2];
varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;

void main() {
  float contrast = 1.8;
  float brightness = 0.15;
  vec3 color = texture2D(textures[0], vUv).rgb * contrast;
  color = color + vec3(brightness, brightness, brightness);
  // Enhance green channel for vibrant grass
  color.g = min(color.g * 1.2, 1.0);
  // Reduce cloud mixing for more vibrant grass
  color = mix(color, texture2D(textures[1], cloudUV).rgb, 0.25);
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.0;
}
`;

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

// Convert range helper
function convertRange(val, oldMin, oldMax, newMin, newMax) {
  return (((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

// Generate a single grass blade
function generateBlade(center, vArrOffset, uv, bladeWidth, bladeHeight, bladeHeightVariation) {
  const MID_WIDTH = bladeWidth * 0.5;
  const TIP_OFFSET = 0.1;
  const height = bladeHeight + (Math.random() * bladeHeightVariation);

  const yaw = Math.random() * Math.PI * 2;
  const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
  const tipBend = Math.random() * Math.PI * 2;
  const tipBendUnitVec = new THREE.Vector3(Math.sin(tipBend), 0, -Math.cos(tipBend));

  // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
  const bl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((bladeWidth / 2) * 1));
  const br = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((bladeWidth / 2) * -1));
  const tl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1));
  const tr = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1));
  const tc = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET));

  tl.y += height / 2;
  tr.y += height / 2;
  tc.y += height;

  // Vertex Colors (used for wind animation in shader)
  const black = [0, 0, 0];
  const gray = [0.5, 0.5, 0.5];
  const white = [1.0, 1.0, 1.0];

  const verts = [
    { pos: bl.toArray(), uv: uv, color: black },
    { pos: br.toArray(), uv: uv, color: black },
    { pos: tr.toArray(), uv: uv, color: gray },
    { pos: tl.toArray(), uv: uv, color: gray },
    { pos: tc.toArray(), uv: uv, color: white }
  ];

  const indices = [
    vArrOffset,
    vArrOffset + 1,
    vArrOffset + 2,
    vArrOffset + 2,
    vArrOffset + 4,
    vArrOffset + 3,
    vArrOffset + 3,
    vArrOffset,
    vArrOffset + 2
  ];

  return { verts, indices };
}

export const ShaderGrassField = ({
  width = 25,
  depth = 25,
  heightScale = 0.3,
  bladeCount = 100000,
  bladeWidth = 0.1,
  bladeHeight = 0.8,
  bladeHeightVariation = 0.6,
  grassTexturePath = "/grass.jpg",
  cloudTexturePath = "/cloud.jpg",
  avoidSteepSlopes = true,
  maxSlope = 0.3,
}) => {
  const meshRef = useRef(null);
  const noise2D = useMemo(() => createNoise2D(), []);
  
  // Load textures
  const grassTexture = useTexture(grassTexturePath);
  const cloudTexture = useTexture(cloudTexturePath);
  cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;

  // Generate grass field geometry
  const geometry = useMemo(() => {
    const positions = [];
    const uvs = [];
    const indices = [];
    const colors = [];
    
    const VERTEX_COUNT = 5;
    const surfaceMin = width / 2 * -1;
    const surfaceMax = width / 2;
    const radius = width / 2;

    let placed = 0;
    const attempts = bladeCount * 2;

    for (let i = 0; i < attempts && placed < bladeCount; i++) {
      // Generate position in circular distribution
      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      // Calculate terrain height at this position
      const terrainHeight = calculateTerrainHeight(x, y, noise2D, heightScale);

      // Optional: Avoid steep slopes
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
          continue;
        }
      }

      // Transform to world position
      const worldPos = terrainToWorldPosition(x, y, terrainHeight);
      const center = new THREE.Vector3(worldPos[0], worldPos[1] + 0.02, worldPos[2]);

      const uv = [
        convertRange(x, surfaceMin, surfaceMax, 0, 1),
        convertRange(y, surfaceMin, surfaceMax, 0, 1)
      ];

      const blade = generateBlade(
        center,
        placed * VERTEX_COUNT,
        uv,
        bladeWidth,
        bladeHeight,
        bladeHeightVariation
      );

      blade.verts.forEach(vert => {
        positions.push(...vert.pos);
        uvs.push(...vert.uv);
        colors.push(...vert.color);
      });
      blade.indices.forEach(indice => indices.push(indice));

      placed++;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    return geom;
  }, [width, depth, heightScale, bladeCount, bladeWidth, bladeHeight, bladeHeightVariation, noise2D, avoidSteepSlopes, maxSlope]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        textures: { value: [grassTexture, cloudTexture] },
        iTime: { value: 0.0 }
      },
      vertexShader,
      fragmentShader,
      vertexColors: true,
      side: THREE.DoubleSide
    });
  }, [grassTexture, cloudTexture]);

  // Update time uniform for animation
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.iTime.value = state.clock.elapsedTime * 1000; // Convert to milliseconds
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} />
  );
};

