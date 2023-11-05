import React, { useMemo } from 'react';
import { NodeRendererProps } from 'react-arborist';
import { Button, Col, Row } from 'react-bootstrap';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import Spacer from '../../common/Spacer';
import { AdminTreeCategoryVertex } from './types';
import { CSSLength } from 'types/cssLength';

export interface CategoryNodeProps
  extends NodeRendererProps<AdminTreeCategoryVertex> {
  indentSize: number;
}

function CategoryNode(props: CategoryNodeProps) {
  const { data } = props.node;

  const { editURL, published, title } = useMemo(() => {
    return {
      editURL: `/admin/category/${encodeURIComponent(data.id)}`,
      published: data.graphqlObject?.published || false,
      title: data.title,
    };
  }, [data]);

  const indent = `${props.node.level * props.indentSize}px` as CSSLength;

  return (
    <Row ref={props.dragHandle} style={props.style} className="category-node">
      <Col xs="8">
        <Spacer indent={indent} />
        <Button
          onClick={(e) => {
            e.stopPropagation();
            props.node.toggle();
          }}
          size="sm"
          variant="outline-secondary"
          className="open-toggle"
        >
          {props.node.isOpen ? <ChevronDown /> : <ChevronRight />}
        </Button>
        <span className="label">Category:</span>{' '}
        <strong className="value">{title}</strong>
      </Col>
      <Col xs="2" className="published">
        {published ? 'Published' : 'Draft'}
      </Col>
      <Col xs="2">
        <Button as="a" size="sm" href={editURL}>
          Edit
        </Button>
      </Col>
    </Row>
  );
}

export default CategoryNode;
