import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Breadboard = () => {
  const { scene } = useGLTF('/models/breadboard.glb');
  const ref = useRef<Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.000;
    }
  });

  return <primitive object={scene} ref={ref} scale={0.4} />;
};

export default Breadboard;