import { Projects } from "@/components/sections/projects";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            <Navbar />
            <div className="pt-20">
                <Projects />
            </div>
            <Footer />
        </main>
    );
}
