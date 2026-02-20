export interface Project {
    id: string;
    name: string;
    category: "web" | "ai-ml";
    description: string;
    techStack: string[];
    monthsWorked?: string; // e.g. "Jan 2024 - Mar 2024"
    longDescription?: string;
    hostedLink?: string;
    githubLink?: string;
    imageUrl?: string; // Optional cover image
    featured?: boolean;
}

export type ProjectCategory = "web" | "ai-ml";
