import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

const postByIdQuery = 
  gql`
    query postByIdQuery($id: ID!, $includeUnpublished: Boolean) {
      postById(id: $id, includeUnpublished: $includeUnpublished) {
        ...PostFragment
        category {
          ...CategoryFragment
          parent {
            id
          }
          children {
            id
          }
          posts {
            id
          }
        }
        author {
          ...UserFragment
        }
      }
    }
    ${CATEGORY_FRAGMENT}
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

function getPostById(
  id: NonNullable<string>,
  includeUnpublished: boolean = false
): QueryResult<{ postById: Partial<Post> }> {
  return useQuery(
    postByIdQuery, 
    {
      variables: { id, includeUnpublished }
    }
  );
}

export default getPostById;
