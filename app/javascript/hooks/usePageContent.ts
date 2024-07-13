import { useMatch } from 'react-router-dom';
import fourOhFour from '../components/blog/fourOhFour';
import getPostByParentAndOwnSlug from '../graphql/queries/postByParentAndOwnSlug';
import getPostBySlug from '../graphql/queries/postBySlug';
import Post from '../graphql/types/post';
import useDefaultPost from './useDefaultPost';

export interface PageContentResult {
  loading: boolean;
  pageContent: Partial<Post> | Partial<Post> | null;
}

function usePageContent(): PageContentResult {
  const postAndParentRouteMatch = useMatch('/:parentSlug/:postSlug');

  if (postAndParentRouteMatch) {
    const { parentSlug, postSlug } = postAndParentRouteMatch.params;
    const { data, loading } = getPostByParentAndOwnSlug({
      parentSlug,
      postSlug,
      includeUnpublished: false,
    });
    return { loading, pageContent: data?.postBySlug || fourOhFour };
  }

  const singlePostRouteMatch = useMatch('/:slug');

  if (singlePostRouteMatch) {
    const { slug } = singlePostRouteMatch.params;
    const { data, loading } = getPostBySlug({
      slug,
      includeUnpublished: false,
    });
    return { loading, pageContent: data?.postBySlug || fourOhFour };
  }

  const { loading, defaultPost } = useDefaultPost();
  return { loading, pageContent: defaultPost };
}

export default usePageContent;
