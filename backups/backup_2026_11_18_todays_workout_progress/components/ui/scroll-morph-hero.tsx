"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface ExerciseItem {
    id: string;
    title: string;
    muscle: string;
    src: string;
    score?: number;
    difficulty?: string;
}

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    exercise?: ExerciseItem;
    onSelect?: (item: ExerciseItem) => void;
}

// --- FlipCard Component ---
const IMG_WIDTH = 75;
const IMG_HEIGHT = 105;

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
    exercise,
    onSelect,
}: FlipCardProps) {
    return (
        <motion.div
            // Smoothly animate to the coordinates defined by the parent
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            onClick={() => onSelect && exercise && onSelect(exercise)}
            // Initial style
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d", // Essential for the 3D hover effect
                perspective: "1000px",
            }}
            className="cursor-pointer group select-none"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180, scale: 1.15 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-900 border border-white/20"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={exercise ? exercise.title : `hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 group-hover:opacity-0 transition-opacity" />
                    
                    {exercise && (
                        <div className="absolute bottom-1.5 left-1.5 right-1.5 pointer-events-none">
                            <span className="text-[7px] font-mono text-emerald-400 font-bold block truncate uppercase">
                                {exercise.muscle}
                            </span>
                            <span className="text-[9px] font-bold text-white block truncate leading-tight">
                                {exercise.title}
                            </span>
                        </div>
                    )}
                </div>

                {/* Back Face (Details on 3D Flip) */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-950 flex flex-col items-center justify-between p-2.5 border border-emerald-500/50 backdrop-blur-xl"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="w-full text-center pt-1">
                        <span className="text-[7px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                            {exercise?.difficulty || "120 FPS CV"}
                        </span>
                        <p className="text-[10px] font-bold text-white leading-tight mt-1 truncate">
                            {exercise?.title || "Exercise Details"}
                        </p>
                    </div>

                    <div className="my-auto py-1">
                        <div className="size-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 text-xs">
                            ▶
                        </div>
                    </div>

                    <div className="w-full pb-0.5">
                        <span className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 block text-center border border-white/10">
                            CLICK TO LOAD
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const MAX_SCROLL = 3000; // Virtual scroll range

// Fallback Unsplash Images
const DEFAULT_IMAGES = [
    "https://cdn.21st.dev/assets/mirror/4d/4d1bff4ea8b9f400dff7ae405f92e15bd39ec76e9285c7d96017e64ba1de3ae1.jpg",
    "https://cdn.21st.dev/assets/mirror/ee/ee36e332fe99d7611c43b90511db08a4f84e4545caa78e7b52e9ccffe273864b.jpg",
    "https://cdn.21st.dev/assets/mirror/dd/dddeaa4e6132c65bf7ff99d197f792a30937b5cbfe97a2b1ee54a793684df52e.jpg",
    "https://cdn.21st.dev/assets/mirror/48/487977107b5011b5e1c25289f6e4393ef555e1a92daee554788e9363b233ca14.jpg",
    "https://cdn.21st.dev/assets/mirror/a1/a12509688be6c9d3b2cb26d2ea1cfce48b8a8dbf2653e17be8a3fc31bd69f162.jpg",
    "https://cdn.21st.dev/assets/mirror/05/051f9e565b5b0b221384d9c27a0760febc3fb48d190c046adfda579f3614c958.jpg",
    "https://cdn.21st.dev/assets/mirror/87/87d4f60a4465d19d14b8acefa46275df4ccd767ccea6d7f234ea5bad99cfec56.jpg",
    "https://cdn.21st.dev/assets/mirror/06/0610989e0675a12c02d35aa5464e2644bf77913214b748b73a894808d2d79877.jpg",
    "https://cdn.21st.dev/assets/mirror/fe/fe90b90751e671a9526134c4743e2fcbf6c1a24991aba273ad7418c88fc9c701.jpg",
    "https://cdn.21st.dev/assets/mirror/2e/2e0452c1994fcc2130a1b8ef68e34b5ea52d1b35b80dde09b99349ad1de54598.jpg",
    "https://cdn.21st.dev/assets/mirror/84/847dc523558808119dc4bbb5218ff862ae5f5b455f33e9a0304f2f5a4b2f0f2c.jpg",
    "https://cdn.21st.dev/assets/mirror/2f/2f128763d177d6bdda3de9f0a766693406034977082bdb542138b7b74af9697b.jpg",
    "https://cdn.21st.dev/assets/mirror/30/30f8223f1d1ecc24fc8b7a9995b8ee98449b1e9fc300c14fbccec01b6a83a0ae.jpg",
    "https://cdn.21st.dev/assets/mirror/b4/b4df0e3e425ffce3b4f62fd7bc717e4dc90b94455f4d65d64fc07fe9721b0519.jpg",
    "https://cdn.21st.dev/assets/mirror/90/90c625659f072e4a701c2e37fa4ca46f25c7ca8689d723e7802fe84cf17874e9.jpg",
    "https://cdn.21st.dev/assets/mirror/6a/6aa0befc69cc3db8f3f3558d4b5e1216a5b64ceae1b86f51acf1c3f1432a8cf7.jpg",
    "https://cdn.21st.dev/assets/mirror/dc/dc126cfd753dc217945d0ea2f915e539dfe4ffb5fdea02245d0f576b25a9c4dd.jpg",
    "https://cdn.21st.dev/assets/mirror/ab/ab5f167fcb763aee7c3247fb8af97875998a7f519a6119da7dadd9cf73ae1a2c.jpg",
    "https://cdn.21st.dev/assets/mirror/57/57d6e450f7068e5f3be04907dcc0815343e67df1dc82f2da0ff1c859afc1f700.jpg",
    "https://cdn.21st.dev/assets/mirror/e4/e491359016d1494074e287dfbb55be068cffc0110017ae2257a5d4cdec193a47.jpg",
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export interface ScrollMorphHeroProps {
    exercises?: ExerciseItem[];
    onSelectExercise?: (exerciseId: string) => void;
    className?: string;
}

export default function ScrollMorphHero({
    exercises,
    onSelectExercise,
    className = "",
}: ScrollMorphHeroProps) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const itemsCount = exercises && exercises.length > 0 ? exercises.length : DEFAULT_IMAGES.length;

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // 1. Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // 2. Scroll Rotation (Shuffling)
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        return Array.from({ length: itemsCount }).map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [itemsCount]);

    // --- Render Loop Values ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className={`relative w-full h-[620px] sm:h-[700px] bg-black border border-white/10 rounded-3xl overflow-hidden select-none ${className}`}>
            
            {/* Ambient Background Gradient & Glass Accents */}
            <div className="absolute inset-0 bg-radial from-emerald-950/20 via-black to-black pointer-events-none" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Intro Center Text (Fades out when morphing to bottom arc) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="space-y-3"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>19 ANATOMICAL EXERCISES // SCROLL TO EXPAND</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                            Biomechanical Radar
                        </h1>
                        <p className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase">
                            SCROLL WHEEL OR DRAG TO MORPH INTO 3D ARCH
                        </p>
                    </motion.div>
                </div>

                {/* Arc Active Content (Fades in when arc forms at top) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] font-mono mb-2">
                        <span className="size-1.5 rounded-full bg-cyan-400" />
                        <span>HOVER TO FLIP • CLICK CARD TO LOAD TELEMETRY</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                        Select an Exercise to Simulate
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed mt-1">
                        Interact with the 3D rotating arc below. Hover over any exercise to flip the card in 3D space, and click to inspect full joint angles, 3-1-1 tempo, and form cues.
                    </p>
                </motion.div>

                {/* Main 3D Card Orbit / Morph Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {Array.from({ length: itemsCount }).map((_, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        const isMobile = containerSize.width < 768;
                        const minDimension = Math.min(containerSize.width || 800, containerSize.height || 600);

                        if (introPhase === "scatter") {
                            target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
                        } else if (introPhase === "line") {
                            const lineSpacing = 75;
                            const lineTotalWidth = itemsCount * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            // Circle Phase
                            const circleRadius = Math.min(minDimension * 0.38, 320);
                            const circleAngle = (i / itemsCount) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Rainbow Arch Phase (Bottom Arc)
                            const baseRadius = Math.min(containerSize.width || 1000, (containerSize.height || 700) * 1.4);
                            const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);

                            const arcApexY = (containerSize.height || 600) * (isMobile ? 0.38 : 0.28);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 110 : 140;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / Math.max(1, itemsCount - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.85;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.3 : 1.6,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        const ex = exercises ? exercises[i] : undefined;
                        const src = ex ? ex.src : DEFAULT_IMAGES[i % DEFAULT_IMAGES.length];

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={itemsCount}
                                phase={introPhase}
                                target={target}
                                exercise={ex}
                                onSelect={(item) => onSelectExercise && onSelectExercise(item.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
