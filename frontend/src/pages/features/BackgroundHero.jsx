import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function InteractiveParticles() {
  const count = 4000; // Number of particles
  const mesh = useRef();
  const { mouse, viewport } = useThree();

  // 1. Generate initial positions and "original" positions for returning
  const [particles, originalPositions] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 5;

      positions.set([x, y, z], i * 3);
      originals.set([x, y, z], i * 3);
    }
    return [positions, originals];
  }, []);

  // 2. Physics Animation Loop
  useFrame(() => {
    const { array } = mesh.current.geometry.attributes.position;

    // Convert mouse to 3D world coordinates roughly
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Current particle position
      let x = array[i3];
      let y = array[i3 + 1];
      let z = array[i3 + 2];

      // Original particle position
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Calculate distance from mouse
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Interaction Logic: Displacement
      const radius = 1.5; // Hover radius
      const force = 0.05; // Pushing force

      if (dist < radius) {
        // Push particles away from mouse
        const angle = Math.atan2(dy, dx);
        x -= Math.cos(angle) * force;
        y -= Math.sin(angle) * force;
      } else {
        // Gently lerp back to original position (Homecoming effect)
        x += (ox - x) * 0.03;
        y += (oy - y) * 0.03;
        z += (oz - z) * 0.03;
      }

      array[i3] = x;
      array[i3 + 1] = y;
      array[i3 + 2] = z;
    }

    // Crucial: Tell Three.js the positions updated
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- FULL PAGE WRAPPER ---
const BackgroundHero = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <InteractiveParticles />
      </Canvas>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
};

export default BackgroundHero;
