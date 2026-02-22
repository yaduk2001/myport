"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, PenTool, ExternalLink, X } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { Icon3D } from "@/components/ui/icon-3d";

const books = [
    {
        id: "truth-seeker",
        title: "The Truth Seeker",
        platform: "Amazon Kindle",
        brief: "A gripping five-part action-thriller series that plunges deep into a world of hidden truths, dangerous secrets, and relentless pursuit.",
        description: `The Truth Seeker is a gripping five-part action-thriller series that plunges deep into a world of hidden truths, dangerous secrets, and relentless pursuit. The series follows a protagonist who isn’t just searching for answers — he's uncovering the very fabric of reality, where every discovery brings him closer to an ancient mystery that could change everything.

At the heart of The Truth Seeker lies a young man, driven by an unshakable sense of justice and a thirst for knowledge. This isn’t just about solving crimes or uncovering wrongdoings. It’s about unraveling the complex web of deceit, power, and manipulation that stretches back centuries. Each story in the series presents new layers of danger, intrigue, and unexpected twists, keeping the readers on the edge of their seats.

The books blend crime, mystery, and thriller elements with ancient findings, cryptic symbols, and chilling discoveries that hint at something much larger than the present-day battles. With every turn, the protagonist confronts foes both human and supernatural, finding himself entangled in a conspiracy that crosses generations, with every answer only leading to more questions.`,
        year: "2024",
        accent: "#f59e0b",
        accentBg: "rgba(245,158,11,0.08)",
        link: "https://www.amazon.in/Truth-Seeker-Whispers-Shadows-Awakening-ebook/dp/B0F66FS123?dplnkId=b11d7224-4334-4c61-a915-88cc4d6a68c9"
    }
];

export const Publications = () => {
    const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedBook) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedBook]);

    return (
        <section id="publications" className="py-28 relative" style={{ background: "var(--bg)" }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
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
                        Exploring mysteries, thrillers, and deep dives into the unknown.
                    </p>
                </motion.div>

                <div className="flex flex-row overflow-x-auto gap-6 pb-12 snap-x max-w-6xl mx-auto disable-scrollbar">
                    {books.map((book) => (
                        <motion.div
                            key={book.id}
                            className="snap-start flex-shrink-0 w-full md:w-[420px] cursor-pointer"
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            onClick={() => setSelectedBook(book)}
                            layoutId={`layout-card-${book.id}`}
                        >
                            <div className="card h-full p-8 group relative overflow-hidden gradient-border spotlight flex flex-col justify-between" style={{ minHeight: "300px" }}>
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[var(--card-radius)]"
                                    style={{ background: book.accent }}
                                />

                                <div>
                                    <Icon3D icon={BookOpen} color={book.accent} size={48} className="mb-6 pointer-events-none" />

                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: book.accentBg, color: book.accent }}>
                                            {book.platform}
                                        </span>
                                    </div>

                                    <h3 className="font-display font-bold text-2xl leading-snug mb-3 group-hover:text-brand-500 transition-colors" style={{ color: "var(--fg)" }}>
                                        {book.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed line-clamp-3 mb-6" style={{ color: "var(--fg-muted)" }}>
                                        {book.brief}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-sm font-semibold flex items-center group-hover:text-brand-500 transition-colors" style={{ color: "var(--fg)" }}>
                                        View details <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                                    </span>

                                    <a
                                        href={book.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-xs font-bold px-4 py-2 rounded-lg transition-colors border"
                                        style={{ background: "var(--bg-muted)", color: "var(--fg)", borderColor: "var(--border)" }}
                                    >
                                        View publication
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedBook && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                className="absolute inset-0"
                                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
                                onClick={() => setSelectedBook(null)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />

                            <motion.div
                                layoutId={`layout-card-${selectedBook.id}`}
                                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-12 shadow-2xl z-10 custom-scrollbar"
                                style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
                            >
                                <button
                                    onClick={() => setSelectedBook(null)}
                                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full hover:bg-[var(--bg-muted)] transition-colors z-20 group"
                                >
                                    <X className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: "var(--fg-muted)" }} />
                                </button>

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full inline-block" style={{ background: selectedBook.accentBg, color: selectedBook.accent }}>
                                        {selectedBook.platform}
                                    </span>
                                    <span className="text-sm font-semibold" style={{ color: "var(--fg-subtle)" }}>{selectedBook.year}</span>
                                </div>

                                <h3 className="font-display font-bold text-3xl sm:text-4xl leading-tight mb-8 relative z-10" style={{ color: "var(--fg)" }}>
                                    {selectedBook.title}
                                </h3>

                                <div className="space-y-5 mb-10 relative z-10">
                                    {selectedBook.description.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="leading-relaxed text-[15px] sm:text-base" style={{ color: "var(--fg-muted)" }}>{paragraph}</p>
                                    ))}
                                </div>

                                <motion.a
                                    href={selectedBook.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline inline-flex relative z-10"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Publication
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                </motion.a>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
