import { useLoader } from '@react-three/fiber';
import React, { useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
// import { STLLoader } from 'three-stdlib';


const STLModel: React.FC<{ url: string }> = ({ url }) => {
	const mesh = useRef<THREE.Mesh>(null!);
  const geometry = useLoader(STLLoader, url);
	return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={[1, 1, 1]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color={'gray'} />
    </mesh>
  )
};

export default STLModel;
