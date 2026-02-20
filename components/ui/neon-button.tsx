"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    glow?: boolean;
}

export const NeonButton = ({
    children,
    className,
    variant = "primary",
    glow = true,
    ...props
}: NeonButtonProps) => {
    const variants = {
        primary: "bg-neon-blue text-black font-semibold border border-neon-blue hover:bg-neon-blue/90",
        secondary: "bg-neon-violet text-white font-semibold border border-neon-violet hover:bg-neon-violet/90",
        outline: "bg-transparent text-white border border-white/20 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative rounded-full px-8 py-3 transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                glow && variant !== "outline" && "shadow-[0_0_20px_-5px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_-5px_rgba(0,243,255,0.6)]",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
