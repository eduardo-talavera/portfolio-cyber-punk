"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Monolith() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringOne = useRef<THREE.Mesh>(null);
  const ringTwo = useRef<THREE.Mesh>(null);
  const { viewport, pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current || !shell.current || !ringOne.current || !ringTwo.current)
      return;

    const root = document.documentElement;
    const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    const progress = window.scrollY / maxScroll;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = viewport.width < 7;
    const targetX = mobile
      ? progress > 0.72
        ? 0
        : 1.05
      : Math.sin(progress * Math.PI * 2.2) * 1.3 + 1.5;
    const targetY = 0.05 + Math.cos(progress * Math.PI * 3) * 0.48;
    const targetScale = mobile ? 0.7 : 1;

    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      targetX + pointer.x * 0.17,
      3.2,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      targetY + pointer.y * 0.12,
      3.2,
      delta,
    );
    group.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.06,
    );

    if (!reduceMotion) {
      group.current.rotation.y += delta * 0.13;
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        progress * Math.PI * 1.4 + pointer.y * 0.08,
        2,
        delta,
      );
      shell.current.rotation.z -= delta * 0.09;
      ringOne.current.rotation.x += delta * 0.22;
      ringTwo.current.rotation.y -= delta * 0.18;
    }
  });

  return (
    <group ref={group} position={[1.5, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.35}>
        <mesh ref={shell} castShadow>
          <icosahedronGeometry args={[1.45, 2]} />
          <meshPhysicalMaterial
            color="#bfccff"
            metalness={0.74}
            roughness={0.17}
            clearcoat={1}
            clearcoatRoughness={0.08}
            iridescence={0.72}
            iridescenceIOR={1.8}
          />
        </mesh>
        <mesh scale={0.72}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial
            color="#1713ff"
            emissive="#3f22ff"
            emissiveIntensity={1.4}
            roughness={0.3}
          />
        </mesh>
        <mesh ref={ringOne} rotation={[0.7, 0.1, 0.2]}>
          <torusGeometry args={[2.02, 0.018, 12, 160]} />
          <meshBasicMaterial color="#f2ff58" />
        </mesh>
        <mesh ref={ringTwo} rotation={[1.3, 0.2, 0.8]}>
          <torusGeometry args={[1.8, 0.012, 10, 160]} />
          <meshBasicMaterial color="#9aa9ff" transparent opacity={0.7} />
        </mesh>
        {Array.from({ length: 7 }).map((_, index) => {
          const angle = (index / 7) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * 2.02,
                Math.sin(angle) * 1.2,
                Math.sin(angle * 2) * 0.75,
              ]}
              scale={index % 2 ? 0.055 : 0.085}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color={index % 2 ? "#f2ff58" : "#ffffff"} />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.7} color="#5f70ff" />
      <directionalLight position={[4, 5, 6]} intensity={4.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={28} color="#a600ff" />
      <pointLight position={[3, -3, 1]} intensity={18} color="#eaff52" />
    </>
  );
}

export default function MonolithScene() {
  useEffect(() => {
    const glow = document.querySelector<HTMLElement>(".cursor-glow");
    const onPointerMove = (event: PointerEvent) => {
      if (glow) {
        glow.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.65]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <SceneLights />
      <Monolith />
      <Sparkles
        count={54}
        scale={[11, 7, 5]}
        size={1.45}
        speed={0.16}
        opacity={0.44}
        color="#b8c0ff"
      />
      <fog attach="fog" args={["#08090d", 6, 13]} />
    </Canvas>
  );
}
