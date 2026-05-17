"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

function CodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-3 w-full max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#111]">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-[#1b1b1b] px-3 py-2">
        <span className="truncate text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-xs">
          {language}
        </span>

        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/80 transition hover:bg-white/20 sm:text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "12px",
            background: "#111",
            fontSize: "12px",
            width: "100%",
            minWidth: "0",
            overflowX: "auto",
          }}
          codeTagProps={{
            style: {
              fontSize: "12px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="w-full max-w-full overflow-hidden break-words text-sm leading-7 text-white/90 sm:text-base">
      <ReactMarkdown
        components={{
          code(props) {
            const { children, className, inline } = props as any;

            if (inline) {
              return (
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-[12px] text-blue-300">
                  {children}
                </code>
              );
            }

            const match = /language-(\w+)/.exec(className || "");

            return (
              <CodeBlock
                language={match?.[1] || "javascript"}
                value={String(children).replace(/\n$/, "")}
              />
            );
          },

          p({ children }) {
            return (
              <div className="break-words text-sm leading-7 sm:text-base">
                {children}
              </div>
            );
          },

          ul({ children }) {
            return (
              <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>
            );
          },

          ol({ children }) {
            return (
              <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>
            );
          },

          li({ children }) {
            return <li className="break-words">{children}</li>;
          },

          a({ children, href }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="break-all text-blue-400 underline"
              >
                {children}
              </a>
            );
          },

          h1({ children }) {
            return (
              <h1 className="mb-3 mt-5 text-xl font-bold sm:text-2xl">
                {children}
              </h1>
            );
          },

          h2({ children }) {
            return (
              <h2 className="mb-3 mt-5 text-lg font-semibold sm:text-xl">
                {children}
              </h2>
            );
          },

          h3({ children }) {
            return (
              <h3 className="mb-2 mt-4 text-base font-semibold sm:text-lg">
                {children}
              </h3>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
