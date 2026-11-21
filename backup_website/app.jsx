import React, { useState } from "react";
import TextRoll from "@/components/ui/text-roll";
import { TextScanner } from "@/components/ui/animated-text-10";
import FlashlightTextReveal from "@/components/ui/flashlight-text-reveal";
import CarouselStacked from "@/components/ui/carousel-07";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "3D Stack", href: "#carousel" },
  { name: "Biomechanics", href: "#biomechanics" },
  { name: "Streak Engine", href: "#streak" },
  { name: "Live Coaching", href: "#coaching" },
  { name: "Leaderboard", href: "#leaderboard" },
];

const exercises = {
  squat: {
    name: "Barbell Back Squat",
    angles: { knee: "92° (Parallel Depth)", hip: "45° (Hinge Neutral)", spine: "178° (Zero Flexion)" },
    tempo: "3-1-1 Strict",
    risk: "Low (Valgus Negligible)",
    status: "OPTIMAL JOINT MECHANICS",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop"
  },
  deadlift: {
    name: "Conventional Deadlift",
    angles: { knee: "128° (Wedge Angle)", hip: "62° (Tension Loaded)", spine: "180° (True Neutral)" },
    tempo: "2-0-1 Explosive",
    risk: "Protected (Zero Lumbar Shift)",
    status: "MAXIMAL LAT ENGAGEMENT",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
  },
  bench: {
    name: "Competition Bench Press",
    angles: { elbow: "75° (Safe Tuck)", scapula: "Retracted & Depressed", wrist: "Stacked Radial" },
    tempo: "3-1-X Pause Drive",
    risk: "Sub-acromial Clearance Safe",
    status: "ARCH STABILIZED",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
  }
};

const trainers = [
  { name: "Marcus Vance, CSCS", spec: "Olympic Weightlifting & Barbell Path", rating: "4.99", status: "AVAILABLE", calls: "2,410+ audited" },
  { name: "Dr. Elena Rostova, DPT", spec: "Knee Valgus & Spinal Rehabilitation", rating: "5.00", status: "ONLINE", calls: "1,890+ audited" },
  { name: "Sarah Chen, MS CPT", spec: "Hypertrophy Tempo & CNS Recovery", rating: "4.98", status: "AVAILABLE", calls: "3,120+ audited" }
];

const leaderboards = [
  { rank: 1, name: "Valkyrie_99", xp: "482,900 XP", streak: "412 Days", tier: "APEX TITAN", highlight: false },
  { rank: 2, name: "KratosLift", xp: "451,200 XP", streak: "389 Days", tier: "APEX TITAN", highlight: false },
  { rank: 3, name: "You (Athlete)", xp: "398,400 XP", streak: "365 Days", tier: "TITAN SQUAD", highlight: true },
  { rank: 4, name: "Cipher_Fit", xp: "374,100 XP", streak: "280 Days", tier: "DIAMOND", highlight: false },
  { rank: 5, name: "IronPulse", xp: "349,800 XP", streak: "245 Days", tier: "DIAMOND", highlight: false },
];

