import React, { useState } from "react";
import FlashlightTextReveal from "@/components/ui/flashlight-text-reveal";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import RandomLetterSwapNav from "@/components/ui/m-random-letter-swap-1";
import LeaderboardTable from "@/components/ui/leaderboard-table";
import CarouselStacked from "@/components/ui/carousel-07";
import ExerciseSimulator from "@/components/ui/exercise-simulator";
import VoxelVideoStreakCard from "@/components/ui/voxel-video-streak-card";
import CustomRangeSelectDemo from "@/components/ui/calendar-range-select";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "dashboard"
  const [activeTab, setActiveTab] = useState("Leaderboard");

  const navLinks = ["Leaderboard", "Streaks Card", "Simulator", "Splits"];

  const handleNavSelect = (link) => {
    setActiveTab(link);
    setView("dashboard");
  };

  const handleGetStarted = () => {
    setView("dashboard");
    setActiveTab("Leaderboard");
  };

  const splits = {
    chest: {
      title: "Chest & Triceps Day",
      focus: "Pectoralis Major, Anterior Deltoids, Triceps Brachii",
      exercises: [
        { name: "Incline Barbell Bench Press", sets: "4 Sets", reps: "8-10 Reps", tempo: "3-1-1 Strict" },
        { name: "Flat Dumbbell Press", sets: "3 Sets", reps: "10-12 Reps", tempo: "3-0-1 Drive" },
        { name: "Weighted Dips", sets: "3 Sets", reps: "8-10 Reps", tempo: "2-1-1 Pause" },
        { name: "Incline Cable Flyes", sets: "3 Sets", reps: "12-15 Reps", tempo: "3-1-2 Peak" },
      ],
    },
    back: {
      title: "Back & Biceps (Pull Day)",
      focus: "Latissimus Dorsi, Rhomboids, Posterior Deltoid, Biceps",
      exercises: [
        { name: "Conventional Barbell Deadlift", sets: "4 Sets", reps: "5-6 Reps", tempo: "2-0-1 Explosive" },
        { name: "Weighted Neutral-Grip Pull-ups", sets: "3 Sets", reps: "6-8 Reps", tempo: "3-1-1 Strict" },
        { name: "Chest-Supported T-Bar Row", sets: "3 Sets", reps: "10-12 Reps", tempo: "3-1-1 Squeeze" },
        { name: "Incline Dumbbell Bicep Curl", sets: "3 Sets", reps: "10-12 Reps", tempo: "3-0-2 Stretch" },
      ],
    },
    legs: {
      title: "Quad & Glute Hypertrophy (Leg Day)",
      focus: "Quadriceps, Gluteus Maximus, Hamstrings, Calves",
      exercises: [
        { name: "High-Bar Olympic Back Squat", sets: "4 Sets", reps: "6-8 Reps", tempo: "3-1-X Pause Depth" },
        { name: "Romanian Dumbbell Deadlift", sets: "3 Sets", reps: "8-10 Reps", tempo: "3-1-1 Hamstring Stretch" },
        { name: "Bulgarian Split Squats", sets: "3 Sets", reps: "10-12 Reps", tempo: "3-0-1 Stability" },
        { name: "Standing Calf Raises", sets: "4 Sets", reps: "12-15 Reps", tempo: "2-2-1 Full Range" },
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between selection:bg-zinc-800 selection:text-white">
      {/* ── 1. MINIMAL LANDING HERO ── */}
      {view === "landing" && (
        <div className="relative w-screen h-screen overflow-hidden">
          <FlashlightTextReveal
            text={"FITQUEST\nTRANSCEND\nYOUR\nLIMITS"}
            fontFamily={'-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'}
            fontWeight="900"
            fontSize="clamp(3.5rem, 12vw, 10rem)"
            colors={["#000000", "#121214", "#20222a"]}
            height="100vh"
            radius={0.36}
            strength={1.2}
            ghost={0.035}
            wander={true}
          >
            <header className="absolute top-0 left-0 right-0 z-30 w-full pointer-events-auto">
              <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span className="font-bold text-sm tracking-tight text-white uppercase">
                    FITQUEST
                  </span>
                </div>

                <RandomLetterSwapNav
                  links={navLinks}
                  activeLink={activeTab}
                  onSelect={handleNavSelect}
                  className="hidden md:flex py-0"
                />

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-medium tracking-tight text-zinc-400">
                    SENSORS READY
                  </span>
                </div>
              </div>
            </header>

            <div className="absolute inset-0 z-30 flex flex-col justify-between items-center pointer-events-none pt-20 pb-10 px-6 text-center">
              <div className="h-6" />

              <div className="flex flex-col items-center max-w-xl mx-auto pointer-events-auto space-y-4 mt-auto mb-6">
                <p className="text-sm sm:text-base text-zinc-300 font-normal tracking-tight max-w-md drop-shadow-md">
                  Precision biomechanical telemetry, 3D stacked cards, and live leaderboards.
                </p>

                <div className="pt-1">
                  <LiquidButton
                    onClick={handleGetStarted}
                    className="px-8 py-3.5 h-12 text-sm text-white font-medium hover:text-white transition-all shadow-lg"
                  >
                    <span>Get Started</span>
                    <span className="text-zinc-400 ml-1">→</span>
                  </LiquidButton>
                </div>
              </div>

              <div className="flex items-center gap-2 text-zinc-600 text-xs font-medium tracking-tight">
                <span>17-Point Vision</span>
                <span>•</span>
                <span>3-1-1 Tempo</span>
                <span>•</span>
                <span>Habit Shield</span>
              </div>
            </div>
          </FlashlightTextReveal>
        </div>
      )}

      {/* ── 2. SECOND PAGE: DASHBOARD (3D CARDS + LEADERBOARD + SIMULATOR) ── */}
      {view === "dashboard" && (
        <div className="relative min-h-screen bg-black text-white flex flex-col justify-between">
          <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/80 border-b border-white/[0.08]">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
              <button
                onClick={() => { setView("landing"); setActiveTab("Home"); }}
                className="flex items-center gap-2.5 bg-transparent border-0 cursor-pointer outline-none group"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                <span className="font-bold text-sm tracking-tight text-white uppercase">
                  FITQUEST
                </span>
              </button>

              <RandomLetterSwapNav
                links={navLinks}
                activeLink={activeTab}
                onSelect={handleNavSelect}
                className="py-0"
              />

              <button
                onClick={() => setView("landing")}
                className="px-4 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              >
                ← Back to Hero
              </button>
            </div>
          </header>

          {/* Main Dashboard Content - Tab-Like Interface */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {/* ── TAB 1: LEADERBOARD (Includes 3D Cards & Leaderboard ONLY) ── */}
            {activeTab === "Leaderboard" && (
              <div className="space-y-16">
                <div id="cards">
                  <CarouselStacked />
                </div>

                <div id="leaderboard">
                  <LeaderboardTable />
                </div>
              </div>
            )}

            {/* ── TAB 2: STREAKS CARD (Gym Context & Active Streaks Calendar) ── */}
            {activeTab === "Streaks Card" && (
              <div className="w-full space-y-16">
                <VoxelVideoStreakCard />
                
                <section className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                  <div className="w-full rounded-2xl border border-white/[0.08] bg-zinc-950/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="size-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
                          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                            ACTIVE TRAINING STREAK // CALENDAR TELEMETRY
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          Gym Consistency & Workout Streaks
                        </h3>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Consecutive logged training days, progressive overload volume, and active streak range.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                        14 DAYS UNBROKEN
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                      <div className="lg:col-span-5 flex flex-col justify-between">
                        <CustomRangeSelectDemo />
                      </div>
                      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-900/60">
                            <div className="text-xs font-semibold text-amber-400 mb-1">🔥 Best Streak</div>
                            <div className="text-lg font-black text-white">28 Days</div>
                            <div className="text-[10px] text-zinc-500">Personal Best</div>
                          </div>
                          <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-900/60">
                            <div className="text-xs font-semibold text-blue-400 mb-1">🛡️ Streak Freeze</div>
                            <div className="text-lg font-black text-white">2 Tokens</div>
                            <div className="text-[10px] text-zinc-500">Rest Day Shield</div>
                          </div>
                          <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-900/60">
                            <div className="text-xs font-semibold text-emerald-400 mb-1">⚡ Volume</div>
                            <div className="text-lg font-black text-white">42.8k kg</div>
                            <div className="text-[10px] text-zinc-500">Lifted in Streak</div>
                          </div>
                          <div className="p-3.5 rounded-xl border border-white/[0.08] bg-zinc-900/60">
                            <div className="text-xs font-semibold text-cyan-400 mb-1">🎯 Next Goal</div>
                            <div className="text-lg font-black text-white">21 Days</div>
                            <div className="text-[10px] text-zinc-500">Titan Tier 3</div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                            <span>Active Streak Split Rotation</span>
                            <span className="font-mono text-[10px] text-zinc-500 font-normal">100% ADHERENCE</span>
                          </h4>
                          <div className="space-y-2">
                            {[
                              { day: "Mon / Thu", split: "Quad & Glute Hypertrophy (Back Squats)", status: "Logged • Form 98.4%", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                              { day: "Tue / Fri", split: "Incline Chest & Triceps (Bench Press)", status: "Logged • Form 96.8%", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                              { day: "Wed / Sat", split: "Conventional Deadlifts & Back Lat Sweep", status: "Logged • Form 97.2%", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                              { day: "Sunday", split: "Active Recovery • Joint Mobility & Foam Rolling", status: "Completed • 0 Missed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                            ].map((item, idx) => (
                              <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/50 border border-white/[0.04] flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2.5">
                                  <span className="font-mono text-[11px] text-zinc-400 font-medium w-16">{item.day}</span>
                                  <span className="font-medium text-white">{item.split}</span>
                                </div>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.color}`}>
                                  {item.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ── TAB 3: SIMULATOR (Muscle Group Biomechanical Simulator) ── */}
            {activeTab === "Simulator" && (
              <div className="w-full">
                <ExerciseSimulator />
              </div>
            )}

            {/* ── TAB 4: SPLITS (Remaining Tab - Kept Empty) ── */}
            {activeTab === "Splits" && (
              <div className="min-h-[500px] flex items-center justify-center p-8 text-center">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-12 max-w-sm w-full">
                  <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest block mb-2">
                    SPLITS // TAB EMPTY
                  </span>
                  <p className="text-xs text-zinc-600 font-mono">
                    Content will appear here.
                  </p>
                </div>
              </div>
            )}
          </main>

          <footer className="w-full border-t border-white/[0.08] py-8 text-center text-xs text-zinc-500 font-mono">
            FITQUEST BIOMECHANICAL SYSTEMS • POWERED BY APPLE SAN FRANCISCO
          </footer>
        </div>
      )}
    </div>
  );
}
