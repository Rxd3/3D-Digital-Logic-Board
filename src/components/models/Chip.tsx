import { useGLTF } from '@react-three/drei';

const Chip = () => {
  // useGLTF loads the 3D model
    const { scene } = useGLTF('/models/chip.glb');

  // The primitive object is used to render the loaded scene.
  // .clone() is important to ensure multiple instances of the chip don't interfere with each other.
  // You may need to adjust the scale and position to fit your model perfectly on the breadboard.
  // The footprint is 7 pins long (6 * standardSpacing) and spans 3 units on the z-axis.
  // We apply a positional offset to center the model over its footprint.
  const xOffset = (6 * 0.1) / 2; // Half of the footprint length
  const zOffset = (3 * 0.1) / 2; // Half of the footprint width
  return <primitive object={scene.clone()} scale={0.12} position={[xOffset - 0.03, 0.04, zOffset - 0.02]} />;
};

// Preload the model for a smoother experience
useGLTF.preload('/models/chip.glb');

export default Chip;
