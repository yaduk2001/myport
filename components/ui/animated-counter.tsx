"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
    from?: number;
    to: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export const AnimatedCounter = ({
    from = 0,
    to,
    suffix = "",
    prefix = "",
    duration = 1.8,
    className = "",
}: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-60px" });

    const motionValue = useMotionValue(from);
    const spring = useSpring(motionValue, {
        stiffness: 80,
        damping: 20,
        duration,
    });

    const displayRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (isInView) {
            motionValue.set(to);
        } else {
            motionValue.set(from);
        }
    }, [isInView, to, from, motionValue]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest) => {
            if (displayRef.current) {
                displayRef.current.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
            }
        });
        return unsubscribe;
    }, [spring, prefix, suffix]);

    return (
        <span ref={ref} className={className}>
            <span ref={displayRef}>{prefix}{from}{suffix}</span>
        </span>
    );
};
