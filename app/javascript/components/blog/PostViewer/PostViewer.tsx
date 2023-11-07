import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getPostBySlug from '../../../graphql/queries/postBySlug';
import MarkdownRenderer from '../../common/MarkdownRenderer';

function PostViewer(): React.ReactElement {
  const { categorySlug, postSlug } = useParams();

  const { data: postData, loading: postLoading } = getPostBySlug({
    categorySlug,
    postSlug,
    includeUnpublished: false,
  });

  if (postLoading) {
    return <Spinner />;
  }

  const { postBySlug: post } = postData || { postBySlug: null };

  return (
    <MarkdownRenderer
      markdown={post?.markdown || ''}
      className="post-markdown"
    />
  );
}

export default PostViewer;
