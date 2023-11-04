import { gql, useMutation } from '@apollo/client';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';

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

export type DeletePostMutationResult = MutationResult<{
  successful: boolean;
  errors: string[];
}>;

function useDeletePostMutation({
  id,
}: DeletePostVariables): [
  MutationExecutionFunction<
    DeletePostMutationResult['data'],
    DeletePostVariables
  >,
  DeletePostMutationResult
] {
  return useMutation<DeletePostMutationResult['data'], DeletePostVariables>(
    deletePostMutation,
    {
      variables: { id },
    }
  );
}

export default useDeletePostMutation;
