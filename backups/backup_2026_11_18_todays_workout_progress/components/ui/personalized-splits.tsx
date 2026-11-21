"use client";

import React, { useState } from "react";

export interface UserBiometricProfile {
  gender: "male" | "female";
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  goal: "cut" | "bulk" | "recomp" | "strength";
  daysPerWeek: 3 | 4 | 5 | 6;
  activityLevel: "sedentary" | "light" | "moderate" | "heavy";
}

export default function PersonalizedSplits() {
  const [profile, setProfile] = useState<UserBiometricProfile>({
    gender: "male",
    age: 24,
    heightCm: 178,
    currentWeightKg: 82.5,
    targetWeightKg: 74.0,
    goal: "cut",
    daysPerWeek: 4,
    activityLevel: "moderate",
  });

  const heightM = profile.heightCm / 100;
  const currentBmi = +(profile.currentWeightKg / (heightM * heightM)).toFixed(1);
  const targetBmi = +(profile.targetWeightKg / (heightM * heightM)).toFixed(1);
  const weightDelta = +(profile.targetWeightKg - profile.currentWeightKg).toFixed(1);

  const bmr = Math.round(
    profile.gender === "male"
      ? 10 * profile.currentWeightKg + 6.25 * profile.heightCm - 5 * profile.age + 5
      : 10 * profile.currentWeightKg + 6.25 * profile.heightCm - 5 * profile.age - 161
  );

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
  }[profile.activityLevel];

  const tdee = Math.round(bmr * activityMultiplier);
  const targetCalories =
    profile.goal === "cut"
      ? tdee - 500
      : profile.goal === "bulk"
      ? tdee + 350
      : profile.goal === "strength"
      ? tdee + 200
      : tdee;

  const proteinGrams = Math.round(profile.currentWeightKg * 2.2);
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.max(80, Math.round((targetCalories - proteinGrams * 4 - fatGrams * 9) / 4));
  const timelineWeeks = Math.max(4, Math.round(Math.abs(weightDelta) / (profile.goal === "cut" ? 0.55 : 0.3)));

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8 bg-black text-white font-sans">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          Personalized Split & Weight Roadmap
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Algorithmic periodization engineered from your biometrics and target weight.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-zinc-950">
          <span className="text-xs text-zinc-500 uppercase font-mono">Weight Trajectory</span>
          <div className="text-2xl font-bold mt-1">
            {profile.currentWeightKg}kg → {profile.targetWeightKg}kg
          </div>
          <span className="text-xs text-cyan-400 font-mono mt-1 block">
            {timelineWeeks} Weeks Timeline
          </span>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-zinc-950">
          <span className="text-xs text-zinc-500 uppercase font-mono">Caloric Target</span>
          <div className="text-2xl font-bold font-mono mt-1">{targetCalories} kcal</div>
          <span className="text-xs text-zinc-400 font-mono mt-1 block">TDEE: {tdee} kcal</span>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-zinc-950">
          <span className="text-xs text-zinc-500 uppercase font-mono">Daily Macros</span>
          <div className="text-sm font-mono mt-1 flex justify-between">
            <span>P: {proteinGrams}g</span>
            <span>C: {carbGrams}g</span>
            <span>F: {fatGrams}g</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono mt-1 block">2.2g/kg Target</span>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-zinc-950">
          <span className="text-xs text-zinc-500 uppercase font-mono">BMI Band</span>
          <div className="text-2xl font-bold mt-1">
            {currentBmi} → <span className="text-emerald-400">{targetBmi}</span>
          </div>
          <span className="text-xs text-zinc-400 font-mono mt-1 block">Optimal Athletic</span>
        </div>
      </div>
    </div>
  );
}
