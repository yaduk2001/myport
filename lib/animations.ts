import { Variants } from "framer-motion";

/* ── Viewport config — once: false enables REVERSE animations ── */
export const viewport = { once: false, margin: "-80px 0px" };
export const viewportLazy = { once: false, margin: "-120px 0px" };

/* ────────────────────────────────────────────
   FADE VARIANTS
──────────────────────────────────────────── */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeDown: Variants = {
    hidden: { opacity: 0, y: -32, filter: "blur(6px)" },
    visible: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
    visible: {
        opacity: 1, x: 0, filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
    visible: {
        opacity: 1, x: 0, filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

/* ────────────────────────────────────────────
   SCALE VARIANTS
──────────────────────────────────────────── */
export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.82, filter: "blur(8px)" },
    visible: {
        opacity: 1, scale: 1, filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
};

export const scaleDown: Variants = {
    hidden: { opacity: 0, scale: 1.12, filter: "blur(6px)" },
    visible: {
        opacity: 1, scale: 1, filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
};

/* ────────────────────────────────────────────
   ROTATE VARIANTS
──────────────────────────────────────────── */
export const rotateIn: Variants = {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: {
        opacity: 1, rotate: 0, scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
};

/* ────────────────────────────────────────────
   FLIP VARIANTS
──────────────────────────────────────────── */
export const flipX: Variants = {
    hidden: { opacity: 0, rotateX: 70, transformPerspective: 800 },
    visible: {
        opacity: 1, rotateX: 0, transformPerspective: 800,
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
    },
};

/* ────────────────────────────────────────────
   STAGGER CONTAINER
──────────────────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: stagger,
            delayChildren,
        }
    },
});

/* ────────────────────────────────────────────
   SPRING POP
──────────────────────────────────────────── */
export const springPop: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: 1, scale: 1,
        transition: { type: "spring", stiffness: 380, damping: 20 }
    },
};

/* ────────────────────────────────────────────
   SLIDE REVEAL (clipping text reveal)
──────────────────────────────────────────── */
export const slideReveal: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    },
};

/* ────────────────────────────────────────────
   CARD HOVER (whileHover)
──────────────────────────────────────────── */
export const cardHover = {
    scale: 1.025,
    y: -6,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
};

export const cardTap = { scale: 0.97 };

/* ────────────────────────────────────────────
   ICON SPIN on hover
──────────────────────────────────────────── */
export const iconSpin = {
    rotate: [0, -12, 12, -6, 6, 0],
    scale: [1, 1.15, 1.15, 1.1, 1.1, 1],
    transition: { duration: 0.55, ease: "easeInOut" }
};

/* ────────────────────────────────────────────
   SHIMMER background-position animation
──────────────────────────────────────────── */
export const shimmerVariant: Variants = {
    hidden: { backgroundPosition: "200% center" },
    visible: {
        backgroundPosition: ["-200% center", "200% center"],
        transition: { duration: 3, ease: "linear", repeat: Infinity }
    }
};
