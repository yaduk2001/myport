"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Linkedin, MessageCircle, Send, Copy, Check, ExternalLink } from "lucide-react";
import Image from "next/image";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Publications", href: "#publications" },
    { label: "Contact", href: "#contact" },
];

const pageLinks = [
    { label: "Gallery", href: "/gallery" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [logoIndex, setLogoIndex] = useState(0);
    const [hireMeOpen, setHireMeOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [copied, setCopied] = useState(false);

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

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 20);
            // Hide on scroll down, show on scroll up or near top
            if (y <= 20) {
                setHidden(false);
            } else if (y > lastY + 4) {
                setHidden(true);
                setMobileOpen(false);
            } else if (y < lastY - 4) {
                setHidden(false);
            }
            lastY = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        if (pathname !== "/") {
            router.push(`/${href}`);
            return;
        }
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const contactOptions = [
        {
            label: "Send an Email",
            sub: "yaduk874685@gmail.com",
            icon: Mail,
            color: "#6366f1",
            bg: "rgba(99,102,241,0.08)",
            href: "",
            onClick: () => { setHireMeOpen(false); setTimeout(() => setEmailOpen(true), 200); }
        },
        {
            label: "WhatsApp",
            sub: "Chat directly",
            icon: MessageCircle,
            color: "#10b981",
            bg: "rgba(16,185,129,0.08)",
            href: "https://wa.me/+919061892005",
            onClick: undefined
        },
        {
            label: "LinkedIn",
            sub: "Connect professionally",
            icon: Linkedin,
            color: "#0ea5e9",
            bg: "rgba(14,165,233,0.08)",
            href: "https://linkedin.com/in/yk-krishna",
            onClick: undefined
        }
    ];

    const EMAIL = "yaduk874685@gmail.com";
    const copyEmail = () => {
        navigator.clipboard.writeText(EMAIL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
        {/* Hire Me Modal */}
        <AnimatePresence>
            {hireMeOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
                        onClick={() => setHireMeOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    />
                    <motion.div
                        className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl z-10"
                        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                        initial={{ opacity: 0, scale: 0.88, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 32 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setHireMeOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-muted)] transition-colors group"
                        >
                            <X className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: "var(--fg-muted)" }} />
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                                <Send className="w-3 h-3" />
                                Let&apos;s Connect
                            </div>
                            <h3 className="font-display font-bold text-2xl mb-1" style={{ color: "var(--fg)" }}>Hire Me 👋</h3>
                            <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                                Choose how you&apos;d like to reach out — I&apos;m open to freelance, full-time, and collaborative opportunities.
                            </p>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col gap-3">
                            {contactOptions.map((opt) => (
                                opt.onClick ? (
                                    <motion.button
                                        key={opt.label}
                                        onClick={opt.onClick}
                                        className="flex items-center gap-4 p-4 rounded-2xl border transition-all group w-full text-left"
                                        style={{ background: opt.bg, borderColor: "var(--border)" }}
                                        whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: opt.bg, border: `1px solid ${opt.color}30` }}>
                                            <opt.icon className="w-5 h-5" style={{ color: opt.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm" style={{ color: "var(--fg)" }}>{opt.label}</p>
                                            <p className="text-xs truncate" style={{ color: "var(--fg-muted)" }}>{opt.sub}</p>
                                        </div>
                                        <svg className="w-4 h-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-1 transition-all" style={{ color: opt.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </motion.button>
                                ) : (
                                    <motion.a
                                        key={opt.label}
                                        href={opt.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setHireMeOpen(false)}
                                        className="flex items-center gap-4 p-4 rounded-2xl border transition-all group"
                                        style={{ background: opt.bg, borderColor: "var(--border)" }}
                                        whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: opt.bg, border: `1px solid ${opt.color}30` }}>
                                            <opt.icon className="w-5 h-5" style={{ color: opt.color }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm" style={{ color: "var(--fg)" }}>{opt.label}</p>
                                            <p className="text-xs truncate" style={{ color: "var(--fg-muted)" }}>{opt.sub}</p>
                                        </div>
                                        <svg className="w-4 h-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-1 transition-all" style={{ color: opt.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </motion.a>
                                )
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Email Detail Modal */}
        <AnimatePresence>
            {emailOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
                        onClick={() => setEmailOpen(false)}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    />
                    <motion.div
                        className="relative w-full max-w-sm rounded-3xl p-8 shadow-2xl z-10"
                        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                        initial={{ opacity: 0, scale: 0.88, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 32 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <button
                            onClick={() => setEmailOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-muted)] transition-colors group"
                        >
                            <X className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: "var(--fg-muted)" }} />
                        </button>

                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5 mx-auto" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                            <Mail className="w-7 h-7" style={{ color: "#6366f1" }} />
                        </div>

                        <h3 className="font-display font-bold text-xl text-center mb-1" style={{ color: "var(--fg)" }}>Send an Email</h3>
                        <p className="text-sm text-center mb-6" style={{ color: "var(--fg-muted)" }}>Reach out directly to my inbox</p>

                        {/* Email address + copy */}
                        <div className="flex items-center gap-2 p-3 rounded-xl mb-5" style={{ background: "var(--bg-muted)", border: "1px solid var(--border)" }}>
                            <span className="flex-1 text-sm font-mono truncate" style={{ color: "var(--fg)" }}>{EMAIL}</span>
                            <motion.button
                                onClick={copyEmail}
                                className="flex-shrink-0 p-1.5 rounded-lg transition-colors"
                                style={{ background: copied ? "rgba(16,185,129,0.12)" : "var(--bg)", color: copied ? "#10b981" : "var(--fg-muted)" }}
                                whileTap={{ scale: 0.9 }}
                                title="Copy email"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </motion.button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col gap-2.5">
                            <motion.a
                                href={`https://mail.google.com/mail/?view=cm&to=${EMAIL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setEmailOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all"
                                style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            >
                                <ExternalLink className="w-4 h-4" /> Open in Gmail
                            </motion.a>
                            <motion.a
                                href={`https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setEmailOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all"
                                style={{ background: "var(--bg-muted)", color: "var(--fg)", border: "1px solid var(--border)" }}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            >
                                <ExternalLink className="w-4 h-4" /> Open in Outlook
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "py-2" : "py-4"}`}
            style={{ transform: hidden ? "translateY(-110%)" : "translateY(0)", transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.5s" }}
        >
            <div
                className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ${scrolled
                    ? "bg-white/75 dark:bg-white/10 backdrop-blur-2xl shadow-[0_2px_20px_rgba(99,102,241,0.06)] border border-white/40 dark:border-white/10 rounded-2xl"
                    : ""
                    }`}
            >
                <nav className="flex items-center justify-between h-14">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Home">
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
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <span className="font-display font-bold text-lg tracking-tight" style={{ color: "var(--fg)" }}>
                            YK<span className="text-brand-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeLink === link.href
                                    ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                    : "text-[var(--fg-muted)] hover:text-blue-500 hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                        {/* Gallery — page link */}
                        {pageLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-[var(--fg-muted)] hover:text-blue-500 hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => setHireMeOpen(true)}
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            Hire Me
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <X className="w-5 h-5" style={{ color: "var(--fg)" }} />
                        ) : (
                            <Menu className="w-5 h-5" style={{ color: "var(--fg)" }} />
                        )}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden mx-4 mt-2 overflow-hidden"
                    >
                        <div
                            className="rounded-2xl border p-4 shadow-xl"
                            style={{
                                background: "var(--card-bg)",
                                borderColor: "var(--border)"
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollTo(link.href)}
                                        className="text-left px-4 py-3 text-sm font-medium rounded-xl transition-all hover:bg-[var(--bg-muted)] hover:text-blue-500"
                                        style={{ color: "var(--fg-muted)" }}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                {pageLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-left px-4 py-3 text-sm font-medium rounded-xl transition-all hover:bg-[var(--bg-muted)] hover:text-blue-500 block"
                                        style={{ color: "var(--fg-muted)" }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="mt-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                                    <button
                                        onClick={() => { setMobileOpen(false); setHireMeOpen(true); }}
                                        className="btn-primary w-full text-sm justify-center"
                                    >
                                        Hire Me
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
        </>
    );
};
