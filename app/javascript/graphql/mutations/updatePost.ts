import { gql, useMutation } from '@apollo/client';
import POST_FRAGMENT from '../fragments/postFragment';
import USER_FRAGMENT from '../fragments/userFragment';
import { MutationOnErrorFunction } from '../types/onErrorFunction';
import Post from '../types/post';
import PostInput from '../types/postInput';
import MutationResult, {
  MutationExecutionFunction,
} from 'graphql/types/mutationResult';

const updatePostMutation = gql`
  mutation updatePostMutation($id: ID!, $postAttributes: PostInput!) {
    updatePost(input: { id: $id, postAttributes: $postAttributes }) {
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

export interface UpdatePostVariables {
  id: string;
  postAttributes: PostInput;
}

export interface UpdatePostMutationResponsePayload {
  post: Partial<Post>;
  errors: string[];
}

export type UpdatePostMutationResult = MutationResult<
  UpdatePostMutationResponsePayload,
  'updatePost'
>;

function useUpdatePostMutation(
  { id, postAttributes }: UpdatePostVariables,
  onError: MutationOnErrorFunction = undefined
): [
  MutationExecutionFunction<
    UpdatePostMutationResult['data'],
    UpdatePostVariables,
    'updatePost'
  >,
  UpdatePostMutationResult
] {
  return useMutation<UpdatePostMutationResult['data'], UpdatePostVariables>(
    updatePostMutation,
    {
      variables: { id, postAttributes },
      onError,
    }
  );
}

export default useUpdatePostMutation;
