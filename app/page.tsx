import { GuideMarkdown } from "@/components/markdown";
import { loadDatabaseState } from "@/lib/db";
import { guide, guideSections } from "@/lib/guide";

export const dynamic = "force-dynamic";

const install = [
  {
    step: "1",
    title: "Get apth",
    body: "Build the developer CLI from appthrust/platform.",
    code: "go build -o ~/.local/bin/apth ./apth-cli/cmd/apth",
  },
  {
    step: "2",
    title: "Install the skill",
    body: "Writes appthrust-app-dev into Claude Code, Codex, and OMP skill directories.",
    code: "apth skills install",
  },
  {
    step: "3",
    title: "Log in and ask your agent",
    body: "Device login in the browser, then a plain request does the rest.",
    code: 'apth login --api-url https://dashboard.appthrust.dev\n# "make a small game and put it on appthrust.dev"',
  },
];

export default async function Home() {
  const database = await loadDatabaseState();
  const sections = guideSections();
  const release =
    process.env.VERSION?.trim() || process.env.APTH_COMPONENT_VERSION?.trim();
  // The guide's own H1 is replaced by the page hero.
  const body = guide.markdown.replace(/^# .*\n/, "");

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-800">
              AppThrust developer CLI
            </span>
            <span className="font-mono">skill: {guide.name}</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Ship an app to appthrust.dev from your coding agent.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-base text-slate-900 ring-1 ring-slate-200">
                apth
              </code>{" "}
              creates the GitHub repository, builds the image, provisions a
              managed PostgreSQL, and publishes a public URL. The bundled skill
              teaches Claude Code, Codex, and OMP the whole loop, so you only
              describe the app.
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {install.map((item) => (
              <li
                key={item.step}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 font-mono text-xs font-semibold text-white">
                    {item.step}
                  </span>
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
                <pre className="mt-auto overflow-x-auto rounded-md bg-slate-950 px-3 py-2.5 pt-5 font-mono text-[12.5px] leading-5 text-slate-100">
                  {item.code}
                </pre>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Guide
          </p>
          <nav className="mt-3">
            <ol className="space-y-1.5 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8 space-y-2 text-xs text-slate-500">
            <p>
              <a
                href="/skill.md"
                className="font-mono text-emerald-700 underline underline-offset-4"
              >
                /skill.md
              </a>{" "}
              serves the raw SKILL.md.
            </p>
            <p>
              Source:{" "}
              <a
                href={guide.source}
                className="underline underline-offset-4 hover:text-slate-900"
              >
                appthrust/platform
              </a>
              , synced {guide.syncedAt}.
            </p>
          </div>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <p className="mb-8 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
            This is the text your agent reads after{" "}
            <code className="font-mono text-slate-900">apth skills install</code>
            . It is the operating manual for one application: repository,
            image, stack, database, publish.
          </p>
          <GuideMarkdown markdown={body} />
        </article>
      </div>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>
            This site was created with the same flow:{" "}
            <code className="font-mono text-slate-900">
              apth apps create apth-guide --template nextjs-postgres --publish
            </code>
          </p>
          <dl className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
            {release ? (
              <div className="flex gap-2">
                <dt className="text-slate-500">release</dt>
                <dd className="text-slate-900">{release}</dd>
              </div>
            ) : null}
            <div className="flex gap-2">
              <dt className="text-slate-500">postgres</dt>
              <dd className="text-slate-900">
                {database.status === "ready"
                  ? `${database.serverVersion ?? "connected"} · ${database.databaseName ?? ""}`
                  : database.status}
              </dd>
            </div>
          </dl>
        </div>
      </footer>
    </main>
  );
}
