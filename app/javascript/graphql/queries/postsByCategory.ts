import { gql, useLazyQuery, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import QueryResult from '../types/queryResult';
import LazyQueryResult from 'graphql/types/lazyQueryResult';

const postByIdQuery = 
  gql`
    query postsByCategoryQuery($categoryId: ID!, $includeUnpublished: Boolean) {
      postsByCategory(categoryId: $categoryId, includeUnpublished: $includeUnpublished) {
        ...PostFragment
        category {
          # Presumably, we already have the category we want to use before making the query,
          # so there's no need to requery it
          id
        }
        author {
          ...UserFragment
        }
      }
    }
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

function getPostsByCategory(
  categoryId: NonNullable<string>,
  includeUnpublished: boolean = false
): QueryResult<{ postsByCategory: Partial<Post>[] }> {
  return useQuery(
    postByIdQuery, 
    {
      variables: { categoryId, includeUnpublished }
    }
  );
}

export function lazyGetPostsByCategory(
  categoryId: NonNullable<string>,
  includeUnpublished: boolean = false
): [
  queryFunction: () => void,
  LazyQueryResult<{ postsByCategory: Partial<Post>[] }>
] {
  return useLazyQuery(
    postByIdQuery,
    {
      variables: { categoryId, includeUnpublished }
    }
  );
}

export default getPostsByCategory;
