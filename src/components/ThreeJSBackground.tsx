// src/components/ThreeJSBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJSBackgroundProps {
  className?: string;
}

export default function ThreeJSBackground({ className }: ThreeJSBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    shapes: Array<{ mesh: THREE.Mesh; rotationSpeed: number }>;
    animationId: number;
  }>();

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

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

    // Create particles
    const createParticles = () => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const colors = [];

      for (let i = 0; i < 2000; i++) {
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

    // Create geometric shapes
    const createGeometry = () => {
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

    const particles = createParticles();
    const shapes = createGeometry();
    scene.add(particles);

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.5;
      mouseY = (event.clientY - windowHalfY) * 0.5;
    };

    // Resize handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      // Animate particles
      particles.rotation.x = time * 0.25;
      particles.rotation.y = time * 0.5;
      particles.position.x += (mouseX - particles.position.x) * 0.05;
      particles.position.y += (-mouseY - particles.position.y) * 0.05;

      // Animate geometric shapes
      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed;
        shape.mesh.rotation.y += shape.rotationSpeed * 0.7;
        shape.mesh.position.y += Math.sin(time + shape.mesh.position.x * 0.01) * 0.5;
      });

      // Camera movement
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        shapes,
        animationId,
      };
    };

    // Scroll handler
    const onScroll = () => {
      const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
      particles.rotation.z = scrollPercent * Math.PI * 2;
    };

    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onScroll);

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        // Dispose geometries and materials
        sceneRef.current.particles.geometry.dispose();
        (sceneRef.current.particles.material as THREE.Material).dispose();

        sceneRef.current.shapes.forEach((shape) => {
          shape.mesh.geometry.dispose();
          (shape.mesh.material as THREE.Material).dispose();
        });

        sceneRef.current.renderer.dispose();
      }

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} style={{ zIndex: 1 }} />;
}
