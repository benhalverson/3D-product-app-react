import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';
import { OrbitControls, TransformControls } from 'three-stdlib';
import { extend } from '@react-three/fiber'

extend({ OrbitControls, TransformControls })


const STL2Viewer: React.FC<{ url: string }> = ({url}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lights
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

  //  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //   directionalLight.position.set(1, 1, 1).normalize();
  //   scene.add(directionalLight);

// OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Load STL file
    const loader = new STLLoader();
    loader.load(`${url}`, (geometry) => {
      // Create material
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, specular: 0x111111, shininess: 200 });

      // Create mesh
      const mesh = new THREE.Mesh(geometry, material);

            // Compute bounding box
      geometry.computeBoundingBox();
      const boundingBox = geometry.boundingBox!;
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      // Center the mesh
      mesh.geometry.translate(-center.x, -center.y, -center.z);

      // Add mesh to scene
      scene.add(mesh);

      // Add bounding box helper
      const boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
      scene.add(boxHelper);

      // Display dimensions
      const dimensions = `Dimensions: ${(boundingBox.max.x - boundingBox.min.x).toFixed(2)} x ${(boundingBox.max.y - boundingBox.min.y).toFixed(2)} x ${(boundingBox.max.z - boundingBox.min.z).toFixed(2)} mm`;
      if (dimensionsRef.current) {
        dimensionsRef.current.innerText = dimensions;
      }
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, [url]);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100%', height: '100vh', backgroundColor: 'green' }} />
      <div ref={dimensionsRef} style={{ position: 'absolute', top: 10, left: 10, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }} />
    </div>
  );
};

export default STL2Viewer;