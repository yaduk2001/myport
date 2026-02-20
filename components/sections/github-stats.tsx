"use client";

import { Github, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { GitHubCalendar } from 'react-github-calendar';

interface GithubStatsProps {
    stats: {
        repos: number;
        followers: number;
        following: number;
        stars?: number;
    }
}

export const GithubStats = ({ stats }: GithubStatsProps) => {
    return (
        <section id="github" className="py-28 relative" style={{ background: "var(--section-alt)" }}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <Activity className="w-3.5 h-3.5" />
                        Open Source
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4" style={{ color: "var(--fg)" }}>
                        GitHub Activity
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="card p-8 md:p-10 relative overflow-hidden">
                        {/* Gradient top bar */}
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-500 via-sky-accent to-emerald-accent rounded-t-[var(--card-radius)]" />

                        {/* Profile row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pt-2">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                                    style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
                                >
                                    <Github className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-xl" style={{ color: "var(--fg)" }}>yaduk2001</h3>
                                    <p className="text-sm font-medium" style={{ color: "var(--fg-muted)" }}>GitHub Public Profile</p>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-6 md:gap-10">
                                {[
                                    { value: stats.repos, label: "Repos" },
                                    { value: stats.followers, label: "Followers" },
                                    { value: stats.stars ?? 0, label: "Stars" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="font-display font-extrabold text-2xl" style={{ color: "var(--fg)" }}>{stat.value}</div>
                                        <div className="text-xs font-bold uppercase tracking-widest mt-0.5" style={{ color: "var(--fg-subtle)" }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://github.com/yaduk2001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm px-6 py-2.5 hidden md:inline-flex"
                            >
                                Follow
                            </a>
                        </div>

                        {/* Contribution Calendar */}
                        <div
                            className="rounded-xl p-5 overflow-x-auto custom-scrollbar"
                            style={{ background: "var(--bg-muted)" }}
                        >
                            <div className="min-w-[600px]">
                                <GitHubCalendar
                                    username="yaduk2001"
                                    colorScheme="light"
                                    blockSize={13}
                                    blockMargin={4}
                                    fontSize={12}
                                    theme={{
                                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                    }}
                                />
                            </div>
                        </div>

                        {/* Mobile follow */}
                        <div className="md:hidden mt-6 flex justify-center">
                            <a
                                href="https://github.com/yaduk2001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm w-full justify-center"
                            >
                                Follow on GitHub
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
