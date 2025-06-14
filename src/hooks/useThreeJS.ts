// src/hooks/useThreeJS.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface UseThreeJSOptions {
  enableParticles?: boolean;
  enableGeometry?: boolean;
  particleCount?: number;
  onReady?: () => void;
}

export function useThreeJS(options: UseThreeJSOptions = {}) {
  const { enableParticles = true, enableGeometry = true, particleCount = 2000, onReady } = options;

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles?: THREE.Points;
    shapes?: Array<{ mesh: THREE.Mesh; rotationSpeed: number }>;
    animationId: number;
    mouseX: number;
    mouseY: number;
  }>();

  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;

    // Clear any existing content
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mount.appendChild(renderer.domElement);

    // Initialize particles
    let particles: THREE.Points | undefined;
    if (enableParticles) {
      particles = createParticles(particleCount);
      scene.add(particles);
    }

    // Initialize geometric shapes
    let shapes: Array<{ mesh: THREE.Mesh; rotationSpeed: number }> | undefined;
    if (enableGeometry) {
      shapes = createGeometry(scene);
    }

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      shapes,
      animationId: 0,
      mouseX: 0,
      mouseY: 0,
    };

    onReady?.();
  }, [enableParticles, enableGeometry, particleCount, onReady]);

  const createParticles = (count: number): THREE.Points => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let i = 0; i < count; i++) {
      vertices.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);

      const color = new THREE.Color();
      color.setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    return new THREE.Points(geometry, material);
  };

  const createGeometry = (scene: THREE.Scene): Array<{ mesh: THREE.Mesh; rotationSpeed: number }> => {
    const shapes: Array<{ mesh: THREE.Mesh; rotationSpeed: number }> = [];

    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.TorusGeometry(50 + i * 20, 10, 8, 16);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.7 + i * 0.1, 0.8, 0.5),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const torus = new THREE.Mesh(geometry, material);
      torus.position.set((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 200);
      torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      scene.add(torus);
      shapes.push({ mesh: torus, rotationSpeed: 0.005 + Math.random() * 0.01 });
    }

    return shapes;
  };

  const animate = useCallback(() => {
    if (!sceneRef.current) return;

    const { scene, camera, renderer, particles, shapes } = sceneRef.current;

    sceneRef.current.animationId = requestAnimationFrame(animate);

    const time = Date.now() * 0.0005;

    // Animate particles
    if (particles) {
      particles.rotation.x = time * 0.25;
      particles.rotation.y = time * 0.5;
      particles.position.x += (sceneRef.current.mouseX - particles.position.x) * 0.05;
      particles.position.y += (-sceneRef.current.mouseY - particles.position.y) * 0.05;
    }

    // Animate geometric shapes
    if (shapes) {
      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed;
        shape.mesh.rotation.y += shape.rotationSpeed * 0.7;
        shape.mesh.position.y += Math.sin(time + shape.mesh.position.x * 0.01) * 0.5;
      });
    }

    // Camera movement
    camera.position.x += (sceneRef.current.mouseX - camera.position.x) * 0.05;
    camera.position.y += (-sceneRef.current.mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!sceneRef.current) return;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    sceneRef.current.mouseX = (event.clientX - windowHalfX) * 0.5;
    sceneRef.current.mouseY = (event.clientY - windowHalfY) * 0.5;
  }, []);

  const handleResize = useCallback(() => {
    if (!sceneRef.current) return;

    const { camera, renderer } = sceneRef.current;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const handleScroll = useCallback(() => {
    if (!sceneRef.current?.particles) return;

    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    sceneRef.current.particles.rotation.z = scrollPercent * Math.PI * 2;
  }, []);

  useEffect(() => {
    initScene();

    if (sceneRef.current) {
      animate();
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // Cleanup
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        // Dispose resources
        if (sceneRef.current.particles) {
          sceneRef.current.particles.geometry.dispose();
          (sceneRef.current.particles.material as THREE.Material).dispose();
        }

        if (sceneRef.current.shapes) {
          sceneRef.current.shapes.forEach((shape) => {
            shape.mesh.geometry.dispose();
            (shape.mesh.material as THREE.Material).dispose();
          });
        }

        sceneRef.current.renderer.dispose();

        if (mountRef.current && sceneRef.current.renderer.domElement) {
          mountRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [initScene, animate, handleMouseMove, handleResize, handleScroll]);

  return { mountRef, sceneRef };
}
