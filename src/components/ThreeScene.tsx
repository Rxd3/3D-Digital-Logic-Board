import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import Breadboard from './Breadboard';
import { useRef, useState } from 'react';
import {
  FaPlay,
  FaRedo,
  FaMicrochip,
  FaBolt,
  FaLightbulb,
  FaWaveSquare,
} from 'react-icons/fa';
import * as THREE from 'three';

// List of component types shown in the toolbar
const components = [
  { id: 'led', label: 'LED', icon: <FaLightbulb /> },
  { id: 'resistor', label: 'Resistor', icon: <FaWaveSquare /> },
  { id: 'chip', label: 'Chip', icon: <FaMicrochip /> },
  { id: 'wire', label: 'Wire', icon: <FaBolt /> },
  { id: 'button', label: 'Button', icon: <FaBolt /> },
];

// Plane for detecting placement location
const PlacementPlane = ({ onPlace }: { onPlace: (pos: THREE.Vector3) => void }) => {
  const { camera, mouse, raycaster } = useThree();
  const [hovered, setHovered] = useState<THREE.Vector3 | null>(null);
  const planeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!planeRef.current) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(planeRef.current);
    if (intersects.length > 0) {
      const point = intersects[0].point.clone();
      // Snap to 0.1 grid and clamp inside breadboard size
      point.x = Math.round(point.x * 10) / 10;
      point.z = Math.round(point.z * 10) / 10;
      point.x = Math.max(-10, Math.min(10, point.x));
      point.z = Math.max(-4, Math.min(4, point.z));
      point.y = 0;
      setHovered(point);
    } else {
      setHovered(null);
    }
  });

  return (
    <>
      {/* Invisible plane for capturing mouse clicks */}
      <mesh
        ref={planeRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={() => {
          if (hovered) {
            onPlace(hovered);
          }
        }}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Hover preview box */}
      {hovered && (
        <mesh position={hovered}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshStandardMaterial color="#00f0ff" opacity={0.4} transparent />
        </mesh>
      )}
    </>
  );
};

const ThreeScene = () => {
  const controlsRef = useRef<any>(null);
  const [selected, setSelected] = useState('led');
  const [placed, setPlaced] = useState<THREE.Vector3[]>([]);

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

  // Add placed component to state
  const handlePlace = (pos: THREE.Vector3) => {
    setPlaced([...placed, pos]);
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
      {/* 🔼 Top Scrollable Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '18px',
          padding: '12px 20px',
          background: 'rgba(10, 15, 25, 0.7)',
          borderRadius: '20px',
          backdropFilter: 'blur(8px)',
          zIndex: 20,
          overflowX: 'auto',
          maxWidth: '80vw',
          borderBottom: '2px solid #00f0ff55',
        }}
      >
        {components.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setSelected(comp.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              cursor: 'pointer',
              transform: selected === comp.id ? 'scale(1.3)' : 'scale(1)',
              color: selected === comp.id ? '#00f0ff' : '#ccc',
              transition: 'all 0.2s ease',
              background: selected === comp.id ? '#1e293b' : 'transparent',
              borderRadius: '12px',
            }}
          >
            <div style={{ fontSize: '24px' }}>{comp.icon}</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{comp.label}</div>
          </div>
        ))}
      </div>

      {/* 🔽 Bottom Control Buttons */}
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
        <button
          onClick={() => controlsRef.current?.reset()}
          style={smallButtonStyle}
          title="Reset View"
        >
          <FaRedo />
        </button>

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
          title="Start Simulation"
        >
          <FaPlay />
        </button>

        <button
          style={smallButtonStyle}
          onClick={() => {}}
          title="Future Action"
        >
          ❓
        </button>
      </div>

      {/* 🧠 3D Canvas and Scene */}
      <Canvas
        shadows
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 3, 5], fov: 60 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 3]} castShadow />
        <gridHelper args={[40, 40, '#444', '#888']} position={[0, -0.18, 0]} />

        <Breadboard />

        {/* Component placement interaction */}
        <PlacementPlane onPlace={handlePlace} />

        {/* Render placed components */}
        {placed.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.04, 0.2, 0.04]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        ))}

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
