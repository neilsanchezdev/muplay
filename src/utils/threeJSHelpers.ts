// src/utils/threeJSHelpers.ts
import * as THREE from 'three';

export class ThreeJSHelpers {
  static createMusicVisualizationParticles(count: number = 2000): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < count; i++) {
      // Create spherical distribution for more musical feel
      const radius = 200 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      vertices.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      // Musical color palette - purples, blues, magentas
      const hue = 0.7 + Math.random() * 0.3; // Purple to magenta range
      const saturation = 0.6 + Math.random() * 0.4;
      const lightness = 0.4 + Math.random() * 0.4;

      const color = new THREE.Color();
      color.setHSL(hue, saturation, lightness);
      colors.push(color.r, color.g, color.b);

      // Varying particle sizes for depth
      sizes.push(1 + Math.random() * 4);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return new THREE.Points(geometry, material);
  }

  static createVinylRecordGeometry(): THREE.Mesh {
    const geometry = new THREE.RingGeometry(40, 80, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });

    const vinyl = new THREE.Mesh(geometry, material);

    // Add grooves
    const grooveGeometry = new THREE.RingGeometry(42, 43, 32);
    const grooveMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < 8; i++) {
      const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
      groove.position.z = 0.1;
      groove.scale.setScalar(1 + i * 0.05);
      vinyl.add(groove);
    }

    return vinyl;
  }

  static createSoundWaveGeometry(): THREE.Line {
    const points = [];
    const amplitude = 50;
    const frequency = 0.1;

    for (let i = 0; i < 200; i++) {
      const x = i * 2 - 200;
      const y = Math.sin(x * frequency) * amplitude * (Math.random() * 0.5 + 0.5);
      points.push(new THREE.Vector3(x, y, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(0.8, 0.8, 0.6),
      transparent: true,
      opacity: 0.7,
    });

    return new THREE.Line(geometry, material);
  }

  static updateParticlesWithAudio(particles: THREE.Points, audioData?: Uint8Array): void {
    if (!audioData) return;

    const positions = particles.geometry.attributes.position.array as Float32Array;
    const colors = particles.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const audioIndex = Math.floor((i / 3) % audioData.length);
      const audioValue = audioData[audioIndex] / 255;

      // Modify particle positions based on audio
      positions[i + 1] += (audioValue - 0.5) * 2; // Y position

      // Modify colors based on audio intensity
      const intensity = audioValue * 0.5 + 0.5;
      colors[i] = intensity; // R
      colors[i + 1] = intensity * 0.8; // G
      colors[i + 2] = intensity * 1.2; // B
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;
  }

  static disposeMaterial(material: THREE.Material | THREE.Material[]): void {
    if (Array.isArray(material)) {
      material.forEach((mat) => mat.dispose());
    } else {
      material.dispose();
    }
  }

  static disposeGeometry(geometry: THREE.BufferGeometry): void {
    geometry.dispose();
  }

  static disposeObject3D(object: THREE.Object3D): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          this.disposeGeometry(child.geometry);
        }
        if (child.material) {
          this.disposeMaterial(child.material);
        }
      }
    });
  }
}
