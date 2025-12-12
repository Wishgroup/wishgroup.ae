import { useMemo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export const StaticSkyBackground = ({ 
  radius = 1000,
  imagePath = "/Terrain/bg_terrain.jpg"
}) => {
  const { scene } = useThree();
  const texture = useTexture(imagePath);
  
  useEffect(() => {
    // Configure texture for skybox
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.flipY = false;
    
    // Set scene background as primary method
    scene.background = texture;
    
    return () => {
      if (scene.background === texture) {
        scene.background = null;
      }
    };
  }, [texture, scene]);
  
  // Also create a mesh as backup (in case background doesn't work in some cases)
  const skyGeometry = useMemo(() => {
    return new THREE.SphereGeometry(radius, 64, 64);
  }, [radius]);
  
  const skyMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false
    });
  }, [texture]);
  
  return (
    <mesh 
      geometry={skyGeometry} 
      material={skyMaterial}
      renderOrder={-1000}
    />
  );
};

