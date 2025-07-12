

const Button = () => {
  return (
    <group>
      {/* Button Body */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      {/* Button Top */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </group>
  );
};

export default Button;
