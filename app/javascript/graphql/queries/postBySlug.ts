import { gql, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

export const postBySlugQuery = gql`
  query postBySlugQuery($slug: String!, $includeUnpublished: Boolean) {
    postBySlug(slug: $slug, includeUnpublished: $includeUnpublished) {
      ...PostFragment
      parent {
        id
      }
      children {
        ...PostFragment
        author {
          ...UserFragment
        }
      }
      author {
        ...UserFragment
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export interface PostBySlugVariables {
  slug: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostBySlug(
  { slug, includeUnpublished = false }: PostBySlugVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<{ postBySlug: Partial<Post> }, PostBySlugVariables> {
  return useQuery(postBySlugQuery, {
    variables: { slug, includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export default getPostBySlug;
