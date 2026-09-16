#!/usr/bin/env node
// Copies the appthrust-app-dev SKILL.md from an appthrust/platform checkout
// (or any path) into content/skill.json so the site ships the exact skill
// text without reading the filesystem at runtime.
//
//   node scripts/sync-skill.mjs [path/to/SKILL.md]
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const source =
  process.argv[2] ??
  resolve("../platform/apth-cli/skills/appthrust-app-dev/SKILL.md");
const raw = readFileSync(source, "utf8");

const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  throw new Error(`${source}: missing YAML frontmatter`);
}
const [, frontmatter, markdown] = match;
const field = (key) => {
  const line = frontmatter.split("\n").find((l) => l.startsWith(`${key}:`));
  return line ? line.slice(key.length + 1).trim() : "";
};

const out = {
  name: field("name"),
  description: field("description"),
  source: "https://github.com/appthrust/platform/blob/main/apth-cli/skills/appthrust-app-dev/SKILL.md",
  syncedAt: new Date().toISOString().slice(0, 10),
  markdown: markdown.trimStart(),
};
writeFileSync(resolve("content/skill.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`content/skill.json <- ${source} (${out.markdown.length} chars)`);
