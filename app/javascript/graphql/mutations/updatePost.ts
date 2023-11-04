import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import PostInput from '../types/postInput';
import MutationResult, { MutationExecutionFunction } from 'graphql/types/mutationResult';

const updatePostMutation = 
  gql`
    mutation updatePostMutation($id: ID!, $postAttributes: PostInput!) {
      updatePost(input: { id: $id, postAttributes: $postAttributes }) {
        errors
        post {
          ...PostFragment
          author {
            ...UserFragment
          }
          category {
            ...CategoryFragment
            parent {
              id
            }
            children {
              id
            }
          }
        }
      }
    }
    ${CATEGORY_FRAGMENT}
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

export type UpdatePostMutationResult =
  MutationResult<{ post: Partial<Post>, errors: string[] }>;

function useUpdatePostMutation(
  id: string,
  postAttributes: PostInput
): [
    MutationExecutionFunction,
    UpdatePostMutationResult
  ] {
  return useMutation(
    updatePostMutation, 
    {
      variables: { id, postAttributes }
    }
  );
}

export default useUpdatePostMutation;
