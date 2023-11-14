import React from 'react';

function ReactMarkdown({
  children,
  onChange,
  ...otherProps
}: React.PropsWithChildren & { onChange?: (string) => void }) {
  return (
    <>
      <textarea onChange={onChange}></textarea>
      <div>{children}</div>
      <div>Props: {JSON.stringify(otherProps)}</div>
    </>
  );
}

export default ReactMarkdown;
