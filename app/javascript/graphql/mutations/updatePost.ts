import { gql, useQuery } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import Post from '../types/post';
import PostInput from '../types/postInput';

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

export interface UpdatePostMutationResult {
  data?: { post: Partial<Post>, errors: string[] };
  loading: boolean;
}

function useUpdatePostMutation(
  id: string,
  postAttributes: PostInput
): UpdatePostMutationResult {
  return useQuery(
    updatePostMutation, 
    {
      variables: { id, postAttributes }
    }
  );
}

export default useUpdatePostMutation;
