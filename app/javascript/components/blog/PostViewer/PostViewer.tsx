import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getPostByParentAndOwnSlug from '../../../graphql/queries/postByParentAndOwnSlug';
import getPostBySlug from '../../../graphql/queries/postBySlug';
import Post from '../../../graphql/types/post';
import useDefaultPost from '../../../hooks/useDefaultPost';
import MarkdownRenderer from '../../common/MarkdownRenderer';
import fourOhFour from '../fourOhFour';
import PostFooter from './PostFooter';

export interface PostViewerProps {
  showDefaultPost?: boolean;
}

function PostViewer({
  showDefaultPost = false,
}: PostViewerProps): React.ReactElement {
  let post: Partial<Post> | null = null;
  let loading: boolean = true;

  if (showDefaultPost) {
    const { defaultPost, loading: postLoading } = useDefaultPost();

    post = defaultPost;
    loading = postLoading;
  } else {
    const { slug, parentSlug } = useParams();

    if (parentSlug) {
      const { data, loading: postLoading } = getPostByParentAndOwnSlug({
        postSlug: slug,
        parentSlug,
        includeUnpublished: false,
      });

      post = data?.postBySlug;
      loading = postLoading;
    } else {
      const { data, loading: postLoading } = getPostBySlug({
        slug,
        includeUnpublished: false,
      });

      post = data?.postBySlug;
      loading = postLoading;
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (!post) {
    post = fourOhFour;
  }

  return (
    <>
      <MarkdownRenderer
        markdown={post?.markdown || ''}
        className="post-markdown"
      />
      <PostFooter parentSlug={post?.slug} parentId={post?.id} />
    </>
  );
}

export default PostViewer;
