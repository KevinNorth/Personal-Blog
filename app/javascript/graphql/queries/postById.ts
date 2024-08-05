import { gql, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

export const postByIdQuery = gql`
  query postByIdQuery($id: ID!, $includeUnpublished: Boolean) {
    postById(id: $id, includeUnpublished: $includeUnpublished) {
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

export interface PostByIdVariables {
  id: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostById(
  { id, includeUnpublished = false }: PostByIdVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<{ postById: Partial<Post> }, PostByIdVariables> {
  return useQuery(postByIdQuery, {
    variables: { id, includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export default getPostById;
