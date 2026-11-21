"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Activity, ShieldAlert, Award } from "lucide-react";

export interface ExerciseData {
  id: string;
  name: string;
  muscleGroup: "chest" | "back" | "legs" | "biceps" | "triceps";
  muscleGroupLabel: string;
  category: string;
  videoUrl: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tempo: string;
  formScore: number;
  setsReps: string;
  angles: Record<string, string>;
  muscles: { name: string; pct: number }[];
  phases: { name: string; timing: string; instruction: string }[];
  cues: { title: string; desc: string }[];
  mistakes: { mistake: string; fix: string }[];
}

export const EXERCISES: Record<string, ExerciseData> = {
  bench: {
    id: "bench",
    name: "Flat Barbell Bench Press",
    muscleGroup: "chest",
    muscleGroupLabel: "Chest (Pectoralis Major)",
    category: "Compound Upper Body Push",
    videoUrl: "videos/workout-vid-2.mp4",
    difficulty: "Intermediate",
    tempo: "3-1-1 Strict (3s Lower, 1s Touch, 1s Press)",
    formScore: 97.4,
    setsReps: "4 Sets • 6-8 Reps",
    angles: {
      elbow: "45° (Tuck Angle)",
      arch: "15° (Thoracic Arch)",
      spine: "Neutral Scapulae Retracted",
    },
    muscles: [
      { name: "Pectoralis Major (Sternal/Clavicular)", pct: 95 },
      { name: "Anterior Deltoids", pct: 84 },
      { name: "Triceps Brachii", pct: 78 },
      { name: "Serratus Anterior", pct: 62 },
    ],
    phases: [
      {
        name: "Phase 1: Bench Arch & Knurling Grip",
        timing: "0:00 - Setup",
        instruction: "Retract and depress scapulae firmly into the bench pad. Grip barbell slightly wider than shoulder width with neutral locked wrists.",
      },
      {
        name: "Phase 2: Controlled Eccentric Lowering",
        timing: "3 Seconds",
        instruction: "Lower the bar with strict control down to the lower sternum / nipple line. Maintain elbows tucked at 45-60° to torso.",
      },
      {
        name: "Phase 3: Sternal Touch & Tension",
        timing: "1 Second Pause",
        instruction: "Gently kiss the chest without bouncing or losing back arch. Keep constant isometric tension across the pecs.",
      },
      {
        name: "Phase 4: Concentric Power Drive",
        timing: "1 Second Explosion",
        instruction: "Drive heels into the floor and press bar up in a slight J-curve back toward eye level. Lock out without flaring shoulders.",
      },
    ],
    cues: [
      { title: "Pinch Blades in Back Pockets", desc: "Locks the scapular carriage to safeguard anterior rotator cuffs under load." },
      { title: "45° Elbow Arc", desc: "Avoid flaring elbows to 90°; a natural diagonal arc maximizes sternal recruitment." },
      { title: "Heel Leg Drive", desc: "Press floor away from you to generate kinetic energy through the hips and upper back." },
      { title: "Bend the Barbell", desc: "Attempt to bend the bar into a U-shape to activate lat stabilizers." },
    ],
    mistakes: [
      { mistake: "Bouncing Off Sternum", fix: "Pause for 1 full second on the chest to generate pure contractile pectoral power." },
      { mistake: "Elbows Flared 90°", fix: "Tuck elbows inward to 45° to avoid subacromial shoulder impingement." },
      { mistake: "Loose Scapulae on Press", fix: "Keep shoulder blades pinned to the bench throughout the entire set." },
    ],
  },
  cable_flyes: {
    id: "cable_flyes",
    name: "Standing Cable Chest Crossover",
    muscleGroup: "chest",
    muscleGroupLabel: "Chest (Pectoralis Major)",
    category: "Cable Pec Isolation",
    videoUrl: "videos/workout-vid-3.mp4",
    difficulty: "Intermediate",
    tempo: "3-1-2 (3s Eccentric Stretch, 1s Peak Squeeze)",
    formScore: 96.2,
    setsReps: "3 Sets • 12-15 Reps",
    angles: {
      elbow: "150° (Soft Bend)",
      torso: "15° Forward Lean",
      adduction: "Full Sternal Peak",
    },
    muscles: [
      { name: "Sternal Pectoralis Major", pct: 96 },
      { name: "Clavicular Pec Head", pct: 74 },
      { name: "Anterior Deltoids", pct: 58 },
      { name: "Coracobrachialis", pct: 64 },
    ],
    phases: [
      {
        name: "Phase 1: Staggered Stance Anchor",
        timing: "0:00 - Setup",
        instruction: "Step forward into a staggered stance. Lean forward 15° at the hips, maintaining a rigid spine and tight core.",
      },
      {
        name: "Phase 2: Eccentric Pec Stretch",
        timing: "3 Seconds",
        instruction: "Allow cables to open wide with a slight elbow bend. Feel deep stretch across the chest fibers without hyperextending shoulders.",
      },
      {
        name: "Phase 3: Sternal Fly Adduction",
        timing: "1 Second Squeeze",
        instruction: "Sweep hands together in an arc as if hugging a large oak tree. Cross hands slightly for maximal peak shortening.",
      },
    ],
    cues: [
      { title: "Hug a Giant Tree", desc: "Maintain constant arm angle so movement originates exclusively at the shoulder joint." },
      { title: "Lead with Elbows Forward", desc: "Keeps tension on the chest rather than dragging with biceps." },
      { title: "Hard Peak Contraction", desc: "Hold and squeeze inner chest for a full 1-second cadence at midline." },
    ],
    mistakes: [
      { mistake: "Pressing Instead of Flying", fix: "Keep elbows fixed at ~150° rather than bending and extending like a press." },
      { mistake: "Excessive Torso Rocking", fix: "Anchor core and hips; zero body momentum allowed during the sweep." },
    ],
  },
  pec_deck: {
    id: "pec_deck",
    name: "Seated Machine Pec Deck Flyes",
    muscleGroup: "chest",
    muscleGroupLabel: "Chest (Pectoralis Major)",
    category: "Machine Pec Hypertrophy",
    videoUrl: "videos/workout-vid-4.mp4",
    difficulty: "Beginner",
    tempo: "2-1-2 (2s Fly, 1s Peak Hold, 2s Return)",
    formScore: 98.1,
    setsReps: "3 Sets • 10-12 Reps",
    angles: {
      seat: "Mid-Chest Handle Level",
      back: "Full Lumbar Contact",
      range: "120° Horizontal Arc",
    },
    muscles: [
      { name: "Pectoralis Major (Sternocostal)", pct: 94 },
      { name: "Anterior Deltoids", pct: 60 },
      { name: "Pectoralis Minor", pct: 68 },
    ],
    phases: [
      {
        name: "Phase 1: Seat Height Calibration",
        timing: "0:00 - Setup",
        instruction: "Adjust seat so handles align with mid-chest. Plant feet firmly, back pressed into the pad.",
      },
      {
        name: "Phase 2: Concentric Adduction",
        timing: "2 Seconds",
        instruction: "Drive handles together smoothly in an arc, focusing on squeezing chest together at the center.",
      },
      {
        name: "Phase 3: Eccentric Return",
        timing: "2 Seconds",
        instruction: "Return under strict control until arms reach torso plane; do not allow weight stack to slam.",
      },
    ],
    cues: [
      { title: "Chest High Against Pad", desc: "Maintain a proud sternum to keep direct line of pull on the pectorals." },
      { title: "Soft Elbow Joint", desc: "Avoid locking elbows completely to relieve stress on the bicep tendon." },
    ],
    mistakes: [
      { mistake: "Shrugging Shoulders", fix: "Keep traps depressed; don't let shoulders rise toward ears during the fly." },
    ],
  },
  chest_press: {
    id: "chest_press",
    name: "Seated Machine Chest Press",
    muscleGroup: "chest",
    muscleGroupLabel: "Chest (Pectoralis Major)",
    category: "Compound Machine Push",
    videoUrl: "videos/workout-vid-5.mp4",
    difficulty: "Beginner / Intermediate",
    tempo: "3-0-1 (3s Control Lower, 1s Drive)",
    formScore: 97.8,
    setsReps: "3 Sets • 8-10 Reps",
    angles: {
      handle: "Nipple Line Level",
      wrist: "Neutral Stack",
      scapula: "Retracted into Pad",
    },
    muscles: [
      { name: "Mid & Lower Pectoralis Major", pct: 93 },
      { name: "Triceps Lateral Head", pct: 76 },
      { name: "Anterior Deltoids", pct: 70 },
    ],
    phases: [
      {
        name: "Phase 1: Alignment & Grip",
        timing: "0:00 - Setup",
        instruction: "Align handles with mid-chest. Grip handles firmly with wrists stacked directly above forearms.",
      },
      {
        name: "Phase 2: Press & Extend",
        timing: "1 Second",
        instruction: "Press forward explosively without letting shoulders roll forward off the support pad.",
      },
      {
        name: "Phase 3: Eccentric Return",
        timing: "3 Seconds",
        instruction: "Lower smoothly over 3 seconds to full stretch depth before the next repetition.",
      },
    ],
    cues: [
      { title: "Drive Through Base of Palm", desc: "Aligns the force vector directly through the ulna and radius." },
      { title: "Shoulders Pinned to Seat", desc: "Never push shoulder blades forward at lockout." },
    ],
    mistakes: [
      { mistake: "Hyperextending Elbows", fix: "Stop just short of hard lockout to maintain continuous tension on pecs." },
    ],
  },
  db_bench_grip: {
    id: "db_bench_grip",
    name: "Dumbbell Bench Press & Grip Mechanics",
    muscleGroup: "chest",
    muscleGroupLabel: "Chest (Pectoralis Major)",
    category: "Free Weight Hypertrophy & Stability",
    videoUrl: "videos/workout-vid-1.mp4",
    difficulty: "Intermediate",
    tempo: "3-1-1 (3s Lower, 1s Pause, 1s Converge)",
    formScore: 98.0,
    setsReps: "3 Sets • 8-10 Reps",
    angles: {
      wrist: "Stacked Above Knurling",
      elbow: "50° Diagonal Tuck",
      bench: "Flat 180° Plane",
    },
    muscles: [
      { name: "Pectoralis Major", pct: 92 },
      { name: "Rotator Cuff Stabilizers", pct: 86 },
      { name: "Triceps Brachii", pct: 74 },
    ],
    phases: [
      {
        name: "Phase 1: Dumbbell Kickback Setup",
        timing: "0:00 - Setup",
        instruction: "Rest dumbbells on knees, kick back onto bench with tight core, bells positioned over chest.",
      },
      {
        name: "Phase 2: Deep Eccentric Lowering",
        timing: "3 Seconds",
        instruction: "Lower bells with 50° elbow tuck until dumbbell handles align with mid-chest.",
      },
      {
        name: "Phase 3: Converging Ascent",
        timing: "1 Second",
        instruction: "Press dumbbells up in a gentle triangle arc without clanking the weights together.",
      },
    ],
    cues: [
      { title: "White-Knuckle Grip", desc: "Squeeze the dumbbell handles hard to increase muscular recruitment." },
      { title: "Control the Bells Separately", desc: "Both arms move in perfect synchronization." },
    ],
    mistakes: [
      { mistake: "Clanking Dumbbells at Top", fix: "Keep constant tension; avoid bashing weights together at peak." },
    ],
  },
  shrugs: {
    id: "shrugs",
    name: "Standing Dumbbell Trapezius Shrugs",
    muscleGroup: "back",
    muscleGroupLabel: "Back (Trapezius & Upper Scapula)",
    category: "Upper Back & Scapular Elevation",
    videoUrl: "videos/workout-vid-0.mp4",
    difficulty: "Beginner / Intermediate",
    tempo: "2-2-1 (2s Elevate, 2s Peak Hold, 1s Lower)",
    formScore: 98.6,
    setsReps: "4 Sets • 12-15 Reps",
    angles: {
      shoulder: "Vertical Elevation",
      neck: "Rigid Neutral (No Turtle)",
      spine: "180° Upright",
    },
    muscles: [
      { name: "Upper Trapezius", pct: 98 },
      { name: "Levator Scapulae", pct: 91 },
      { name: "Rhomboids", pct: 75 },
      { name: "Forearms / Grip", pct: 82 },
    ],
    phases: [
      {
        name: "Phase 1: Upright Stance Setup",
        timing: "0:00 - Setup",
        instruction: "Stand with feet hip-width apart holding heavy dumbbells at your sides, chest proud, shoulders down.",
      },
      {
        name: "Phase 2: Scapular Elevation",
        timing: "2 Seconds",
        instruction: "Shrug shoulders straight up toward ears in a clean vertical path. Do not roll shoulders backward.",
      },
      {
        name: "Phase 3: Peak Contraction Hold",
        timing: "2 Seconds",
        instruction: "Hold and squeeze upper traps at peak height for two full seconds of isometric torture.",
      },
      {
        name: "Phase 4: Full Stretch Lowering",
        timing: "1 Second",
        instruction: "Lower weights smoothly under control until traps reach maximum active stretch.",
      },
    ],
    cues: [
      { title: "Shoulders to Ears Straight Up", desc: "Rolling shoulders causes unnecessary cervical and rotator cuff friction." },
      { title: "Keep Neck Neutral", desc: "Do not crane chin forward like a turtle; keep head packed back." },
      { title: "2-Second Hard Hold", desc: "Traps respond exceptionally well to pause contractions under heavy loads." },
    ],
    mistakes: [
      { mistake: "Rolling Shoulders in Circles", fix: "Shrug straight up and down; shoulder circles tear rotator cuffs without adding trap growth." },
      { mistake: "Using Knee Bounce Momentum", fix: "Keep knees softly locked; only elevate through the traps." },
    ],
  },
  squat: {
    id: "squat",
    name: "High-Bar Olympic Back Squat",
    muscleGroup: "legs",
    muscleGroupLabel: "Legs (Quadriceps & Gluteus)",
    category: "Compound Lower Body Prime",
    videoUrl: "videos/squat.mp4",
    difficulty: "Advanced",
    tempo: "3-1-X (3s Down, 1s Pause, Explode Up)",
    formScore: 98.4,
    setsReps: "4 Sets • 6-8 Reps",
    angles: {
      knee: "92° (Full Parallel Depth)",
      hip: "44° (Hip Hinge)",
      spine: "178° (Neutral Spine)",
    },
    muscles: [
      { name: "Quadriceps (Vastus Lateralis/Medialis)", pct: 94 },
      { name: "Gluteus Maximus", pct: 90 },
      { name: "Hamstrings (Co-contraction)", pct: 68 },
      { name: "Spinal Erectors & Core", pct: 85 },
    ],
    phases: [
      {
        name: "Phase 1: Setup & Unrack",
        timing: "0:00 - Setup",
        instruction: "Wedge traps into knurling. Take 2 clean steps back, feet shoulder-width, toes flared 15-25°.",
      },
      {
        name: "Phase 2: Eccentric Descent",
        timing: "3 Seconds",
        instruction: "Take diaphragmatic breath (Valsalva). Hinge at hips and break knees simultaneously, tracking over second toe.",
      },
      {
        name: "Phase 3: The Hole (Depth)",
        timing: "1 Second Pause",
        instruction: "Hit depth where hip crease drops below top of patella (~90-95°). Keep thoracic spine rigid, zero butt-wink.",
      },
      {
        name: "Phase 4: Concentric Drive",
        timing: "Explosive Drive",
        instruction: "Drive floor away through mid-foot. Lead with upper back and hips simultaneously.",
      },
    ],
    cues: [
      { title: "Screw Feet Into Floor", desc: "Creates external rotation torque in the hips, preventing knee collapse." },
      { title: "Chest Proud, Lats Packed", desc: "Pull down on the bar like a lat pulldown to stabilize the spine." },
      { title: "Deep Belly Breath (Valsalva)", desc: "Inflate abdominal cavity 360° to build 100+ PSI of spinal protection." },
    ],
    mistakes: [
      { mistake: "Knee Valgus (Inward Collapse)", fix: "Strengthen glute medius and cue 'spread the floor' with lateral foot pressure." },
      { mistake: "Heels Lifting Off Turf", fix: "Improve ankle dorsiflexion mobility or squat in elevated-heel Olympic lifters." },
    ],
  },
,
  tricep_rope_pushdown: {
    "id": "tricep_rope_pushdown",
    "name": "Standing Cable Rope Triceps Pushdown",
    "muscleGroup": "triceps",
    "muscleGroupLabel": "Triceps (Lateral & Long Heads)",
    "category": "Cable Triceps Hypertrophy",
    "videoUrl": "videos/workout-vid-6.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-2 (3s Eccentric Return, 1s Pause, 2s Spread)",
    "formScore": 98.2,
    "setsReps": "4 Sets \u2022 10-12 Reps",
    "angles": {
        "elbow": "90\u00b0 Flexion to 175\u00b0 Extension",
        "wrist": "Neutral Locked (No Flexion)",
        "torso": "10\u00b0 Slight Forward Hinge"
    },
    "muscles": [
        {
            "name": "Triceps Lateral Head",
            "pct": 95
        },
        {
            "name": "Triceps Long Head",
            "pct": 88
        },
        {
            "name": "Triceps Medial Head",
            "pct": 82
        },
        {
            "name": "Forearm Extensors",
            "pct": 60
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Setup & Grip",
            "timing": "0:00 - Setup",
            "instruction": "Attach rope to high pulley. Grip rope ends with palms facing each other, elbows pinned firmly at ribcage."
        },
        {
            "name": "Phase 2: Concentric Pushdown & Spread",
            "timing": "2 Seconds",
            "instruction": "Drive hands down by extending elbows. At bottom lockout, spread the rope outwards past thighs to fully contract the lateral head."
        },
        {
            "name": "Phase 3: Peak Contraction",
            "timing": "1 Second",
            "instruction": "Lock out triceps with maximum isometric squeeze. Maintain rigid neutral wrists."
        },
        {
            "name": "Phase 4: Controlled Negative",
            "timing": "3 Seconds",
            "instruction": "Slowly return hands to chest height (90\u00b0 elbow bend) while keeping upper arms completely stationary."
        }
    ],
    "cues": [
        {
            "title": "Elbows Glued to Ribcage",
            "desc": "Keep elbows fixed in space; avoid letting them drift forward on the eccentric."
        },
        {
            "title": "Spread the Rope at Bottom",
            "desc": "Flaring the rope ends apart maximally engages the triceps lateral and medial heads."
        },
        {
            "title": "Neutral Wrists",
            "desc": "Do not curl wrists inward; drive force straight through the palms."
        }
    ],
    "mistakes": [
        {
            "mistake": "Elbows Drifting Forward",
            "fix": "Pin elbows to your sides so only the forearms hinge during the movement."
        },
        {
            "mistake": "Using Torso Momentum",
            "fix": "Stay at a steady 10\u00b0 forward lean without bobbing up and down."
        }
    ]
},
  cable_bicep_curl: {
    "id": "cable_bicep_curl",
    "name": "Standing Low Cable Biceps Curl",
    "muscleGroup": "biceps",
    "muscleGroupLabel": "Biceps (Brachii & Brachialis)",
    "category": "Continuous Tension Cable Isolation",
    "videoUrl": "videos/workout-vid-7.mp4",
    "difficulty": "Beginner / Intermediate",
    "tempo": "3-1-1 (3s Negative, 1s Squeeze, 1s Curl)",
    "formScore": 97.9,
    "setsReps": "4 Sets \u2022 12-15 Reps",
    "angles": {
        "elbow": "Stationary Pivot",
        "spine": "Rigid Vertical 180\u00b0",
        "forearm": "Supinated 85\u00b0"
    },
    "muscles": [
        {
            "name": "Biceps Brachii (Short Head)",
            "pct": 94
        },
        {
            "name": "Biceps Brachii (Long Head)",
            "pct": 90
        },
        {
            "name": "Brachialis",
            "pct": 84
        },
        {
            "name": "Brachioradialis",
            "pct": 72
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Low Pulley Stance",
            "timing": "0:00 - Setup",
            "instruction": "Attach straight or EZ bar to low pulley. Stand tall with shoulders pulled back, arms extended down."
        },
        {
            "name": "Phase 2: Concentric Curl",
            "timing": "1 Second",
            "instruction": "Curl bar smoothly up toward upper chest while keeping upper arms tucked closely at your ribs."
        },
        {
            "name": "Phase 3: Squeeze at Top",
            "timing": "1 Second",
            "instruction": "Hard isometric bicep squeeze at peak contraction without lifting elbows forward."
        },
        {
            "name": "Phase 4: Eccentric Stretch",
            "timing": "3 Seconds",
            "instruction": "Lower the weight with 3-second resistance against the cable tension to full elbow extension."
        }
    ],
    "cues": [
        {
            "title": "Continuous Cable Tension",
            "desc": "The cable provides uniform resistance through the bottom stretch and top squeeze."
        },
        {
            "title": "Upper Arms Pinned",
            "desc": "Prevent shoulder flexion; isolate movement solely at the elbow hinge."
        },
        {
            "title": "Full Extension Stretch",
            "desc": "Extend arms completely at the bottom to recruit all motor units."
        }
    ],
    "mistakes": [
        {
            "mistake": "Swinging Hips Forward",
            "fix": "Engage glutes and core; do not rock your hips to initiate the curl."
        },
        {
            "mistake": "Shoulders Rolling Forward",
            "fix": "Keep scapulae lightly retracted throughout the set."
        }
    ]
},
  leg_extension: {
    "id": "leg_extension",
    "name": "Seated Machine Leg Extension",
    "muscleGroup": "legs",
    "muscleGroupLabel": "Legs (Quadriceps Isolation)",
    "category": "Quad Tear-Drop Isolation",
    "videoUrl": "videos/workout-vid-8.mp4",
    "difficulty": "Beginner",
    "tempo": "3-2-1 (3s Descent, 2s Peak Lockout, 1s Kick)",
    "formScore": 99.1,
    "setsReps": "3 Sets \u2022 12-15 Reps",
    "angles": {
        "knee": "90\u00b0 Flexion to 180\u00b0 Extension",
        "back": "Flush against Pad 100\u00b0",
        "ankle": "Dorsiflexed Toes Up"
    },
    "muscles": [
        {
            "name": "Rectus Femoris",
            "pct": 98
        },
        {
            "name": "Vastus Lateralis",
            "pct": 95
        },
        {
            "name": "Vastus Medialis (VMO)",
            "pct": 96
        },
        {
            "name": "Vastus Intermedius",
            "pct": 88
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Machine Setup",
            "timing": "0:00 - Setup",
            "instruction": "Adjust back pad so knees align with machine pivot axis. Pad rests just above ankles."
        },
        {
            "name": "Phase 2: Powerful Knee Extension",
            "timing": "1 Second",
            "instruction": "Extend legs upward smoothly until quads are fully contracted in a straight line."
        },
        {
            "name": "Phase 3: 2-Second Peak Lockout",
            "timing": "2 Seconds",
            "instruction": "Hold full knee extension for two full seconds to maximize VMO teardrop hypertrophy."
        },
        {
            "name": "Phase 4: Strict 3s Descent",
            "timing": "3 Seconds",
            "instruction": "Lower the weight pad slowly without allowing weight stack to crash before rep ends."
        }
    ],
    "cues": [
        {
            "title": "Align Knee with Axis",
            "desc": "Keep knee joint rotation center aligned with machine cam pivot."
        },
        {
            "title": "Pull Handles Upward",
            "desc": "Grip side handles and pull upward to lock pelvis and hips into the seat."
        },
        {
            "title": "Dorsiflex Toes",
            "desc": "Pull toes up toward shins to enhance rectus femoris recruitment."
        }
    ],
    "mistakes": [
        {
            "mistake": "Kicking with Jerky Momentum",
            "fix": "Control the ascent smoothly; avoid swinging weights with sudden bursts."
        },
        {
            "mistake": "Hips Lifting Off Seat",
            "fix": "Tighten the seat belt or firmly grip side handles to keep hips anchored."
        }
    ]
},
  preacher_curl: {
    "id": "preacher_curl",
    "name": "EZ-Bar Preacher Bench Curl",
    "muscleGroup": "biceps",
    "muscleGroupLabel": "Biceps (Short Head Strict Peak)",
    "category": "Arm Blaster Strict Isolation",
    "videoUrl": "videos/workout-vid-9.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-1 Strict (3s Lower, 1s Hold, 1s Curl)",
    "formScore": 98.7,
    "setsReps": "4 Sets \u2022 8-10 Reps",
    "angles": {
        "armpit": "Snug over Pad Edge",
        "elbow": "170\u00b0 Safe Extension",
        "wrist": "Semi-supinated Knurling Grip"
    },
    "muscles": [
        {
            "name": "Biceps Brachii (Short Head)",
            "pct": 98
        },
        {
            "name": "Brachialis",
            "pct": 92
        },
        {
            "name": "Pronator Teres",
            "pct": 68
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Armpit Lock Setup",
            "timing": "0:00 - Setup",
            "instruction": "Sit on bench with armpits wedged directly over the curved top edge of the pad. Grip EZ-bar inner camber."
        },
        {
            "name": "Phase 2: Strict Concentric Curl",
            "timing": "1 Second",
            "instruction": "Curl bar upward toward chin level while maintaining full tricep-to-pad contact."
        },
        {
            "name": "Phase 3: Peak Contraction",
            "timing": "1 Second",
            "instruction": "Squeeze inner bicep heads hard at top without resting bar vertically over elbows."
        },
        {
            "name": "Phase 4: Controlled Lowering",
            "timing": "3 Seconds",
            "instruction": "Lower bar with strict 3-second control. Stop just shy of full joint hyperextension (approx 170\u00b0)."
        }
    ],
    "cues": [
        {
            "title": "Armpits Wedged Firmly",
            "desc": "Zero daylight between armpits and pad edge ensures 100% bicep isolation."
        },
        {
            "title": "Never Hyperextend at Bottom",
            "desc": "Stop just before locking out to protect the bicep tendon from excessive strain."
        },
        {
            "title": "Inner Camber Grip",
            "desc": "Semi-supinated grip relieves wrist stress while hammering the short head."
        }
    ],
    "mistakes": [
        {
            "mistake": "Lifting Chest Off Pad",
            "fix": "Keep chest glued to pad; leaning back turns the lift into an ego cheat curl."
        },
        {
            "mistake": "Dropping Weight Fast",
            "fix": "Resist the descent; the eccentric phase on preacher curls produces massive hypertrophy."
        }
    ]
},
  leg_press: {
    "id": "leg_press",
    "name": "45-Degree Incline Machine Leg Press",
    "muscleGroup": "legs",
    "muscleGroupLabel": "Legs (Quads & Glutes Heavy Sled)",
    "category": "Compound Lower Body Press",
    "videoUrl": "videos/workout-vid-10.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-1 Controlled (3s Lower Sled, 1s Hole, 1s Drive)",
    "formScore": 98.5,
    "setsReps": "4 Sets \u2022 10-12 Reps",
    "angles": {
        "knee": "90\u00b0 Sled Depth",
        "hips": "Glutes Pinned to Seat",
        "feet": "Shoulder Width Mid-Sled"
    },
    "muscles": [
        {
            "name": "Quadriceps",
            "pct": 95
        },
        {
            "name": "Gluteus Maximus",
            "pct": 88
        },
        {
            "name": "Adductor Magnus",
            "pct": 74
        },
        {
            "name": "Hamstrings",
            "pct": 62
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Foot Placement Setup",
            "timing": "0:00 - Setup",
            "instruction": "Place feet shoulder-width on platform center, toes pointed slightly out. Lower back pressed flush against backrest."
        },
        {
            "name": "Phase 2: Deep 3s Eccentric Lowering",
            "timing": "3 Seconds",
            "instruction": "Release safety handles and lower the sled smoothly until knees hit a 90\u00b0 angle. Keep lumbar pressed flat."
        },
        {
            "name": "Phase 3: The Hole Pause",
            "timing": "1 Second",
            "instruction": "Pause for 1 second at full depth without letting glutes curl off the pad."
        },
        {
            "name": "Phase 4: Concentric Sled Drive",
            "timing": "1 Second",
            "instruction": "Drive through mid-foot and heels to push sled up. Stop just before soft lockout\u2014never hyperextend knees."
        }
    ],
    "cues": [
        {
            "title": "Lower Back Glued to Pad",
            "desc": "Do not let hips roll upward (butt-wink); round spine under heavy sled causes disc compression."
        },
        {
            "title": "Soft Knee Lockout",
            "desc": "Leave a slight 5\u00b0 bend at top to keep tension on quads and protect joint cartilage."
        },
        {
            "title": "Drive Through Mid-Foot & Heels",
            "desc": "Distribute force across whole foot for maximal quadricep drive."
        }
    ],
    "mistakes": [
        {
            "mistake": "Locking Knees Hard",
            "fix": "Never snap knees into complete hyperextended lockout under heavy sled loads."
        },
        {
            "mistake": "Butt Curling Off Pad",
            "fix": "Reduce depth slightly if your lower back rounds away from the back pad."
        }
    ]
},
  lat_pulldown: {
    "id": "lat_pulldown",
    "name": "Wide-Grip Cable Lat Pulldown",
    "muscleGroup": "back",
    "muscleGroupLabel": "Back (Latissimus Dorsi & Upper Scapula)",
    "category": "Vertical Pulling Hypertrophy",
    "videoUrl": "videos/workout-vid-11.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-1 (3s Negative Stretch, 1s Clavicle Touch, 1s Pull)",
    "formScore": 98.8,
    "setsReps": "4 Sets \u2022 8-10 Reps",
    "angles": {
        "torso": "10-15\u00b0 Slight Lean",
        "elbows": "Down and Back into Back Pockets",
        "scapula": "Full Protraction to Retraction"
    },
    "muscles": [
        {
            "name": "Latissimus Dorsi",
            "pct": 97
        },
        {
            "name": "Teres Major",
            "pct": 91
        },
        {
            "name": "Rhomboids",
            "pct": 84
        },
        {
            "name": "Biceps Brachii",
            "pct": 70
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Grip & Thigh Pad Wedge",
            "timing": "0:00 - Setup",
            "instruction": "Grip wide bar with overhand grip just outside shoulder bends. Wedge thighs snugly under rollers, chest proud."
        },
        {
            "name": "Phase 2: Scapular Depressive Pull",
            "timing": "1 Second",
            "instruction": "Pull shoulder blades down first, then drive elbows down and inward toward back pockets until bar grazes upper clavicle."
        },
        {
            "name": "Phase 3: Peak Lat Pinch",
            "timing": "1 Second",
            "instruction": "Squeeze lats hard at bottom while holding a proud 15\u00b0 thoracic arch."
        },
        {
            "name": "Phase 4: Full Eccentric Stretch",
            "timing": "3 Seconds",
            "instruction": "Resist the ascent for 3 full seconds until arms are fully extended and lats reach maximum overhead stretch."
        }
    ],
    "cues": [
        {
            "title": "Scapula First, Then Arms",
            "desc": "Initiate by pulling shoulder blades down before bending elbows."
        },
        {
            "title": "Drive Elbows into Back Pockets",
            "desc": "Focus on elbow drive rather than pulling with hands to recruit wide wings."
        },
        {
            "title": "Clavicle Touch",
            "desc": "Pull to upper chest only; pulling below sternum impinges shoulders."
        }
    ],
    "mistakes": [
        {
            "mistake": "Leaning Back Too Far",
            "fix": "Maintain a steady 15\u00b0 angle; leaning 45\u00b0 turns a pulldown into a dirty row."
        },
        {
            "mistake": "Pulling Behind Neck",
            "fix": "Always pull to front clavicle to avoid severe rotator cuff and cervical strain."
        }
    ]
},
  cable_row: {
    "id": "cable_row",
    "name": "Neutral-Grip Cable Low Row",
    "muscleGroup": "back",
    "muscleGroupLabel": "Back (Rhomboids, Lats & Mid-Traps)",
    "category": "Horizontal Pulling Mass Builder",
    "videoUrl": "videos/workout-vid-12.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-2-1 (3s Stretch, 2s Scapular Pinch, 1s Row)",
    "formScore": 97.6,
    "setsReps": "4 Sets \u2022 10-12 Reps",
    "angles": {
        "knee": "Soft 15\u00b0 Bend",
        "spine": "Neutral 90\u00b0 Upright",
        "elbows": "15\u00b0 Tight to Torso"
    },
    "muscles": [
        {
            "name": "Rhomboids & Mid-Traps",
            "pct": 96
        },
        {
            "name": "Latissimus Dorsi",
            "pct": 92
        },
        {
            "name": "Posterior Deltoids",
            "pct": 78
        },
        {
            "name": "Erector Spinae",
            "pct": 72
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Seated Bench Setup",
            "timing": "0:00 - Setup",
            "instruction": "Sit tall with feet on footplates, knees slightly bent. Grasp V-bar handle with neutral grip, back straight."
        },
        {
            "name": "Phase 2: Powerful Horizontal Pull",
            "timing": "1 Second",
            "instruction": "Pull handle into lower abdomen / navel by driving elbows straight back close to ribcage."
        },
        {
            "name": "Phase 3: Scapular Squeeze",
            "timing": "2 Seconds",
            "instruction": "Pinch shoulder blades together like squeezing a pencil between your back for two full seconds."
        },
        {
            "name": "Phase 4: Controlled Stretch",
            "timing": "3 Seconds",
            "instruction": "Extend arms forward slowly, letting scapulae protract smoothly without rounding the lower spine."
        }
    ],
    "cues": [
        {
            "title": "Chest High, Shoulders Down",
            "desc": "Keep upper traps relaxed so rhomboids and lats do the heavy contraction."
        },
        {
            "title": "Pencil Squeeze",
            "desc": "Imagine clamping a pencil between shoulder blades at peak contraction."
        },
        {
            "title": "Stable Torso",
            "desc": "Keep back perpendicular to ground; avoid rocking torso forward and backward."
        }
    ],
    "mistakes": [
        {
            "mistake": "Rocking Torso with Momentum",
            "fix": "Stay rigid at 90\u00b0; do not use lower back swaying to move the stack."
        },
        {
            "mistake": "Flaring Elbows High",
            "fix": "Pull handle to belly button with elbows skimming the sides of your waist."
        }
    ]
},
  walking_lunges: {
    "id": "walking_lunges",
    "name": "Walking Dumbbell Lunges",
    "muscleGroup": "legs",
    "muscleGroupLabel": "Legs (Unilateral Quads & Glute Medius)",
    "category": "Unilateral Athletic Hypertrophy",
    "videoUrl": "videos/workout-vid-13.mp4",
    "difficulty": "Intermediate",
    "tempo": "2-1-1 (2s Step & Descend, 1s Bottom Kiss, 1s Drive)",
    "formScore": 97.1,
    "setsReps": "3 Sets \u2022 12 Steps per Leg",
    "angles": {
        "frontKnee": "90\u00b0 Tracking Over Toes",
        "backKnee": "1-inch Hover Over Floor",
        "torso": "Slight Forward Hinge for Glutes"
    },
    "muscles": [
        {
            "name": "Gluteus Maximus",
            "pct": 96
        },
        {
            "name": "Quadriceps",
            "pct": 93
        },
        {
            "name": "Gluteus Medius / Stabilizers",
            "pct": 86
        },
        {
            "name": "Hamstrings",
            "pct": 75
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Standing Dumbbell Stance",
            "timing": "0:00 - Setup",
            "instruction": "Hold dumbbells at sides with neutral grip. Engage core, chest proud, gaze fixed forward."
        },
        {
            "name": "Phase 2: Decelerated Forward Step",
            "timing": "2 Seconds",
            "instruction": "Take a generous stride forward. Lower your center of gravity until front thigh is parallel to turf and back knee hovers 1 inch off floor."
        },
        {
            "name": "Phase 3: Bottom Isometric Balance",
            "timing": "1 Second",
            "instruction": "Stabilize joint angles. Keep front shin near-vertical and knee aligned with second toe."
        },
        {
            "name": "Phase 4: Concentric Step-Through",
            "timing": "1 Second",
            "instruction": "Drive through front mid-foot and heel, stepping back leg directly through into the next stride."
        }
    ],
    "cues": [
        {
            "title": "Tracks, Not a Tightrope",
            "desc": "Step with feet hip-width apart to maintain lateral balance."
        },
        {
            "title": "Hover the Back Knee",
            "desc": "Kiss or hover 1 inch over turf; never smash knee cap into the ground."
        },
        {
            "title": "Slight Torso Lean",
            "desc": "A 10\u00b0 forward torso hinge places massive recruitment on the glute max."
        }
    ],
    "mistakes": [
        {
            "mistake": "Banging Back Knee",
            "fix": "Decelerate the descent under control to safeguard patellar tendon."
        },
        {
            "mistake": "Front Knee Caving Inward",
            "fix": "Push knee out slightly over the pinky toe to maintain knee valgus safety."
        }
    ]
},
  rdl_deadlift: {
    "id": "rdl_deadlift",
    "name": "Dumbbell Romanian Deadlift (RDL)",
    "muscleGroup": "legs",
    "muscleGroupLabel": "Legs (Hamstrings & Posterior Chain)",
    "category": "Hip Hinge Hamstring Builder",
    "videoUrl": "videos/workout-vid-14.mp4",
    "difficulty": "Intermediate / Advanced",
    "tempo": "3-1-1 Strict (3s Hinge Down, 1s Deep Hamstring Stretch, 1s Hip Extension)",
    "formScore": 98.3,
    "setsReps": "4 Sets \u2022 8-10 Reps",
    "angles": {
        "hip": "Deep Horizontal Hinge Push",
        "knee": "Soft Fixed 15-20\u00b0 Bend",
        "spine": "Rigid Neutral 180\u00b0"
    },
    "muscles": [
        {
            "name": "Hamstrings (Biceps Femoris/Semitendinosus)",
            "pct": 98
        },
        {
            "name": "Gluteus Maximus",
            "pct": 94
        },
        {
            "name": "Erector Spinae",
            "pct": 88
        },
        {
            "name": "Grip & Forearms",
            "pct": 80
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Setup & Hip Stance",
            "timing": "0:00 - Setup",
            "instruction": "Stand with feet hip-width apart holding dumbbells in front of thighs. Shoulders down, core braced."
        },
        {
            "name": "Phase 2: Deep 3s Hip Hinge",
            "timing": "3 Seconds",
            "instruction": "Push hips straight back toward wall behind you while maintaining a soft, fixed bend in knees. Shave dumbbells down along shins."
        },
        {
            "name": "Phase 3: Active Hamstring Stretch",
            "timing": "1 Second",
            "instruction": "Pause when hips stop travelling backward (just below knees). Feel the loaded stretch across hamstring bellies."
        },
        {
            "name": "Phase 4: Glute Hip Drive",
            "timing": "1 Second",
            "instruction": "Drive hips forward to stand tall, squeezing glutes firmly at top without arching lower back."
        }
    ],
    "cues": [
        {
            "title": "Push Wall with Hips",
            "desc": "Movement is horizontal hip displacement, not vertical squatting."
        },
        {
            "title": "Shave the Shins",
            "desc": "Keep dumbbells grazing your legs to minimize spinal shear force."
        },
        {
            "title": "Neutral Neck",
            "desc": "Look 6 feet ahead on the floor to keep cervical spine neutral."
        }
    ],
    "mistakes": [
        {
            "mistake": "Rounding Lower Back",
            "fix": "Stop descent as soon as hips reach max back travel; rounding spine invites disc strain."
        },
        {
            "mistake": "Squatting the Weight",
            "fix": "Keep knees soft but fixed in place; hinge strictly at the hips."
        }
    ]
},
  concentration_curl: {
    "id": "concentration_curl",
    "name": "Seated Concentration Dumbbell Curl",
    "muscleGroup": "biceps",
    "muscleGroupLabel": "Biceps (Peak Contraction & Brachialis)",
    "category": "Peak Biceps Contraction",
    "videoUrl": "videos/workout-vid-15.mp4",
    "difficulty": "Beginner / Intermediate",
    "tempo": "3-2-1 (3s Negative, 2s Peak Squeeze, 1s Curl)",
    "formScore": 99.0,
    "setsReps": "3 Sets \u2022 10-12 Reps per Arm",
    "angles": {
        "elbow": "Braced Firmly on Inner Thigh",
        "torso": "Stable Hinge 45\u00b0",
        "wrist": "Full External Supination"
    },
    "muscles": [
        {
            "name": "Biceps Brachii (Short Head)",
            "pct": 99
        },
        {
            "name": "Brachialis",
            "pct": 90
        },
        {
            "name": "Pronator Teres",
            "pct": 70
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Seated Inner Thigh Anchor",
            "timing": "0:00 - Setup",
            "instruction": "Sit on bench edge with wide legs. Wedge back of working arm (tricep) firmly against inner thigh. Arm hangs straight down."
        },
        {
            "name": "Phase 2: Strict Concentric Curl",
            "timing": "1 Second",
            "instruction": "Curl dumbbell up toward opposite shoulder without letting the elbow slip off your inner leg."
        },
        {
            "name": "Phase 3: Supination Peak Squeeze",
            "timing": "2 Seconds",
            "instruction": "Rotate pinky finger upward higher than thumb and contract bicep peak hard for two full seconds."
        },
        {
            "name": "Phase 4: Controlled Descent",
            "timing": "3 Seconds",
            "instruction": "Lower dumbbell slowly to full extension before starting next rep."
        }
    ],
    "cues": [
        {
            "title": "Lock Tricep Against Inner Thigh",
            "desc": "Leg provides a rigid brace eliminating all shoulder and torso cheating."
        },
        {
            "title": "Pinky Higher Than Thumb",
            "desc": "Full supination activates maximal short-head bicep peak contraction."
        },
        {
            "title": "2-Second Hard Hold",
            "desc": "Concentration curls excel at peak tension isometric recruitment."
        }
    ],
    "mistakes": [
        {
            "mistake": "Swinging Torso Upward",
            "fix": "Keep torso stationary; only your forearm should pivot at the elbow."
        },
        {
            "mistake": "Elbow Slipping Off Leg",
            "fix": "Anchor the lower tricep securely into the fleshy inner thigh groove."
        }
    ]
},
  incline_curl: {
    "id": "incline_curl",
    "name": "Seated Incline Dumbbell Biceps Curl",
    "muscleGroup": "biceps",
    "muscleGroupLabel": "Biceps (Long Head Outer Peak)",
    "category": "Maximum Stretch Biceps Hypertrophy",
    "videoUrl": "videos/workout-vid-16.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-1 (3s Lower into Deep Stretch, 1s Pause, 1s Curl)",
    "formScore": 98.4,
    "setsReps": "4 Sets \u2022 10-12 Reps",
    "angles": {
        "bench": "45-60\u00b0 Incline Angle",
        "shoulder": "Hyperextended Behind Torso",
        "elbow": "Full Extended Active Stretch"
    },
    "muscles": [
        {
            "name": "Biceps Brachii (Long Head)",
            "pct": 98
        },
        {
            "name": "Brachialis",
            "pct": 88
        },
        {
            "name": "Forearm Flexors",
            "pct": 68
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Incline Bench Angle Setup",
            "timing": "0:00 - Setup",
            "instruction": "Set bench to 45-60\u00b0 incline. Lean back with head and shoulders firmly against pad, arms hanging straight down."
        },
        {
            "name": "Phase 2: Supinating Curl",
            "timing": "1 Second",
            "instruction": "Curl dumbbells upward while supinating wrists as weights clear thighs. Keep elbows pointing toward the floor."
        },
        {
            "name": "Phase 3: Apex Contraction",
            "timing": "1 Second",
            "instruction": "Squeeze the outer bicep head hard at peak height without pulling elbows forward."
        },
        {
            "name": "Phase 4: Deep Loaded Stretch",
            "timing": "3 Seconds",
            "instruction": "Lower dumbbells under 3-second tension until arms are fully extended behind torso in deep passive stretch."
        }
    ],
    "cues": [
        {
            "title": "Elbows Stay Behind Torso",
            "desc": "Keeping elbows back places the long head under pre-stretch throughout the rep."
        },
        {
            "title": "Head & Back Pinned",
            "desc": "Keep entire spine flush to bench; do not crane neck forward."
        },
        {
            "title": "Deep Stretch at Bottom",
            "desc": "The stretched position on incline curls generates unique stretch-mediated hypertrophy."
        }
    ],
    "mistakes": [
        {
            "mistake": "Drifting Elbows Forward",
            "fix": "Do not bring elbows forward to deltoid height; that shifts tension to front shoulders."
        },
        {
            "mistake": "Using Momentum",
            "fix": "Choose a moderate weight; the long head leverage makes heavy cheating dangerous."
        }
    ]
},
  ez_bar_curl: {
    "id": "ez_bar_curl",
    "name": "Standing EZ-Bar Biceps Curl",
    "muscleGroup": "biceps",
    "muscleGroupLabel": "Biceps (Overall Biceps Mass Builder)",
    "category": "Free-Weight Biceps Foundation",
    "videoUrl": "videos/workout-vid-17.mp4",
    "difficulty": "Intermediate",
    "tempo": "3-1-1 Strict (3s Lower, 1s Pause, 1s Curl)",
    "formScore": 98.9,
    "setsReps": "4 Sets \u2022 8-10 Reps",
    "angles": {
        "elbow": "Pinned at Sides",
        "spine": "Rigid Vertical 180\u00b0",
        "wrist": "Ergonomic Cambered EZ Grip"
    },
    "muscles": [
        {
            "name": "Biceps Brachii (Long & Short Heads)",
            "pct": 97
        },
        {
            "name": "Brachialis",
            "pct": 91
        },
        {
            "name": "Brachioradialis",
            "pct": 82
        }
    ],
    "phases": [
        {
            "name": "Phase 1: Athletic Stance & EZ Grip",
            "timing": "0:00 - Setup",
            "instruction": "Stand with feet shoulder-width, knees soft, holding EZ-bar on inner curves with underhand grip. Elbows against ribs."
        },
        {
            "name": "Phase 2: Strict Concentric Curl",
            "timing": "1 Second",
            "instruction": "Curl bar up in a smooth semi-circle toward clavicle without swaying hips or hyperextending lower back."
        },
        {
            "name": "Phase 3: Squeeze at Upper Chest",
            "timing": "1 Second",
            "instruction": "Contract biceps hard at peak height. Keep wrists rigid in line with forearms."
        },
        {
            "name": "Phase 4: 3-Second Negative",
            "timing": "3 Seconds",
            "instruction": "Lower the bar with strict 3-second resistance to full extension before initiating the next repetition."
        }
    ],
    "cues": [
        {
            "title": "Screwed Elbows",
            "desc": "Glue elbows to your obliques to eliminate front deltoid assistance."
        },
        {
            "title": "No Lumbar Sway",
            "desc": "Squeeze glutes and abs to prevent leaning backward on heavy reps."
        },
        {
            "title": "Full Extension Stretch",
            "desc": "Extend arms completely at the bottom for maximal muscle fiber activation."
        }
    ],
    "mistakes": [
        {
            "mistake": "Swinging Lower Back",
            "fix": "If you need to lean back to move the bar, drop weight by 15% and enforce strict form."
        },
        {
            "mistake": "Elbows Flaring Outward",
            "fix": "Keep elbows tucked in line with shoulders."
        }
    ]
},
};

