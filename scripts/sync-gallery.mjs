#!/usr/bin/env node
/**
 * scripts/sync-gallery.mjs
 *
 * Downloads all Instagram photos from the Curator.io feed and saves them
 * to public/gallery/ and creates data/gallery.json.
 *
 * Run:  node scripts/sync-gallery.mjs
 */

import { createWriteStream, mkdirSync, writeFileSync, existsSync } from "fs";
import { pipeline } from "stream/promises";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "gallery");
const JSON_PATH = path.join(ROOT, "data", "gallery.json");

const FEED_ID = "c93b0c23-dd96-4934-b989-650768601ef0";
const API_BASE = `https://api.curator.io/v1/feeds/${FEED_ID}/posts`;

// Ensure output dirs exist
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(path.join(ROOT, "data"), { recursive: true });

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = "";
            res.on("data", (c) => (body += c));
            res.on("end", () => resolve(JSON.parse(body)));
            res.on("error", reject);
        }).on("error", reject);
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = createWriteStream(dest);
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                return;
            }
            pipeline(res, file).then(resolve).catch(reject);
        }).on("error", reject);
    });
}

async function fetchAllPosts() {
    let all = [];
    let cursor = null;

    while (true) {
        const url = cursor
            ? `${API_BASE}?limit=100&after=${encodeURIComponent(cursor)}`
            : `${API_BASE}?limit=100`;

        const data = await fetchJson(url);
        if (!data.success || !data.posts?.length) break;

        all = all.concat(data.posts);
        console.log(`  Fetched ${all.length} posts so far…`);

        if (data.posts.length < 100) break;          // last page
        cursor = data.pagination?.after ?? null;
        if (!cursor) break;
    }

    return all;
}

async function main() {
    console.log("🔄 Fetching gallery posts from Curator API…");
    const posts = await fetchAllPosts();
    console.log(`✅ Found ${posts.length} posts total.\n`);

    const galleryItems = [];
    let idx = 0;

    for (const post of posts) {
        if (!post.has_image || !post.image) continue;

        idx++;
        const ext = ".jpg";
        const filename = `${idx}_${post.id}${ext}`;
        const dest = path.join(OUT_DIR, filename);
        const localSrc = `/gallery/${filename}`;

        // Collect extra images for carousel posts
        const extras = (post.images ?? [])
            .filter((img) => img.url)
            .map((img, j) => {
                return {
                    url: img.url,
                    local: `/gallery/${idx}_${post.id}_extra${j + 1}.jpg`,
                    dest: path.join(OUT_DIR, `${idx}_${post.id}_extra${j + 1}.jpg`),
                };
            });

        // Download main image
        if (!existsSync(dest)) {
            process.stdout.write(`  ⬇  Downloading ${idx}/${posts.length}: ${post.id}.jpg … `);
            try {
                await downloadFile(post.image, dest);
                console.log("done");
            } catch (e) {
                console.log(`FAILED (${e.message})`);
                continue;
            }
        } else {
            console.log(`  ✓  Already exists: ${filename}`);
        }

        // Download extras
        for (const ex of extras) {
            if (!existsSync(ex.dest)) {
                process.stdout.write(`     ⬇  Extra: ${path.basename(ex.dest)} … `);
                try {
                    await downloadFile(ex.url, ex.dest);
                    console.log("done");
                } catch {
                    console.log("FAILED");
                }
            }
        }

        galleryItems.push({
            id: post.id,
            src: localSrc,
            caption: post.text ?? "",
            likes: post.likes ?? 0,
            postUrl: post.url ?? "",
            width: post.image_width ?? 1080,
            height: post.image_height ?? 1080,
            date: post.source_created_at ?? "",
            extras: extras.map((e) => e.local),
        });
    }

    writeFileSync(JSON_PATH, JSON.stringify(galleryItems, null, 2), "utf-8");
    console.log(`\n🎉 Saved ${galleryItems.length} items → data/gallery.json`);
    console.log(`📁 Images saved to  → public/gallery/`);
}

main().catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
});
