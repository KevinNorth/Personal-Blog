import { useMatch } from 'react-router-dom';
import getCategoryBySlug from '../graphql/queries/categoryBySlug';
import getPostBySlug from '../graphql/queries/postBySlug';
import Category from '../graphql/types/category';
import Post from '../graphql/types/post';
import useDefaultCategory from './useDefaultCategory';

export interface PageContentResult {
  loading: boolean;
  pageContent: Partial<Category> | Partial<Post> | null;
}

function usePageContent(): PageContentResult {
  const postRouteMatch = useMatch('/:categorySlug/:postSlug');

  if (postRouteMatch) {
    const { categorySlug, postSlug } = postRouteMatch.params;
    const { data, loading } = getPostBySlug({
      categorySlug,
      postSlug,
      includeUnpublished: false,
    });
    return { loading, pageContent: data?.postBySlug };
  }

  const categoryRouteMatch = useMatch('/:categorySlug');

  if (categoryRouteMatch) {
    const { categorySlug } = categoryRouteMatch.params;
    const { data, loading } = getCategoryBySlug({
      slug: categorySlug,
      includeUnpublished: false,
    });
    return { loading, pageContent: data?.categoryBySlug };
  }

  const { loading, defaultCategory } = useDefaultCategory();
  return { loading, pageContent: defaultCategory };
}

export default usePageContent;
