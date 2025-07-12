import * as THREE from 'three';

const Resistor = () => {
  return (
    <group>
      {/* Resistor Body */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
        <meshStandardMaterial color="#d2b48c" />
      </mesh>
      {/* Resistor Legs */}
      <mesh position={[0, 0.05, -0.07]}>
        <boxGeometry args={[0.005, 0.005, 0.04]} />
        <meshStandardMaterial color="#808080" />
      </mesh>
      <mesh position={[0, 0.05, 0.07]}>
        <boxGeometry args={[0.005, 0.005, 0.04]} />
        <meshStandardMaterial color="#808080" />
      </mesh>
    </group>
  );
};

export default Resistor;
