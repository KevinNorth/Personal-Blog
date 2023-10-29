import React, { useMemo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ChevronDown, ChevronRight } from 'react-bootstrap-icons';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreeCategoryVertex } from './types';

export type CategoryNodeProps = NodeRendererProps<AdminTreeCategoryVertex>;

function CategoryNode(props: CategoryNodeProps) {
  const { data } = props.node;

  const { editURL, published, title } = useMemo(() => {
    return {
      editUrl: `/admin/category/${encodeURIComponent(data.id)}`,
      published: data.graphqlObject?.published || false,
      title: data.title
    };
  }, data);

  return (
    <Row ref={props.dragHandle} style={props.style} className='category-node' >
      <Col xs='auto'>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            props.node.toggle();
          }}
          size='sm'
          variant='outline-secondary'
          className='open-toggle'
        >
          {props.node.isOpen ? <ChevronDown /> : <ChevronRight /> }
        </Button>
      </Col>
      <Col className='title'>
        <span className='label'>Category:</span> <span className='value'>{title}</span>
      </Col>
      <Col className='published'>
        {published ? 'Published' : 'Draft' }
      </Col>
      <Col xs='auto'>
        <Button href={editURL} className='edit-button'>Edit</Button>
      </Col>
    </Row>);
}

export default CategoryNode;
