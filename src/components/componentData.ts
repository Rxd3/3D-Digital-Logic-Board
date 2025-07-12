import React from 'react';
import { FaLightbulb, FaWaveSquare, FaMicrochip, FaBolt } from 'react-icons/fa';
import * as THREE from 'three';

export interface ComponentType {
  id: string;
  label: string;
  icon: React.ElementType;
  footprint: THREE.Vector3[]; // Relative positions of pins from the center
}

const standardSpacing = 0.1; // Approx 0.1 inch in scene units

export const components: ComponentType[] = [
  {
    id: 'led',
    label: 'LED',
    icon: FaLightbulb,
    footprint: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(standardSpacing, 0, 0),
    ],
  },
  {
    id: 'resistor',
    label: 'Resistor',
    icon: FaWaveSquare,
    footprint: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(standardSpacing * 4, 0, 0), // Resistors are longer
    ],
  },
  {
    id: 'chip',
    label: 'Chip',
    icon: FaMicrochip,
    footprint: [
      // 8-pin chip footprint
      // Left side
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(standardSpacing, 0, 0),
      new THREE.Vector3(standardSpacing * 2, 0, 0),
      new THREE.Vector3(standardSpacing * 3, 0, 0),
      new THREE.Vector3(standardSpacing * 4, 0, 0),
      new THREE.Vector3(standardSpacing * 5, 0, 0),
      new THREE.Vector3(standardSpacing * 6, 0, 0),

      // Right side (across the breadboard gap)
      new THREE.Vector3(0, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing * 2, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing * 3, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing * 4, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing * 5, 0, standardSpacing * 3),
      new THREE.Vector3(standardSpacing * 6, 0, standardSpacing * 3),
    ],
  },
  {
    id: 'wire',
    label: 'Wire',
    icon: FaBolt,
    footprint: [new THREE.Vector3(0, 0, 0)], // Wires are handled differently
  },
  {
    id: 'button',
    label: 'Button',
    icon: FaBolt,
    footprint: [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(standardSpacing * 2, 0, 0),
    ],
  },
];
