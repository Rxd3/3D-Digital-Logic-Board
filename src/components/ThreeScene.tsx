import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x111b33);
    container.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(4,2);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resizing
    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeScene;