"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";
import { typingBoneNames, eyebrowBoneNames } from "@/data/boneData";

interface CharacterSceneProps {
  onLoaded?: () => void;
  className?: string;
}

export default function CharacterScene({ onLoaded, className = "" }: CharacterSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight * 0.75;
    let aspect = width / height;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    // Lighting (Cyber Blue palette)
    const directionalLight = new THREE.DirectionalLight(0x00d2ff, 0);
    directionalLight.position.set(-0.47, -0.32, -1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 0, 100, 3);
    pointLight.position.set(3, 12, 4);
    scene.add(pointLight);

    // HDR Environment Reflection
    try {
      new RGBELoader().setPath("/models/").load(
        "char_enviorment.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          scene.environmentIntensity = 0;
          scene.environmentRotation.set(5.76, 85.85, 1);
        },
        undefined,
        (err) => {
          console.warn("HDR load warning:", err);
        }
      );
    } catch (e) {
      console.warn("RGBELoader error:", e);
    }

    // Loaders
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);

    let mixer: THREE.AnimationMixer | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: any = null;
    let eyeBrowUpAction: THREE.AnimationAction | null = null;
    let characterMesh: THREE.Object3D | null = null;
    let isHovering = false;

    // Load the 3D Character
    loader.load(
      "/models/character.glb",
      async (gltf) => {
        const char = gltf.scene;
        characterMesh = char;
        await renderer.compileAsync(char, camera, scene);

        char.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = true;
          }
        });

        // Bone offsets for proper chair positioning
        const footR = char.getObjectByName("footR");
        const footL = char.getObjectByName("footL");
        if (footR) footR.position.y = 3.36;
        if (footL) footL.position.y = 3.36;

        headBone = char.getObjectByName("spine006") || null;
        screenLight = char.getObjectByName("screenlight") || null;

        // Turn on monitor glow
        char.traverse((object: any) => {
          if (object.name === "screenlight") {
            object.material.transparent = true;
            object.material.opacity = 1;
            object.material.emissive.set("#00D2FF");
            object.material.emissiveIntensity = 4;
          }
          if (object.material && object.material.name === "Material.027") {
            object.material.transparent = true;
            object.material.opacity = 1;
            object.material.color.set("#00D2FF");
          }
        });

        scene.add(char);
        mixer = new THREE.AnimationMixer(char);

        // Setup Animations
        if (gltf.animations && gltf.animations.length > 0) {
          // Intro
          const introClip = gltf.animations.find((c) => c.name === "introAnimation");
          if (introClip) {
            const introAction = mixer.clipAction(introClip);
            introAction.setLoop(THREE.LoopOnce, 1);
            introAction.clampWhenFinished = true;
            introAction.play();
          }

          // Keyboard keys typing
          ["key1", "key2", "key5", "key6"].forEach((keyName) => {
            const clip = THREE.AnimationClip.findByName(gltf.animations, keyName);
            if (clip && mixer) {
              const a = mixer.clipAction(clip);
              a.play();
              a.timeScale = 1.2;
            }
          });

          // Typing hands
          const typingClip = THREE.AnimationClip.findByName(gltf.animations, "typing");
          if (typingClip && mixer) {
            const filteredTracks = typingClip.tracks.filter((track) =>
              typingBoneNames.some((bone) => track.name.includes(bone))
            );
            const filteredClip = new THREE.AnimationClip("typing_filtered", typingClip.duration, filteredTracks);
            const action = mixer.clipAction(filteredClip);
            action.enabled = true;
            action.play();
            action.timeScale = 1.2;
          }

          // Blinking loop
          const blinkClip = gltf.animations.find((c) => c.name === "Blink");
          if (blinkClip && mixer) {
            const blinkAction = mixer.clipAction(blinkClip);
            blinkAction.play().fadeIn(0.5);
          }

          // Brow Up for interactive face hover
          const browClip = THREE.AnimationClip.findByName(gltf.animations, "browup");
          if (browClip && mixer) {
            const browTracks = browClip.tracks.filter((track) =>
              eyebrowBoneNames.some((bone) => track.name.includes(bone))
            );
            const browFiltered = new THREE.AnimationClip("brow_filtered", browClip.duration, browTracks);
            eyeBrowUpAction = mixer.clipAction(browFiltered);
            eyeBrowUpAction.setLoop(THREE.LoopOnce, 1);
            eyeBrowUpAction.clampWhenFinished = true;
          }
        }

        // Fade in scene lighting with GSAP
        gsap.to(scene, {
          environmentIntensity: 0.65,
          duration: 1.8,
          ease: "power2.inOut",
        });
        gsap.to(directionalLight, {
          intensity: 1.2,
          duration: 1.8,
          ease: "power2.inOut",
        });
        gsap.to(".character-rim", {
          opacity: 0.85,
          scale: 1.2,
          duration: 2,
          ease: "power2.out",
        });

        setIsLoading(false);
        onLoaded?.();
        dracoLoader.dispose();
      },
      undefined,
      (err) => {
        console.error("Failed to load character GLB:", err);
        setIsLoading(false);
      }
    );

    // Interactive Hover on Face
    const handleFaceEnter = () => {
      if (eyeBrowUpAction && !isHovering) {
        isHovering = true;
        eyeBrowUpAction.reset();
        eyeBrowUpAction.enabled = true;
        eyeBrowUpAction.setEffectiveWeight(3.5);
        eyeBrowUpAction.fadeIn(0.3).play();
      }
    };

    const handleFaceLeave = () => {
      if (eyeBrowUpAction && isHovering) {
        isHovering = false;
        eyeBrowUpAction.fadeOut(0.5);
      }
    };

    const hoverDiv = hoverRef.current;
    if (hoverDiv) {
      hoverDiv.addEventListener("mouseenter", handleFaceEnter);
      hoverDiv.addEventListener("mouseleave", handleFaceLeave);
    }

    // Mouse & Touch Tracking
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        mouse.x = 0;
        mouse.y = 0;
      }, 1500);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Resize Handler
    const handleWindowResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth || window.innerWidth;
      height = mountRef.current.clientHeight || window.innerHeight * 0.75;
      aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleWindowResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate head smoothly towards mouse
      if (headBone && window.scrollY < 400) {
        const maxRotY = Math.PI / 5.5;
        const maxRotX = 0.35;
        const minRotX = -0.25;

        targetRotation.y = mouse.x * maxRotY;
        let clampedY = mouse.y;
        if (clampedY < minRotX) clampedY = minRotX;
        if (clampedY > maxRotX) clampedY = maxRotX;
        targetRotation.x = -clampedY - 0.3 * maxRotY;

        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotation.y, 0.08);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetRotation.x, 0.06);

        // Point light sync with monitor
        if (screenLight && screenLight.material) {
          pointLight.intensity = (screenLight.material.emissiveIntensity || 4) * 2.5;
        }
      }

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleWindowResize);

      if (hoverDiv) {
        hoverDiv.removeEventListener("mouseenter", handleFaceEnter);
        hoverDiv.removeEventListener("mouseleave", handleFaceLeave);
      }

      scene.clear();
      renderer.dispose();
      dracoLoader.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* Background Electric Blue Rim Glow */}
      <div className="character-rim absolute w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full bg-cyan-500/20 blur-[80px] pointer-events-none transition-all duration-1000 -z-10 opacity-0 transform translate-y-12" />

      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full relative z-10 flex items-center justify-center pointer-events-none">
        {/* Face Hover Catchbox */}
        <div
          ref={hoverRef}
          className="absolute w-36 h-36 top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 pointer-events-auto cursor-pointer"
          title="Looking at me? (Hover to raise eyebrows)"
        />
      </div>
    </div>
  );
}
