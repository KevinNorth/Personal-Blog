import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Category from '../types/category';
import CategoryInput from '../types/categoryInput';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import { MutationOnErrorFunction } from '../types/onErrorFunction';

const updateCategoryMutation = gql`
  mutation updateCategoryMutation(
    $categoryAttributes: CategoryInput!
    $id: ID!
  ) {
    updateCategory(
      input: { categoryAttributes: $categoryAttributes, id: $id }
    ) {
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

export interface UpdateCategoryVariables {
  id: string;
  categoryAttributes: CategoryInput;
}

export interface UpdateCategoryMutationResponsePayload {
  category: Partial<Category>;
  errors: string[];
}

export type UpdateCategoryMutationResult = MutationResult<
  UpdateCategoryMutationResponsePayload,
  'updateCategory'
>;

function useUpdateCategoryMutation(
  { id, categoryAttributes }: UpdateCategoryVariables,
  onError: MutationOnErrorFunction = undefined
): [
  MutationExecutionFunction<
    UpdateCategoryMutationResult['data'],
    UpdateCategoryVariables,
    'updateCategory'
  >,
  UpdateCategoryMutationResult
] {
  return useMutation<
    UpdateCategoryMutationResult['data'],
    UpdateCategoryVariables
  >(updateCategoryMutation, {
    variables: { id, categoryAttributes },
    onError,
  });
}

export default useUpdateCategoryMutation;
