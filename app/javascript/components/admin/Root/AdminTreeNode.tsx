import React from 'react';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreeVertex } from './types';
import CategoryNode from './CategoryNode';
import PostNode from './PostNode';

export type AdminTreeNodeProps = NodeRendererProps<AdminTreeVertex>;

function AdminTreeNode(props: AdminTreeNodeProps) {
  switch(props.node.data.type) {
  case 'Category':
    return <CategoryNode {...props} />;
  case 'Post':
    return <PostNode {...props} />;
  default:
    throw new Error(`Can't represent an AdminTreeVertex with type "${props.node.data.type}"`);
  }
}

export default AdminTreeNode;
