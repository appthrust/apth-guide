import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="mt-14 scroll-mt-24 border-b border-slate-200 pb-2 text-2xl font-semibold tracking-tight text-slate-950 first:mt-0"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="mt-8 scroll-mt-24 text-lg font-semibold text-slate-900"
    >
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-slate-700">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:decoration-emerald-700"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-slate-700">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-950">{children}</strong>
  ),
  pre: ({ children }) => (
    <pre className="my-5 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-[13px] leading-6 text-slate-100">
      {children}
    </pre>
  ),
  code: ({ children, className }) =>
    className ? (
      <code className="font-mono">{children}</code>
    ) : (
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-900">
        {children}
      </code>
    ),
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </thead>
  ),
  th: ({ children }) => <th className="px-3 py-2">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-slate-100 px-3 py-2 align-top text-slate-700">
      {children}
    </td>
  ),
  hr: () => <hr className="my-10 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-2 border-emerald-300 pl-4 text-slate-600">
      {children}
    </blockquote>
  ),
};

export function GuideMarkdown({ markdown }: { markdown: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={components}
    >
      {markdown}
    </Markdown>
  );
}
