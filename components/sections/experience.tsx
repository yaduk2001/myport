"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { fadeUp, springPop, staggerContainer, viewport } from "@/lib/animations";

const experiences = [
    {
        title: "College Council Member",
        company: "Amal Jyothi College of Engineering",
        location: "Kerala, India",
        period: "2023 - 2025",
        description: "Represented student interests, collaborated with faculty to organize academic and cultural events, and facilitated communication between the student body and college administration.",
        skills: ["Leadership", "Event Planning", "Communication", "Team Coordination", "Student Advocacy"]
    },
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
        title: "Software Developer",
        company: "C2B Software Solutions",
        location: "Ernakulam, Kerala",
        period: "Dec 2021 - Mar 2022",
        description: "Managed software projects and client interactions. Full-time role leading cross-functional project delivery and maintaining client relationships.",
        skills: ["Quality Assurance", "Resource Allocation", "Agile Methodology", "Client Communication"]
    },
    {
        title: "Gen AI Intern",
        company: "Startup",
        location: "Kochi, Kerala",
        period: "2025",
        description: "Assisted in researching, fine-tuning, and deploying generative AI models. Focused on prompt engineering and building scalable AI-driven solutions.",
        skills: ["Generative AI", "LLMs", "Prompt Engineering", "Python", "Model Fine-tuning"]
    },
    {
        title: "Infosys Internship 5.0 (AI/ML Specialization)",
        company: "Infosys Springboard",
        location: "Remote",
        period: "2024",
        description: "Completed specialized training and project work focusing on Artificial Intelligence and Machine Learning technologies under the Infosys Springboard program.",
        skills: ["AI/ML", "Machine Learning", "Data Analysis", "Python", "Neural Networks"]
    },
    {
        title: "Internship in Python",
        company: "Qspiders",
        location: "Kochi, Kerala",
        period: "2025",
        description: "Underwent intensive training and hands-on project development bridging Python fundamentals with advanced backend integrations and software engineering principles.",
        skills: ["Python", "Backend Development", "Software Engineering", "Algorithms", "Problem Solving"]
    }
];

const accentColors = ["#6366f1", "#f43f5e", "#f59e0b", "#10b981", "#8b5cf6", "#0ea5e9"];
const accentBgs = [
    "rgba(99,102,241,0.08)",
    "rgba(244,63,94,0.08)",
    "rgba(245,158,11,0.08)",
    "rgba(16,185,129,0.08)",
    "rgba(139,92,246,0.08)",
    "rgba(14,165,233,0.08)"
];

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
                        Experience & Contributions
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
                    {experiences.map((exp, i) => {
                        const colorIndex = i % accentColors.length;
                        const cardColor = accentColors[colorIndex];
                        const cardBg = accentBgs[colorIndex];

                        return (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="h-full"
                                whileHover={{
                                    y: -8,
                                    boxShadow: `0 20px 40px -15px ${cardColor}40`,
                                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                                }}
                            >
                                <div className="card h-full flex flex-col group relative overflow-hidden gradient-border spotlight">
                                    {/* Left accent stripe */}
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[var(--card-radius)]"
                                        style={{ background: cardColor }}
                                        initial={{ scaleY: 0, transformOrigin: "top" }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={viewport}
                                        transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    />

                                    <div className="p-6 flex flex-col h-full pl-8">
                                        {/* Period badge */}
                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <span
                                                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-colors group-hover:bg-opacity-20"
                                                style={{ background: cardBg, color: cardColor }}
                                            >
                                                <Calendar className="w-3 h-3 group-hover:scale-110 transition-transform" />
                                                {exp.period}
                                            </span>
                                        </div>

                                        <span className="inline-flex items-center gap-1 text-xs font-medium mb-4" style={{ color: "var(--fg-subtle)" }}>
                                            <MapPin className="w-3 h-3 group-hover:text-brand-500 transition-colors" />
                                            {exp.location}
                                        </span>

                                        <h3 className="font-display font-bold text-lg leading-snug mb-1 transition-colors" style={{ color: "var(--fg)" }}>
                                            {exp.title}
                                        </h3>
                                        <p className="text-sm font-bold mb-3" style={{ color: cardColor }}>
                                            {exp.company}
                                        </p>
                                        <p className="text-sm leading-relaxed mb-5 flex-1 relative z-10" style={{ color: "var(--fg-muted)" }}>
                                            {exp.description}
                                        </p>

                                        {/* Staggered skill tags */}
                                        <motion.div
                                            className="flex flex-wrap gap-2 pt-4 border-t mt-auto relative z-10"
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
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};
