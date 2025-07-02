import { useGLTF } from '@react-three/drei';
import { forwardRef } from 'react';

const Breadboard = forwardRef((props, ref) => {
  const { scene } = useGLTF('/models/breadboard.glb');

  return (
    <primitive
      object={scene}
      ref={ref} // 👈 Forward the reference so it can be raycasted
      scale={0.4}
      {...props}
    />
  );
});

export default Breadboard;