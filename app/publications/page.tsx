import { Publications } from "@/components/sections/publications";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PublicationsPage() {
    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            <Navbar />
            <div className="pt-20">
                <Publications />
            </div>
            <Footer />
        </main>
    );
}
