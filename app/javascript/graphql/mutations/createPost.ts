import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import PostInput from '../types/postInput';

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

export interface CreatePostMutationResult {
  data?: { post: Partial<Post>, errors: string[] };
  loading: boolean;
}

function useCreatePostMutation(
  postAttributes: PostInput
): CreatePostMutationResult {
  return useQuery(
    createPostMutation, 
    {
      variables: { postAttributes }
    }
  );
}

export default useCreatePostMutation;
