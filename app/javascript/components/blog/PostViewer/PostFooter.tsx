import React from 'react';
import getPostsByParent from '../../../graphql/queries/postsByParent';
import ChildPostCard from './ChildPostCard';

export interface PostFooterProps {
  parentId: string;
  parentSlug: string;
}

function CategoryFooter({
  parentId,
  parentSlug,
}: PostFooterProps): React.ReactElement {
  const { data: postsData, loading: loadingPosts } = getPostsByParent({
    parentId,
    includeUnpublished: false,
  });

  if (
    loadingPosts ||
    !postsData?.postsByParent ||
    postsData.postsByParent.length === 0
  ) {
    return null;
  }

  const postCards = postsData.postsByParent.map((post) => (
    <ChildPostCard post={post} parentSlug={parentSlug} key={post.id} />
  ));

  return (
    <footer>
      <h1>More about this:</h1>
      <div className="post-cards">{postCards}</div>
    </footer>
  );
}

export default CategoryFooter;
