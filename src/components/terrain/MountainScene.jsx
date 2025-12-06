import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useRef, useState, useCallback } from "react";
import { TileTerrain } from "./TileTerrain";
import { BusinessmanBillboards } from "./BusinessmanBillboards";
import { ShaderGrassField } from "./ShaderGrassField";
import { InteractiveDandelionField } from "./InteractiveDandelionField";
import { Sky } from "./Sky";
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
    <div style={{ position: 'absolute', inset: 0, background: '#1A5AA6' }}>
      <Canvas
        camera={{
          position: [0, 5, 12],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: false }}
        shadows
      >
        <fog attach="fog" args={["#FFE4B5", 15, 40]} />
        
        <Suspense fallback={null}>
          <Sky radius={500} cloudOpacity={0.5} />
          
          <ambientLight intensity={0.6} color="#FFE4B5" />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={1.4} 
            color="#FFD700"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <directionalLight position={[-5, 10, -5]} intensity={0.5} color="#FFA500" />
          <pointLight position={[0, 8, 0]} intensity={0.6} color="#FFD700" distance={30} />
          
          <TileTerrain
            width={25}
            depth={25}
            widthSegments={180}
            depthSegments={180}
            heightScale={0.3}
            wireframe={false}
          />
          
          <ShaderGrassField
            width={25}
            depth={25}
            heightScale={0.3}
            bladeCount={100000}
            bladeWidth={0.1}
            bladeHeight={0.8}
            bladeHeightVariation={0.6}
            avoidSteepSlopes={true}
            maxSlope={0.3}
          />
          
          <InteractiveDandelionField
            width={25}
            depth={25}
            heightScale={0.3}
            count={1000}
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

