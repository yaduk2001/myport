"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code2, Brain, Rocket } from "lucide-react";
import { ParticleField } from "@/components/ui/particle-field";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { fadeUp, fadeRight, fadeLeft, scaleUp, springPop, staggerContainer, viewport } from "@/lib/animations";

const techBadges = [
    { label: "React", color: "#61dafb", bg: "#e8f9fe" },
    { label: "Next.js", color: "#4338ca", bg: "#eef0ff" },
    { label: "Python", color: "#3776ab", bg: "#eef4fb" },
    { label: "TensorFlow", color: "#ff6f00", bg: "#fff5e6" },
    { label: "Node.js", color: "#339933", bg: "#edf7ee" },
    { label: "Firebase", color: "#ffa000", bg: "#fff8e8" },
];

const floatingCards = [
    { icon: Code2, label: "Full-Stack Dev", color: "#6366f1", bg: "#f0f0ff", x: "-left-4 md:-left-10", y: "top-[18%]", delay: 0 },
    { icon: Brain, label: "AI / ML Expert", color: "#f43f5e", bg: "#fff0f3", x: "-right-4 md:-right-10", y: "top-[38%]", delay: 1.5 },
    { icon: Rocket, label: "Product Builder", color: "#f59e0b", bg: "#fffbeb", x: "-left-4 md:-left-10", y: "bottom-[18%]", delay: 0.8 },
];

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden hero-mesh grid-pattern">
            {/* Particle Field */}
            <ParticleField count={35} className="z-0" />

            {/* Animated morphing blobs */}
            <motion.div
                animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] morph-blob pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)" }}
            />
            <motion.div
                animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute -bottom-40 -right-40 w-[700px] h-[700px] morph-blob pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

                    {/* ── LEFT ── */}
                    <motion.div
                        variants={staggerContainer(0.1, 0.1)}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Status badge */}
                        <motion.div variants={springPop} className="mb-6">
                            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold border"
                                style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#059669" }}>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                </span>
                                Available for new opportunities
                            </span>
                        </motion.div>

                        {/* Role label */}
                        <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "var(--fg-subtle)" }}>
                            Full-Stack · AI/ML · Product
                        </motion.p>

                        {/* Headline */}
                        <motion.div variants={fadeUp}>
                            <h1 className="font-display font-extrabold leading-[1.04] mb-6">
                                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "var(--fg)" }}>Yadu Krishna</span>
                                <span className="block text-5xl md:text-6xl lg:text-7xl" style={{ color: "var(--fg)" }}>KS</span>
                                <span className="block text-4xl md:text-5xl lg:text-6xl mt-2 text-shimmer">MCA Graduate &amp;</span>
                                <span className="block text-4xl md:text-5xl lg:text-6xl text-shimmer">Developer</span>
                            </h1>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            variants={fadeUp}
                            className="text-lg leading-relaxed max-w-lg mb-8 font-medium"
                            style={{ color: "var(--fg-muted)" }}
                        >
                            I engineer scalable web solutions and intelligent AI-powered systems.
                            Bridging the gap between{" "}
                            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>beautiful design</strong> and{" "}
                            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>complex logic</strong> to build digital products that matter.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
                            <motion.a
                                href="#projects"
                                className="btn-primary group gradient-border"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="btn-outline group"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Mail className="w-4 h-4" />
                                Get in Touch
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-12">
                            {[
                                { href: "https://github.com/yaduk2001", icon: Github, label: "GitHub", hoverColor: "#6366f1" },
                                { href: "https://www.linkedin.com/in/yk-krishna", icon: Linkedin, label: "LinkedIn", hoverColor: "#0077b5" },
                            ].map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-semibold transition-all underline-slide"
                                    style={{ color: "var(--fg-muted)" }}
                                    whileHover={{ y: -3, color: s.hoverColor } as any}
                                >
                                    <motion.div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                                        style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
                                        whileHover={{ scale: 1.15, borderColor: s.hoverColor, boxShadow: `0 0 0 3px ${s.hoverColor}20` } as any}
                                    >
                                        <s.icon className="w-4 h-4" />
                                    </motion.div>
                                    {s.label}
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Stats with animated counters */}
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-8 pt-8 border-t"
                            style={{ borderColor: "var(--border)" }}
                        >
                            {[
                                { value: 5, suffix: "+", label: "Years Building " },
                                { value: 13, suffix: "+", label: "Live Projects" },
                                { value: 50, suffix: "+", label: "Certifications" },
                            ].map((s, i) => (
                                <div key={i}>
                                    <div className="font-display font-extrabold text-2xl" style={{ color: "var(--color-brand-500)" }}>
                                        <AnimatedCounter to={s.value} suffix={s.suffix} />
                                    </div>
                                    <div className="text-xs font-semibold mt-0.5" style={{ color: "var(--fg-subtle)" }}>{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT — Visual Card Stack ── */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        animate="visible"
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-sm">
                            {/* Main Card */}
                            <motion.div
                                className="card p-8 relative overflow-hidden glow-pulse"
                                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(99,102,241,0.2)" } as any}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Rainbow top bar */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-[var(--card-radius)]"
                                    style={{ background: "linear-gradient(90deg, #6366f1, #0ea5e9, #f43f5e, #f59e0b)" }}
                                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div
                                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                                        style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }}
                                        animate={{ rotate: [0, 2, -2, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        YK
                                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                        </span>
                                    </motion.div>
                                    <div>
                                        <div className="font-display font-bold text-lg" style={{ color: "var(--fg)" }}>Yadu Krishna KS</div>
                                        <div className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>Full-Stack &amp; AI/ML Dev</div>
                                    </div>
                                </div>

                                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--fg-subtle)" }}>Core Technologies</p>
                                <motion.div
                                    className="flex flex-wrap gap-2 mb-6"
                                    variants={staggerContainer(0.06, 0.2)}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {techBadges.map((badge) => (
                                        <motion.span
                                            key={badge.label}
                                            variants={springPop}
                                            className="tag text-xs cursor-default"
                                            style={{ background: badge.bg, color: badge.color, borderColor: badge.bg }}
                                            whileHover={{ scale: 1.12, y: -2 }}
                                        >
                                            {badge.label}
                                        </motion.span>
                                    ))}
                                </motion.div>

                                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl" style={{ background: "var(--bg-muted)" }}>
                                    {[
                                        { value: 3, suffix: "+", label: "Years" },
                                        { value: 6, suffix: "+", label: "Projects" },
                                        { value: 50, suffix: "+", label: "Certs" },
                                    ].map((s, i) => (
                                        <div key={i} className="text-center">
                                            <div className="font-display font-bold text-xl text-brand-600 dark:text-brand-400">
                                                <AnimatedCounter to={s.value} suffix={s.suffix} />
                                            </div>
                                            <div className="text-[10px] font-bold uppercase tracking-wide mt-0.5" style={{ color: "var(--fg-subtle)" }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="absolute top-4 right-4">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles className="w-5 h-5 text-amber-400 opacity-70" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Floating side cards */}
                            {floatingCards.map((fc, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: fc.delay }}
                                    className={`absolute ${fc.x} ${fc.y} card flex items-center gap-2.5 px-4 py-3 shadow-lg spotlight`}
                                    style={{ border: "1px solid var(--border)", minWidth: 160 }}
                                    whileHover={{ scale: 1.08, x: i % 2 === 0 ? -4 : 4 } as any}
                                >
                                    <motion.div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: fc.bg }}
                                        whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 } as any}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <fc.icon className="w-4 h-4" style={{ color: fc.color }} />
                                    </motion.div>
                                    <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{fc.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
                    style={{ borderColor: "var(--border-strong)" }}
                >
                    <motion.div
                        className="w-1.5 h-2.5 rounded-full"
                        style={{ background: "var(--color-brand-500)" }}
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--fg-subtle)" }}>Scroll</span>
            </motion.div>
        </section>
    );
};
