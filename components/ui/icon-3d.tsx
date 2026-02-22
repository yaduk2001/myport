"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Icon3DProps {
    icon: LucideIcon;
    color?: string; // e.g. "#6366f1"
    size?: number | string;
    className?: string;
    iconClassName?: string;
}

export function Icon3D({
    icon: Icon,
    color = "#6366f1",
    size = 44,
    className,
    iconClassName
}: Icon3DProps) {
    return (
        <motion.div
            className={cn(
                "relative flex items-center justify-center shrink-0 overflow-hidden",
                "rounded-2xl border border-white/20",
                className
            )}
            style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, ${color}22 0%, ${color}05 100%)`,
                boxShadow: `
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.4),
          inset 0 -2px 4px 0 rgba(0, 0, 0, 0.1),
          0 4px 8px -2px rgba(0, 0, 0, 0.05),
          0px 2px 4px 0px ${color}30
        `,
                backdropFilter: "blur(8px)",
                transformStyle: "preserve-3d"
            }}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Glossy top highlight */}
            <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 opacity-70 pointer-events-none"
                style={{ transform: "translateZ(10px)" }}
            />

            {/* The Icon */}
            <Icon
                className={cn("relative z-10 drop-shadow-md", iconClassName)}
                style={{
                    width: typeof size === "number" ? size * 0.45 : "45%",
                    height: typeof size === "number" ? size * 0.45 : "45%",
                    color: color,
                    filter: `drop-shadow(0px 2px 4px ${color}80)`,
                    transform: "translateZ(20px)"
                }}
            />
        </motion.div>
    );
}
