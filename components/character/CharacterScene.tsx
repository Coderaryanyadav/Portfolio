"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { typingBoneNames, eyebrowBoneNames } from "@/data/boneData";

interface CharacterSceneProps {
  onLoaded?: () => void;
  className?: string;
}

export default function CharacterScene({ onLoaded, className = "" }: CharacterSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);
    gsap.registerPlugin(ScrollTrigger);

    if (!mountRef.current) return;
    const container = mountRef.current;
    const isDesktopView = window.innerWidth > 1024;

    let width = isDesktopView ? window.innerWidth : container.clientWidth || window.innerWidth;
    let height = isDesktopView ? window.innerHeight : container.clientHeight || 450;
    let aspect = width / height;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Initial Camera Setup - exact front-facing bust view from moncy.dev
    const camera = new THREE.PerspectiveCamera(
      isDesktopView ? 14.5 : 16.5,
      aspect,
      0.1,
      1000
    );
    if (isDesktopView) {
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
    } else {
      camera.position.set(0, 13.0, 27.5);
      camera.zoom = 1.0;
    }
    camera.updateProjectionMatrix();

    // Lighting (Cyber Blue & Lavender palette matching Image 2 & Image 3)
    const directionalLight = new THREE.DirectionalLight(0xc2a4ff, 0);
    directionalLight.position.set(-0.47, -0.32, -1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00d2ff, 0, 100, 3);
    pointLight.position.set(3, 12, 4);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Load Environment HDR
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
        (err) => console.warn("HDR load warning:", err)
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
    let neckBone: THREE.Object3D | null = null;
    let screenLight: any = null;
    let monitorMesh: any = null;
    let monitorObject: any = null;
    let eyeBrowUpAction: THREE.AnimationAction | null = null;
    let characterMesh: THREE.Object3D | null = null;
    let isHovering = false;
    let scrollTriggers: ScrollTrigger[] = [];

    // Array of workstation objects that MUST BE HIDDEN in the Hero Section
    const workstationMeshes: THREE.Object3D[] = [];
    const workstationNodeNames = [
      "Plane",
      "Plane.002",
      "Plane.003",
      "Plane.004",
      "screenlight",
      "Keyboard",
      "Cube.002",
      "ground",
    ];

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

          // Check if this object belongs to the workstation (desk, chair, keyboard, monitor, floor)
          const isWorkstationPart =
            workstationNodeNames.some(
              (name) => child.name === name || child.name.replace(".", "") === name.replace(".", "")
            ) || child.name.startsWith("KEYS");

          if (isWorkstationPart) {
            workstationMeshes.push(child);
            // HIDE IN HERO SECTION! Zero white desk tabletop floating at character chest!
            child.visible = false;
          }

          // Monitor & Screenlight specifics
          if (child.name === "Plane.004" || child.name === "Plane004") {
            monitorObject = child;
            child.position.set(0, -10, 2);
            child.traverse((sub: any) => {
              if (sub.material && sub.material.name === "Material.027") {
                monitorMesh = sub;
                sub.material.transparent = true;
                sub.material.opacity = 0;
                sub.material.color.set("#00D2FF");
              }
            });
          }

          if (child.name === "screenlight") {
            screenLight = child;
            if (child.material) {
              child.material.transparent = true;
              child.material.opacity = 0;
              child.material.emissive.set("#00D2FF");
              child.material.emissiveIntensity = 4;
            }
          }
        });

        // Bone offsets for proper chair alignment
        const footR = char.getObjectByName("footR");
        const footL = char.getObjectByName("footL");
        if (footR) footR.position.y = 3.36;
        if (footL) footL.position.y = 3.36;

        headBone = char.getObjectByName("spine006") || null;
        neckBone = char.getObjectByName("spine005") || null;

        scene.add(char);
        mixer = new THREE.AnimationMixer(char);

        // Setup Animations
        if (gltf.animations && gltf.animations.length > 0) {
          // Intro animation
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

          // Eyebrow Up for interactive face hover
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

        // Fade in lighting & rim glow
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
          opacity: 0.9,
          duration: 1.8,
          ease: "power2.out",
        });

        // Register GSAP ScrollTrigger Choreography (Desktop only)
        if (isDesktopView) {
          // Helper to toggle workstation visibility
          const setWorkstationVisible = (visible: boolean) => {
            workstationMeshes.forEach((mesh) => {
              mesh.visible = visible;
            });
          };

          // TL1: Hero Section Scroll -> Character turns slightly, camera zooms out, hero typography fades
          const tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: ".landing-section",
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              onLeaveBack: () => setWorkstationVisible(false),
            },
          });
          tl1
            .fromTo(char.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
            .to(camera.position, { z: 22 }, 0)
            .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
            .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
            .to(".landing-container", { y: "40%", duration: 0.8 }, 0);

          // TL2: About Section -> Transition into "What I Do" (Reveal Workstation!)
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: ".about-section",
              start: "center 55%",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              onEnter: () => setWorkstationVisible(true),
              onLeaveBack: () => setWorkstationVisible(false),
            },
          });

          tl2
            .to(camera.position, { z: 75, y: 8.4, duration: 6, delay: 1, ease: "power3.inOut" }, 0)
            .to(".about-section", { y: "30%", duration: 6 }, 0)
            .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
            .fromTo(
              ".character-model",
              { pointerEvents: "inherit" },
              { pointerEvents: "none", x: "-12%", delay: 1, duration: 5 },
              0
            )
            .to(char.rotation, { y: 0.92, x: 0.12, delay: 2, duration: 3 }, 0);

          if (neckBone) {
            tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
          }

          // Monitor & screen light rise and turn on
          if (monitorObject) {
            tl2.fromTo(monitorObject.position, { y: -10, z: 2 }, { y: 0, z: 0, delay: 1.5, duration: 3 }, 0);
          }
          if (monitorMesh) {
            tl2.to(monitorMesh.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0);
          }
          if (screenLight && screenLight.material) {
            tl2.to(screenLight.material, { opacity: 1, duration: 0.8, delay: 3.8 }, 0);
          }

          tl2.fromTo(
            ".character-rim",
            { opacity: 0.9, scale: 1.3 },
            { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 1 },
            0
          );

          // TL3: What I Do Section -> Character stays seated typing, then glides up past viewport
          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: ".whatIDO",
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          tl3
            .fromTo(
              ".character-model",
              { y: "0%" },
              { y: "-110%", duration: 4, ease: "none", delay: 1 },
              0
            )
            .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
            .to(char.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);

          if (tl1.scrollTrigger) scrollTriggers.push(tl1.scrollTrigger);
          if (tl2.scrollTrigger) scrollTriggers.push(tl2.scrollTrigger);
          if (tl3.scrollTrigger) scrollTriggers.push(tl3.scrollTrigger);
        }

        onLoaded?.();
        dracoLoader.dispose();
      },
      undefined,
      (err) => console.error("Failed to load character GLB:", err)
    );

    // Interactive Eyebrow Hover on Face
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

    // Mouse Tracking for Head Rotation
    let mouse = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    // Resize Handler
    const handleWindowResize = () => {
      if (!mountRef.current) return;
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);

      width = desktop ? window.innerWidth : mountRef.current.clientWidth || window.innerWidth;
      height = desktop ? window.innerHeight : mountRef.current.clientHeight || 450;
      aspect = width / height;

      camera.aspect = aspect;
      camera.fov = desktop ? 14.5 : 16.5;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleWindowResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate head smoothly towards mouse when in hero section
      if (headBone && window.scrollY < 300) {
        const maxRotY = Math.PI / 6;
        const maxRotX = 0.35;
        const minRotX = -0.25;

        targetRotation.y = mouse.x * maxRotY;
        let clampedY = mouse.y;
        if (clampedY < minRotX) clampedY = minRotX;
        if (clampedY > maxRotX) clampedY = maxRotX;
        targetRotation.x = -clampedY - 0.3 * maxRotY;

        headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, targetRotation.y, 0.08);
        headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, targetRotation.x, 0.06);
      }

      // Point light sync with monitor screen
      if (screenLight && screenLight.material && screenLight.material.opacity > 0.5) {
        pointLight.intensity = (screenLight.material.emissiveIntensity || 4) * 2.5;
      }

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("resize", handleWindowResize);

      if (hoverDiv) {
        hoverDiv.removeEventListener("mouseenter", handleFaceEnter);
        hoverDiv.removeEventListener("mouseleave", handleFaceLeave);
      }

      scrollTriggers.forEach((st) => st.kill());
      scene.clear();
      renderer.dispose();
      dracoLoader.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div className={`character-container ${className}`}>
      <div className="character-model">
        {/* Luminous Purple & Cyan Rim Glow (Image 2) */}
        <div className="character-rim" />

        {/* 3D Canvas Mount */}
        <div ref={mountRef} className="character-canvas-wrapper" />

        {/* Interactive Eyebrow Hover Hitbox (Image 2) */}
        <div
          ref={hoverRef}
          className="character-hover"
          title="Looking at me? (Hover face to raise eyebrows)"
        />
      </div>
    </div>
  );
}
