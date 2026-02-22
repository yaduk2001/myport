"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, MessageCircle, CheckCircle2, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animations";
import { Icon3D } from "@/components/ui/icon-3d";

type Status = "idle" | "sending" | "success" | "error";

export const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;

        setStatus("sending");
        setErrMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Unknown error");

            setStatus("success");
            setName(""); setEmail(""); setMessage("");
        } catch (err: any) {
            setStatus("error");
            setErrMsg(err.message || "Something went wrong. Please try again.");
        }
    };

    const inputBase: React.CSSProperties = {
        background: "var(--bg-muted)",
        color: "var(--fg)",
        border: "1.5px solid var(--border)",
    };

    const focusOn = (e: React.FocusEvent<any>) => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; };
    const focusOff = (e: React.FocusEvent<any>) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; };

    return (
        <section id="contact" className="py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-16">
                    <span className="section-label mb-4 inline-flex">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Let's Connect
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-5xl mt-4 mb-4" style={{ color: "var(--fg)" }}>
                        Start a Conversation
                    </h2>
                    <p className="max-w-md mx-auto" style={{ color: "var(--fg-muted)" }}>
                        Available for freelance projects and full-time opportunities. Let's build something extraordinary together.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">

                    {/* Left — Info */}
                    <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={viewport} className="lg:col-span-2 space-y-4">
                        {/* Email */}
                        <motion.a
                            href="mailto:yaduk874685@gmail.com"
                            className="card p-5 flex items-center gap-4 group"
                            style={{ textDecoration: "none" }}
                            whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        >
                            <Icon3D icon={Mail} color="#6366f1" size={44} className="group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--fg-subtle)" }}>Email</p>
                                <p className="text-sm font-semibold group-hover:text-blue-500 transition-colors" style={{ color: "var(--fg)" }}>
                                    yaduk874685@gmail.com
                                </p>
                            </div>
                        </motion.a>

                        {/* Location */}
                        <motion.div className="card p-5 flex items-center gap-4 group" whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                            <Icon3D icon={MapPin} color="#f43f5e" size={44} className="group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--fg-subtle)" }}>Location</p>
                                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>Available Worldwide (Remote)</p>
                            </div>
                        </motion.div>

                        {/* Open to */}
                        <motion.div className="card p-5 overflow-hidden relative" whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                            <div className="absolute inset-0 opacity-10" style={{ background: "linear-gradient(135deg, #6366f1, #0ea5e9)" }} />
                            <p className="text-sm font-semibold relative z-10" style={{ color: "var(--fg)" }}>🚀 Currently open to</p>
                            <ul className="mt-2 space-y-1 relative z-10">
                                {["Freelance Projects", "Full-time Roles", "Startup Collaborations", "Open Source"].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-muted)" }}>
                                        <motion.span
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ background: "#6366f1" }}
                                            animate={{ scale: [1, 1.5, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 1.5 }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Right — Form */}
                    <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport} className="lg:col-span-3">
                        <div className="card p-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-sky-accent to-rose-accent rounded-t-[var(--card-radius)]" />

                            {/* Success State */}
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-12 text-center gap-4"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            className="w-16 h-16 rounded-full flex items-center justify-center"
                                            style={{ background: "rgba(16,185,129,0.1)" }}
                                        >
                                            <CheckCircle className="w-8 h-8" style={{ color: "#10b981" }} />
                                        </motion.div>
                                        <h3 className="font-display font-bold text-xl" style={{ color: "var(--fg)" }}>Message Sent!</h3>
                                        <p className="text-sm max-w-xs" style={{ color: "var(--fg-muted)" }}>
                                            Thanks for reaching out! A confirmation has been sent to <strong>{email || "your email"}</strong>. I'll reply within 24–48 hours.
                                        </p>
                                        <motion.button
                                            onClick={() => setStatus("idle")}
                                            className="btn-outline text-sm mt-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Send another message
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-5 pt-2"
                                        onSubmit={handleSubmit}
                                    >
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-subtle)" }}>
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="Full name"
                                                    required
                                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                                    style={inputBase}
                                                    onFocus={focusOn}
                                                    onBlur={focusOff}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-subtle)" }}>
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    required
                                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                                    style={inputBase}
                                                    onFocus={focusOn}
                                                    onBlur={focusOff}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--fg-subtle)" }}>
                                                Message
                                            </label>
                                            <textarea
                                                rows={5}
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                placeholder="Tell me about your project, timeline, and goals..."
                                                required
                                                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                                                style={inputBase}
                                                onFocus={focusOn}
                                                onBlur={focusOff}
                                            />
                                        </div>

                                        {/* Error banner */}
                                        <AnimatePresence>
                                            {status === "error" && errMsg && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm"
                                                    style={{ background: "rgba(244,63,94,0.08)", color: "#f43f5e" }}
                                                >
                                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                    {errMsg}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="btn-primary w-full group disabled:opacity-60 disabled:cursor-not-allowed"
                                            whileHover={status !== "sending" ? { scale: 1.02 } : {}}
                                            whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                                        >
                                            {status === "sending" ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
