"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, GraduationCap, Trophy, Sparkles, ArrowUpRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, springPop, staggerContainer, flipX, viewport } from "@/lib/animations";

const highlights = [
    { icon: Code2, label: "Full-Stack Dev", desc: "React · Next.js · Node.js", color: "#6366f1", bg: "#f0f0ff" },
    { icon: Cpu, label: "AI / ML Engineer", desc: "TensorFlow · PyTorch · GenAI", color: "#f43f5e", bg: "#fff0f3" },
    { icon: GraduationCap, label: "MCA Graduate", desc: "Amal Jyothi College · 2025", color: "#f59e0b", bg: "#fffbeb" },
    { icon: Trophy, label: "50+ Certifications", desc: "Google · Infosys · WIPO", color: "#10b981", bg: "#ecfdf5" },
];

const focusAreas = ["Scalable Web Applications", "AI/ML Integrations", "CI/CD & Automations", "Spatial User Interfaces"];

export const About = () => {
    return (
        <section id="about" className="py-28 relative" style={{ background: "var(--section-alt)" }}>
            <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <Sparkles className="w-3.5 h-3.5" />
                        Discover
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4" style={{ color: "var(--fg)" }}>
                        Behind the Code
                    </h2>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
                    {/* Left — Bio */}
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                        className="lg:col-span-3"
                    >
                        <motion.div
                            className="card p-8 md:p-10 gradient-border spotlight h-full"
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <div className="divider mb-6" />
                            <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--fg)" }}>
                                Engineering Intelligent Digital Ecosystems
                            </h3>
                            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                <p>
                                    I am a <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Results-driven MCA Graduate</strong> with proven expertise in full-stack development, automation, and AI-powered systems.
                                </p>
                                <p>
                                    My passion lies in building scalable, intelligent, and user-centric digital solutions. I don't just write code; I engineer solutions that solve real-world problems and deliver exceptional user experiences.
                                </p>
                            </div>

                            <motion.div
                                className="mt-8 p-5 rounded-xl"
                                style={{ background: "var(--bg-muted)" }}
                            >
                                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--fg-subtle)" }}>Career Focus Areas</p>
                                <motion.div
                                    className="grid grid-cols-2 gap-3"
                                    variants={staggerContainer(0.07, 0.1)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                >
                                    {focusAreas.map((area, i) => (
                                        <motion.div key={i} variants={springPop} className="flex items-center gap-2.5">
                                            <motion.span
                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{ background: "#6366f1" }}
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                            />
                                            <span className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>{area}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            <a
                                href="https://www.linkedin.com/in/yk-krishna"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 text-brand-500 font-semibold text-sm group underline-slide"
                            >
                                View full profile on LinkedIn
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right — Highlights */}
                    <motion.div
                        className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4"
                        variants={staggerContainer(0.1, 0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                variants={flipX}
                                className="card p-5 flex items-center gap-4 group gradient-border spotlight"
                                whileHover={{ y: -5, x: 3, transition: { duration: 0.3 } }}
                            >
                                <motion.div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: h.bg }}
                                    whileHover={{ rotate: [-8, 8, -4, 0], scale: 1.2 } as any}
                                    transition={{ duration: 0.45 }}
                                >
                                    <h.icon className="w-5 h-5" style={{ color: h.color }} />
                                </motion.div>
                                <div>
                                    <p className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{h.label}</p>
                                    <p className="text-xs mt-0.5" style={{ color: "var(--fg-subtle)" }}>{h.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
