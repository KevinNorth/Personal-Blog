import { gql, useMutation } from '@apollo/client';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import { MutationOnErrorFunction } from '../types/onErrorFunction';

const deletePostMutation = gql`
  mutation deletPostMutation($id: ID!) {
    deletePost(input: { id: $id }) {
      errors
      successful
    }
  }
`;

export interface DeletePostVariables {
  id: string;
}

export interface DeletePostMutationResponsePayload {
  successful: boolean;
  errors: string[];
}

export type DeletePostMutationResult = MutationResult<
  DeletePostMutationResponsePayload,
  'deletePost'
>;

function useDeletePostMutation(
  { id }: DeletePostVariables,
  onError: MutationOnErrorFunction = undefined
): [
  MutationExecutionFunction<
    DeletePostMutationResult['data'],
    DeletePostVariables,
    'deletePost'
  >,
  DeletePostMutationResult
] {
  return useMutation<DeletePostMutationResult['data'], DeletePostVariables>(
    deletePostMutation,
    {
      variables: { id },
      onError,
    }
  );
}

export default useDeletePostMutation;
