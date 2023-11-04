import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import PostInput from '../types/postInput';
import MutationResult, { MutationExecutionFunction } from '../types/mutationResult';

const createPostMutation = 
  gql`
    mutation createPostMutation($postAttributes: PostInput!) {
      createPost(input: { postAttributes: $postAttributes }) {
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

export type CreatePostMutationResult =
  MutationResult<{ post: Partial<Post>, errors: string[] }>;

function useCreatePostMutation(
  postAttributes: PostInput
): [
  MutationExecutionFunction,
  CreatePostMutationResult
] {
  return useMutation(
    createPostMutation, 
    {
      variables: { postAttributes }
    }
  );
}

export default useCreatePostMutation;
