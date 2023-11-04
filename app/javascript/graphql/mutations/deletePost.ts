import { gql, useMutation } from '@apollo/client';
import MutationResult, { MutationExecutionFunction } from '../types/mutationResult';

const deletePostMutation = 
  gql`
    mutation deletPostMutation($id: ID!) {
      deletePost(input: { id: $id }) {
        errors
        successful
      }
    }
  `;

export type DeletePostMutationResult =
  MutationResult<{ successful: boolean, errors: string[] }>;

function useDeletePostMutation(
  id: string
): [
  MutationExecutionFunction,
  DeletePostMutationResult
] {
  return useMutation(
    deletePostMutation, 
    {
      variables: { id }
    }
  );
}

export default useDeletePostMutation;
