"use client";

import { useEffect, useRef } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onLoaded?.();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (!mountRef.current) return;
    const container = mountRef.current;
    const isDesktopView = true;

    let width = isDesktopView ? window.innerWidth : container.clientWidth || window.innerWidth;
    let height = isDesktopView ? window.innerHeight : container.clientHeight || 450;
    let aspect = width / height;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Initial Camera Setup - perfectly framed bust view with ample breathing space
    const camera = new THREE.PerspectiveCamera(
      isDesktopView ? 13.5 : 16.0,
      aspect,
      0.1,
      1000
    );
    if (isDesktopView) {
      camera.position.set(0, 13.0, 26.5);
      camera.zoom = 1.0;
    } else {
      camera.position.set(0, 13.8, 29.0);
      camera.zoom = 0.95;
    }
    camera.updateProjectionMatrix();

    // Studio Lighting: Clean, balanced illumination with zero specular blown-out glare
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    // Front-Right Key Light: Soft warm studio light sculpting the face and hands
    const directionalLight = new THREE.DirectionalLight(0xfff8f0, 0.85);
    directionalLight.position.set(3, 10, 8);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);

    // Subtle Cyan Rim Light: Edge separation matching the cyan portfolio accents (No harsh magenta!)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.35);
    rimLight.position.set(-4, 7, -5);
    scene.add(rimLight);

    // Screen Glow Point Light: Soft cyber blue illumination from the monitor onto face & hands
    const pointLight = new THREE.PointLight(0x00d2ff, 0.8, 15, 2);
    pointLight.position.set(0, 9, 3);
    scene.add(pointLight);

    // Floor ambient light under workstation desk
    const floorGlowLight = new THREE.PointLight(0x00d2ff, 1.2, 16, 2);
    floorGlowLight.position.set(0, 1, 1);
    scene.add(floorGlowLight);

    // Load Environment HDR
    try {
      new RGBELoader().setPath("/models/").load(
        "char_enviorment.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          scene.environmentIntensity = 0.45;
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
    let screenLight: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> | null = null;
    let monitorObject: THREE.Object3D | null = null;
    let initialMonitorPos: THREE.Vector3 | null = null;
    let initialScreenLightPos: THREE.Vector3 | null = null;
    let eyeBrowUpAction: THREE.AnimationAction | null = null;
    let isHovering = false;
    const scrollTriggers: ScrollTrigger[] = [];

    loader.load(
      "/models/character.glb",
      async (gltf) => {
        const char = gltf.scene;

        // Custom Material Assignments to match Moncy.dev Image 2 & Image 3
        char.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.frustumCulled = true;

            const name = mesh.name || "";

            // Head / Face (Plane.007 / Plane007 has morph targets)
            if (name.includes("Plane.007") || name.includes("Plane007")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xc8926e); // Warm healthy natural skin tone
              mat.roughness = 0.68;
              mat.metalness = 0.02;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Ears
            else if (name.includes("Ear")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xc8926e);
              mat.roughness = 0.68;
              mat.metalness = 0.02;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Neck
            else if (name.includes("Neck")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xc8926e);
              mat.roughness = 0.68;
              mat.metalness = 0.02;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Hands
            else if (name.includes("Hand")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xc8926e);
              mat.roughness = 0.68;
              mat.metalness = 0.02;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Shirt / Sweatshirt (BODY.SHIRT) -> Deep charcoal black crewneck
            else if (name.includes("BODY.SHIRT") || name.includes("BODYSHIRT") || name.includes("SHIRT")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0x18191e);
              mat.roughness = 0.85;
              mat.metalness = 0.1;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Pants -> Dark charcoal trousers
            else if (name.includes("Pant")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0x222328);
              mat.roughness = 0.8;
              mat.metalness = 0.1;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Shoes -> Crisp white sneakers
            else if (name.includes("Shoe")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xf2f2f5);
              mat.roughness = 0.35;
              mat.metalness = 0.0;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Soles
            else if (name.includes("Sole")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xdcdde2);
              mat.roughness = 0.5;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Chair shell (Cube.002) -> White ergonomic chair
            else if (name.includes("Cube.002") || name.includes("Cube002")) {
              const mat = mesh.material.clone();
              mat.color.setHex(0xf5f5f7);
              mat.roughness = 0.35;
              mat.needsUpdate = true;
              mesh.material = mat;
            }
            // Hair -> Jet black hair with soft natural matte (no specular magenta flare)
            else if (name.includes("hair")) {
              if (mesh.material) {
                mesh.material.color.setHex(0x14151a);
                mesh.material.roughness = 0.90;
                mesh.material.metalness = 0.0;
                mesh.material.needsUpdate = true;
              }
            }
            // Desk tabletop (Plane.002) -> Crisp clean soft matte tabletop
            else if (name.includes("Plane.002") || name.includes("Plane002")) {
              if (mesh.material) {
                mesh.material.color.setHex(0xf4f5f8);
                mesh.material.roughness = 0.55;
                mesh.material.metalness = 0.02;
                mesh.material.needsUpdate = true;
              }
            }
            // Desk legs (Plane) -> Matte dark metal
            else if (name === "Plane" || name.includes("Plane009")) {
              if (mesh.material) {
                mesh.material.color.setHex(0x121316);
                mesh.material.roughness = 0.6;
                mesh.material.metalness = 0.8;
                mesh.material.needsUpdate = true;
              }
            }
          }

          const nodeName = child.name || "";

          // Monitor specifics: hidden in Hero so it NEVER blocks the face or text!
          if (nodeName.includes("Plane.004") || nodeName.includes("Plane004")) {
            monitorObject = child;
            initialMonitorPos = child.position.clone();
            child.scale.set(0.0001, 0.0001, 0.0001);
            child.visible = false;
            child.traverse((sub: THREE.Object3D) => {
              if ((sub as THREE.Mesh).isMesh && (sub as THREE.Mesh).material) {
                const subMesh = sub as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
                if (subMesh.material.name === "Material.027") {
                  subMesh.material.transparent = true;
                  subMesh.material.opacity = 1;
                  subMesh.material.color.setHex(0x00d2ff);
                  subMesh.material.needsUpdate = true;
                } else if (subMesh.material.name === "Material.028") {
                  subMesh.material.color.setHex(0x14151a);
                  subMesh.material.roughness = 0.95; // Soft matte finish, eliminates blown-out white glare!
                  subMesh.material.metalness = 0.05;
                  subMesh.material.needsUpdate = true;
                }
              }
            });
          }

          // Screenlight glow: hidden in Hero so it NEVER casts premature glare!
          if (nodeName === "screenlight") {
            const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
            screenLight = mesh;
            initialScreenLightPos = mesh.position.clone();
            mesh.scale.set(0.0001, 0.0001, 0.0001);
            mesh.visible = false;
            if (mesh.material) {
              mesh.material.transparent = true;
              mesh.material.opacity = 1;
              mesh.material.emissive.setHex(0x00d2ff);
              mesh.material.emissiveIntensity = 0.8;
              mesh.material.needsUpdate = true;
            }
          }
        });

        try {
          await renderer.compileAsync(char, camera, scene);
        } catch (compileErr) {
          console.warn("Shader pre-compilation skipped, proceeding with scene mount:", compileErr);
        }

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
          environmentIntensity: 0.45,
          duration: 1.8,
          ease: "power2.inOut",
        });
        gsap.to(directionalLight, {
          intensity: 1.0,
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
          // Single Unified Master Timeline: Seamless choreography from Hero Bust directly to Workstation Desk
          const heroToWorkstationTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".landing-section",
              start: "top top",
              end: "bottom top",
              scrub: 0.25,
              invalidateOnRefresh: true,
              onEnter: () => {
                const el = rootRef.current;
                if (el) {
                  el.style.visibility = "visible";
                  el.style.opacity = "1";
                }
                const modelEl = el?.querySelector(".character-model") as HTMLElement | null;
                if (modelEl) {
                  modelEl.style.opacity = "1";
                }
                if (monitorObject) {
                  monitorObject.visible = false;
                  monitorObject.scale.set(0.0001, 0.0001, 0.0001);
                }
                if (screenLight) {
                  screenLight.visible = false;
                  screenLight.scale.set(0.0001, 0.0001, 0.0001);
                }
              },
              onEnterBack: () => {
                const el = rootRef.current;
                if (el) {
                  el.style.visibility = "visible";
                  el.style.opacity = "1";
                }
                const modelEl = el?.querySelector(".character-model") as HTMLElement | null;
                if (modelEl) {
                  modelEl.style.opacity = "1";
                }
              },
              onLeaveBack: () => {
                if (monitorObject && initialMonitorPos) {
                  monitorObject.visible = false;
                  monitorObject.scale.set(0.0001, 0.0001, 0.0001);
                  monitorObject.position.copy(initialMonitorPos);
                }
                if (screenLight && initialScreenLightPos) {
                  screenLight.visible = false;
                  screenLight.scale.set(0.0001, 0.0001, 0.0001);
                  screenLight.position.copy(initialScreenLightPos);
                }
                gsap.set(".what-box-left, .what-box-right", { opacity: 0, y: 40 });
                const el = rootRef.current;
                if (el) {
                  el.style.visibility = "visible";
                  el.style.opacity = "1";
                }
                const modelEl = el?.querySelector(".character-model") as HTMLElement | null;
                if (modelEl) {
                  modelEl.style.opacity = "1";
                  modelEl.style.transform = "none";
                }
              },
            },
            onUpdate: function () {
              const p = this.progress();
              // Screen emerges smoothly in tandem with the desk (starts at p >= 0.08 as hero text fades)
              // This guarantees the computer arrives naturally with the table, with ZERO sudden popping!
              const showMonitor = p >= 0.08;
              if (monitorObject) {
                monitorObject.visible = showMonitor;
              }
              if (screenLight) {
                screenLight.visible = showMonitor;
              }
            },
          });

          // 1. Hero text & bottom bar fade out smoothly in the first 25% of scroll
          heroToWorkstationTl
            .set(".landing-container", { pointerEvents: "auto" }, 0)
            .to(".landing-container, .hero-bottom-bar", { opacity: 0, y: -20, duration: 0.22, ease: "power1.inOut" }, 0)
            .set(".landing-container", { pointerEvents: "none" }, 0.22);

          // 2. Camera pulls back smoothly and directly to workstation framing (z: 83.5, y: 8.7)
          heroToWorkstationTl
            .fromTo(camera.position, { z: 26.5, y: 13.0 }, { z: 83.5, y: 8.7, duration: 0.65, ease: "power2.inOut" }, 0)
            .fromTo(char.rotation, { y: 0, x: 0 }, { y: 0.95, x: 0.10, duration: 0.65, ease: "power2.inOut" }, 0)
            .fromTo(".character-model", { x: "0%" }, { x: "-9%", duration: 0.65, ease: "power2.inOut" }, 0);

          if (neckBone) {
            heroToWorkstationTl.to(neckBone.rotation, { x: 0.6, duration: 0.65, ease: "power2.inOut" }, 0);
          }

          // 3. What I Do text & cards rise up smoothly as soon as hero fades (zero blank void!)
          heroToWorkstationTl
            .fromTo(
              ".what-box-left, .what-box-right",
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
              0.20
            );

          // 4. Monitor & screenlight materialize seamlessly WITH THE TABLE (starts at 0.10, full by 0.52)
          // Rises and scales in fluid lockstep as the desk turns into frame, eliminating any sudden pop!
          if (monitorObject && initialMonitorPos) {
            heroToWorkstationTl
              .fromTo(
                monitorObject.scale,
                { x: 0.0001, y: 0.0001, z: 0.0001 },
                { x: 1, y: 1, z: 1, duration: 0.45, ease: "power2.out" },
                0.10
              )
              .fromTo(
                monitorObject.position,
                { x: initialMonitorPos.x, y: initialMonitorPos.y - 1.2, z: initialMonitorPos.z },
                { x: initialMonitorPos.x, y: initialMonitorPos.y, z: initialMonitorPos.z, duration: 0.45, ease: "power2.out" },
                0.10
              );
          }

          if (screenLight && initialScreenLightPos) {
            heroToWorkstationTl
              .fromTo(
                screenLight.scale,
                { x: 0.0001, y: 0.0001, z: 0.0001 },
                { x: 1, y: 1, z: 1, duration: 0.45, ease: "power2.out" },
                0.10
              )
              .fromTo(
                screenLight.position,
                { x: initialScreenLightPos.x, y: initialScreenLightPos.y - 1.2, z: initialScreenLightPos.z },
                { x: initialScreenLightPos.x, y: initialScreenLightPos.y, z: initialScreenLightPos.z, duration: 0.45, ease: "power2.out" },
                0.10
              );
          }

          heroToWorkstationTl.fromTo(
            ".character-rim",
            { opacity: 0.9, scale: 1.3 },
            { opacity: 0, scale: 0, y: "-70%", duration: 0.6 },
            0
          );

          if (heroToWorkstationTl.scrollTrigger) scrollTriggers.push(heroToWorkstationTl.scrollTrigger);

          // Workstation Smooth Exit Timeline: Fades out "little by little" as the marquee approaches!
          const workstationExitTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#projects-marquee",
              start: "top 95%", // as the marquee enters from the bottom
              end: "top 35%",   // by the time the marquee reaches near top
              scrub: 0.25,
              invalidateOnRefresh: true,
            },
          });

          workstationExitTl
            .to(".character-model", { opacity: 0, scale: 0.94, y: "-6%", duration: 1, ease: "power1.inOut" }, 0)
            .to(floorGlowLight, { intensity: 0, duration: 0.8 }, 0);

          if (workstationExitTl.scrollTrigger) scrollTriggers.push(workstationExitTl.scrollTrigger);

          // Absolute Sentinel on #projects-marquee / #projects: shut off canvas completely once scrolled past marquee into Projects
          const projectsSentinel = ScrollTrigger.create({
            trigger: "#projects-marquee",
            start: "bottom top",
            end: "max",
            onEnter: () => {
              const el = rootRef.current;
              if (el) {
                el.style.visibility = "hidden";
                el.style.pointerEvents = "none";
              }
            },
            onLeaveBack: () => {
              const el = rootRef.current;
              if (el) {
                el.style.visibility = "visible";
              }
              const modelEl = el?.querySelector(".character-model") as HTMLElement | null;
              if (modelEl) {
                modelEl.style.opacity = "1";
              }
              if (floorGlowLight) floorGlowLight.intensity = 1.2;
            },
          });

          scrollTriggers.push(projectsSentinel);
        } else {
          // Mobile & Tablet lightweight scroll fade out
          const mobileTl = gsap.timeline({
            scrollTrigger: {
              trigger: ".landing-section",
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
          mobileTl.to(".character-model", { opacity: 0, duration: 1 });
          if (mobileTl.scrollTrigger) scrollTriggers.push(mobileTl.scrollTrigger);
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

    // Viewport Culling: Pause GPU render loop only when scrolled completely past marquee into Projects
    let isVisibleInViewport = true;
    const checkVisibility = () => {
      const exitEl = document.getElementById("projects-marquee") || document.getElementById("projects");
      const rootEl = rootRef.current;
      if (!exitEl || !rootEl) return;

      const exitRect = exitEl.getBoundingClientRect();

      // When Projects marquee has scrolled past the top of the viewport
      if (exitRect.bottom <= 0) {
        if (isVisibleInViewport) {
          isVisibleInViewport = false;
          rootEl.style.visibility = "hidden";
          rootEl.style.pointerEvents = "none";
        }
      } else {
        if (!isVisibleInViewport) {
          isVisibleInViewport = true;
          rootEl.style.visibility = "visible";
          rootEl.style.pointerEvents = "none";
          if (renderer && scene && camera) {
            renderer.render(scene, camera);
          }
        }
      }
    };
    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    // Mouse Tracking for Head Rotation
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleWindowMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    // Resize Handler
    const handleWindowResize = () => {
      if (!mountRef.current) return;
      const desktop = window.innerWidth > 1024;

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
      checkVisibility();

      // Smart GPU Culling: skip Three.js render calculations when off-screen
      if (!isVisibleInViewport) {
        return;
      }

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

      // Soft point light sync with monitor screen
      if (screenLight && screenLight.visible && screenLight.material && screenLight.material.opacity > 0.5) {
        pointLight.intensity = Math.min((screenLight.material.emissiveIntensity || 1) * 1.2, 2.0);
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
      window.removeEventListener("scroll", checkVisibility);

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
    <div ref={rootRef} className={`character-container ${className}`}>
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
