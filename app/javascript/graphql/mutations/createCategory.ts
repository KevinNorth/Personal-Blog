import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import CategoryInput from '../types/categoryInput';

const createCategoryMutation = 
  gql`
    mutation createCategoryMutation($categoryAttributes: CategoryInput!) {
      createCategory(input: { categoryAttributes: $categoryAttributes }) {
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

export interface CreateCategoryMutationResult {
  data?: { post: Partial<Category>, errors: string[] };
  loading: boolean;
}

function useCreateCategoryMutation(
  categoryAttributes: CategoryInput
): CreateCategoryMutationResult {
  return useQuery(
    createCategoryMutation, 
    {
      variables: { categoryAttributes }
    }
  );
}

export default useCreateCategoryMutation;
