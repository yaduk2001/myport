"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const links = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

const socials = [
    { icon: Github, href: "https://github.com/yaduk2001", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yk-krishna", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@developer.com", label: "Email" },
];

export const Footer = () => {
    const [logoIndex, setLogoIndex] = useState(0);

    const logos = [
        "/logos/1771675188280.png",
        "/logos/IMG_20260221_173231.png",
        "/logos/IMG_20260221_173416.png",
        "/logos/IMG_20260221_173440.png",
        "/logos/IMG_20260221_173509.png",
        "/logos/IMG_20260221_173526.png",
        "/logos/IMG_20260221_173545.png",
        "/logos/IMG_20260221_173612.png"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLogoIndex((prev) => (prev + 1) % logos.length);
        }, 5000); // Change logo every 5 seconds
        return () => clearInterval(interval);
    }, [logos.length]);

    return (
        <footer
            className="relative pt-16 pb-8 border-t"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit group">
                            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md shadow-brand-500/10 group-hover:scale-105 transition-transform" style={{ border: "2px solid var(--border-strong)", background: "var(--card-bg)" }}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={logoIndex}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="absolute inset-0 flex items-center justify-center p-0.5"
                                    >
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                                            <Image
                                                src={logos[logoIndex]}
                                                alt={`YK Profile ${logoIndex + 1}`}
                                                fill
                                                className="object-cover scale-110"
                                                sizes="56px"
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <span className="font-display font-bold text-lg" style={{ color: "var(--fg)" }}>
                                YK<span className="text-brand-500">.</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
                            Engineering intelligent digital experiences — Full-Stack developer & AI/ML specialist.
                        </p>
                    </div>

                    {/* Nav Links */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--fg-subtle)" }}>
                            Navigation
                        </p>
                        <ul className="space-y-2">
                            {links.map((l) => (
                                <li key={l.label}>
                                    <a
                                        href={l.href}
                                        className="text-sm font-medium transition-colors hover:text-brand-500"
                                        style={{ color: "var(--fg-muted)" }}
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--fg-subtle)" }}>
                            Connect
                        </p>
                        <div className="flex flex-col gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-sm font-medium transition-colors hover:text-brand-500 group w-fit"
                                    style={{ color: "var(--fg-muted)" }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors group-hover:border-brand-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20"
                                        style={{ borderColor: "var(--border)", background: "var(--card-bg)" }}
                                    >
                                        <s.icon className="w-3.5 h-3.5" />
                                    </div>
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: "var(--border)", color: "var(--fg-subtle)" }}>
                    <p className="font-medium">© {new Date().getFullYear()} Yadu Krishna KS · All rights reserved.</p>
                    <p className="flex items-center gap-1.5 font-medium">
                        Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> using Next.js & Tailwind
                    </p>
                </div>
            </div>
        </footer>
    );
};
