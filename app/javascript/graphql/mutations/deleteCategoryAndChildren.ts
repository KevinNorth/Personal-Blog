import { gql, useQuery } from '@apollo/client';

const deleteCategoryAndChildrenMutation = 
  gql`
    mutation deletCategoryMutation($id: ID!) {
      deleteCategoryAndChildren(input: { id: $id }) {
        errors
        successful
      }
    }
  `;

export interface DeleteCategoryAndChildrenMutationResult {
  data?: { successful: boolean, errors: string[] };
  loading: boolean;
}

function useDeleteCategoryAndChildrenMutation(
  id: string
): DeleteCategoryAndChildrenMutationResult {
  return useQuery(
    deleteCategoryAndChildrenMutation, 
    {
      variables: { id }
    }
  );
}

export default useDeleteCategoryAndChildrenMutation;
