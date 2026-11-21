/**
 * ============================================================================
 * FITQUEST — THE GAMIFIED FITNESS PROGRESS TRACKING APPLICATION
 * World-Class Creative 3D & Interactive Motion Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // Register GSAP ScrollTrigger
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* --------------------------------------------------------------------------
     1. PROCEDURAL WEB AUDIO SYNTHESIZER ENGINE
     Synthesizes futuristic UI blips, chimes, and ambient drones natively.
     -------------------------------------------------------------------------- */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = true;
      this.droneOsc = null;
      this.droneGain = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.init();
      this.isMuted = !this.isMuted;
      if (!this.isMuted) {
        this.startAmbientDrone();
        this.playChime();
      } else {
        this.stopAmbientDrone();
      }
      return !this.isMuted;
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio tone failed', e);
      }
    }

    playHover() {
      this.playTone(880, 'sine', 0.05, 0.02);
    }

    playClick() {
      this.playTone(520, 'triangle', 0.08, 0.04);
    }

    playChime() {
      if (this.isMuted || !this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 'sine', 0.25, 0.05);
        }, idx * 70);
      });
    }

    startAmbientDrone() {
      if (this.droneOsc || !this.ctx) return;
      try {
        this.droneOsc = this.ctx.createOscillator();
        this.droneGain = this.ctx.createGain();
        this.droneOsc.type = 'sine';
        this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A1 sub-harmonic
        this.droneGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        this.droneGain.gain.exponentialRampToValueAtTime(0.015, this.ctx.currentTime + 3);
        this.droneOsc.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);
        this.droneOsc.start();
      } catch (e) {
        console.warn('Drone start failed', e);
      }
    }

    stopAmbientDrone() {
      if (!this.droneOsc || !this.ctx) return;
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.droneOsc) {
            this.droneOsc.stop();
            this.droneOsc.disconnect();
            this.droneOsc = null;
            this.droneGain = null;
          }
        }, 500);
      } catch (e) {
        console.warn('Drone stop failed', e);
      }
    }
  }

  const sound = new SoundEngine();

  // Audio Toggle UI
  const soundBtn = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const soundIcon = document.getElementById('sound-icon');
  const soundPing = document.getElementById('sound-ping');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const active = sound.toggle();
      if (active) {
        soundLabel.textContent = 'AUDIO: LIVE';
        soundLabel.classList.add('text-neon');
        soundIcon.setAttribute('data-lucide', 'volume-2');
        soundPing.classList.remove('hidden');
      } else {
        soundLabel.textContent = 'AUDIO: MUTED';
        soundLabel.classList.remove('text-neon');
        soundIcon.setAttribute('data-lucide', 'volume-x');
        soundPing.classList.add('hidden');
      }
      lucide.createIcons();
    });
  }

  // Attach hover sound to interactive elements
  document.querySelectorAll('button, a, .streak-btn, .exercise-btn, .trainer-card').forEach((el) => {
    el.addEventListener('mouseenter', () => sound.playHover());
    el.addEventListener('click', () => sound.playClick());
  });


  /* --------------------------------------------------------------------------
     2. MAIN 3D HOLO-CORE SCENE (THREE.JS)
     Concentric gyroscopic rings, pulsing streak flame core, 1,200 particle swarm.
     -------------------------------------------------------------------------- */
  class MainScene3D {
    constructor() {
      this.container = document.getElementById('webgl-container');
      if (!this.container || typeof THREE === 'undefined') return;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      this.camera.position.set(0, 0, 10);

      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      this.container.appendChild(this.renderer.domElement);

      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.clock = new THREE.Clock();

      this.initObjects();
      this.initLights();
      this.initEvents();
      this.initScrollChoreography();
      this.animate();
    }

    initObjects() {
      this.coreGroup = new THREE.Group();
      this.scene.add(this.coreGroup);

      // Ring 1 (Outer Gyroscope - Brushed Titanium with Neon Cyan Edge)
      const ringGeom1 = new THREE.TorusGeometry(3.2, 0.045, 16, 120);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0x1a2130,
        metalness: 0.95,
        roughness: 0.15,
        emissive: 0x00F5D4,
        emissiveIntensity: 0.25
      });
      this.ring1 = new THREE.Mesh(ringGeom1, ringMat1);
      this.coreGroup.add(this.ring1);

      // Ring 2 (Middle Gyroscope - Ember Flame Edge)
      const ringGeom2 = new THREE.TorusGeometry(2.5, 0.05, 16, 100);
      const ringMat2 = new THREE.MeshStandardMaterial({
        color: 0x221314,
        metalness: 0.95,
        roughness: 0.2,
        emissive: 0xFF6B00,
        emissiveIntensity: 0.35
      });
      this.ring2 = new THREE.Mesh(ringGeom2, ringMat2);
      this.ring2.rotation.x = Math.PI / 3;
      this.coreGroup.add(this.ring2);

      // Ring 3 (Inner Gyroscope - Ultraviolet Edge)
      const ringGeom3 = new THREE.TorusGeometry(1.8, 0.04, 16, 80);
      const ringMat3 = new THREE.MeshStandardMaterial({
        color: 0x1f102e,
        metalness: 0.9,
        roughness: 0.25,
        emissive: 0x8A2BE2,
        emissiveIntensity: 0.3
      });
      this.ring3 = new THREE.Mesh(ringGeom3, ringMat3);
      this.ring3.rotation.y = Math.PI / 4;
      this.coreGroup.add(this.ring3);

      // Central Pulsing Streak Flame Core (Wireframe + Emissive Sphere)
      const coreGeom = new THREE.IcosahedronGeometry(0.9, 3);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xFF3366,
        emissive: 0xFF6B00,
        emissiveIntensity: 1.5,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      this.flameCore = new THREE.Mesh(coreGeom, coreMat);
      this.coreGroup.add(this.flameCore);

      // Inner Glowing Seed
      const innerSeedGeom = new THREE.SphereGeometry(0.5, 32, 32);
      const innerSeedMat = new THREE.MeshBasicMaterial({
        color: 0xFFB800,
        transparent: true,
        opacity: 0.9
      });
      this.innerSeed = new THREE.Mesh(innerSeedGeom, innerSeedMat);
      this.coreGroup.add(this.innerSeed);

      // Swarm of 1,200 Interactive XP / Stardust Particles
      const particleCount = 1200;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorPalette = [
        new THREE.Color(0x00F5D4), // Cyan
        new THREE.Color(0xFF6B00), // Streak
        new THREE.Color(0xFF2E55), // Flame
        new THREE.Color(0x8A2BE2)  // Ultraviolet
      ];

      for (let i = 0; i < particleCount; i++) {
        const radius = 3.5 + Math.random() * 6.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = chosenColor.r;
        colors[i * 3 + 1] = chosenColor.g;
        colors[i * 3 + 2] = chosenColor.b;
      }

      const particleGeom = new THREE.BufferGeometry();
      particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });

      this.particles = new THREE.Points(particleGeom, particleMat);
      this.scene.add(this.particles);
    }

    initLights() {
      const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      this.scene.add(ambient);

      // Key Light: Bioluminescent Cyan
      this.cyanLight = new THREE.PointLight(0x00F5D4, 3.5, 20);
      this.cyanLight.position.set(5, 4, 6);
      this.scene.add(this.cyanLight);

      // Rim Light: Ember Streak Flame
      this.flameLight = new THREE.PointLight(0xFF6B00, 4.0, 20);
      this.flameLight.position.set(-6, -4, 4);
      this.scene.add(this.flameLight);
    }

    initEvents() {
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      });
    }

    initScrollChoreography() {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      // Section 1: Hero to Manifesto — Pull camera back, expand rings
      gsap.to(this.coreGroup.position, {
        scrollTrigger: {
          trigger: '#manifesto',
          start: 'top bottom',
          end: 'top top',
          scrub: 1.2
        },
        x: -2.8,
        y: 0.4,
        z: -2.5
      });

      // Section 2: Streaks & XP — Rotate and center flame
      gsap.to(this.coreGroup.rotation, {
        scrollTrigger: {
          trigger: '#streaks',
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5
        },
        x: Math.PI * 0.4,
        y: Math.PI * 0.8,
        z: 0.3
      });

      // Section 3: 3D Biomechanics — Shift core off-stage to let 3D Guide take focus
      gsap.to(this.coreGroup.position, {
        scrollTrigger: {
          trigger: '#biomechanics',
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5
        },
        x: 4.5,
        y: -1.2,
        z: -6
      });

      // Section 4: Trainer Uplink — Wide isometric view
      gsap.to(this.coreGroup.position, {
        scrollTrigger: {
          trigger: '#trainer-uplink',
          start: 'top bottom',
          end: 'center center',
          scrub: 1.5
        },
        x: -3.8,
        y: 1.0,
        z: -4
      });

      // Section 5: Leaderboard — Center orbital perspective
      gsap.to(this.coreGroup.position, {
        scrollTrigger: {
          trigger: '#leaderboard',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.5
        },
        x: 0,
        y: -0.5,
        z: -1
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Mouse Lerp Smooth Damping
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      // Rotate Gyroscope Rings with independent speeds
      if (this.ring1) {
        this.ring1.rotation.x += delta * 0.45;
        this.ring1.rotation.y += delta * 0.3;
      }
      if (this.ring2) {
        this.ring2.rotation.y -= delta * 0.55;
        this.ring2.rotation.z += delta * 0.25;
      }
      if (this.ring3) {
        this.ring3.rotation.z += delta * 0.65;
        this.ring3.rotation.x -= delta * 0.35;
      }

      // Pulsing Flame Core
      if (this.flameCore) {
        const pulse = 1 + Math.sin(time * 3.5) * 0.08;
        this.flameCore.scale.set(pulse, pulse, pulse);
        this.flameCore.rotation.y += delta * 0.8;
      }

      if (this.innerSeed) {
        const seedPulse = 1 + Math.cos(time * 5) * 0.12;
        this.innerSeed.scale.set(seedPulse, seedPulse, seedPulse);
      }

      // Swirl Stardust Particles
      if (this.particles) {
        this.particles.rotation.y += delta * 0.06;
        this.particles.rotation.x = this.mouse.y * 0.15;
      }

      // Parallax Tilt on Core
      this.coreGroup.rotation.y = this.mouse.x * 0.4;
      this.coreGroup.rotation.x = -this.mouse.y * 0.4;

      this.renderer.render(this.scene, this.camera);
    }
  }


  /* --------------------------------------------------------------------------
     3. 3D BIOMECHANICAL EXERCISE VIEWER (CANVAS)
     Renders a 3D procedural anatomical wireframe athlete demonstrating form.
     -------------------------------------------------------------------------- */
  class BiomechanicsViewer {
    constructor() {
      this.canvas = document.getElementById('biomechanics-canvas');
      if (!this.canvas || typeof THREE === 'undefined') return;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(40, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 50);
      this.camera.position.set(0, 1.2, 5.5);

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.currentExercise = 'squat'; // 'squat', 'deadlift', 'bench'
      this.clock = new THREE.Clock();

      // Mouse Drag Orbit
      this.isDragging = false;
      this.prevMouse = { x: 0, y: 0 };
      this.orbitRotation = { x: 0.1, y: 0.35 };

      this.initFigure();
      this.initEvents();
      this.animate();
    }

    initFigure() {
      this.figureGroup = new THREE.Group();
      this.scene.add(this.figureGroup);

      // Grid Floor Platform
      const grid = new THREE.GridHelper(6, 12, 0x00F5D4, 0x141724);
      grid.position.y = -1.2;
      this.scene.add(grid);

      // Material for Anatomical Segments
      this.boneMat = new THREE.MeshStandardMaterial({
        color: 0x00F5D4,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x00F5D4,
        emissiveIntensity: 0.3
      });

      this.jointMat = new THREE.MeshStandardMaterial({
        color: 0xFF6B00,
        emissive: 0xFF6B00,
        emissiveIntensity: 0.6
      });

      this.barbellMat = new THREE.MeshStandardMaterial({
        color: 0xE2E8F0,
        metalness: 0.95,
        roughness: 0.1
      });

      // Procedural Skeletal Segments
      // Torso & Spine
      const spineGeom = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 16);
      this.spine = new THREE.Mesh(spineGeom, this.boneMat);
      this.figureGroup.add(this.spine);

      // Head
      const headGeom = new THREE.SphereGeometry(0.2, 24, 24);
      this.head = new THREE.Mesh(headGeom, this.boneMat);
      this.head.position.y = 0.8;
      this.figureGroup.add(this.head);

      // Pelvis / Hip Joint
      const hipGeom = new THREE.SphereGeometry(0.14, 16, 16);
      this.hipJoint = new THREE.Mesh(hipGeom, this.jointMat);
      this.hipJoint.position.y = -0.6;
      this.figureGroup.add(this.hipJoint);

      // Left & Right Femur (Thighs)
      const femurGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.8, 16);
      this.leftThigh = new THREE.Mesh(femurGeom, this.boneMat);
      this.rightThigh = new THREE.Mesh(femurGeom, this.boneMat);
      this.figureGroup.add(this.leftThigh);
      this.figureGroup.add(this.rightThigh);

      // Left & Right Tibia (Shins)
      const shinGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16);
      this.leftShin = new THREE.Mesh(shinGeom, this.boneMat);
      this.rightShin = new THREE.Mesh(shinGeom, this.boneMat);
      this.figureGroup.add(this.leftShin);
      this.figureGroup.add(this.rightShin);

      // Left & Right Knees
      const kneeGeom = new THREE.SphereGeometry(0.1, 16, 16);
      this.leftKnee = new THREE.Mesh(kneeGeom, this.jointMat);
      this.rightKnee = new THREE.Mesh(kneeGeom, this.jointMat);
      this.figureGroup.add(this.leftKnee);
      this.figureGroup.add(this.rightKnee);

      // Barbell
      const barGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.6, 16);
      this.barbell = new THREE.Mesh(barGeom, this.barbellMat);
      this.barbell.rotation.z = Math.PI / 2;
      this.figureGroup.add(this.barbell);

      // Plates
      const plateGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24);
      const leftPlate = new THREE.Mesh(plateGeom, this.jointMat);
      leftPlate.rotation.z = Math.PI / 2;
      leftPlate.position.x = -1.15;
      this.barbell.add(leftPlate);

      const rightPlate = new THREE.Mesh(plateGeom, this.jointMat);
      rightPlate.rotation.z = Math.PI / 2;
      rightPlate.position.x = 1.15;
      this.barbell.add(rightPlate);

      // Key Lighting
      const light1 = new THREE.PointLight(0x00F5D4, 2.0, 10);
      light1.position.set(2, 3, 3);
      this.scene.add(light1);

      const light2 = new THREE.PointLight(0xFF6B00, 2.5, 10);
      light2.position.set(-2, -1, 3);
      this.scene.add(light2);

      const amb = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(amb);
    }

    setExercise(name) {
      this.currentExercise = name;
      sound.playChime();
    }

    initEvents() {
      const resize = () => {
        if (!this.canvas) return;
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
      };
      window.addEventListener('resize', resize);

      // Mouse Drag Orbit
      this.canvas.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.prevMouse = { x: e.clientX, y: e.clientY };
      });
      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.prevMouse.x;
        const dy = e.clientY - this.prevMouse.y;
        this.orbitRotation.y += dx * 0.01;
        this.orbitRotation.x = Math.max(-0.5, Math.min(0.5, this.orbitRotation.x + dy * 0.01));
        this.prevMouse = { x: e.clientX, y: e.clientY };
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      const t = this.clock.getElapsedTime();

      // Kinematic Rig Calculations based on Current Exercise
      let kneeAngleVal = '90°';
      let hipHingeVal = '45°';
      let spineVal = 'NEUTRAL';

      if (this.currentExercise === 'squat') {
        // Squat cycle: 0 -> deep parallel -> 0
        const squatPhase = (Math.sin(t * 2.2) + 1) / 2; // 0 to 1
        const yOffset = -squatPhase * 0.65;

        // Position torso & bar
        this.spine.position.y = 0.2 + yOffset;
        this.head.position.y = 0.95 + yOffset;
        this.barbell.position.set(0, 0.65 + yOffset, 0);

        // Hips & Thighs
        this.hipJoint.position.set(0, -0.4 + yOffset, -squatPhase * 0.25);
        this.leftThigh.position.set(-0.35, -0.65 + yOffset * 0.7, -squatPhase * 0.15);
        this.rightThigh.position.set(0.35, -0.65 + yOffset * 0.7, -squatPhase * 0.15);

        this.leftThigh.rotation.x = -squatPhase * 1.1;
        this.rightThigh.rotation.x = -squatPhase * 1.1;

        // Knees & Shins
        this.leftKnee.position.set(-0.35, -0.9 + yOffset * 0.4, squatPhase * 0.2);
        this.rightKnee.position.set(0.35, -0.9 + yOffset * 0.4, squatPhase * 0.2);

        this.leftShin.position.set(-0.35, -1.05 + yOffset * 0.2, 0.1);
        this.rightShin.position.set(0.35, -1.05 + yOffset * 0.2, 0.1);

        const currentDeg = Math.round(180 - squatPhase * 88);
        kneeAngleVal = `${currentDeg}°`;
        hipHingeVal = `${Math.round(20 + squatPhase * 55)}°`;
      } else if (this.currentExercise === 'deadlift') {
        const deadPhase = (Math.sin(t * 1.8) + 1) / 2;
        const hipHinge = deadPhase * 0.85;

        this.spine.rotation.x = hipHinge;
        this.spine.position.set(0, 0.1 - deadPhase * 0.35, -deadPhase * 0.3);
        this.head.position.set(0, 0.7 - deadPhase * 0.3, -deadPhase * 0.5);
        this.barbell.position.set(0, -0.8 + (1 - deadPhase) * 0.7, 0.4);

        kneeAngleVal = `${Math.round(155 - deadPhase * 35)}°`;
        hipHingeVal = `${Math.round(15 + deadPhase * 75)}°`;
      } else if (this.currentExercise === 'bench') {
        // Bench Press mode: Barbell moves vertically over chest
        const pressPhase = (Math.sin(t * 2.5) + 1) / 2;
        this.spine.rotation.x = -Math.PI / 2;
        this.spine.position.set(0, -0.2, 0);
        this.head.position.set(0, -0.2, -0.7);
        this.barbell.position.set(0, -0.1 + pressPhase * 0.7, 0.1);

        kneeAngleVal = '90° FIXED';
        hipHingeVal = '0° SUPINE';
        spineVal = 'ARCH LOCKED';
      }

      // Update Live Telemetry in DOM
      const kneeEl = document.getElementById('telemetry-knee');
      const hipEl = document.getElementById('telemetry-hip');
      const spineEl = document.getElementById('telemetry-spine');
      if (kneeEl) kneeEl.textContent = kneeAngleVal;
      if (hipEl) hipEl.textContent = hipHingeVal;
      if (spineEl) spineEl.textContent = spineVal;

      // Apply Orbit Rotations
      this.figureGroup.rotation.y = this.orbitRotation.y;
      this.figureGroup.rotation.x = this.orbitRotation.x;

      this.renderer.render(this.scene, this.camera);
    }
  }


  /* --------------------------------------------------------------------------
     4. GAMIFICATION ENGINE (STREAKS & XP)
     Interactive day-streak switcher, level-up calculations, and perks.
     -------------------------------------------------------------------------- */
  const streakData = {
    '7': {
      title: '7-DAY CONTINUOUS FLAME',
      tier: 'TIER 2 // EMBER KNIGHT',
      multiplier: '1.5X XP BOOST',
      xp: '3,500 / 5,000 XP',
      bar: '70%',
      desc: 'Your habit loop has stabilized. Early morning workout reminders and 1x Emergency Streak Freeze token unlocked.',
      perks: [
        { icon: 'shield', text: '1x Streak Freeze Shield / Week', color: 'text-streak' },
        { icon: 'award', text: '"Iron Spark" Profile Badge', color: 'text-neon' },
        { icon: 'zap', text: 'Daily Consistency Quests Unlocked', color: 'text-flame' }
      ]
    },
    '30': {
      title: '30-DAY HABIT TITAN',
      tier: 'TIER 3 // SOLAR CENTURION',
      multiplier: '2.0X XP BOOST',
      xp: '15,000 / 20,000 XP',
      bar: '85%',
      desc: 'The critical drop-out barrier is shattered. Permanent neuro-pathway habit formation verified by fitness analytics.',
      perks: [
        { icon: 'shield', text: '2x Streak Freeze Shields / Week', color: 'text-streak' },
        { icon: 'award', text: '"Centurion Flame" Holographic Banner', color: 'text-neon' },
        { icon: 'video', text: '1x Free Certified Trainer Video Call', color: 'text-ultraviolet' }
      ]
    },
    '100': {
      title: '100-DAY CENTURY INFERNO',
      tier: 'TIER 4 // OBSIDIAN OVERLORD',
      multiplier: '3.0X XP BOOST',
      xp: '65,000 / 80,000 XP',
      bar: '92%',
      desc: 'Top 3% of global fitness athletes. Custom animated 3D avatar aura unlocked in squad and gym leaderboards.',
      perks: [
        { icon: 'flame', text: 'Eternal Streak Protection Shield', color: 'text-streak' },
        { icon: 'trophy', text: 'Golden Barbell 3D Profile Relic', color: 'text-neon' },
        { icon: 'users', text: 'Found Guild Raid Battles & Tournaments', color: 'text-flame' }
      ]
    },
    '365': {
      title: '365-DAY APEX LEGEND',
      tier: 'TIER 5 // IMMORTAL TITAN',
      multiplier: '5.0X XP BOOST',
      xp: '280,000 / 300,000 XP',
      bar: '98%',
      desc: 'Transcendence achieved. One full uninterrupted year of physical mastery. Lifetime recognition in the Hall of Apex.',
      perks: [
        { icon: 'crown', text: 'Immortal Apex Trophy & Physical Ring', color: 'text-streak' },
        { icon: 'star', text: 'Global Hall of Fame Permanent Entry', color: 'text-neon' },
        { icon: 'infinity', text: 'VIP Access to All Certified Masterclasses', color: 'text-ultraviolet' }
      ]
    }
  };

  function setupStreakSelector() {
    const buttons = document.querySelectorAll('.streak-btn');
    const titleEl = document.getElementById('tier-title');
    const badgeEl = document.getElementById('tier-badge-label');
    const multEl = document.getElementById('tier-multiplier');
    const xpEl = document.getElementById('tier-xp-counter');
    const barEl = document.getElementById('tier-xp-bar');
    const descEl = document.getElementById('tier-desc');
    const perk1 = document.getElementById('perk-1');
    const perk2 = document.getElementById('perk-2');
    const perk3 = document.getElementById('perk-3');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          b.classList.remove('active');
          b.classList.add('text-mutedText');
        });
        btn.classList.add('active');
        btn.classList.remove('text-mutedText');

        const days = btn.getAttribute('data-days');
        const data = streakData[days];
        if (!data) return;

        titleEl.textContent = data.title;
        badgeEl.textContent = data.tier;
        multEl.textContent = data.multiplier;
        xpEl.textContent = data.xp;
        barEl.style.width = data.bar;
        descEl.textContent = data.desc;

        if (perk1) perk1.innerHTML = `<i data-lucide="${data.perks[0].icon}" class="w-4 h-4 ${data.perks[0].color}"></i> ${data.perks[0].text}`;
        if (perk2) perk2.innerHTML = `<i data-lucide="${data.perks[1].icon}" class="w-4 h-4 ${data.perks[1].color}"></i> ${data.perks[1].text}`;
        if (perk3) perk3.innerHTML = `<i data-lucide="${data.perks[2].icon}" class="w-4 h-4 ${data.perks[2].color}"></i> ${data.perks[2].text}`;

        lucide.createIcons();
        sound.playChime();
      });
    });
  }


  /* --------------------------------------------------------------------------
     5. EXERCISE PROTOCOL GUIDE & 3D SWITCHER
     -------------------------------------------------------------------------- */
  const exerciseDetails = {
    squat: {
      hud: 'EXERCISE: BARBELL SQUAT',
      title: 'Anatomical Squat Protocol',
      points: [
        { num: '01. Foot Rooting & Arch', status: 'VERIFIED', desc: 'Tripod pressure on heel, big toe, and pinky toe. Knees track in line with 2nd toe.' },
        { num: '02. Pelvic Neutrality', status: 'VERIFIED', desc: 'Brace intra-abdominal pressure before descent; prevent butt wink at bottom pocket.' },
        { num: '03. Vertical Bar Path', status: 'CALIBRATED', desc: 'Kinematic vector remains locked over mid-foot throughout eccentric & concentric phase.' }
      ]
    },
    deadlift: {
      hud: 'EXERCISE: CONVENTIONAL DEADLIFT',
      title: 'Posterior Chain Hinge Protocol',
      points: [
        { num: '01. Shin Angle & Wedging', status: 'VERIFIED', desc: 'Shins touching bar; hips wedged between shoulders and knees at setup.' },
        { num: '02. Lat Engagement', status: 'VERIFIED', desc: 'Pull slack out of the barbell by depressing scapulae and flexing lats.' },
        { num: '03. Leg Drive Off Floor', status: 'CALIBRATED', desc: 'Push floor away; ensure knees and hips extend simultaneously.' }
      ]
    },
    bench: {
      hud: 'EXERCISE: COMPETITION BENCH PRESS',
      title: 'Pectoral Force Transmission',
      points: [
        { num: '01. Scapular Retraction', status: 'VERIFIED', desc: 'Retract and depress shoulder blades into bench to protect rotator cuff.' },
        { num: '02. Leg Drive Anchoring', status: 'VERIFIED', desc: 'Drive heels downward to transmit kinetic stability through core and pelvis.' },
        { num: '03. Touchpoint & Bar Arc', status: 'CALIBRATED', desc: 'Touch lower sternum and press back toward eyes in J-curve trajectory.' }
      ]
    }
  };

  function setupExerciseControls(bioViewer) {
    const buttons = document.querySelectorAll('.exercise-btn');
    const hudName = document.getElementById('hud-exercise-name');
    const title = document.getElementById('form-guide-title');
    const checkList = document.getElementById('form-checkpoints-list');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => {
          b.classList.remove('active');
          b.classList.add('text-mutedText');
        });
        btn.classList.add('active');
        btn.classList.remove('text-mutedText');

        const ex = btn.getAttribute('data-exercise');
        if (bioViewer) bioViewer.setExercise(ex);

        const data = exerciseDetails[ex];
        if (hudName) hudName.textContent = data.hud;
        if (title) title.textContent = data.title;

        if (checkList && data.points) {
          checkList.innerHTML = data.points.map((pt) => `
            <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <div class="flex items-center justify-between text-xs font-mono">
                <span class="text-white font-semibold">${pt.num}</span>
                <span class="${pt.status === 'VERIFIED' ? 'text-neon' : 'text-streak'}">${pt.status}</span>
              </div>
              <p class="text-[11px] text-mutedText leading-relaxed">${pt.desc}</p>
            </div>
          `).join('');
        }
      });
    });
  }


  /* --------------------------------------------------------------------------
     6. TRAINER UPLINK ROSTER SWITCHER
     -------------------------------------------------------------------------- */
  function setupTrainerRoster() {
    const cards = document.querySelectorAll('.trainer-card');
    const callName = document.getElementById('trainer-call-name');
    const callSpec = document.getElementById('trainer-call-specialty');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        cards.forEach((c) => {
          c.classList.remove('active', 'border-neon/40', 'bg-surfaceLight/80');
          c.classList.add('border-white/10', 'bg-surface/80');
        });
        card.classList.add('active', 'border-neon/40', 'bg-surfaceLight/80');
        card.classList.remove('border-white/10', 'bg-surface/80');

        const name = card.getAttribute('data-name');
        const spec = card.getAttribute('data-spec');
        if (callName) callName.textContent = name;
        if (callSpec) callSpec.textContent = spec;

        sound.playChime();
      });
    });
  }


  /* --------------------------------------------------------------------------
     7. LIVE UTC CLOCK & MODAL INTERACTIONS
     -------------------------------------------------------------------------- */
  function updateClock() {
    const clockEl = document.getElementById('live-utc-clock');
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getUTCHours()).padStart(2, '0');
    const mins = String(now.getUTCMinutes()).padStart(2, '0');
    const secs = String(now.getUTCSeconds()).padStart(2, '0');
    clockEl.textContent = `UTC ${hrs}:${mins}:${secs}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Modal handlers
  window.openModal = function (id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.add('modal-active');
      sound.playClick();
    }
  };

  window.closeModal = function (id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.remove('modal-active');
      sound.playClick();
    }
  };

  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const form = document.getElementById('quest-form');
    const success = document.getElementById('form-success');
    if (form && success) {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      sound.playChime();
    }
  };


  /* --------------------------------------------------------------------------
     8. APP INITIALIZATION LIFECYCLE
     -------------------------------------------------------------------------- */
  window.addEventListener('DOMContentLoaded', () => {
    // Start persistent 3D Holo-Core background scene
    new MainScene3D();

    // Start 3D Biomechanics Kinematics Viewer
    const bioViewer = new BiomechanicsViewer();

    // Setup interactive modules
    setupStreakSelector();
    setupExerciseControls(bioViewer);
    setupTrainerRoster();

    console.log('⚡ FitQuest Cinematic 3D Engine initialized successfully.');
  });

})();
