import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import Breadboard from './Breadboard';
import { useRef } from 'react';

const ThreeScene = () => {
  const controlsRef = useRef<any>(null); // Reference to OrbitControls

  const smallButtonStyle: React.CSSProperties = {
    padding: '10px',
    background: '#434b61',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    transition: 'background 0.2s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #141E39, #060a13)',
        overflow: 'hidden',
      }}
    >
      {/* ✅ Bottom-center UI buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Left: Reset View */}
        <button
          onClick={() => controlsRef.current?.reset()}
          style={smallButtonStyle}
        >
          🔄
        </button>

        {/* Center: Play Button */}
        <button
          style={{
            padding: '14px 24px',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            fontWeight: 'bold',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'background 0.2s',
          }}
        >
          ▶️
        </button>

        {/* Right: Placeholder Button */}
        <button
          style={smallButtonStyle}
          onClick={() => {}}
        >
          🌀
        </button>
      </div>

      <Canvas
        shadows
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 3, 5], fov: 60 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 3]} castShadow />
        <gridHelper args={[40, 40, '#444', '#888']} position={[0, -0.18, 0]} />

        <Breadboard />

        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={0.7}
          zoomSpeed={0.7}
          panSpeed={0.5}
          minPolarAngle={-0.1}
          maxPolarAngle={Math.PI / 2.1}
        />

        <ContactShadows
          position={[0, -0.19, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
