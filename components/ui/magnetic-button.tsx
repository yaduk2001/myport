"use client";

import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: React.ReactNode;
    intensity?: number;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
    ({ children, className, intensity = 40, onMouseMove, onMouseLeave, ...props }, externalRef) => {
        const internalRef = useRef<HTMLButtonElement>(null);
        const ref = (externalRef as React.RefObject<HTMLButtonElement | null>) || internalRef;

        const [isHovered, setIsHovered] = useState(false);

        // Position of the mouse relative to center of component
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        // Smooth spring physics for returning to center
        const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
        const springX = useSpring(x, springConfig);
        const springY = useSpring(y, springConfig);

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!ref.current) return;
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            x.set(distanceX * (intensity / 100));
            y.set(distanceY * (intensity / 100));

            setIsHovered(true);
            if (onMouseMove) onMouseMove(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsHovered(false);
            x.set(0);
            y.set(0);
            if (onMouseLeave) onMouseLeave(e);
        };

        return (
            <motion.button
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    x: springX,
                    y: springY,
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "relative flex items-center justify-center overflow-hidden transition-all duration-300",
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>

                {/* Glow effect that tracks hover state */}
                <motion.div
                    className="absolute inset-0 z-0 bg-white/5 opacity-0 pointer-events-none rounded-inherit"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                />
            </motion.button>
        );
    }
);
MagneticButton.displayName = "MagneticButton";
