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
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
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
    let initialMonitorPos: THREE.Vector3 | null = null;
    let initialScreenLightPos: THREE.Vector3 | null = null;
    let eyeBrowUpAction: THREE.AnimationAction | null = null;
    let characterMesh: THREE.Object3D | null = null;
    let isHovering = false;
    let scrollTriggers: ScrollTrigger[] = [];

    // Array of workstation objects that MUST BE HIDDEN in Hero & About sections
    const workstationMeshes: THREE.Object3D[] = [];

    loader.load(
      "/models/character.glb",
      async (gltf) => {
        const char = gltf.scene;
        characterMesh = char;

        // Custom Material Assignments to match Moncy.dev Image 2 & Image 3
        char.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = true;

            const name = child.name || "";

            // Head / Face (Plane.007 / Plane007 has morph targets)
            if (name.includes("Plane.007") || name.includes("Plane007")) {
              const mat = child.material.clone();
              mat.color.setHex(0xc68a64); // Warm natural skin tone
              mat.roughness = 0.65;
              mat.metalness = 0.05;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Ears
            else if (name.includes("Ear")) {
              const mat = child.material.clone();
              mat.color.setHex(0xc68a64);
              mat.roughness = 0.65;
              mat.metalness = 0.05;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Neck
            else if (name.includes("Neck")) {
              const mat = child.material.clone();
              mat.color.setHex(0xc68a64);
              mat.roughness = 0.65;
              mat.metalness = 0.05;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Hands
            else if (name.includes("Hand")) {
              const mat = child.material.clone();
              mat.color.setHex(0xc68a64);
              mat.roughness = 0.65;
              mat.metalness = 0.05;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Shirt / Sweatshirt (BODY.SHIRT) -> Deep charcoal black crewneck
            else if (name.includes("BODY.SHIRT") || name.includes("BODYSHIRT") || name.includes("SHIRT")) {
              const mat = child.material.clone();
              mat.color.setHex(0x18191e);
              mat.roughness = 0.85;
              mat.metalness = 0.1;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Pants -> Dark charcoal trousers
            else if (name.includes("Pant")) {
              const mat = child.material.clone();
              mat.color.setHex(0x222328);
              mat.roughness = 0.8;
              mat.metalness = 0.1;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Shoes -> Crisp white sneakers
            else if (name.includes("Shoe")) {
              const mat = child.material.clone();
              mat.color.setHex(0xf2f2f5);
              mat.roughness = 0.35;
              mat.metalness = 0.0;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Soles
            else if (name.includes("Sole")) {
              const mat = child.material.clone();
              mat.color.setHex(0xdcdde2);
              mat.roughness = 0.5;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Chair shell (Cube.002) -> White ergonomic chair
            else if (name.includes("Cube.002") || name.includes("Cube002")) {
              const mat = child.material.clone();
              mat.color.setHex(0xf5f5f7);
              mat.roughness = 0.35;
              mat.needsUpdate = true;
              child.material = mat;
            }
            // Hair -> Jet black hair with natural sheen
            else if (name.includes("hair")) {
              if (child.material) {
                child.material.color.setHex(0x0a0b0d);
                child.material.roughness = 0.45;
                child.material.needsUpdate = true;
              }
            }
            // Desk tabletop (Plane.002) -> Crisp clean white tabletop
            else if (name.includes("Plane.002") || name.includes("Plane002")) {
              if (child.material) {
                child.material.color.setHex(0xffffff);
                child.material.roughness = 0.2;
                child.material.needsUpdate = true;
              }
            }
            // Desk legs (Plane) -> Matte dark metal
            else if (name === "Plane" || name.includes("Plane009")) {
              if (child.material) {
                child.material.color.setHex(0x121316);
                child.material.roughness = 0.6;
                child.material.metalness = 0.8;
                child.material.needsUpdate = true;
              }
            }
          }

          // Identify and isolate workstation meshes (desk, chair, keyboard, monitor, screenlight, floor)
          const nodeName = child.name || "";
          const isWorkstation =
            nodeName.includes("Plane.004") ||
            nodeName.includes("Plane004") ||
            nodeName.includes("screenlight") ||
            nodeName.includes("Keyboard") ||
            nodeName.includes("Plane.002") ||
            nodeName.includes("Plane002") ||
            nodeName === "Plane" ||
            nodeName.includes("ground") ||
            nodeName.includes("Cube.002") ||
            nodeName.includes("Cube002") ||
            nodeName.includes("Plane.003") ||
            nodeName.includes("Plane003") ||
            nodeName.startsWith("KEYS");

          if (isWorkstation) {
            workstationMeshes.push(child);
            // STRICTLY HIDDEN IN HERO & ABOUT SECTIONS
            child.visible = false;
          }

          // Monitor & Screenlight specifics
          if (nodeName === "Plane.004" || nodeName === "Plane004") {
            monitorObject = child;
            initialMonitorPos = child.position.clone();
            child.visible = false;
            child.traverse((sub: any) => {
              if (sub.isMesh && sub.material) {
                if (sub.material.name === "Material.027") {
                  monitorMesh = sub;
                  sub.material.transparent = true;
                  sub.material.opacity = 0;
                  sub.material.color.setHex(0x00d2ff);
                  sub.material.needsUpdate = true;
                } else if (sub.material.name === "Material.028") {
                  sub.material.color.setHex(0x22232a);
                  sub.material.needsUpdate = true;
                }
              }
            });
          }

          if (nodeName === "screenlight") {
            screenLight = child;
            initialScreenLightPos = child.position.clone();
            child.visible = false;
            if (child.material) {
              child.material.transparent = true;
              child.material.opacity = 0;
              child.material.emissive.setHex(0x00d2ff);
              child.material.emissiveIntensity = 5;
              child.material.needsUpdate = true;
            }
          }
        });

        await renderer.compileAsync(char, camera, scene);

        // Bone offsets for chair seating alignment
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
          const setWorkstationVisibility = (visible: boolean) => {
            workstationMeshes.forEach((mesh) => {
              mesh.visible = visible;
            });
            if (monitorObject) monitorObject.visible = visible;
            if (screenLight) screenLight.visible = visible;
          };

          // TL1: Hero Section Scroll -> Character turns slightly, camera zooms out, hero typography fades
          const tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: ".landing-section",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
              onLeaveBack: () => setWorkstationVisibility(false),
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
              scrub: 0.6,
              invalidateOnRefresh: true,
              onEnter: () => setWorkstationVisibility(true),
              onLeaveBack: () => {
                setWorkstationVisibility(false);
                if (monitorObject && initialMonitorPos) monitorObject.position.copy(initialMonitorPos);
                if (screenLight && initialScreenLightPos) screenLight.position.copy(initialScreenLightPos);
                if (monitorMesh) monitorMesh.material.opacity = 0;
                if (screenLight?.material) screenLight.material.opacity = 0;
              },
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

          // Monitor & screen light rise smoothly into natural tabletop position and turn on
          if (monitorObject && initialMonitorPos) {
            tl2.fromTo(
              monitorObject.position,
              { x: initialMonitorPos.x, y: initialMonitorPos.y - 3, z: initialMonitorPos.z },
              { x: initialMonitorPos.x, y: initialMonitorPos.y, z: initialMonitorPos.z, delay: 1.5, duration: 3 },
              0
            );
          }

          if (screenLight && initialScreenLightPos) {
            tl2.fromTo(
              screenLight.position,
              { x: initialScreenLightPos.x, y: initialScreenLightPos.y - 3, z: initialScreenLightPos.z },
              { x: initialScreenLightPos.x, y: initialScreenLightPos.y, z: initialScreenLightPos.z, delay: 1.5, duration: 3 },
              0
            );
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
              scrub: 0.6,
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

      // Rotate head smoothly towards mouse when in hero section, return to focused typing when scrolled
      if (headBone) {
        if (window.scrollY < 300) {
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
        } else {
          headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -0.4, 0.04);
          headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, -0.3, 0.04);
        }
      }

      // Point light sync with monitor screen
      if (screenLight && screenLight.visible && screenLight.material && screenLight.material.opacity > 0.5) {
        pointLight.intensity = (screenLight.material.emissiveIntensity || 5) * 3.0;
      } else {
        pointLight.intensity = 0;
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
