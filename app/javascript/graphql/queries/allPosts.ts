import { gql, useLazyQuery, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import LazyQueryResult, {
  LazyQueryExecuteFunction,
} from '../types/lazyQueryResult';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

export const allPostsQuery = gql`
  query allPostsQuery($includeUnpublished: Boolean) {
    allPosts(includeUnpublished: $includeUnpublished) {
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

export interface AllPostsVariables {
  includeUnpublished: boolean;
}

function getAllPosts(
  { includeUnpublished = false }: AllPostsVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<{ allPosts: Partial<Post>[] }, AllPostsVariables> {
  return useQuery(allPostsQuery, {
    variables: { includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export function lazyGetAllPosts(
  { includeUnpublished = false }: AllPostsVariables,
  onError: QueryOnErrorFunction = undefined
): [
  LazyQueryExecuteFunction<Partial<Post>[], AllPostsVariables, 'allPosts'>,
  LazyQueryResult<Partial<Post>[], AllPostsVariables, 'allPosts'>
] {
  return useLazyQuery(allPostsQuery, {
    variables: { includeUnpublished },
    onError,
  });
}

export default getAllPosts;
