"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Cyber3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !mountRef.current) {
      setIsSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 400;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setIsSupported(false);
      return;
    }

    // Geometry: Dual Wireframe Icosahedron (Cyber Core) in Deep Navy & Blue
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Outer Electric Blue & Cyan Point Cloud
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.PointsMaterial({
      color: 0x00d2ff,
      size: 0.038,
      transparent: true,
      opacity: 0.85,
    });
    const pointCloud = new THREE.Points(outerGeo, outerMat);
    scene.add(pointCloud);

    // Floating Blue & White Dust Particles
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.025,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      innerMesh.rotation.x += 0.0025;
      innerMesh.rotation.y += 0.0035;

      pointCloud.rotation.x -= 0.002;
      pointCloud.rotation.y -= 0.0028;

      // Mouse reactive tilt
      innerMesh.rotation.y += (mouseX * 0.5 - innerMesh.rotation.y) * 0.05;
      innerMesh.rotation.x += (-mouseY * 0.5 - innerMesh.rotation.x) * 0.05;

      pointCloud.rotation.y += (mouseX * 0.8 - pointCloud.rotation.y) * 0.05;
      pointCloud.rotation.x += (-mouseY * 0.8 - pointCloud.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="w-full h-80 flex items-center justify-center font-mono text-xs text-zinc-600">
        [3D Visual Canvas: Reduced Motion Active]
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest pointer-events-none flex items-center gap-2 bg-[#080b14]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/20 shadow-[0_0_20px_rgba(0,210,255,0.15)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Interactive WebGL Cryptographic Core
      </div>
    </div>
  );
}
