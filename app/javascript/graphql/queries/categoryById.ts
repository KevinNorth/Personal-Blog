import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import QueryResult from '../types/queryResult';

const categoryByIdQuery = gql`
  query categoryByIdQuery($id: ID!, $includeUnpublished: Boolean) {
    categoryById(id: $id, includeUnpublished: $includeUnpublished) {
      ...CategoryFragment
      parent {
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
      children {
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

export interface CategoryByIdVariables {
  id: NonNullable<string>;
  includeUnpublished: boolean;
}

function getCategoryById({
  id,
  includeUnpublished = false,
}: CategoryByIdVariables): QueryResult<
  { categoryById: Partial<Category> },
  CategoryByIdVariables
> {
  return useQuery(categoryByIdQuery, {
    variables: { id, includeUnpublished },
    fetchPolicy: 'cache-and-network',
  });
}

export default getCategoryById;
