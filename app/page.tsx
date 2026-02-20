import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { GithubStats } from "@/components/sections/github-stats";
import { Certifications } from "@/components/sections/certifications";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Publications } from "@/components/sections/publications";

async function getGithubStats() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github+json",
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    };

    const userRes = await fetch('https://api.github.com/users/yaduk2001', {
      headers,
      next: { revalidate: 3600 }
    });
    if (!userRes.ok) throw new Error('Failed to fetch user data');
    const userData = await userRes.json();

    // When authenticated, GitHub also returns total_private_repos
    const totalRepos = token
      ? (userData.public_repos ?? 0) + (userData.total_private_repos ?? 0)
      : userData.public_repos;

    const reposRes = await fetch('https://api.github.com/users/yaduk2001/repos?per_page=100', {
      headers,
      next: { revalidate: 3600 }
    });
    let totalStars = 0;
    if (reposRes.ok) {
      const reposData = await reposRes.json();
      totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
    }

    return {
      repos: totalRepos,
      followers: userData.followers,
      following: userData.following,
      stars: totalStars
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { repos: 0, followers: 0, following: 0, stars: 0 };
  }
}

export default async function Home() {
  const stats = await getGithubStats();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Publications />
        <GithubStats stats={stats} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
