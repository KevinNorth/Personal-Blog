import { gql, useMutation } from '@apollo/client';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import { MutationOnErrorFunction } from '../types/onErrorFunction';

const deletePostAndChildrenMutation = gql`
  mutation deletPostMutation($id: ID!) {
    deletePostAndChildren(input: { id: $id }) {
      errors
      successful
    }
  }
`;

export interface DeletePostAndChildrenVariables {
  id: string;
}

export interface DeletePostAndChildrenMutationResponsePayload {
  successful: boolean;
  errors: string[];
}

export type DeletePostAndChildrenMutationResult = MutationResult<
  DeletePostAndChildrenMutationResponsePayload,
  'deletePost'
>;

function useDeletePostAndChildrenMutation(
  { id }: DeletePostAndChildrenVariables,
  onError: MutationOnErrorFunction = undefined
): [
  MutationExecutionFunction<
    DeletePostAndChildrenMutationResult['data'],
    DeletePostAndChildrenVariables,
    'deletePost'
  >,
  DeletePostAndChildrenMutationResult
] {
  return useMutation<
    DeletePostAndChildrenMutationResult['data'],
    DeletePostAndChildrenVariables
  >(deletePostAndChildrenMutation, {
    variables: { id },
    onError,
  });
}

export default useDeletePostAndChildrenMutation;