export default function App() {
  const [exercise, setExercise] = useState<"squat" | "deadlift" | "bench">("squat");
  const [viewAngle, setViewAngle] = useState("sagittal");
  const [streakDays, setStreakDays] = useState(30);
  const [callingTrainer, setCallingTrainer] = useState<(typeof trainers)[0] | null>(null);

  const currentEx = exercises[exercise];

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      
      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 bg-black min-h-screen border-b border-white/[0.08] rounded-b-3xl shadow-2xl">
        
        {/* ── 1. IMMERSIVE FLASHLIGHT TEXT REVEAL LANDING PAGE ── */}
        <main id="home" className="relative w-full min-h-screen bg-black flex flex-col justify-between">
          <FlashlightTextReveal
            text={"FITQUEST\nTRANSCEND\nYOUR\nLIMITS"}
            colors={["#000000", "#141416", "#252836"]}
            height="100vh"
            radius={0.36}
            strength={1.2}
            ghost={0.04}
            wander={true}
          >
            {/* ── HEADER WITH TEXTROLL NAVIGATION ── */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/60 border-b border-white/[0.08]">
              <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Brand */}
                <a href="#home" className="flex items-center gap-3 group">
                  <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                  <TextRoll className="font-bold text-sm tracking-tight text-white uppercase">
                    FITQUEST
                  </TextRoll>
                </a>

                {/* Navigation Items with TextRoll */}
                <nav className="hidden lg:flex items-center gap-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="py-1"
                    >
                      <TextRoll
                        center={false}
                        className="text-xs font-medium tracking-tight uppercase text-zinc-400 hover:text-white"
                      >
                        {item.name}
                      </TextRoll>
                    </a>
                  ))}
                </nav>

                {/* Primary Action Button */}
                <div className="flex items-center gap-3">
                  <a
                    href="#biomechanics"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all shadow-sm"
                  >
                    <span>Start Audit</span>
                    <span className="text-xs">→</span>
                  </a>
                </div>

              </div>
            </header>

            {/* ── MINIMAL OVERLAY ── */}
            <div className="absolute inset-0 z-30 flex flex-col justify-between items-center pointer-events-none pt-20 pb-12 px-6 text-center">
              
              {/* Top buffer */}
              <div />

              {/* Minimalist Bottom Control Cluster */}
              <div className="w-full max-w-xl flex flex-col items-center pointer-events-auto">
                <p className="text-sm md:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-6 font-normal tracking-tight">
                  Precision biomechanical telemetry and gamified habit defense.
                </p>

                <div className="flex items-center justify-center gap-3 mb-8">
                  <a
                    href="#biomechanics"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <span>Begin Audit</span>
                    <span>→</span>
                  </a>

                  <a
                    href="#leaderboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-zinc-300 hover:text-white transition-all backdrop-blur-sm"
                  >
                    <span>Leaderboard</span>
                  </a>
                </div>

                <a href="#carousel" className="text-zinc-600 hover:text-zinc-300 transition-colors" aria-label="Scroll to explore">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" /></svg>
                </a>
              </div>

            </div>
          </FlashlightTextReveal>
        </main>

        {/* ── 3. 3D STACKED CAROUSEL SECTION (CAROUSEL-07) ── */}
        <section id="carousel" className="w-full border-y border-white/[0.06] bg-black py-8">
          <CarouselStacked />
        </section>

        {/* ── 4. FEATURE 1: 3D BIOMECHANICS & FORM GUIDE ── */}
        <section id="biomechanics" className="w-full max-w-6xl mx-auto px-6 py-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                SYNOPSIS PILLAR 01 // COMPUTER VISION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Interactive 3D Biomechanics &amp; Form Guide
              </h2>
            </div>
            
            {/* Exercise Switcher */}
            <div className="flex gap-2">
              {(Object.keys(exercises) as Array<keyof typeof exercises>).map((key) => (
                <button
                  key={key}
                  onClick={() => setExercise(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                    exercise === key
                      ? "bg-white text-black font-bold shadow-md shadow-white/10"
                      : "bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white"
                  }`}
                >
                  {exercises[key].name.split(" ")[1] || exercises[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.02] p-8 rounded-3xl border border-white/[0.06]">
            
            {/* Left Telemetry Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 mb-2">
                  120 FPS Pose Vision
                </Badge>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {currentEx.name}
                </h3>
                <p className="text-xs text-zinc-400 font-normal mt-1 leading-relaxed">
                  Skeletal computer vision estimates 17 anatomical keypoints, inspecting joint neutrality, depth, and bar-path velocity vectors.
                </p>
              </div>

              {/* Dynamic Joint Angle Telemetry */}
              <div className="space-y-3 p-5 rounded-2xl bg-black border border-white/[0.08]">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/[0.06]">
                  <span>JOINT AXIS</span>
                  <span>TELEMETRY</span>
                </div>
                {Object.entries(currentEx.angles).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 uppercase">{k} ANGLE</span>
                    <span className="text-white font-bold">{v}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-white/[0.06]">
                  <span className="text-zinc-400 uppercase">TEMPO ENFORCEMENT</span>
                  <span className="text-blue-400 font-bold">{currentEx.tempo}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400 uppercase">VALGUS SAFETY</span>
                  <span className="text-emerald-400 font-bold">{currentEx.status}</span>
                </div>
              </div>

              {/* 360 Camera Angle Buttons */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>CAMERA VIEW:</span>
                {["sagittal", "frontal", "isometric"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setViewAngle(v)}
                    className={`px-2.5 py-1 rounded-md text-[10px] uppercase transition-all ${
                      viewAngle === v
                        ? "bg-white text-black font-bold"
                        : "bg-white/[0.04] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Visualizer Column */}
            <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/[0.08] h-96 lg:h-[420px] bg-zinc-950">
              <img
                src={currentEx.image}
                alt={currentEx.name}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Real-time Skeleton Overlay Mockup */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>SKELETAL 17-KEYPOINT HUD ACTIVE</span>
              </div>

              {/* Cadence Pulse */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">CADENCE GUIDE</span>
                  <span className="text-xs font-mono font-bold text-white">3s Eccentric • 1s Pause • 1s Concentric</span>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold">120 FPS SYNC</span>
              </div>
            </div>

          </div>
        </section>

        {/* ── 5. FEATURE 2: DUOLINGO-CLASS HABIT & STREAK ENGINE ── */}
        <section id="streak" className="w-full max-w-6xl mx-auto px-6 py-24 space-y-8 border-t border-white/[0.06]">
          <div className="border-b border-white/[0.08] pb-6">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              SYNOPSIS PILLAR 02 // GAMIFIED PSYCHOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Duolingo-Class Habit &amp; Streak Engine
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Zero habit dropout. Loss aversion psychology, streak freeze protection shields, and compounding XP multipliers.
            </p>
          </div>

          {/* Milestone Tabs */}
          <div className="flex flex-wrap gap-3">
            {[7, 30, 100, 365].map((d) => (
              <button
                key={d}
                onClick={() => setStreakDays(d)}
                className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase transition-all ${
                  streakDays === d
                    ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20 scale-105"
                    : "bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white"
                }`}
              >
                🔥 {d} DAYS STREAK
              </button>
            ))}
          </div>

          {/* Milestone Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
            <div className="space-y-1 p-4 rounded-2xl bg-black border border-white/[0.08]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">XP MULTIPLIER</span>
              <p className="text-2xl font-bold text-white">{streakDays === 7 ? "1.25x XP" : streakDays === 30 ? "2.0x XP" : streakDays === 100 ? "3.2x XP" : "5.0x XP (MAX)"}</p>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-black border border-white/[0.08]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">FREEZE PROTECTION</span>
              <p className="text-2xl font-bold text-blue-400">{streakDays === 7 ? "1 Shield" : streakDays === 30 ? "3 Shields" : streakDays === 100 ? "7 Shields" : "Infinite Shields"}</p>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-black border border-white/[0.08]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">UNLOCKED TIER</span>
              <p className="text-2xl font-bold text-orange-400">{streakDays === 7 ? "Novice Fire" : streakDays === 30 ? "Iron Discipline" : streakDays === 100 ? "Centurion Flame" : "Titan Immortal"}</p>
            </div>
            <div className="space-y-1 p-4 rounded-2xl bg-black border border-white/[0.08]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">DROPOUT PROBABILITY</span>
              <p className="text-2xl font-bold text-emerald-400">{streakDays === 7 ? "14.2%" : streakDays === 30 ? "3.8%" : streakDays === 100 ? "0.6%" : "0.01% (LOCKED IN)"}</p>
            </div>
          </div>
        </section>

        {/* ── 6. FEATURE 3: LIVE EXPERT VIDEO UPLINK (WEBRTC) ── */}
        <section id="coaching" className="w-full max-w-6xl mx-auto px-6 py-24 space-y-8 border-t border-white/[0.06]">
          <div className="border-b border-white/[0.08] pb-6">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              SYNOPSIS PILLAR 03 // WEBRTC TELEMEDICINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Expert Video Uplink (WebRTC Simulation)
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              1-on-1 on-demand coaching interface connecting athletes with CSCS certified trainers and physiotherapists for live rep audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainers.map((tr, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">● {tr.status}</span>
                    <span className="text-xs font-mono text-zinc-400">★ {tr.rating}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{tr.name}</h4>
                  <p className="text-xs text-zinc-400 font-normal">{tr.spec}</p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">{tr.calls}</span>
                  <button
                    onClick={() => setCallingTrainer(tr)}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
                  >
                    Call Coach
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Active Call Modal Simulation */}
          {callingTrainer && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
              <div className="w-full max-w-md p-8 rounded-3xl bg-zinc-950 border border-white/20 text-center space-y-6">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping inline-block" />
                <div>
                  <h3 className="text-xl font-bold text-white">{callingTrainer.name}</h3>
                  <p className="text-xs text-zinc-400">{callingTrainer.spec}</p>
                </div>
                <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-emerald-400">
                  WEBRTC P2P ENCRYPTION ESTABLISHED // 1080P 60 FPS
                </div>
                <button
                  onClick={() => setCallingTrainer(null)}
                  className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-colors"
                >
                  END SESSION
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ── 7. FEATURE 4: REAL-TIME REDIS LEADERBOARD ── */}
        <section id="leaderboard" className="w-full max-w-6xl mx-auto px-6 py-24 space-y-8 border-t border-white/[0.06]">
          <div className="border-b border-white/[0.08] pb-6">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
              SYNOPSIS PILLAR 04 // REAL-TIME IN-MEMORY DATA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-time Redis Leaderboard
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Global, Guild Squad, and Gym Club ranking table powered by sub-5ms Redis in-memory sorted sets.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-12 p-4 text-[11px] font-mono text-zinc-500 border-b border-white/[0.06] uppercase">
              <div className="col-span-2">RANK</div>
              <div className="col-span-4">ATHLETE</div>
              <div className="col-span-3">STREAK</div>
              <div className="col-span-3 text-right">XP SCORE</div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {leaderboards.map((row) => (
                <div
                  key={row.rank}
                  className={`grid grid-cols-12 p-4 text-xs font-mono items-center transition-colors ${
                    row.highlight
                      ? "bg-white/[0.08] text-white font-bold"
                      : "text-zinc-300 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="col-span-2 font-bold text-zinc-400">#{row.rank}</div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span>{row.name}</span>
                    {row.highlight && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">YOU</span>
                    )}
                  </div>
                  <div className="col-span-3 text-orange-400 font-semibold">{row.streak}</div>
                  <div className="col-span-3 text-right font-bold text-white">{row.xp}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. SCROLL DOWN PROMPT FOR CURTAIN FOOTER ── */}
        <div className="pb-16 pt-8 flex flex-col items-center border-t border-white/[0.06]">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
            SCROLL DOWN TO REVEAL CURTAIN FOOTER
          </p>
          <div className="w-[1px] h-20 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
        </div>

      </div>

      {/* ── 9. CINEMATIC CURTAIN REVEAL FOOTER ── */}
      <CinematicFooter brand="FITQUEST" />

    </div>
  );
}
