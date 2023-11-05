/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useMemo } from 'react';
import { NodeRendererProps } from 'react-arborist';
import { Button, Col, Row } from 'react-bootstrap';
import { JournalRichtext } from 'react-bootstrap-icons';
import Spacer from '../../common/Spacer';
import { AdminTreePostVertex } from './types';
import { CSSLength } from 'types/cssLength';

export interface PostNodeProps extends NodeRendererProps<AdminTreePostVertex> {
  indentSize: number;
}

function PostNode(props: PostNodeProps) {
  const { data } = props.node;

  const { editURL, published, title } = useMemo(() => {
    return {
      editURL: `/admin/post/${encodeURIComponent(data.id)}`,
      published: data.graphqlObject?.published || false,
      title: data.title,
    };
  }, [data]);

  const indent = `${props.node.level * props.indentSize}px` as CSSLength;

  return (
    <Row ref={props.dragHandle} style={props.style} className="post-node">
      <Col xs="8">
        <Spacer indent={indent} />
        <JournalRichtext />
        <span className="label">Post:</span>{' '}
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

export default PostNode;
