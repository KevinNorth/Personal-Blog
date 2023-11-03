import { gql, useLazyQuery, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from './fragments/categoryFragment';
import POST_FRAGMENT from './fragments/postFragment';
import USER_FRAGMENT from './fragments/userFragment';
import Category from '../types/category';
import QueryResult from '../types/queryResult';
import LazyQueryResult from '../types/lazyQueryResult';

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

function getAllCategoriesAndPosts(
  includeUnpublished: boolean = false
): QueryResult<{ categories: Partial<Category>[] }> {
  return useQuery(
    allCategoriesAndPostsQuery, 
    {
      variables: { includeUnpublished }
    }
  );
}

export function lazyGetAllCategoriesAndPosts(
  includeUnpublished: boolean = false
): [
  queryFunction: () => void,
  LazyQueryResult<{ categories: Partial<Category>[] }>
] {
  return useLazyQuery(
    allCategoriesAndPostsQuery,
    {
      variables: { includeUnpublished }
    }
  );
}

export default getAllCategoriesAndPosts;
