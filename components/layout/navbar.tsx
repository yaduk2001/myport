"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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

    return (
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
                        <a
                            href="mailto:yaduk874685@gmail.com"
                            className="btn-primary text-sm px-5 py-2.5"
                        >
                            Hire Me
                        </a>
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
                                    <a
                                        href="yaduk874685@gmail.com"
                                        className="btn-primary w-full text-sm justify-center"
                                    >
                                        Hire Me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
