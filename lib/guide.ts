import skill from "@/content/skill.json";

export interface GuideSection {
  id: string;
  title: string;
}

export const guide = {
  name: skill.name,
  description: skill.description,
  source: skill.source,
  syncedAt: skill.syncedAt,
  markdown: skill.markdown,
  // Raw SKILL.md with frontmatter restored so agents can install it from the
  // public URL with the same bytes apth bundles.
  raw: `---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n${skill.markdown}`,
};

// Mirrors rehype-slug: lowercase, strip punctuation, spaces to hyphens.
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function guideSections(): GuideSection[] {
  const sections: GuideSection[] = [];
  let inFence = false;
  for (const line of guide.markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !line.startsWith("## ")) {
      continue;
    }
    const title = line.slice(3).trim();
    sections.push({ id: slugify(title), title });
  }
  return sections;
}
