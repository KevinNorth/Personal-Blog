import React from 'react';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreeVertex } from './types';
import CategoryNode, { CategoryNodeProps } from './CategoryNode';
import PostNode, { PostNodeProps } from './PostNode';

export interface AdminTreeNodeProps extends NodeRendererProps<AdminTreeVertex> {
  indentSize: number;
}

function AdminTreeNode(props: AdminTreeNodeProps) {
  switch(props.node.data.type) {
  case 'Category':
    return <CategoryNode {...props as CategoryNodeProps} />;
  case 'Post':
    return <PostNode {...props as PostNodeProps} />;
  default:
    throw new Error(`Can't represent an AdminTreeVertex with type "${(props.node.data as { type?: unknown })?.type}"`);
  }
}

export default AdminTreeNode;
