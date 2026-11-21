# FitQuest — The Gamified Fitness Odyssey ⚡🔥

> **Award-Winning Cinematic 3D Experience for FitQuest: A Gamified Fitness Progress Tracking Application.**
> Inspired by habit-forming design patterns (Duolingo), combined with interactive 3D exercise biomechanics and on-demand certified trainer video calls.

---

## 🌟 Key Highlights & Synopsis Realization

This website implements the vision outlined in the **FitQuest Project Synopsis**:

1. **Persistent 3D Holo-Core & Streak Flame (Three.js WebGL)**:
   - Multi-axis gyroscopic rings constructed with brushed titanium and bioluminescent neon emissive shaders.
   - Pulsing central **Streak Flame Core** reflecting user workout streaks.
   - Dynamic 1,200 particle stardust swarm with mouse-following parallax and camera choreography synced to scroll depth via **GSAP ScrollTrigger**.

2. **Interactive 3D Biomechanics & Form Guide**:
   - Real-time procedural 3D wireframe human kinematic figure demonstrating optimal exercise form at 60 FPS.
   - Switch between **Barbell Back Squat**, **Conventional Deadlift**, and **Competition Bench Press**.
   - Real-time dynamic joint angle readouts (Knee angle, Hip hinge, Spine neutrality) and cadence guides.
   - Interactive 360° mouse drag orbit around the athlete.

3. **Duolingo-Class Habit & Streak Engine**:
   - Interactive milestone switcher (7, 30, 100, 365 Days) showing unlocked tier badges, XP multipliers, and streak freeze protections.

4. **Live Expert Video Uplink (WebRTC Simulation)**:
   - 1-on-1 on-demand coaching interface connecting athletes with CSCS certified trainers and physiotherapists.
   - Interactive trainer roster with live audio waveform simulation.

5. **Real-time Redis Leaderboard**:
   - Global, Guild Squad, and Gym Club ranking table with highlighted personal athlete placement.

6. **Web Audio Synthesizer**:
   - Native procedural Web Audio API sound engine (hover blips, button clicks, level-up fanfares, and ambient spatial drone) with sound toggle in the bottom right corner.

---

## 🚀 How to Run

### Method 1: Instant Browser View (Zero Install)
Simply double-click or open [`index.html`](file:///c:/Users/bhatl/Downloads/FITQUEST/index.html) in any modern web browser (Chrome, Edge, Firefox, Safari). All libraries (Three.js, GSAP, Tailwind, Lucide) load via CDN with zero build steps required.

### Method 2: Local Static Server
Run with Python or Node:
```bash
# Using Python
python -m http.server 3000

# Using npx
npx serve .

# Using Vite
npm install
npm run dev
```
Then navigate to `http://localhost:3000` (or `http://localhost:5173`).
