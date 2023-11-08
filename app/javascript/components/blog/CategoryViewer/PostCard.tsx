import React from 'react';
import { Card } from 'react-bootstrap';
import Post from '../../../graphql/types/post';

export interface PostCardProps {
  post: Partial<Post>;
  categorySlug: string;
}

function PostCard({ post, categorySlug }: PostCardProps): React.ReactElement {
  const url = `${encodeURIComponent(categorySlug)}/${encodeURIComponent(
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

export default PostCard;
