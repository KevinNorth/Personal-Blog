import { gql, useQuery } from '@apollo/client';

const deletePostMutation = 
  gql`
    mutation deletPostMutation($id: ID!) {
      deletePost(input: { id: $id }) {
        errors
        successful
      }
    }
  `;

export interface DeletePostMutationResult {
  data?: { successful: boolean, errors: string[] };
  loading: boolean;
}

function useDeletePostMutation(
  id: string
): DeletePostMutationResult {
  return useQuery(
    deletePostMutation, 
    {
      variables: { id }
    }
  );
}

export default useDeletePostMutation;
