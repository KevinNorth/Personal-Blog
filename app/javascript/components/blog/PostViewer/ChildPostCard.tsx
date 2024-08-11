import React from 'react';
import { Card } from 'react-bootstrap';
import Post from '../../../graphql/types/post';

export interface ChildPostCardProps {
  post: Partial<Post>;
  parentSlug: string;
}

function ChildPostCard({
  post,
  parentSlug,
}: ChildPostCardProps): React.ReactElement {
  const url = `${encodeURIComponent(parentSlug)}/${encodeURIComponent(
    post.slug
  )}`;

  return (
    <Card>
      <Card.Title>{post.title}</Card.Title>
      <Card.Text>{post.summary}</Card.Text>
      <Card.Link href={url}>Read more</Card.Link>
    </Card>
  );
}

export default ChildPostCard;
