"use client";

import { motion } from "framer-motion";
import { Cpu, Server, MonitorSmartphone, ChevronRight } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, springPop, staggerContainer, viewport } from "@/lib/animations";
import { Icon3D } from "@/components/ui/icon-3d";

const skills = [
    {
        category: "Frontend & Mobile",
        icon: MonitorSmartphone,
        accent: "#6366f1",
        bgAccent: "rgba(99,102,241,0.08)",
        items: ["React.js", "Next.js App Router", "Angular", "Vue.js", "Flutter", "Dart", "React Native", "Swift & Kotlin", "Ionic & Capacitor", "TailwindCSS & SASS", "TypeScript", "Framer Motion", "Progressive Web Apps (PWA)", "Redux & Zustand", "React Query", "HTML5 & CSS3", "WebGL & Three.js", "Web Accessibility (WCAG)"]
    },
    {
        category: "Backend & Full Stack",
        icon: Server,
        accent: "#f43f5e",
        bgAccent: "rgba(244,63,94,0.08)",
        items: ["Node.js & Express", "Python (Django/FastAPI)", "RESTful & GraphQL APIs", "Firebase & Supabase", "PostgreSQL & MySQL", "MongoDB & NoSQL", "AWS & Cloud Infrastructure", "Docker & Kubernetes", "CI/CD Workflows", "OAuth 2.0 & Web Security", "Serverless Architecture", "Real-time WebSockets"]
    },
    {
        category: "Artificial Intelligence",
        icon: Cpu,
        accent: "#f59e0b",
        bgAccent: "rgba(245,158,11,0.08)",
        items: ["Deep Learning & Neural Nets", "Computer Vision Engines", "Predictive Analytics", "Automated Decision Systems", "TensorFlow & PyTorch", "Natural Language Processing", "Data Extraction Pipelines", "Model Optimization", "AI-Driven Workflows"]
    }
];

const cardVariants = [fadeLeft, fadeUp, fadeRight];

export const Skills = () => {
    return (
        <section id="skills" className="py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <ChevronRight className="w-3.5 h-3.5" />
                        Technical Arsenal
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 mb-4" style={{ color: "var(--fg)" }}>
                        Technical Expertise
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg" style={{ color: "var(--fg-muted)" }}>
                        A comprehensive command of modern technologies, engineered to build scalable, high-performance, and intelligent platforms.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    variants={staggerContainer(0.14)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants[index]}
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                        >
                            <div className="card h-full p-7 group overflow-hidden relative gradient-border spotlight">
                                {/* Accent top bar */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[var(--card-radius)]"
                                    style={{ background: skill.accent }}
                                    initial={{ scaleX: 0, transformOrigin: "left" }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={viewport}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                />

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-7 pt-3">
                                    <Icon3D icon={skill.icon} color={skill.accent} size={48} />
                                    <div>
                                        <h3 className="font-display font-bold text-xl leading-tight" style={{ color: "var(--fg)" }}>
                                            {skill.category}
                                        </h3>
                                        <p className="text-xs mt-1 font-semibold" style={{ color: "var(--fg-subtle)" }}>
                                            {skill.items.length} areas
                                        </p>
                                    </div>
                                </div>

                                {/* Tags — stagger */}
                                <motion.div
                                    className="flex flex-wrap gap-2"
                                    variants={staggerContainer(0.04, 0.3 + index * 0.1)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewport}
                                >
                                    {skill.items.map((item, idx) => (
                                        <motion.span
                                            key={idx}
                                            variants={springPop}
                                            className="tag cursor-default text-[12px]"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
