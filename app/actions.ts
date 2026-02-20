"use server";

import { Project } from "@/types";
import { saveProjectsToGithub } from "@/lib/github";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const password = formData.get("password");

    // In a real app, use environment variable for password
    if (password === process.env.ADMIN_PASSWORD || password === "admin123") {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 // 1 day
        });
        redirect("/admin");
    } else {
        return { error: "Invalid password" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/");
}

export async function updateProjects(projects: Project[]) {
    try {
        // In dev mode or without creds, we might mock this or it will fail
        // For specific user "d:\Supe ai\my", we don't have creds yet.
        // We will return a clear message if it fails.

        if (!process.env.GITHUB_TOKEN) {
            console.log("Mocking save: GitHub Token not found.");
            return { success: false, error: "GitHub Token missing. Cannot save to repo." };
        }

        await saveProjectsToGithub(projects);
        revalidatePath("/"); // Rebuild/Refresh content
        return { success: true };
    } catch (error) {
        console.error("Failed to save projects:", error);
        return { success: false, error: "Failed to save projects to GitHub." };
    }
}
