import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import CategoryInput from '../types/categoryInput';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';

const createCategoryMutation = gql`
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

export interface CreateCategoryVariables {
  categoryAttributes: CategoryInput;
}

export type CreateCategoryMutationResult = MutationResult<{
  category: Partial<Category>;
  errors: string[];
}>;

function useCreateCategoryMutation({
  categoryAttributes,
}: CreateCategoryVariables): [
  MutationExecutionFunction<
    CreateCategoryMutationResult['data'],
    CreateCategoryVariables
  >,
  CreateCategoryMutationResult
] {
  return useMutation<
    CreateCategoryMutationResult['data'],
    CreateCategoryVariables
  >(createCategoryMutation, {
    variables: { categoryAttributes },
  });
}

export default useCreateCategoryMutation;