export function TiltExerciseCard({
  exercise,
  isSelected,
  onSelect,
}: {
  exercise: ExerciseData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Math.max(-10, Math.min(10, x * 18)),
      y: Math.max(-8, Math.min(8, -y * 14)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) videoRef.current.play().catch(() => {});
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(exercise.id)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`group relative rounded-2xl border p-2 backdrop-blur-xl transition-all cursor-pointer ${
        isSelected
          ? "border-emerald-400 bg-zinc-900/90 shadow-2xl shadow-emerald-500/25 ring-2 ring-emerald-500/40"
          : "border-white/10 bg-zinc-900/60 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10"
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          src={exercise.videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="size-full object-cover select-none pointer-events-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{exercise.difficulty}</span>
        </div>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-md">
          <span>{exercise.formScore}% CV</span>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md hover:bg-black/80 transition-all cursor-pointer"
          title={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="size-3 text-zinc-300" />
              <span className="text-[10px]">Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="size-3 text-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400">Playing</span>
            </>
          )}
        </button>
      </div>

      <div className="p-3.5 space-y-2 select-none">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors leading-snug">
            {exercise.name}
          </h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.08] whitespace-nowrap">
            {exercise.setsReps}
          </span>
        </div>

        <p className="text-xs text-zinc-400 font-normal line-clamp-1">
          {exercise.category}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {exercise.muscles.slice(0, 2).map((m, idx) => (
            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {m.name.split(" ")[0]} {m.pct}%
            </span>
          ))}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
            {exercise.tempo.split(" ")[0]}
          </span>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] border-t border-white/[0.06]">
          <span className={`font-semibold flex items-center gap-1.5 ${isSelected ? "text-emerald-400" : "text-zinc-400 group-hover:text-white"}`}>
            <span>{isSelected ? "● Loaded in Simulator" : "▶ Simulate Form"}</span>
          </span>
          <span className="text-zinc-500 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
}

export default function ExerciseSimulator() {
  const [selectedExKey, setSelectedExKey] = useState("bench");
  const [activeMuscleFilter, setActiveMuscleFilter] = useState("all");
  const [activeCoachTab, setActiveCoachTab] = useState("cues");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showAROverlay, setShowAROverlay] = useState(true);
  const [tempoTick, setTempoTick] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const mainCardRef = useRef<HTMLDivElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const currentEx = EXERCISES[selectedExKey] || EXERCISES.bench;

  const handleMainMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainCardRef.current) return;
    const rect = mainCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Math.max(-8, Math.min(8, x * 16)),
      y: Math.max(-6, Math.min(6, -y * 12)),
    });
  };

  const handleMainMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const video = mainVideoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, selectedExKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoTick((prev) => (prev + 1) % 5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tempoSteps = [
    { label: "Eccentric 3s", sub: "Descent", color: "text-blue-400" },
    { label: "Eccentric 2s", sub: "Control", color: "text-blue-400" },
    { label: "Eccentric 1s", sub: "Target Depth", color: "text-cyan-400" },
    { label: "Pause 1s", sub: "Tension In Hole", color: "text-amber-400" },
    { label: "Concentric 1s", sub: "Explode Up", color: "text-emerald-400" },
  ];

  const toggleMainSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!mainVideoRef.current) return;
    const next = !isMuted;
    mainVideoRef.current.muted = next;
    setIsMuted(next);
    if (!next) mainVideoRef.current.play().catch(() => {});
  };

  const muscleSections = [
    { id: "all", label: "All Muscles", count: 7 },
    { id: "chest", label: "Chest", count: 5 },
    { id: "back", label: "Back", count: 1 },
    { id: "biceps", label: "Biceps", count: "Pending" },
    { id: "triceps", label: "Triceps", count: "Pending" },
    { id: "legs", label: "Legs", count: 1 },
  ];

  const exercisesArray = Object.values(EXERCISES);
  const chestExercises = exercisesArray.filter((e) => e.muscleGroup === "chest");
  const backExercises = exercisesArray.filter((e) => e.muscleGroup === "back");
  const legsExercises = exercisesArray.filter((e) => e.muscleGroup === "legs");

  return (
    <section id="simulator" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>GYM EXERCISE SIMULATOR // BIOMECHANICAL AUDIT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
          Interactive Exercise Simulator
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto leading-relaxed">
          3D anatomical video telemetry, 120 FPS joint kinematic vectors, 3-1-1 hypertrophy tempo, and day-wise muscle split execution.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {muscleSections.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMuscleFilter(m.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activeMuscleFilter === m.id
                  ? "bg-white text-black shadow-lg shadow-white/10 font-bold scale-105"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              <span>{m.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeMuscleFilter === m.id ? "bg-black/10 text-black" : "bg-white/10 text-zinc-300"
              }`}>
                {m.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured 3D Player */}
      <div className="w-full rounded-3xl border border-white/[0.1] bg-black/90 backdrop-blur-2xl overflow-hidden shadow-2xl mb-16">
        <div className="border-b border-white/[0.08] px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  {currentEx.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {currentEx.difficulty}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {currentEx.muscleGroupLabel || currentEx.muscleGroup.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {currentEx.category} • <span className="font-mono text-zinc-300">{currentEx.tempo}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
            {exercisesArray.slice(0, 4).map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExKey(ex.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all cursor-pointer ${
                  selectedExKey === ex.id
                    ? "bg-white text-black shadow-md font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {ex.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/[0.08]">
          <div
            ref={mainCardRef}
            onMouseMove={handleMainMouseMove}
            onMouseLeave={handleMainMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="lg:col-span-7 relative bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] min-h-[420px] sm:min-h-[480px] overflow-hidden cursor-pointer"
          >
            <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
              <video
                ref={mainVideoRef}
                src={currentEx.videoUrl}
                className="w-full h-full object-cover max-h-[500px]"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/40" />

              {showAROverlay && (
                <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>CV TRACKING: 120 FPS</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-300 font-semibold shadow-lg">
                      <span>ACCURACY: {currentEx.formScore}%</span>
                    </div>
                  </div>

                  <div className="relative w-full h-44 flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/80 via-cyan-300 to-transparent flex items-center justify-center">
                      <div className="absolute -top-1 size-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                      <span className="absolute left-3 text-[9px] font-mono text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded border border-cyan-400/20 whitespace-nowrap">
                        BAR-PATH: VERTICAL (±0.3cm)
                      </span>
                    </div>

                    <div className="absolute right-4 top-2 bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-2.5 space-y-1 text-right shadow-2xl">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Kinematic Readout</div>
                      {Object.entries(currentEx.angles).map(([k, v]) => (
                        <div key={k} className="text-xs font-mono">
                          <span className="text-zinc-500 capitalize">{k}: </span>
                          <span className="text-emerald-400 font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-zinc-300">
                      {currentEx.name}
                    </span>
                    <span className="text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
                      {currentEx.setsReps}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={toggleMainSound}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md hover:bg-black/80 transition-all cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="size-3.5 text-zinc-300" />
                    <span className="text-[11px]">Audio On</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-400">Playing</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowAROverlay((p) => !p)}
                className={`absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5 ${
                  showAROverlay
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-black/60 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <span>{showAROverlay ? "◉ AR ON" : "○ AR OFF"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-zinc-950/60">
            <div>
              <div className="mb-6 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                    3-1-1 HYPERTROPHY TEMPO CADENCE
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    ACTIVE CYCLE
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5 my-3">
                  {tempoSteps.map((step, idx) => {
                    const isActive = tempoTick === idx;
                    return (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                            : idx < tempoTick ? "bg-white/30" : "bg-white/10"
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-semibold text-white">
                    Beat: {tempoSteps[tempoTick].label}
                  </span>
                  <span className="font-mono text-[11px] text-zinc-400">
                    {tempoSteps[tempoTick].sub}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 border-b border-white/[0.08] pb-2 mb-4 overflow-x-auto">
                {[
                  { id: "cues", label: "Form Cues" },
                  { id: "phases", label: "Phases" },
                  { id: "muscles", label: "Muscles" },
                  { id: "mistakes", label: "Mistakes" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCoachTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                      activeCoachTab === tab.id
                        ? "bg-white/[0.1] text-white font-semibold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeCoachTab === "cues" && (
                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {currentEx.cues.map((cue, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="size-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-white tracking-tight">{cue.title}</h5>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 pl-6 leading-relaxed">
                        {cue.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeCoachTab === "phases" && (
                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {currentEx.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white tracking-tight">{phase.name}</h5>
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded">
                          {phase.timing}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {phase.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeCoachTab === "muscles" && (
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {currentEx.muscles.map((muscle, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-300 font-medium">{muscle.name}</span>
                        <span className="font-mono text-zinc-400 text-[11px]">{muscle.pct}% Recruited</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                          style={{ width: `${muscle.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeCoachTab === "mistakes" && (
                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {currentEx.mistakes.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20"
                    >
                      <div className="flex items-center gap-1.5 text-rose-300 text-xs font-bold">
                        <span>⚠</span>
                        <span>{item.mistake}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300 mt-1 pl-4 leading-relaxed">
                        <strong className="text-emerald-400 font-medium">FIX:</strong> {item.fix}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>NEURAL ENCODING: ACTIVE</span>
              <span className="text-zinc-400">FITQUEST BIO LABS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Muscle Group Sections Grid */}
      <div className="space-y-14">
        {/* Chest */}
        {(activeMuscleFilter === "all" || activeMuscleFilter === "chest") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Chest Exercises (Pectoralis Major & Minor)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  5 anatomical 3D simulation videos with 3D perspective tilt animation.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                5 Videos Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {chestExercises.map((ex) => (
                <TiltExerciseCard
                  key={ex.id}
                  exercise={ex}
                  isSelected={selectedExKey === ex.id}
                  onSelect={(id) => {
                    setSelectedExKey(id);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        {(activeMuscleFilter === "all" || activeMuscleFilter === "back") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  Back Exercises (Trapezius & Lats)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Upper back scapular elevation and lat hypertrophy videos.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                1 Video Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {backExercises.map((ex) => (
                <TiltExerciseCard
                  key={ex.id}
                  exercise={ex}
                  isSelected={selectedExKey === ex.id}
                  onSelect={(id) => {
                    setSelectedExKey(id);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Legs */}
        {(activeMuscleFilter === "all" || activeMuscleFilter === "legs") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  Legs Exercises (Quadriceps, Glutes & Hamstrings)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Compound lower body squat depth and knee alignment telemetry.
                </p>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                1 Video Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {legsExercises.map((ex) => (
                <TiltExerciseCard
                  key={ex.id}
                  exercise={ex}
                  isSelected={selectedExKey === ex.id}
                  onSelect={(id) => {
                    setSelectedExKey(id);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Biceps (Pending) */}
        {(activeMuscleFilter === "all" || activeMuscleFilter === "biceps") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-purple-400" />
                  Biceps Exercises (Biceps Brachii & Brachialis)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Incline dumbbell curls and preacher bench telemetry.
                </p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                Pending Upload
              </span>
            </div>

            <div className="p-8 rounded-2xl border border-dashed border-white/[0.12] bg-zinc-950/40 text-center space-y-3">
              <div className="size-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400 text-lg">
                ⚡
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Biceps Video Pending Upload
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Video footage for Biceps is pending upload. You can provide these videos later, and 3D telemetry for Standing Incline Dumbbell Curls & Barbell Preacher Curls will activate automatically.
              </p>
              <span className="inline-block text-[11px] font-mono text-zinc-500">
                AWAITING LIFTER FOOTAGE // FITQUEST BIO LABS
              </span>
            </div>
          </div>
        )}

        {/* Triceps (Pending) */}
        {(activeMuscleFilter === "all" || activeMuscleFilter === "triceps") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-pink-400" />
                  Triceps Exercises (Triceps Brachii 3 Heads)
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Cable pushdowns and overhead triceps extension telemetry.
                </p>
              </div>
              <span className="text-xs font-mono text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                Pending Upload
              </span>
            </div>

            <div className="p-8 rounded-2xl border border-dashed border-white/[0.12] bg-zinc-950/40 text-center space-y-3">
              <div className="size-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto text-pink-400 text-lg">
                ⚡
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                Triceps Video Pending Upload
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                Video footage for Triceps is pending upload. You can provide these videos later, and 3D telemetry for Cable Rope Pushdowns & Skull Crushers will activate automatically.
              </p>
              <span className="inline-block text-[11px] font-mono text-zinc-500">
                AWAITING LIFTER FOOTAGE // FITQUEST BIO LABS
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
