/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreePostVertex } from './types';

function PostNode(props: NodeRendererProps<AdminTreePostVertex>) {
  return (
    <div ref={props.dragHandle} style={props.style}>
      <span>🌳</span>
      {' '}
      <span>{props.node.data.title}</span>
    </div>
  );
}

export default PostNode;
