/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { JournalRichtext } from 'react-bootstrap-icons';
import { NodeRendererProps } from 'react-arborist';
import { AdminTreePostVertex } from './types';

export type PostNodeProps = NodeRendererProps<AdminTreePostVertex>;

function PostNode(props: PostNodeProps) {
  const { data } = props.node;

  const { editURL, published, title } = useMemo(() => {
    return {
      editUrl: `/admin/post/${encodeURIComponent(data.id)}`,
      published: data.graphqlObject?.published || false,
      title: data.title
    };
  }, data);

  return (
    <Row ref={props.dragHandle} style={props.style} className='post-node'>
      <Col xs='auto'>
        <JournalRichtext />
      </Col>
      <Col className='title'>
        <span className='label'>Post:</span> <span className='value'>{title}</span>
      </Col>
      <Col className='published'>
        {published ? 'Published' : 'Draft' }
      </Col>
      <Col xs='auto'>
        <Button href={editURL} className='edit-button'>Edit</Button>
      </Col>
    </Row>
  );
}

export default PostNode;
