import React from 'react';
import { Tree } from 'react-arborist';
import { Container } from 'react-bootstrap';
import AdminTreeNode from './AdminTreeNode';
import { AdminTreeVertex } from './types';

export interface AdminTreeProps {
  tree: AdminTreeVertex[];
  indentSize: number;
  height: number;
}

function AdminTree({
  tree,
  indentSize,
  height,
}: AdminTreeProps): React.ReactElement {
  return (
    <Container fluid className="admin-tree">
      <Tree
        initialData={tree}
        idAccessor={(vertex) => `${vertex.id}`}
        openByDefault={true}
        width="100%"
        height={height}
        indent={0}
        rowHeight={45}
      >
        {(nodeProps) => (
          <AdminTreeNode {...nodeProps} indentSize={indentSize} />
        )}
      </Tree>
    </Container>
  );
}

export default AdminTree;
