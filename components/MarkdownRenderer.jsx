import React, { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import RenderSecretVideo from "./RenderSecretVideo";
import RenderSecretAudio from "./RenderSecretAudio";
import RenderSecretIframe from "./RenderSecretIframe";

const MarkdownRenderer = ({ content }) => {
  const components = {
    video: ({ src, ...props }) => (
      // Render your custom video component instead of the standard video element
      <RenderSecretVideo url={src} {...props} />
    ),
    audio: ({ src, ...props }) => <RenderSecretAudio url={src} {...props} />,
    iframe: ({ src, ...props }) => <RenderSecretIframe url={src} {...props} />,
    // You can define more custom elements here if needed
  };

  return (
    <ReactMarkdown
      className="markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components} // Pass the custom components mapping
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
