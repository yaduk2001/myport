"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { fadeUp, springPop, staggerContainer, viewport } from "@/lib/animations";

const experiences = [
    {
        title: "Coordinator (Technical & Cultural Fest)",
        company: "Azure",
        location: "India",
        period: "2024 - Present",
        description: "Developed a comprehensive online platform for booking movie tickets, featuring user authentication, real-time seat selection, and payment integration.",
        skills: ["Quality Assurance", "Resource Allocation", "Project Management", "Team Leadership", "Event Planning"]
    },
    {
        title: "Computer Association Vice-President",
        company: "IHRD Technical Fest Representative (Inter College)",
        location: "Kerala, India",
        period: "Dec 2023 - Present",
        description: "Designed and implemented a home automation system using Flutter for the mobile interface and Arduino for controlling various home appliances.",
        skills: ["Quality Assurance", "Resource Allocation", "App Development", "Hardware Integration", "Flutter"]
    },
    {
        title: "Project Manager",
        company: "C2B Software Solutions",
        location: "Ernakulam, Kerala",
        period: "Dec 2021 - Mar 2022",
        description: "Managed software projects and client interactions. Full-time role leading cross-functional project delivery and maintaining client relationships.",
        skills: ["Quality Assurance", "Resource Allocation", "Agile Methodology", "Client Communication"]
    }
];

const accentColors = ["#6366f1", "#f43f5e", "#f59e0b"];
const accentBgs = ["rgba(99,102,241,0.08)", "rgba(244,63,94,0.08)", "rgba(245,158,11,0.08)"];

export const Experience = () => {
    return (
        <section id="experience" className="py-28 relative" style={{ background: "var(--section-alt)" }}>
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
                        <Briefcase className="w-3.5 h-3.5" />
                        Journey
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4" style={{ color: "var(--fg)" }}>
                        Professional Experience
                    </h2>
                </motion.div>

                {/* Horizontal Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    variants={staggerContainer(0.14)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="h-full"
                            whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                        >
                            <div className="card h-full flex flex-col group relative overflow-hidden gradient-border spotlight">
                                {/* Left accent stripe */}
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[var(--card-radius)]"
                                    style={{ background: accentColors[i] }}
                                    initial={{ scaleY: 0, transformOrigin: "top" }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={viewport}
                                    transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                />

                                <div className="p-6 flex flex-col h-full pl-8">
                                    {/* Period badge */}
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span
                                            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                            style={{ background: accentBgs[i], color: accentColors[i] }}
                                        >
                                            <Calendar className="w-3 h-3" />
                                            {exp.period}
                                        </span>
                                    </div>

                                    <span className="inline-flex items-center gap-1 text-xs font-medium mb-4" style={{ color: "var(--fg-subtle)" }}>
                                        <MapPin className="w-3 h-3" />
                                        {exp.location}
                                    </span>

                                    <h3 className="font-display font-bold text-lg leading-snug mb-1 group-hover:text-brand-500 transition-colors" style={{ color: "var(--fg)" }}>
                                        {exp.title}
                                    </h3>
                                    <p className="text-sm font-semibold mb-3" style={{ color: "var(--fg-muted)" }}>
                                        {exp.company}
                                    </p>
                                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--fg-muted)" }}>
                                        {exp.description}
                                    </p>

                                    {/* Staggered skill tags */}
                                    <motion.div
                                        className="flex flex-wrap gap-2 pt-4 border-t mt-auto"
                                        style={{ borderColor: "var(--border)" }}
                                        variants={staggerContainer(0.05, 0)}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={viewport}
                                    >
                                        {exp.skills.map((s, j) => (
                                            <motion.span
                                                key={j}
                                                variants={springPop}
                                                className="tag text-[11px]"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                            >
                                                {s}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
