import { gql, useQuery } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

export const postByParentAndOwnSlugQuery = gql`
  query postByParentAndOwnSlug(
    $parentSlug: String!
    $postSlug: String!
    $includeUnpublished: Boolean
  ) {
    postByParentAndOwnSlug(
      parentSlug: $parentSlug
      postSlug: $postSlug
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

export interface PostByParentAndOwnSlugVariables {
  parentSlug: NonNullable<string>;
  postSlug: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostByParentAndOwnSlug(
  {
    parentSlug,
    postSlug,
    includeUnpublished = false,
  }: PostByParentAndOwnSlugVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<
  { postByParentAndOwnSlug: Partial<Post> },
  PostByParentAndOwnSlugVariables
> {
  return useQuery(postByParentAndOwnSlugQuery, {
    variables: { parentSlug, postSlug, includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export default getPostByParentAndOwnSlug;
