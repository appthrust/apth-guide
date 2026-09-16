# apth guide

The site behind https://apth.appthrust.dev/: how to ship an application to
appthrust.dev with the `apth` developer CLI and the `appthrust-app-dev` agent
skill (Claude Code, Codex, OMP).

- `/` renders the skill as a guide with install steps.
- `/skill.md` serves the raw `SKILL.md` so agents can read it from the URL.

The skill text is copied from
[`appthrust/platform`](https://github.com/appthrust/platform/blob/main/apth-cli/skills/appthrust-app-dev/SKILL.md)
into `content/skill.json`:

```bash
node scripts/sync-skill.mjs ../platform/apth-cli/skills/appthrust-app-dev/SKILL.md
```

Run locally (`DATABASE_URL` is optional; the footer shows the managed
PostgreSQL status when AppThrust injects it):

```bash
npm ci
npm run dev
```

Deploy: push to `main`. GitHub Actions publishes
`ghcr.io/appthrust/apth-guide:edge-<timestamp>` and AppThrust releases the
newest `edge-` tag. This repository was created with
`apth apps create apth-guide --template nextjs-postgres --publish --subdomain apth`.
