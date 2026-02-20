"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
    text: string;
    className?: string;
    el?: React.ElementType;
    once?: boolean;
}

const defaultAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom realistic ease out
        },
    },
};

export const AnimatedText = ({
    text,
    className,
    el: Wrapper = "p",
    once = true,
}: AnimatedTextProps) => {
    // Split the text into lines if there are line breaks, otherwise into words or characters depending on effect desired.
    // For maximum performance and smoothness, splitting by word is usually a good balance.
    const words = text.split(" ");

    return (
        <Wrapper className={className}>
            <motion.span
                initial="hidden"
                whileInView="visible"
                viewport={{ once, amount: 0.1 }}
                transition={{ staggerChildren: 0.04 }}
                className="inline-block"
            >
                {words.map((word, wordIndex) => (
                    <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
                        <motion.span variants={defaultAnimations} className="inline-block">
                            {word}
                        </motion.span>
                        <span className="inline-block">&nbsp;</span>
                    </span>
                ))}
            </motion.span>
        </Wrapper>
    );
};
