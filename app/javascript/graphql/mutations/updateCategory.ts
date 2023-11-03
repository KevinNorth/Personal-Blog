import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import CategoryInput from '../types/categoryInput';

const updateCategoryMutation = 
  gql`
    mutation updateCategoryMutation($categoryAttributes: CategoryInput!, $id: ID!) {
      updateCategory(input: { categoryAttributes: $categoryAttributes, id: $id }) {
        errors
        category {
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
    }
    ${CATEGORY_FRAGMENT}
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

export interface UpdateCategoryMutationResult {
  data?: { post: Partial<Category>, errors: string[] };
  loading: boolean;
}

function useUpdateCategoryMutation(
  id: string,
  categoryAttributes: CategoryInput,
): UpdateCategoryMutationResult {
  return useQuery(
    updateCategoryMutation, 
    {
      variables: { id, categoryAttributes }
    }
  );
}

export default useUpdateCategoryMutation;
