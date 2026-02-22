"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Award } from "lucide-react";
import { fadeUp, springPop, staggerContainer, viewport } from "@/lib/animations";
import { Icon3D } from "@/components/ui/icon-3d";

// Google favicon service — always works, no auth needed
const FAV = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

const INFY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg";
const NSS_LOGO = "https://www.vupune.ac.in/images/nss-logo.png";
const HIEE_LOGO = "/hiee-logo.png";

const certifications = [
    // AI / ML
    { name: "Artificial Intelligence Foundation Certification", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "Artificial Intelligence Primer Certification", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "Introduction to Artificial Intelligence", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "Introduction to Natural Language Processing", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "Computer Vision 101", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "Introduction to Machine Learning", issuer: "Infosys Springboard", category: "AI", logo: INFY_LOGO },
    { name: "AI for Students: Build your Own AI Model", issuer: "NxtWave", category: "AI", logo: FAV("nxtwave.tech") },
    { name: "Gen AI Integrated International Workshop on Cloud and DevOps", issuer: "Amal Jyothi College", category: "AI", logo: FAV("ajce.in") },
    // Dev
    { name: "PRDV410: Introduction to Java and OOP", issuer: "Saylor Academy", category: "Dev", logo: FAV("saylor.org") },
    { name: "Introduction to Data Science", issuer: "Infosys Springboard", category: "Dev", logo: INFY_LOGO },
    { name: "Introduction to Robotic Process Automation", issuer: "Infosys Springboard", category: "Dev", logo: INFY_LOGO },
    { name: "CS402: Computer Communications And Networks", issuer: "Saylor Academy", category: "Dev", logo: FAV("saylor.org") },
    { name: "CS403: Introduction to Modern Database Systems", issuer: "Saylor Academy", category: "Dev", logo: FAV("saylor.org") },
    { name: "Time Management", issuer: "Infosys Springboard", category: "Dev", logo: INFY_LOGO },
    { name: "50 Canva", issuer: "Canva", category: "Dev", logo: FAV("canva.com") },
    // Cloud / Infra
    { name: "Google Cloud Technical Series OnBoard Edition Jan 2026", issuer: "Google", category: "Cloud", logo: FAV("google.com") },
    { name: "Google Cloud Technical Series", issuer: "Google", category: "Cloud", logo: FAV("google.com") },
    { name: "Google Cloud Next '24", issuer: "Google", category: "Cloud", logo: FAV("google.com") },
    { name: "Securing a Virtualization Infrastructure", issuer: "Infosys Springboard", category: "Cloud", logo: INFY_LOGO },
    { name: "Introduction to Virtualization", issuer: "Infosys Springboard", category: "Cloud", logo: INFY_LOGO },
    // WIPO
    { name: "Introduction to the Patent Cooperation Treaty", issuer: "WIPO", category: "WIPO", logo: FAV("wipo.int") },
    // Other
    { name: "Certificate of Student Volunteers – NASA Space Apps Challenge 2024", issuer: "Amal Jyothi College", category: "Other", logo: FAV("nasa.gov") },
    { name: "NASA Space Apps Kanjirapally", issuer: "Amal Jyothi College", category: "Other", logo: FAV("nasa.gov") },
    { name: "Significance of Wind Energy in Indian Energy Sector", issuer: "HIEE", category: "Other", logo: HIEE_LOGO },
    { name: "The KFUNAI/INFUNAI SDG Webinar – Zero Hunger", issuer: "UN Academic Impact", category: "Other", logo: FAV("un.org") },
    { name: "National Service Scheme", issuer: "College of Applied Science (IHRD)", category: "Other", logo: NSS_LOGO },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
    "AI": { color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
    "Dev": { color: "#10b981", bg: "rgba(16,185,129,0.1)" },
    "Cloud": { color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
    "WIPO": { color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
    "Other": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export const Certifications = () => {
    return (
        <section id="certifications" className="py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="container mx-auto px-6">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="text-center mb-16"
                >
                    <span className="section-label mb-4 inline-flex">
                        <Award className="w-3.5 h-3.5" />
                        Credentials
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 mb-3" style={{ color: "var(--fg)" }}>
                        50+ Certifications
                    </h2>
                    <p className="max-w-md mx-auto text-base" style={{ color: "var(--fg-muted)" }}>
                        Showing 25 verified credentials — continuously learning from the world&apos;s leading platforms.
                    </p>
                </motion.div>

                <motion.div
                    className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto"
                    variants={staggerContainer(0.05)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                >
                    {certifications.map((cert, i) => {
                        const clr = categoryColors[cert.category] ?? categoryColors["Other"];
                        return (
                            <motion.div
                                key={i}
                                variants={springPop}
                                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
                            >
                                <div className="card p-5 group h-full gradient-border spotlight flex flex-col">
                                    {/* Logo + Category row */}
                                    <div className="flex items-center justify-between mb-3">
                                        {cert.logo ? (
                                            <motion.div
                                                className="w-9 h-9 rounded-xl overflow-hidden border flex items-center justify-center bg-white"
                                                style={{ borderColor: "var(--border)" }}
                                                whileHover={{ scale: 1.15, rotate: [-4, 4, 0] } as any}
                                                transition={{ duration: 0.35 }}
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={cert.logo}
                                                    alt={cert.issuer}
                                                    width={28}
                                                    height={28}
                                                    className="object-contain w-7 h-7"
                                                    onError={(e) => {
                                                        const parent = (e.target as HTMLImageElement).parentElement;
                                                        if (parent) parent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${clr.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>`;
                                                    }}
                                                />
                                            </motion.div>
                                        ) : (
                                            <Icon3D icon={BadgeCheck} color={clr.color} size={36} className="pointer-events-none" />
                                        )}
                                        <span
                                            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                                            style={{ background: clr.bg, color: clr.color }}
                                        >
                                            {cert.category}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3
                                        className="font-semibold text-sm leading-snug mb-1.5 group-hover:text-blue-500 transition-colors flex-1"
                                        style={{ color: "var(--fg)" }}
                                    >
                                        {cert.name}
                                    </h3>

                                    {/* Issuer */}
                                    <p className="text-xs font-medium mt-auto pt-2 border-t" style={{ color: "var(--fg-subtle)", borderColor: "var(--border)" }}>
                                        {cert.issuer}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};
