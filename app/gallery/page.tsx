import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Gallery } from "@/components/sections/gallery";

export const metadata = {
    title: "Gallery — Yadu Krishna KS",
    description: "A collection of public photos from Yadu Krishna KS — events, hackathons, and memories.",
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            <Navbar />
            <div className="pt-20">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
