import { gql, useLazyQuery, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import QueryResult from '../types/queryResult';
import LazyQueryResult, { LazyQueryExecuteFunction } from '../types/lazyQueryResult';

const allCategoriesAndPostsQuery = 
  gql`
    query allCategoriesAndPostsQuery($includeUnpublished: Boolean) {
      categories(includeUnpublished: $includeUnpublished) {
        ...CategoryFragment
        parent {
          id
        }
        children {
          id
        }
        posts {
          ...PostFragment
          author {
            ...UserFragment
          }
        }
      }
    }
    ${CATEGORY_FRAGMENT}
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

export interface AllCategoriesAndPostsVariables {
  includeUnpublished: boolean;
}

function getAllCategoriesAndPosts(
  { includeUnpublished = false }: AllCategoriesAndPostsVariables
): QueryResult<{ categories: Partial<Category>[] }, AllCategoriesAndPostsVariables> {
  return useQuery(
    allCategoriesAndPostsQuery, 
    {
      variables: { includeUnpublished }
    }
  );
}

export function lazyGetAllCategoriesAndPosts(
  { includeUnpublished = false }: AllCategoriesAndPostsVariables
): [
  LazyQueryExecuteFunction<Partial<Category>[], AllCategoriesAndPostsVariables, 'categories'>,
  LazyQueryResult<Partial<Category>[], AllCategoriesAndPostsVariables, 'categories'>,
] {
  return useLazyQuery(
    allCategoriesAndPostsQuery,
    {
      variables: { includeUnpublished }
    }
  );
}

export default getAllCategoriesAndPosts;
