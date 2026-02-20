"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Heart } from "lucide-react";

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
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                                <Code2 className="w-4 h-4 text-white" />
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
