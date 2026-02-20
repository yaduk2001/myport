"use client";

import { motion } from "framer-motion";
import { BookOpen, PenTool } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";

const books = [
    {
        title: "Navigating AI Frontiers: The Comprehensive Guide to Prompt Engineering for Professionals",
        platform: "WIPO – Creative Brief",
        description: "A comprehensive professional guide on mastering prompt engineering techniques for AI systems, covering theory, real-world use-cases, and frameworks for professionals working with generative AI.",
        year: "2024", accent: "#6366f1", accentBg: "rgba(99,102,241,0.08)"
    },
    {
        title: "Artificial Intelligence – Multiple Choice Questions (MCQs) — Career Readiness Preparation",
        platform: "WIPO – Creative Brief",
        description: "A curated collection of MCQs covering major AI domains including machine learning, deep learning, NLP, computer vision, and ethics. Targeted at students and professionals preparing for AI roles.",
        year: "2024", accent: "#f43f5e", accentBg: "rgba(244,63,94,0.08)"
    }
];

const cardVariants = [fadeLeft, fadeRight];

export const Publications = () => {
    return (
        <section id="publications" className="py-28 relative" style={{ background: "var(--section-alt)" }}>
            <div className="container mx-auto px-6">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <PenTool className="w-3.5 h-3.5" />
                        Author
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 mb-4" style={{ color: "var(--fg)" }}>
                        Publications
                    </h2>
                    <p className="max-w-md mx-auto" style={{ color: "var(--fg-muted)" }}>
                        Written resources for the AI community — available on WIPO Creative Brief.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {books.map((book, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants[i]}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewport}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <div className="card p-7 group relative overflow-hidden gradient-border spotlight">
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[var(--card-radius)]"
                                    style={{ background: book.accent }}
                                    initial={{ scaleX: 0, transformOrigin: "left" }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={viewport}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />

                                <div className="flex flex-col md:flex-row gap-5 pt-2">
                                    <motion.div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: book.accentBg }}
                                        whileHover={{ rotate: [-8, 8, -4, 0], scale: 1.2 } as any}
                                        transition={{ duration: 0.45 }}
                                    >
                                        <BookOpen className="w-5 h-5" style={{ color: book.accent }} />
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: book.accentBg, color: book.accent }}>
                                                {book.platform}
                                            </span>
                                            <span className="text-xs font-semibold" style={{ color: "var(--fg-subtle)" }}>{book.year}</span>
                                        </div>
                                        <h3 className="font-display font-bold text-xl leading-snug mb-3 group-hover:text-brand-500 transition-colors" style={{ color: "var(--fg)" }}>
                                            {book.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                                            {book.description}
                                        </p>
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
