import { gql, useLazyQuery, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import LazyQueryResult, {
  LazyQueryExecuteFunction,
} from '../types/lazyQueryResult';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import QueryResult from '../types/queryResult';

const allCategoriesAndPostsQuery = gql`
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
  { includeUnpublished = false }: AllCategoriesAndPostsVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<
  { categories: Partial<Category>[] },
  AllCategoriesAndPostsVariables
> {
  return useQuery(allCategoriesAndPostsQuery, {
    variables: { includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export function lazyGetAllCategoriesAndPosts(
  { includeUnpublished = false }: AllCategoriesAndPostsVariables,
  onError: QueryOnErrorFunction = undefined
): [
  LazyQueryExecuteFunction<
    Partial<Category>[],
    AllCategoriesAndPostsVariables,
    'categories'
  >,
  LazyQueryResult<
    Partial<Category>[],
    AllCategoriesAndPostsVariables,
    'categories'
  >
] {
  return useLazyQuery(allCategoriesAndPostsQuery, {
    variables: { includeUnpublished },
    onError,
  });
}

export default getAllCategoriesAndPosts;
