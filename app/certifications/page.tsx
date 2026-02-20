import { Certifications } from "@/components/sections/certifications";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CertificationsPage() {
    return (
        <main className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
            <Navbar />
            <div className="pt-20">
                <Certifications />
            </div>
            <Footer />
        </main>
    );
}
