import React from 'react';
import getPostsByCategory from '../../../graphql/queries/postsByCategory';
import PostCard from './PostCard';

export interface CategoryFooterProps {
  categoryId: string;
  categorySlug: string;
}

function CategoryFooter({
  categoryId,
  categorySlug,
}: CategoryFooterProps): React.ReactElement {
  const { data: postsData, loading: loadingPosts } = getPostsByCategory({
    categoryId,
    includeUnpublished: false,
  });

  if (
    loadingPosts ||
    !postsData?.postsByCategory ||
    postsData.postsByCategory.length === 0
  ) {
    return null;
  }

  const postCards = postsData.postsByCategory.map((post) => (
    <PostCard post={post} categorySlug={categorySlug} key={post.id} />
  ));

  return (
    <footer>
      <h1>More about this:</h1>
      <div className="post-cards">{postCards}</div>
    </footer>
  );
}

export default CategoryFooter;
