import { gql, useMutation } from '@apollo/client';
import MutationResult, { MutationExecutionFunction } from '../types/mutationResult';

const deleteCategoryAndChildrenMutation = 
  gql`
    mutation deletCategoryMutation($id: ID!) {
      deleteCategoryAndChildren(input: { id: $id }) {
        errors
        successful
      }
    }
  `;

export type DeleteCategoryAndChildrenMutationResult =
  MutationResult<{ successful: boolean, errors: string[] }>;

function useDeleteCategoryAndChildrenMutation(
  id: string
): [
  MutationExecutionFunction,
  DeleteCategoryAndChildrenMutationResult
] {
  return useMutation(
    deleteCategoryAndChildrenMutation, 
    {
      variables: { id }
    }
  );
}

export default useDeleteCategoryAndChildrenMutation;
