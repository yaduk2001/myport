import { Skills } from "@/components/sections/skills";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function SkillsPage() {
    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            <Navbar />
            <div className="pt-20">
                <Skills />
            </div>
            <Footer />
        </main>
    );
}
