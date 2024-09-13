import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { OrbitControls, Environment, useTexture, MeshPortalMaterial, RoundedBox, Text, CameraControls, useCursor, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { Model1 } from './Model1';
import { Model2 } from './Model2';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from "maath";

// const Model1 = lazy(() => import('./Model1'));
// const Model2 = lazy(() => import('./Model2'));

const Saleproduct = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      const activeObject = scene.getObjectByName(active);
      if (activeObject) {
        activeObject.getWorldPosition(targetPosition);
        controlRef.current.setLookAt(
          0, 0, 5,
          targetPosition.x, targetPosition.y, targetPosition.z,
          true
        );
      }
    } else {
      controlRef.current.setLookAt(
        0, 0, 8,
        0, 0, 0,
        true
      );
    }
  }, [active, scene]);

  return (
    <>
      <ambientLight intensity={0.9} />
      <Environment preset="sunset" />
      <CameraControls ref={controlRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6}  enableZoom={true} 
          minDistance={3} 
          maxDistance={10} />

      <ReflectiveSurface />

      <ClothStages 
        texture={"Texture/p1.jpg"} 
        name="model1" 
        color="#df8d53" 
        active={active} 
        setActive={setActive}
        hovered={hovered} 
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
          <Model1 hovered={hovered === "model1"} />
        </Suspense>
      </ClothStages>

      <ClothStages 
        texture={"Texture/p2.jpg"} 
        name="model2" 
        color="#df8d53" 
        position-x={-2.5} 
        rotation-y={Math.PI / 8}
        active={active} 
        setActive={setActive} 
        hovered={hovered} 
        setHovered={setHovered}
      >
        <Suspense fallback={null}>
        <Model2 hovered={hovered === "model2"} />
        </Suspense>
      </ClothStages>
    </>
  );
};

export default Saleproduct;

const ClothStages = ({ children, name, texture, color, active, setActive, hovered, setHovered, ...props }) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (portalMaterial.current) {
      easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
    }
  });

  return (
    <group {...props}>
      <Text fontSize={0.3} position={[0, -1.3, 0.051]} anchorY={"bottom"}>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        args={[2, 3, 0.1]} 
        name={name}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide} receiveShadow>
          <ambientLight intensity={2} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const ReflectiveSurface = () => {
  const [floorTexture] = useTexture(['/texture/p1.jpg']);
  return (
    <Plane
      args={[20, 15]}
      rotation-x={-Math.PI / 2}
      position={[0, -1.6, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        map={floorTexture}
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={0.5}
      />
    </Plane>
  );
};
