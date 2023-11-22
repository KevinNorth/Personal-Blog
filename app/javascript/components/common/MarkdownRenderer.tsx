import React from 'react';
import Markdown, { Components } from 'react-markdown';
import Icon, { isIconName } from './Icon';
import 'highlight.js/styles/github.css';
import mermaid from 'mermaid';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

// Lets me use i.e. <img src="ChevronRight" /> to use Bootstrap Icons
// in Markdown.
const iconComponentsConfig: Components = {
  img: (props) => {
    const { src } = props;

    if (src && isIconName(src)) {
      return <Icon iconName={src} />;
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props}></img>;
  },
  code: async (props) => {
    const { className, content, key } = props;

    if (className.includes('language-mermaid')) {
      return mermaid.render(`mermaid-${key}`, content);
    }

    return <code {...props}></code>;
  },
};

function MarkdownRenderer({
  markdown,
  className,
}: MarkdownRendererProps): React.ReactElement {
  return (
    <Markdown
      className={className}
      components={iconComponentsConfig}
      remarkPlugins={
        [[remarkGfm, { singleTilde: false }]] // GitHub-flavored Markdown
      }
      rehypePlugins={[
        rehypeHighlight, // Syntax highlighting in code blocks
        rehypeRaw,
        rehypeSlug, // Automatically add ids to headers
      ]}
    >
      {markdown}
    </Markdown>
  );
}

export default MarkdownRenderer;
