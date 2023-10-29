/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreeCategoryVertex } from './types';

function CategoryNode(props: NodeRendererProps<AdminTreeCategoryVertex>) {
  return (
    <div ref={props.dragHandle} style={props.style}>
      <span
        onClick={(e) => {
          e.stopPropagation();
          props.node.toggle();
        }}
      >
        {props.node.isOpen ? '🗁' : '🗀'}
      </span>{' '}
      <span>{props.node.data.title}</span>
    </div>
  );
}

export default CategoryNode;
