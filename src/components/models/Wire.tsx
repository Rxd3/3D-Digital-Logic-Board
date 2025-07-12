

const Wire = () => {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.01, 0.01, 0.1]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
    </group>
  );
};

export default Wire;
