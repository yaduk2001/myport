"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, springPop, staggerContainer, viewport } from "@/lib/animations";

const educationDetails = [
    {
        school: "Amal Jyothi College of Engineering Autonomous",
        degree: "Master of Computer Applications - MCA",
        period: "Sep 2023 – Jul 2025",
        activities: "Activities: College Council, Environmental Representative, Technical Coordinator",
        skills: ["Resource Allocation", "Quality Assurance", "Project Plans", "Problem Solving"],
        color: "#6366f1", colorBg: "rgba(99,102,241,0.08)"
    },
    {
        school: "College of Applied Science (IHRD), Puthuppally - MG University",
        degree: "BSc Computer Science",
        period: "Jul 2020 – Mar 2023",
        activities: "Activities: NSS, Computer Association Vice President",
        skills: ["Quality Assurance", "Problem Solving", "English", "Project Documentation"],
        color: "#f43f5e", colorBg: "rgba(244,63,94,0.08)"
    }
];

const cardVariants = [fadeLeft, fadeRight];

export const Education = () => {
    return (
        <section id="education" className="py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="container mx-auto px-6">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <GraduationCap className="w-3.5 h-3.5" />
                        Academic Background
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4" style={{ color: "var(--fg)" }}>
                        Education
                    </h2>
                </motion.div>

                <div className="flex flex-row overflow-x-auto gap-6 pb-12 snap-x max-w-6xl mx-auto disable-scrollbar">
                    {educationDetails.map((edu, i) => (
                        <motion.div
                            key={i}
                            className="snap-start flex-shrink-0 w-full md:w-[560px]"
                            variants={cardVariants[i]}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <div className="card h-full p-7 group relative overflow-hidden gradient-border spotlight flex flex-col">
                                {/* Top accent bar — animated reveal */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[var(--card-radius)]"
                                    style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
                                    initial={{ scaleX: 0, transformOrigin: "left" }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={viewport}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />

                                <div className="flex flex-col md:flex-row md:items-start gap-5 pt-2 flex-1">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: edu.colorBg }}
                                        whileHover={{ rotate: [-8, 8, -4, 0], scale: 1.2 } as any}
                                        transition={{ duration: 0.45 }}
                                    >
                                        <BookOpen className="w-5 h-5" style={{ color: edu.color }} />
                                    </motion.div>

                                    <div className="flex-1 flex flex-col h-full min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                            <div>
                                                <h3 className="font-display font-bold text-xl leading-tight" style={{ color: "var(--fg)" }}>
                                                    {edu.school}
                                                </h3>
                                                <p className="text-sm font-semibold mt-1" style={{ color: edu.color }}>
                                                    {edu.degree}
                                                </p>
                                            </div>
                                            <motion.span
                                                className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap self-start"
                                                style={{ background: edu.colorBg, color: edu.color }}
                                                whileHover={{ scale: 1.08 }}
                                            >
                                                {edu.period}
                                            </motion.span>
                                        </div>

                                        {edu.activities && (
                                            <p className="text-sm mb-5" style={{ color: "var(--fg-muted)" }}>{edu.activities}</p>
                                        )}

                                        <motion.div
                                            className="flex flex-wrap gap-2 pt-4 mt-auto border-t"
                                            style={{ borderColor: "var(--border)" }}
                                            variants={staggerContainer(0.06, 0.2)}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={viewport}
                                        >
                                            {edu.skills.map((s, j) => (
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
