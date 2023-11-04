import { gql, useLazyQuery, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import QueryResult from '../types/queryResult';
import LazyQueryResult, { LazyQueryExecuteFunction } from 'graphql/types/lazyQueryResult';

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

export interface PostByCategoryVariables {
  categoryId: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostsByCategory(
  { categoryId, includeUnpublished = false }: PostByCategoryVariables
): QueryResult<{ postsByCategory: Partial<Post>[] }, PostByCategoryVariables > {
  return useQuery(
    postByIdQuery, 
    {
      variables: { categoryId, includeUnpublished }
    }
  );
}

export function lazyGetPostsByCategory(
  { categoryId, includeUnpublished = false }: PostByCategoryVariables
): [
  LazyQueryExecuteFunction<Partial<Post>[], PostByCategoryVariables, 'postsByCategory'>,
  LazyQueryResult<Partial<Post>[], PostByCategoryVariables, 'postsByCategory'>,
] {
  return useLazyQuery(
    postByIdQuery,
    {
      variables: { categoryId, includeUnpublished }
    }
  );
}

export default getPostsByCategory;
