import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getPostBySlug from '../../../graphql/queries/postBySlug';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import fourOhFour from '../fourOhFour';

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

  const post = !postData?.postBySlug
    ? { ...fourOhFour, __typeName: 'Post' }
    : postData.postBySlug;

  return (
    <MarkdownRenderer
      markdown={post?.markdown || ''}
      className="post-markdown"
    />
  );
}

export default PostViewer;
