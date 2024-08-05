import { gql, useMutation } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import MutationResult, {
  MutationExecutionFunction,
} from '../types/mutationResult';
import { MutationOnErrorFunction } from '../types/onErrorFunction';
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
        parent {
          id
          children {
            id
          }
        }
        children {
          ...PostFragment
          author {
            ...UserFragment
          }
        }
        author {
          ...UserFragment
        }
      }
    }
  }
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

function useCreatePostMutation(
  { postAttributes }: CreatePostVariables,
  onError: MutationOnErrorFunction = undefined
): [
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
      onError,
    }
  );
}

export default useCreatePostMutation;
