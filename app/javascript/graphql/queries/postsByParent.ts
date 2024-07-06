import { gql, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

export const postsByParentQuery = gql`
  query postsByParent($parentId: ID!, $includeUnpublished: Boolean) {
    postsByParent(
      parentId: $parentId
      includeUnpublished: $includeUnpublished
    ) {
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

export interface PostsByParentVariables {
  parentId: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostsByParent(
  { parentId, includeUnpublished = false }: PostsByParentVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<{ postBySlug: Partial<Post> }, PostsByParentVariables> {
  return useQuery(postsByParentQuery, {
    variables: { parentId, includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export default getPostsByParent;
