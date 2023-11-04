import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import CategoryInput from '../types/categoryInput';
import MutationResult, { MutationExecutionFunction } from '../types/mutationResult';

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

export type UpdateCategoryMutationResult =
  MutationResult<{ post: Partial<Category>, errors: string[] }>;

function useUpdateCategoryMutation(
  id: string,
  categoryAttributes: CategoryInput,
): [
  MutationExecutionFunction,
  UpdateCategoryMutationResult
] {
  return useMutation(
    updateCategoryMutation, 
    {
      variables: { id, categoryAttributes }
    }
  );
}

export default useUpdateCategoryMutation;
