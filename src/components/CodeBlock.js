import { useTheme } from "next-themes";
import { memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import materialDark from "../helpers/material-dark";
import materialLight from "../helpers/material-light";

const Svg = ({ children }) => (
  <div className="cursor-pointer">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={16}
      height={16}
    >
      {children}
    </svg>
  </div>
);

const CodeBlock = memo(({ obj }) => {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const { children, className, ...rest } = obj;
  const codeNode = Array.isArray(children) ? children[0] : children;
  const language =
    /language-(\w+)/.exec(codeNode?.props?.className || "")?.[1] ?? "plaintext";

  const content = String(codeNode?.props?.children || "")
    .trim()
    .replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeStyle = resolvedTheme === "dark" ? materialDark : materialLight;

  return (
    <div className="relative animate-fade">
      <button
        className="absolute top-2 right-2 p-1 text-secondary rounded hover:pointer z-[2]"
        onClick={handleCopy}
        title="Copy"
      >
        {copied ? (
          <Svg>
            <polyline points="20 6 9 17 4 12" />
          </Svg>
        ) : (
          <Svg>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
          </Svg>
        )}
      </button>
      <SyntaxHighlighter
        {...rest}
        key={localStorage.theme + "documentId"}
        PreTag="div"
        className="py-4 px-4 rounded-md bg-code-bg text-secondary text-sm break-all wrap-break-word whitespace-pre-wrap animate-fade"
        language={language}
        style={codeStyle}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
});

export default CodeBlock;
