"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, ChevronRight, X, Brain, Globe, Layers, Sparkles } from "lucide-react";
import projectsData from "@/data/projects.json";
import { fadeUp, springPop, staggerContainer, viewport, cardHover } from "@/lib/animations";

const categoryConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    "ai-ml": { label: "AI / ML", color: "#f43f5e", bg: "rgba(244,63,94,0.08)", icon: Brain },
    "web": { label: "Web App", color: "#6366f1", bg: "rgba(99,102,241,0.08)", icon: Globe },
};

/* ── Tilt card wrapper ── */
const TiltCard = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(useSpring(y, { stiffness: 200, damping: 20 }), [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(useSpring(x, { stiffness: 200, damping: 20 }), [-0.5, 0.5], [-6, 6]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-full"
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export const Projects = () => {
    const [selected, setSelected] = useState<any>(null);
    const [filter, setFilter] = useState<string>("all");

    const categories = ["all", "ai-ml", "web"];
    const filtered = filter === "all" ? projectsData : projectsData.filter((p: any) => p.category === filter);

    return (
        <section id="projects" className="py-28 relative" style={{ background: "var(--section-alt)" }}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-12"
                >
                    <span className="section-label mb-4 inline-flex">
                        <Layers className="w-3.5 h-3.5" />
                        Work Showcase
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 mb-4" style={{ color: "var(--fg)" }}>
                        Featured Projects
                    </h2>
                    <p className="max-w-lg mx-auto" style={{ color: "var(--fg-muted)" }}>
                        From AI-powered systems to full-stack web platforms — built with purpose.
                    </p>
                </motion.div>

                {/* Filter Pills */}
                <motion.div
                    variants={staggerContainer(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="flex items-center justify-center gap-2 mb-10"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            variants={springPop}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.07, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                            style={
                                filter === cat
                                    ? { background: "#6366f1", color: "white", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }
                                    : { background: "var(--card-bg)", color: "var(--fg-muted)", border: "1px solid var(--border)" }
                            }
                        >
                            {cat === "all" ? "✦ All" : categoryConfig[cat]?.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project: any, i: number) => {
                            const catConf = categoryConfig[project.category] || categoryConfig["web"];
                            const CatIcon = catConf.icon;
                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)", transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <TiltCard onClick={() => project.longDescription && setSelected(project)}>
                                        <motion.div
                                            className="card h-full flex flex-col group cursor-pointer overflow-hidden gradient-border spotlight"
                                            whileHover={{
                                                y: -6,
                                                boxShadow: `0 20px 50px ${catConf.color}25, var(--card-shadow-hover)`,
                                                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                                            } as any}
                                        >
                                            {/* Animated top bar */}
                                            <motion.div
                                                className="h-[3px] w-full"
                                                style={{ background: `linear-gradient(90deg, ${catConf.color}, ${catConf.color}80)` }}
                                                initial={{ scaleX: 0, transformOrigin: "left" }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={viewport}
                                                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                            />

                                            <div className="p-6 flex flex-col h-full">
                                                {/* Category badge + date */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <motion.span
                                                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                                        style={{ background: catConf.bg, color: catConf.color }}
                                                        whileHover={{ scale: 1.08 }}
                                                    >
                                                        <CatIcon className="w-3 h-3" />
                                                        {catConf.label}
                                                    </motion.span>
                                                    {project.monthsWorked && (
                                                        <span className="text-[11px] font-medium" style={{ color: "var(--fg-subtle)" }}>
                                                            {project.monthsWorked}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Name */}
                                                <h3
                                                    className="font-display font-bold text-lg leading-snug mb-3 group-hover:text-blue-500 transition-colors duration-200"
                                                    style={{ color: "var(--fg)" }}
                                                >
                                                    {project.name}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-3" style={{ color: "var(--fg-muted)" }}>
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack — spring-pop on each tag */}
                                                <motion.div
                                                    className="flex flex-wrap gap-2 mb-5"
                                                    variants={staggerContainer(0.04, 0)}
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={viewport}
                                                >
                                                    {project.techStack.map((tech: string, idx: number) => (
                                                        <motion.span
                                                            key={idx}
                                                            variants={springPop}
                                                            className="tag text-[11px] cursor-default"
                                                            whileHover={{ scale: 1.1, y: -2 }}
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </motion.div>

                                                {/* Footer */}
                                                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                                                    {project.longDescription && (
                                                        <motion.button
                                                            className="flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-blue-500"
                                                            whileHover={{ x: 3 }}
                                                        >
                                                            View Details
                                                            <ChevronRight className="w-3.5 h-3.5" />
                                                        </motion.button>
                                                    )}
                                                    <motion.div
                                                        className="ml-auto"
                                                        animate={{ rotate: [0, 20, -20, 0] }}
                                                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                                                    >
                                                        <Sparkles className="w-3.5 h-3.5 opacity-30" style={{ color: catConf.color }} />
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </TiltCard>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ background: "rgba(9,9,15,0.75)", backdropFilter: "blur(12px)" }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.88, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="card w-full max-w-2xl max-h-[85vh] overflow-y-auto relative"
                            style={{ background: "var(--card-bg)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Coloured top bar */}
                            <div
                                className="h-1 w-full rounded-t-[var(--card-radius)]"
                                style={{ background: categoryConfig[selected.category]?.color }}
                            />
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 hover:bg-red-50 hover:text-red-500"
                                style={{ background: "var(--bg-muted)" }}
                            >
                                <X className="w-4 h-4" style={{ color: "var(--fg-muted)" }} />
                            </button>

                            <div className="p-8">
                                {selected.category && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                                        style={{ background: categoryConfig[selected.category]?.bg, color: categoryConfig[selected.category]?.color }}
                                    >
                                        {categoryConfig[selected.category]?.label}
                                    </motion.span>
                                )}
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                                    className="font-display font-bold text-2xl mb-2 pr-10" style={{ color: "var(--fg)" }}
                                >
                                    {selected.name}
                                </motion.h2>
                                {selected.monthsWorked && (
                                    <p className="text-sm font-medium mb-6" style={{ color: "var(--fg-subtle)" }}>{selected.monthsWorked}</p>
                                )}
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                                    className="text-sm leading-loose whitespace-pre-line mb-6" style={{ color: "var(--fg-muted)" }}
                                >
                                    {selected.longDescription}
                                </motion.div>
                                <motion.div
                                    className="flex flex-wrap gap-2"
                                    variants={staggerContainer(0.05)}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {selected.techStack.map((t: string, i: number) => (
                                        <motion.span key={i} variants={springPop} className="tag text-[11px]">{t}</motion.span>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
