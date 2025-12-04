import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useState, useCallback } from "react";
import { Terrain } from "./Terrain";
import { BusinessmanBillboards } from "./BusinessmanBillboards";
import { FlowerField } from "./FlowerField";
import { GrassField } from "./GrassField";
import * as THREE from "three";

const CameraController = ({
  targetPosition, 
  autoRotate,
  controlsRef 
}) => {
  const targetVec = useRef(new THREE.Vector3());
  const defaultCameraPos = useRef(new THREE.Vector3(0, 5, 12));
  const defaultTarget = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state) => {
    if (targetPosition && controlsRef.current) {
      targetVec.current.set(targetPosition[0], targetPosition[1] + 1, targetPosition[2]);
      controlsRef.current.target.lerp(targetVec.current, 0.03);
      
      const cameraTarget = new THREE.Vector3(
        targetPosition[0],
        targetPosition[1] + 2,
        targetPosition[2] + 5
      );
      state.camera.position.lerp(cameraTarget, 0.02);
      state.camera.updateProjectionMatrix();
    } else if (autoRotate && controlsRef.current) {
      controlsRef.current.target.lerp(defaultTarget.current, 0.03);
      state.camera.position.lerp(defaultCameraPos.current, 0.02);
      state.camera.updateProjectionMatrix();
    }
  });
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={3}
      maxDistance={25}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      autoRotate={autoRotate}
      autoRotateSpeed={0.3}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
};

export const MountainScene = ({ onPersonSelect, onPersonHover }) => {
  const controlsRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [targetPosition, setTargetPosition] = useState(null);

  const handlePersonClick = useCallback((person) => {
    setAutoRotate(false);
    setTargetPosition(person.position);
    onPersonSelect?.(person);
  }, [onPersonSelect]);

  const handlePersonHover = useCallback((person) => {
    onPersonHover?.(person);
  }, [onPersonHover]);

  const handleReset = useCallback(() => {
    setAutoRotate(true);
    setTargetPosition(null);
    onPersonSelect?.(null);
    
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, [onPersonSelect]);

  if (typeof window !== 'undefined') {
    window.__resetTerrainCamera = handleReset;
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#f5f0e8' }}>
      <Canvas
        camera={{
          position: [0, 5, 12],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#f5f0e8"]} />
        <fog attach="fog" args={["#f5f0e8", 10, 35]} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} color="#fffaf0" />
          <directionalLight position={[5, 10, 5]} intensity={0.8} color="#fff8dc" />
          <pointLight position={[0, -3, 0]} intensity={0.4} color="#ffefd5" distance={15} />
          <pointLight position={[-10, 5, -10]} intensity={0.3} color="#fffacd" distance={25} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
          
          <Terrain
            width={25}
            depth={25}
            widthSegments={180}
            depthSegments={180}
            heightScale={0.3}
            wireframe={true}
          />
          
          <GrassField
            width={25}
            depth={25}
            heightScale={0.3}
            density={6000}
            minHeight={0.12}
            maxHeight={0.28}
          />
          
          <FlowerField
            width={25}
            depth={25}
            heightScale={0.3}
            count={150}
            minScale={0.15}
            maxScale={0.35}
          />
          
          <BusinessmanBillboards 
            onPersonClick={handlePersonClick} 
            onPersonHover={handlePersonHover}
          />
          
          <CameraController 
            targetPosition={targetPosition}
            autoRotate={autoRotate}
            controlsRef={controlsRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

