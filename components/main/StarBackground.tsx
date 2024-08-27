"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

interface StarBackgroundProps {
  [key: string]: any;
}

const StarBackground: React.FC<StarBackgroundProps> = (props) => {
  const ref = useRef<THREE.Points>(null);
  const sphere = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  )[0];

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          size={0.002}
          color="#ffffff"
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarCanvas: React.FC = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
        <Preload all />
      </Suspense>
    </Canvas>
  </div>
);

export default StarCanvas;
