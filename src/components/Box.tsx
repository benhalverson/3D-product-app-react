/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const Box = (props: ThreeElements["mesh"]) => {
	const meshRef = useRef<THREE.Mesh>(null!);
	const [hovered, setHovered] = useState(false);
	const [active, setActive] = useState(false);

	useFrame((state, delta) => (meshRef.current.rotation.x += 0.01));

	return (
		<mesh
			{...props}
			ref={meshRef}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHovered(true)}
			onPointerOut={(event) => setHovered(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "red" : "orange"} />
		</mesh>
	);
};

export default Box;
