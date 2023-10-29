import React from 'react';
import { Tree } from 'react-arborist';
import AdminTreeNode from './AdminTreeNode';
import { AdminTreeVertex } from './types';

export interface AdminTreeProps {
  tree: AdminTreeVertex[];
}

function AdminTree({ tree }: AdminTreeProps): React.ReactElement {
  return <Tree
    initialData={tree}
    idAccessor={(vertex) => `${vertex.type}${vertex.id}`}
    openByDefault={true}
    width="100%"
    height={1000}
    indent={24}
    rowHeight={36}
  >
    {AdminTreeNode}    
  </Tree>;
}

export default AdminTree;
