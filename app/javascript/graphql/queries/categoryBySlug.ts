import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import { QueryOnErrorFunction } from '../types/onErrorFunction';
import QueryResult from '../types/queryResult';

export const categoryBySlugQuery = gql`
  query categoryBySlugQuery($slug: String!, $includeUnpublished: Boolean) {
    categoryBySlug(slug: $slug, includeUnpublished: $includeUnpublished) {
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

export interface CategoryBySlugVariables {
  slug: NonNullable<string>;
  includeUnpublished: boolean;
}

function getCategoryBySlug(
  { slug, includeUnpublished = false }: CategoryBySlugVariables,
  onError: QueryOnErrorFunction = undefined
): QueryResult<{ categoryBySlug: Partial<Category> }, CategoryBySlugVariables> {
  return useQuery(categoryBySlugQuery, {
    variables: { slug, includeUnpublished },
    fetchPolicy: 'cache-and-network',
    onError,
  });
}

export default getCategoryBySlug;
