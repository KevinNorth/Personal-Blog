import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { FetchResult } from '@apollo/client';
import useDeletePostAndChildren, {
  DeletePostAndChildrenMutationResponsePayload,
  DeletePostAndChildrenMutationResult,
} from '../../../graphql/mutations/deletePostAndChildren';
import useUpdatePostMutation, {
  UpdatePostMutationResponsePayload,
  UpdatePostMutationResult,
} from '../../../graphql/mutations/updatePost';
import getAllPosts from '../../../graphql/queries/allPosts';
import getPostById from '../../../graphql/queries/postById';
import { lazyGetPostsByParent } from '../../../graphql/queries/postsByParent';
import Post from '../../../graphql/types/post';
import grabErrorsFromMutationResult from '../../../transforms/grabErrorsFromMutationResult';
import Toastable, { SendToastFunction } from '../../../types/toastable';
import ButtonWithConfirmation from '../../common/ButtonWithConfirmation';
import QueryErrorToast from '../../common/QueryErrorToast';
import SimpleToast from '../../common/SimpleToast';
import PostEditor from './PostEditor';
import validatePostForm from './validatePostForm';

function updatePostCallback(
  result: FetchResult<UpdatePostMutationResult['data']>,
  sendToast: SendToastFunction,
  refetchPost: () => void
): void {
  const data =
    (result.data as { updatePost: UpdatePostMutationResponsePayload })
      ?.updatePost || (result.data as UpdatePostMutationResponsePayload);

  const errors = grabErrorsFromMutationResult(result, data);

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem updating post." />
    );
    return;
  }

  sendToast(
    <SimpleToast
      header="Success"
      body="Post saved."
      bg="success"
      headerIcon="CheckCircle"
    />
  );

  refetchPost();
}

function deletePostCallback(
  result: FetchResult<DeletePostAndChildrenMutationResult['data']>,
  sendToast: (toast: React.ReactElement) => void,
  navigate: NavigateFunction
): void {
  const data =
    (
      result.data as {
        deletePostAndChildren: DeletePostAndChildrenMutationResponsePayload;
      }
    )?.deletePostAndChildren ||
    (result.data as DeletePostAndChildrenMutationResponsePayload);

  const errors = grabErrorsFromMutationResult(result, data);

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem deleting post." />
    );
    return;
  }

  navigate('/', {
    state: {
      toast: {
        header: 'Success',
        body: 'Post deleted.',
        bg: 'success',
        icon: 'CheckCircle2',
      },
    },
  });
}

function ExistingPostEditor({ sendToast }: Toastable): React.ReactElement {
  const { id } = useParams();

  const {
    data,
    loading,
    refetch: refetchPost,
  } = getPostById({
    id,
    includeUnpublished: true,
  });
  const post = loading ? null : data.postById;

  const [hasSetInitialValues, indicateHasSetInitialValues] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('0');
  const [parentId, setParentId] = useState('');
  const [published, setPublished] = useState(false);
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const { data: allPostsData, loading: loadingAllPosts } = getAllPosts({
    includeUnpublished: true,
  });
  const allPosts = !loadingAllPosts
    ? (allPostsData as { allPosts: Partial<Post>[] }).allPosts
    : [];

  const [
    getPostsByParent,
    {
      data: postsByParentData,
      loading: loadingSiblingPosts,
      called: calledGetPostsByParent,
    },
  ] = lazyGetPostsByParent({ parentId, includeUnpublished: true });
  const siblingPosts =
    calledGetPostsByParent && !loadingSiblingPosts
      ? (postsByParentData as { postsByParent: Partial<Post>[] }).postsByParent
      : [];
  const otherSiblingPosts =
    loadingSiblingPosts || !calledGetPostsByParent
      ? []
      : siblingPosts.filter((p) => p.id !== id);

  const [updatePost, { loading: loadingUpdatePost }] = useUpdatePostMutation(
    {
      id,
      postAttributes: {
        markdown,
        name,
        order: Number(order),
        parentId,
        published,
        slug,
        subtitle,
        summary,
        title,
      },
    },
    (error) =>
      sendToast(
        <QueryErrorToast
          errors={[error.message]}
          header="Problem updating post."
        />
      )
  );

  const [deletePost, { loading: loadingDeletePost }] = useDeletePostAndChildren(
    { id },
    (error) =>
      sendToast(
        <QueryErrorToast
          errors={[error.message]}
          header="Problem deleting post."
        />
      )
  );

  if (!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    getPostsByParent({
      variables: { parentId: post.parent?.id, includeUnpublished: true },
    });
    setTitle(post.title);
    setSubtitle(post.subtitle);
    setName(post.name);
    setSummary(post.summary);
    setSlug(post.slug);
    setPublished(post.published);
    setMarkdown(post.markdown);
    setOrder(String(post.order));
    setParentId(post.parent?.id || null);
  }

  const validationResults = validatePostForm({
    markdown,
    name,
    order,
    parentId,
    published,
    slug,
    subtitle,
    summary,
    title,
    siblingPosts: otherSiblingPosts,
    allPosts: allPosts,
  });

  const isPostValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <PostEditor
      loading={loading || loadingUpdatePost || loadingDeletePost}
      id={post?.id || ''}
      markdown={markdown}
      name={name}
      order={order}
      parentId={parentId}
      published={published}
      slug={slug}
      subtitle={subtitle}
      summary={summary}
      title={title}
      onMarkdownChange={setMarkdown}
      onNameChange={setName}
      onOrderChange={setOrder}
      onParentIdChange={(newParentId) => {
        setParentId(newParentId);
        getPostsByParent({
          variables: {
            newParentId,
            includeUnpublished: true,
          },
        });
      }}
      onPublishedChange={setPublished}
      onSlugChange={setSlug}
      onSubtitleChange={setSubtitle}
      onSummaryChange={setSummary}
      onTitleChange={setTitle}
    >
      <div>
        <ButtonWithConfirmation
          confirmationButtonProps={{
            disabled: loadingDeletePost || loadingUpdatePost,
          }}
          confirmationButtonText="Delete"
          confirmationPopoverId="delete-post-and-children-confirmation"
          confirmationText="This will delete this post. Are you sure?"
          outerButtonProps={{
            className: 'delete-button',
            disabled: loadingDeletePost || loadingUpdatePost,
          }}
          outerButtonText="Delete"
          onConfirmationClick={() =>
            deletePost({ variables: { id } }).then((result) =>
              deletePostCallback(
                result as FetchResult<
                  DeletePostAndChildrenMutationResult['data']
                >,
                sendToast,
                navigate
              )
            )
          }
        />
        <Button
          disabled={
            !isPostValid ||
            loadingAllPosts ||
            loadingDeletePost ||
            loadingUpdatePost
          }
          onClick={() =>
            updatePost({
              variables: {
                id: id,
                postAttributes: {
                  markdown,
                  name,
                  order: Number(order),
                  parentId,
                  published,
                  slug,
                  subtitle,
                  summary,
                  title,
                },
              },
            }).then((result) =>
              updatePostCallback(
                result as FetchResult<UpdatePostMutationResult['data']>,
                sendToast,
                refetchPost
              )
            )
          }
        >
          Save
        </Button>
      </div>
    </PostEditor>
  );
}

export default ExistingPostEditor;
