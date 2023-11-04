import { gql, useMutation } from '@apollo/client';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';

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

export type DeleteCategoryAndChildrenMutationResult = MutationResult<{
  successful: boolean;
  errors: string[];
}>;

function useDeleteCategoryAndChildrenMutation({
  id,
}: DeleteCategoryAndChildrenVariables): [
  MutationExecutionFunction<
    DeleteCategoryAndChildrenMutationResult['data'],
    DeleteCategoryAndChildrenVariables
  >,
  DeleteCategoryAndChildrenMutationResult
] {
  return useMutation<
    DeleteCategoryAndChildrenMutationResult['data'],
    DeleteCategoryAndChildrenVariables
  >(deleteCategoryAndChildrenMutation, {
    variables: { id },
  });
}

export default useDeleteCategoryAndChildrenMutation;
