"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ExternalLink, Instagram, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import Link from "next/link";
import Image from "next/image";
import galleryData from "@/data/gallery.json";

type GalleryItem = {
    id: number;
    src: string;
    caption: string;
    likes: number;
    postUrl: string;
    width: number;
    height: number;
    date: string;
    extras: string[];
};

const localItems: GalleryItem[] = galleryData as GalleryItem[];
const CURATOR_ID = process.env.NEXT_PUBLIC_CURATOR_WIDGET_ID;

// Format: "SEP 10, 2025" — matches Curator's date display exactly
const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
};

// ── Curator live widget ───────────────────────────────────────────────────────
const CuratorFeed = ({ widgetId }: { widgetId: string }) => {
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        if (document.getElementById("curator-script")) return;
        const s = document.createElement("script");
        s.id = "curator-script";
        s.charset = "UTF-8";
        s.src = `https://cdn.curator.io/published/${widgetId}.js`;
        s.async = true;
        document.body.appendChild(s);
    }, [widgetId]);
    return (
        <div id="curator-feed-default-feed-layout" className="w-full">
            <a href="https://curator.io" target="_blank" rel="noopener noreferrer" style={{ display: "none" }}>
                Powered by Curator.io
            </a>
        </div>
    );
};

// ── Lightbox (for local fallback) ─────────────────────────────────────────────
const Lightbox = ({
    item, onClose, onPrev, onNext,
}: { item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void }) => {
    const [imgIdx, setImgIdx] = useState(0);
    const allImgs = [item.src, ...item.extras];
    useEffect(() => { setImgIdx(0); }, [item.id]);
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}>
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10" onClick={onClose}>
                <X className="w-6 h-6" />
            </button>
            <button className="absolute left-3 text-white/60 hover:text-white p-2 z-10 rounded-full hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}>
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button className="absolute right-3 text-white/60 hover:text-white p-2 z-10 rounded-full hover:bg-white/10 transition-colors"
                onClick={(e) => { e.stopPropagation(); onNext(); }}>
                <ChevronRight className="w-8 h-8" />
            </button>
            <motion.div key={item.id} initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
                className="relative max-w-2xl w-full max-h-[85vh] flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}>
                <div className="relative rounded-2xl overflow-hidden" style={{ maxHeight: "72vh" }}>
                    <Image src={allImgs[imgIdx]} alt={item.caption || "Gallery photo"}
                        width={item.width} height={item.height}
                        className="w-full h-full object-contain" unoptimized />
                    {allImgs.length > 1 && (
                        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                            {allImgs.map((_, i) => (
                                <button key={i} onClick={() => setImgIdx(i)}
                                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white scale-125" : "bg-white/40"}`} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span>{item.likes.toLocaleString()}</span>
                        {item.caption && <span className="ml-2 text-white/50 truncate max-w-[240px]">{item.caption}</span>}
                    </div>
                    <Link href={item.postUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                        <Instagram className="w-3.5 h-3.5" />View on Instagram<ExternalLink className="w-3 h-3" />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ── Main Gallery ─────────────────────────────────────────────────────────────
export const Gallery = () => {
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const [visibleCount, setVisibleCount] = useState(12);

    const nav = (dir: 1 | -1) => {
        if (!selected) return;
        const idx = localItems.findIndex((i) => i.id === selected.id);
        setSelected(localItems[(idx + dir + localItems.length) % localItems.length]);
    };

    return (
        <section id="gallery" className="min-h-[80vh] py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-14">
                    <span className="section-label mb-4 inline-flex"><Camera className="w-3.5 h-3.5" />Moments</span>
                    <h1 className="font-display font-bold text-5xl md:text-6xl mt-4 mb-4" style={{ color: "var(--fg)" }}>
                        Photo Gallery
                    </h1>
                    <p className="max-w-md mx-auto text-base" style={{ color: "var(--fg-muted)" }}>
                        Some Snapshots of Endless Memories So far.
                    </p>
                    <motion.div className="mt-6 inline-flex" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link href="https://www.instagram.com/yadu.krishna.k" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold"
                            style={{ background: "linear-gradient(135deg,rgba(240,82,82,0.12),rgba(203,31,155,0.12),rgba(101,8,255,0.12))", border: "1px solid rgba(203,31,155,0.25)", color: "var(--fg)" }}>
                            <Instagram className="w-4 h-4" style={{ color: "#e1306c" }} />
                            @yadu.krishna.k
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* ── Priority 1: Local images (Curator-exact design, custom order) ── */}
                {localItems.length > 0 ? (
                    <>
                        <div className="gallery-waterfall max-w-6xl mx-auto">
                            {localItems.slice(0, visibleCount).map((item) => (
                                <button
                                    key={item.id}
                                    className="gallery-post"
                                    onClick={() => setSelected(item)}
                                >
                                    {/* Photo */}
                                    <div className="gallery-post-img">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.src} alt={item.caption || "Gallery photo"} loading="lazy" />
                                        <div className="gallery-post-overlay">
                                            <Instagram className="gallery-post-overlay-icon" />
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="gallery-post-body">
                                        {/* IG icon + username (centered) */}
                                        <div className="gallery-post-handle">
                                            <Instagram className="gallery-post-ig-icon" />
                                            <span className="gallery-post-username">yadu.krishna.k</span>
                                        </div>

                                        {/* Caption (only if non-empty) */}
                                        {item.caption ? (
                                            <div className="gallery-post-caption-text">{item.caption}</div>
                                        ) : null}

                                        {/* Footer: avatar + date + share */}
                                        <div className="gallery-post-footer">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="gallery-post-avatar"
                                                src="https://avatars.githubusercontent.com/u/90715569?v=4"
                                                alt="yadu.krishna.k"
                                            />
                                            <span className="gallery-post-date">{formatDate(item.date)}</span>
                                            <ExternalLink className="gallery-post-share" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {visibleCount < localItems.length && (
                            <div className="text-center mt-4">
                                <button className="gallery-load-more" onClick={() => setVisibleCount((v: number) => v + 12)}>
                                    Load More
                                </button>
                            </div>
                        )}

                        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
                            className="text-center mt-6 text-sm" style={{ color: "var(--fg-subtle)" }}>
                            {localItems.length} photos only. To see more featured images, please{" "}
                            <Link href="https://www.instagram.com/yadu.krishna.k" target="_blank" rel="noopener noreferrer"
                                className="hover:underline" style={{ color: "#e1306c" }}>Follow on Instagram</Link>
                        </motion.p>
                    </>

                    /* ── Priority 2: Curator live widget (fallback) ─────────────── */
                ) : CURATOR_ID ? (
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="max-w-6xl mx-auto">
                        <CuratorFeed widgetId={CURATOR_ID} />
                    </motion.div>

                    /* ── Priority 3: Placeholder tiles ─────────────────────────── */
                ) : (
                    <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div key={i}
                                className="relative aspect-square rounded-2xl overflow-hidden border"
                                style={{ borderColor: "var(--border)", background: `linear-gradient(135deg,hsl(${310 + i * 20},40%,93%),hsl(${260 + i * 15},35%,90%))` }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }}>
                                        <Instagram className="w-8 h-8" style={{ color: `hsl(${310 + i * 20},50%,65%)` }} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selected && (
                    <Lightbox item={selected} onClose={() => setSelected(null)} onPrev={() => nav(-1)} onNext={() => nav(1)} />
                )}
            </AnimatePresence>
        </section>
    );
};
