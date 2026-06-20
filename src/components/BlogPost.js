"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import materialDark from "../helpers/material-dark";
import materialLight from "../helpers/material-light";
import NoMatch from "../not-found";
// import { a11yOneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { isPostAvailable } from "../helpers/utilities";
import CodeBlock from "./CodeBlock";
import Header from "./Header";
import Para from "./Para";

const commonClassName = "text-secondary animate-fade";

const BlogPost = ({ sublink, link }) => {
  const [codeStyle, setCodeStyle] = useState(null);
  const [content, setContent] = useState(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!resolvedTheme) return;
    const style = resolvedTheme === "dark" ? materialDark : materialLight;
    const timeout = setTimeout(() => setCodeStyle(style), 150); // small delay
    return () => clearTimeout(timeout);
  }, [resolvedTheme]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [content]);

  useLayoutEffect(() => {
    const fetchFileContent = async () => {
      const path = `/${sublink}/${link}.md`;
      const response = await fetch(path);
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      } else {
        console.error("Failed to load markdown file:", response.status);
      }
    };
    fetchFileContent();
  }, [link, sublink]);

  const markdownRender = useMemo(() => {
    if (!content) return null;
    return (
      <ReactMarkdown
        key={sublink}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <Header content={children} size="4xl" />,
          h2: ({ children }) => <Header content={children} size="3xl" />,
          h3: ({ children }) => <Header content={children} size="2xl" />,
          h4: ({ children }) => <Header content={children} size="xl" />,
          p: ({ children }) => <Para>{children}</Para>,
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 bg-quote-bg border-primary my-1 animate-fade">
              {children}
            </blockquote>
          ),
          pre: (obj) => <CodeBlock obj={obj} />,
          code: ({ children }) => <b className={commonClassName}>{children}</b>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontStyle: "italic", textDecoration: "underline" }}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <b className={commonClassName}>{children}</b>
          ),
          ol: ({ children }) => (
            <ol
              style={{ listStyle: "decimal", paddingLeft: "2rem" }}
              className={commonClassName}
            >
              {children}
            </ol>
          ),
          ul: ({ children }) => (
            <ul
              style={{ listStyle: "disc", paddingLeft: "2rem" }}
              className={commonClassName}
            >
              {children}
            </ul>
          ),
          li: ({ children }) => <li className={commonClassName}>{children}</li>,
          table: ({ children }) => (
            <table className="text-secondary border-[2px] w-full animate-fade">
              {children}
            </table>
          ),
          thead: ({ children }) => (
            <thead className={commonClassName}>{children}</thead>
          ),
          tbody: ({ children }) => (
            <thead className={commonClassName}>{children}</thead>
          ),
          tr: ({ children }) => (
            <tr className="text-secondary border-b-[2px] animate-fade">
              {children}
            </tr>
          ),
          th: ({ children }) => <th className={commonClassName}>{children}</th>,
          td: ({ children }) => (
            <td className="text-secondary py-2 px-2 align-top animate-fade">
              {children}
            </td>
          ),
          hr: () => <hr className="text-secondary" />,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }, [content, sublink]);

  const postAvailable = isPostAvailable(sublink, link);

  if (!postAvailable) return <NoMatch />;

  if (!content || !mounted)
    return <div className="text-primary py-12 text-xl">Loading...</div>;

  return (
    <article className="transition-opacity duration-300 opacity-100 animate-fade mt-12">
      {markdownRender}
    </article>
  );
};

export default BlogPost;
