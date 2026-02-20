"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export const SpatialCard = ({
    children,
    className,
    intensity = 10,
}: {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring animations for a physical, smooth return to center
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        // Rotate based on mouse position. Multiply by intensity.
        x.set(xPct * intensity);
        y.set(yPct * intensity);
    };

    const handleMouseLeave = () => {
        // Return to center
        x.set(0);
        y.set(0);
    };

    // Calculate derived values
    const rotateX = useTransform(mouseYSpring, (y) => y * -1);
    const rotateY = mouseXSpring;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformPerspective: 1000,
                rotateX,
                rotateY,
            }}
            className={cn(
                "relative transition-transform duration-200 ease-linear rounded-3xl group",
                className
            )}
        >
            {/* The Card Content wrapper */}
            <div
                className={cn(
                    "h-full w-full rounded-3xl premium-card overflow-hidden relative",
                    "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                )}
            >
                {children}

                {/* Dynamic Highlight/Glare that follows the mouse */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform z-50"
                    style={{
                        background: useMotionTemplate`radial-gradient(circle at calc(50% + ${useTransform(mouseXSpring, v => v * 3)}px) calc(50% + ${useTransform(mouseYSpring, v => v * 3)}px), rgba(37,99,235,0.03) 0%, transparent 50%)`,
                    }}
                />
            </div>
        </motion.div>
    );
};
