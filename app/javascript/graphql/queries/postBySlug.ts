import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import QueryResult from '../types/queryResult';

const postBySlugQuery = gql`
  query postBySlugQuery(
    $categorySlug: String!
    $postSlug: String!
    $includeUnpublished: Boolean
  ) {
    postBySlug(
      categorySlug: $categorySlug
      postSlug: $postSlug
      includeUnpublished: $includeUnpublished
    ) {
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

export interface PostBySlugVariables {
  categorySlug: NonNullable<string>;
  postSlug: NonNullable<string>;
  includeUnpublished: boolean;
}

function getPostBySlug({
  categorySlug,
  postSlug,
  includeUnpublished = false,
}: PostBySlugVariables): QueryResult<
  { postBySlug: Partial<Post> },
  PostBySlugVariables
> {
  return useQuery(postBySlugQuery, {
    variables: { categorySlug, postSlug, includeUnpublished },
    fetchPolicy: 'cache-and-network',
  });
}

export default getPostBySlug;
