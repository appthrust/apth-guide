import { guide } from "@/lib/guide";

// `curl https://apth.appthrust.dev/skill.md` returns the exact SKILL.md that
// `apth skills install` writes, for agents that read skills from a URL.
export function GET() {
  return new Response(guide.raw, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
