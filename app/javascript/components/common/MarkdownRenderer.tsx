import React, { useEffect, useRef } from 'react';
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
};

function MarkdownRenderer({
  markdown,
  className,
}: MarkdownRendererProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // false positive
    // eslint-disable-next-line xss/no-mixed-html
    const mermaidDiagrams = [
      ...(ref.current?.querySelectorAll('.language-mermaid') || []),
    ] as HTMLElement[];

    // Avoid attempting to run Mermaid on the contents
    // of an already-generated diagram.
    const diagramsToUpdate = mermaidDiagrams.filter((mermaidDiagram) => {
      // If the diagram has any children other than text, it's most likely
      // that Mermaid generated the diagram already and placed it in the
      // children nodes we discovered.
      const children = Object.values(mermaidDiagram.childNodes);
      return !children.find((child) => child.nodeType === Node.ELEMENT_NODE);
    });
    diagramsToUpdate.forEach((mermaidDiagram) => {
      // Necessary to convince Mermaid to re-render the contents of a code block
      // See https://github.com/mermaid-js/mermaid/issues/311#issuecomment-332557344
      mermaidDiagram.removeAttribute('data-processed');
    });

    mermaid.run({
      suppressErrors: true,
      nodes: diagramsToUpdate,
    });
  }, [markdown]);

  return (
    <div ref={ref}>
      <Markdown
        className={className}
        components={iconComponentsConfig}
        remarkPlugins={
          [[remarkGfm, { singleTilde: false }]] // GitHub-flavored Markdown
        }
        rehypePlugins={[
          [rehypeHighlight, { plainText: ['mermaid'] }], // Syntax highlighting in code blocks
          rehypeRaw,
          rehypeSlug, // Automatically add ids to headers
        ]}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export default MarkdownRenderer;
