"use client";

import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Code2, Cpu, GraduationCap, Trophy, Sparkles, ArrowUpRight, PenTool, Rocket, Smartphone, Database, Activity, Palette } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, springPop, staggerContainer, flipX, viewport } from "@/lib/animations";
import { Icon3D } from "@/components/ui/icon-3d";

const highlights = [
    { icon: Code2, label: "Full-Stack Dev", desc: "React · Next.js · Node.js", color: "#6366f1", bg: "#f0f0ff" },
    { icon: Cpu, label: "AI / ML Engineer", desc: "TensorFlow · PyTorch · GenAI", color: "#f43f5e", bg: "#fff0f3" },
    { icon: GraduationCap, label: "MCA Graduate", desc: "Amal Jyothi College · 2025", color: "#f59e0b", bg: "#fffbeb" },
    { icon: Trophy, label: "50+ Certifications", desc: "Google · Infosys · WIPO", color: "#10b981", bg: "#ecfdf5" },
    { icon: PenTool, label: "Creative Writer", desc: "Amazon Kindle Author", color: "#8b5cf6", bg: "#f3e8ff" },
    { icon: Smartphone, label: "App Developer", desc: "Flutter · Dart", color: "#14b8a6", bg: "#ccfbf1" },
    { icon: Activity, label: "Open Source", desc: "Active Contributor", color: "#ec4899", bg: "#fce7f3" },
    { icon: Palette, label: "UI Enthusiast", desc: "Framer Motion", color: "#d946ef", bg: "#fae8ff" },
];

const focusAreas = ["Scalable Web Applications", "AI/ML Integrations", "CI/CD & Automations", "Spatial User Interfaces"];

export const About = () => {
    const [items, setItems] = useState(highlights);

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
                                Where Logic Meets Imagination
                            </h3>
                            <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                <p>
                                    Beyond the screen, I am a <strong style={{ color: "var(--fg)", fontWeight: 600 }}>dedicated novelist and world-builder</strong> at heart. While I am a results-driven MCA Graduate specializing in full-stack development, artificial intelligence, and scalable systems, my approach to engineering is entirely driven by storytelling. I view every software project not as a rigid set of technical requirements, but as a living narrative—a vast, dynamic universe built from pure logic, optimized for epic user journeys, and designed to leave a lasting emotional impact.
                                </p>
                                <p>
                                    My deep obsession with crafting fictional realms and cutting-edge technology allows me to tackle complex problems like plotting a thriller. Constructing a robust digital ecosystem is exactly like writing a captivating book: just as a gripping story demands brilliant pacing, complex characters, and a flawless plot, an exceptional application requires elegant architecture, seamless user interactions, and visionary scalability.
                                </p>
                                <p>
                                    Whether I am training advanced AI models, deploying lightning-fast web applications, or writing the next explosive chapter of an action-packed book series, I bring the exact same relentless imagination, narrative discipline, and meticulous attention to detail to every world I create.
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
                    <Reorder.Group
                        axis="y"
                        values={items}
                        onReorder={setItems}
                        className="lg:col-span-2 flex flex-col justify-start h-full gap-4 py-1 list-none m-0 p-0"
                        variants={staggerContainer(0.1, 0.2)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewport}
                    >
                        {items.map((h, i) => (
                            <Reorder.Item
                                key={h.label}
                                value={h}
                                variants={flipX}
                                className="w-[85%] mx-auto lg:w-full cursor-grab active:cursor-grabbing relative z-20"
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{
                                        duration: 3 + (i % 2),
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2
                                    }}
                                    className="h-full"
                                >
                                    <motion.div
                                        className="card p-4 px-5 flex items-center gap-4 group gradient-border spotlight w-full h-full"
                                        whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.3 } }}
                                    >
                                        <Icon3D icon={h.icon} color={h.color} size={48} />
                                        <div>
                                            <p className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{h.label}</p>
                                            <p className="text-xs mt-0.5" style={{ color: "var(--fg-subtle)" }}>{h.desc}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>
            </div>
        </section>
    );
};
