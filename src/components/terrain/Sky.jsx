import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Vertex shader for sky
const skyVertexShader = `
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment shader for sky gradient with clouds
const skyFragmentShader = `
uniform vec3 topColor;
uniform vec3 horizonColor;
uniform vec3 bottomColor;
uniform sampler2D cloudTexture;
uniform float cloudOpacity;
uniform float time;

varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  // Calculate vertical position (0 = bottom, 1 = top)
  float y = normalize(vWorldPosition).y;
  float normalizedY = (y + 1.0) * 0.5; // Convert from -1 to 1 range to 0 to 1
  
  // Create gradient from top (blue) to horizon (orange/yellow) to bottom (warm)
  vec3 color;
  if (normalizedY > 0.5) {
    // Upper half: blue to orange/yellow
    float t = (normalizedY - 0.5) * 2.0;
    color = mix(horizonColor, topColor, t);
  } else {
    // Lower half: orange/yellow to warm bottom
    float t = normalizedY * 2.0;
    color = mix(bottomColor, horizonColor, t);
  }
  
  // Add clouds with animated UV
  vec2 cloudUV = vUv;
  cloudUV.x += time * 0.0001;
  cloudUV.y += time * 0.00005;
  vec4 cloudColor = texture2D(cloudTexture, cloudUV);
  
  // Mix sky color with clouds
  float cloudFactor = cloudColor.r * cloudOpacity;
  color = mix(color, cloudColor.rgb, cloudFactor * 0.6);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export const Sky = ({ 
  radius = 500,
  cloudTexturePath = "/cloud.jpg",
  cloudOpacity = 0.4 
}) => {
  const meshRef = useRef(null);
  const cloudTexture = useTexture(cloudTexturePath);
  cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  
  // Sky colors matching the dandelion field image
  // Top: Deep blue (RGB: 0.13, 0.35, 0.65) - darker blue
  const topColor = useMemo(() => new THREE.Vector3(0.13, 0.35, 0.65), []);
  // Horizon: Warm orange/yellow (RGB: 1.0, 0.65, 0.2) - vibrant sunset colors
  const horizonColor = useMemo(() => new THREE.Vector3(1.0, 0.65, 0.2), []);
  // Bottom: Warm cream/yellow (for below horizon)
  const bottomColor = useMemo(() => new THREE.Vector3(1.0, 0.85, 0.6), []);
  
  const skyGeometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, 32, 32);
  }, [radius]);
  
  const skyMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: topColor },
        horizonColor: { value: horizonColor },
        bottomColor: { value: bottomColor },
        cloudTexture: { value: cloudTexture },
        cloudOpacity: { value: cloudOpacity },
        time: { value: 0 }
      },
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      side: THREE.BackSide, // Render inside the sphere
      depthWrite: false
    });
  }, [topColor, horizonColor, bottomColor, cloudTexture, cloudOpacity]);
  
  // Animate cloud movement
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime * 1000;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={skyGeometry} material={skyMaterial} />
  );
};

