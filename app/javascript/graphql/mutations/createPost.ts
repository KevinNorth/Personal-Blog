import { gql, useMutation } from '@apollo/client';
import CATEGORY_FRAGMENT from '../fragments/categoryFragment';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import Post from '../types/post';
import PostInput from '../types/postInput';

const createPostMutation = gql`
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

export interface CreatePostVariables {
  postAttributes: PostInput;
}

export interface CreatePostMutationResponsePayload {
  post: Partial<Post>;
  errors: string[];
}

export type CreatePostMutationResult = MutationResult<
  CreatePostMutationResponsePayload,
  'createPost'
>;

function useCreatePostMutation({
  postAttributes,
}: CreatePostVariables): [
  MutationExecutionFunction<
    CreatePostMutationResult['data'],
    CreatePostVariables,
    'createPost'
  >,
  CreatePostMutationResult
] {
  return useMutation<CreatePostMutationResult['data'], CreatePostVariables>(
    createPostMutation,
    {
      variables: { postAttributes },
    }
  );
}

export default useCreatePostMutation;
