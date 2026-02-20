"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    gradient?: boolean;
    onClick?: () => void;
}

export const GlassCard = ({ children, className, gradient = false, onClick }: GlassCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={onClick}
            className={cn(
                "premium-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]",
                gradient && "before:absolute before:-inset-1 before:bg-gradient-to-r before:from-accent-primary/10 before:to-accent-secondary/10 before:blur-xl before:opacity-0 hover:before:opacity-100",
                className
            )}
        >
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
};
