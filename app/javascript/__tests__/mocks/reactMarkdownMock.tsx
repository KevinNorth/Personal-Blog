import React from 'react';

function ReactMarkdown({ children, ...otherProps }: React.PropsWithChildren) {
  return (
    <>
      <div>{children}</div>
      <div>Props: {JSON.stringify(otherProps)}</div>
    </>
  );
}

export default ReactMarkdown;
