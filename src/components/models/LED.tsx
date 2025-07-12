import * as THREE from 'three';

const LED = () => {
  return (
    <group>
      {/* LED Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      {/* LED Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0} />
      </mesh>
    </group>
  );
};

export default LED;
