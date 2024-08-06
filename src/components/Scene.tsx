import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import STLModel from './STLModel';
// import STL2Viewer from './STL2';

const Scene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight/>
      <pointLight position={[0, 0, 0]} />
      {/* <STLModel url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/blender_rims.stl" /> */}
      {/* <STL2Viewer url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/Front_rim_2wd_x2.stl" /> */}
      <STLModel url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/blender_rims.stl" />
      {/* <STLModel url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/Front_rim_2wd_x2.stl" /> */}
      {/* <STLModel url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/Front_rim_2wd_x2.stl" /> */}
      {/* <STLModel url="https://pub-0ec69c7d5c064de8b57f5d594f07bc02.r2.dev/Front%20rim.STL" /> */}
      <gridHelper args={[250, 250]} position={[0, 0, 0]} />
      <axesHelper args={[50]} />

      <OrbitControls />
    </Canvas>
  );
};

export default Scene;