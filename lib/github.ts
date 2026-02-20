import { Octokit } from "octokit";
import { Project } from "@/types";

// These should be in .env.local
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const BRANCH = "main"; // or master
const FILE_PATH = "data/projects.json";

export async function saveProjectsToGithub(projects: Project[]) {
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
        throw new Error("Missing GitHub credentials in environment variables");
    }

    const octokit = new Octokit({ auth: GITHUB_TOKEN });

    // 1. Get current SHA of the file (needed for update)
    const { data: currentFile } = await octokit.rest.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: FILE_PATH,
        ref: BRANCH,
    }) as { data: { sha: string } };

    // 2. Encode content
    const content = Buffer.from(JSON.stringify(projects, null, 2)).toString("base64");

    // 3. Commit update
    await octokit.rest.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: FILE_PATH,
        message: "chore: update projects via admin panel",
        content: content,
        sha: currentFile.sha,
        branch: BRANCH,
    });

    return true;
}
