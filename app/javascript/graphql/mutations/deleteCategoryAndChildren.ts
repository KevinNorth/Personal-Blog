import { gql, useMutation } from '@apollo/client';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import { MutationOnErrorFunction } from '../types/onErrorFunction';

const deleteCategoryAndChildrenMutation = gql`
  mutation deletCategoryMutation($id: ID!) {
    deleteCategoryAndChildren(input: { id: $id }) {
      errors
      successful
    }
  }
`;

export interface DeleteCategoryAndChildrenVariables {
  id: string;
}

export interface DeleteCategoryAndChildrenMutationResponsePayload {
  successful: boolean;
  errors: string[];
}

export type DeleteCategoryAndChildrenMutationResult = MutationResult<
  DeleteCategoryAndChildrenMutationResponsePayload,
  'deleteCategoryAndChildren'
>;

function useDeleteCategoryAndChildrenMutation(
  { id }: DeleteCategoryAndChildrenVariables,
  onError: MutationOnErrorFunction = undefined
): [
  MutationExecutionFunction<
    DeleteCategoryAndChildrenMutationResult['data'],
    DeleteCategoryAndChildrenVariables,
    'deleteCategoryAndChildren'
  >,
  DeleteCategoryAndChildrenMutationResult
] {
  return useMutation<
    DeleteCategoryAndChildrenMutationResult['data'],
    DeleteCategoryAndChildrenVariables
  >(deleteCategoryAndChildrenMutation, {
    variables: { id },
    onError,
  });
}

export default useDeleteCategoryAndChildrenMutation;
