import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FetchResult } from '@apollo/client';
import useCreatePostMutation, {
  CreatePostMutationResponsePayload,
  CreatePostMutationResult,
} from '../../../graphql/mutations/createPost';
import getAllPosts from '../../../graphql/queries/allPosts';
import getPostsByParent from '../../../graphql/queries/postsByParent';
import Post from '../../../graphql/types/post';
import grabErrorsFromMutationResult from '../../../transforms/grabErrorsFromMutationResult';
import Toastable, { SendToastFunction } from '../../../types/toastable';
import QueryErrorToast from '../../common/QueryErrorToast';
import PostEditor from './PostEditor';
import validatePostForm from './validatePostForm';

function createPostCallback(
  result: FetchResult<CreatePostMutationResult['data']>,
  sendToast: SendToastFunction,
  navigate: NavigateFunction
): void {
  const data =
    (result.data as { createPost: CreatePostMutationResponsePayload })
      ?.createPost || (result.data as CreatePostMutationResponsePayload);

  const errors = grabErrorsFromMutationResult(result, data);

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem creating post." />
    );
    return;
  }

  const { id } = data.post;

  navigate(`/post/${encodeURIComponent(id)}`, {
    state: {
      toast: {
        header: 'Success',
        body: 'Post saved.',
        bg: 'success',
        headerIcon: 'CheckCircle',
      },
    },
  });
}

function NewPostEditor({ sendToast }: Toastable): React.ReactElement {
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(null);
  const [published, setPublished] = useState(false);
  const [order, setOrder] = useState('0');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const { data: allPostsData, loading: loadingAllPosts } = getAllPosts({
    includeUnpublished: true,
  });

  const allPosts = !loadingAllPosts
    ? (allPostsData as { posts: Partial<Post>[] }).posts
    : [];

  const { data: postsByParentData, refetch: refetchPostsByParent } =
    getPostsByParent({ parentId, includeUnpublished: true });
  const siblingPosts =
    (postsByParentData as { postsByParent: Partial<Post>[] })?.postsByParent ||
    [];

  const [createPost, { loading: loadingCreatePost }] = useCreatePostMutation(
    {
      postAttributes: {
        name,
        markdown,
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
          header="Problem creating post."
        />
      )
  );

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
    siblingPosts,
    allPosts: allPosts,
  });

  const isPostValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <PostEditor
      loading={false}
      id={''}
      markdown={markdown}
      order={order}
      name={name}
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
        refetchPostsByParent({
          parentId: newParentId,
          includeUnpublished: true,
        });
      }}
      onPublishedChange={setPublished}
      onSlugChange={setSlug}
      onSubtitleChange={setSubtitle}
      onSummaryChange={setSummary}
      onTitleChange={setTitle}
    >
      <div>
        <Button
          disabled={!isPostValid || loadingAllPosts || loadingCreatePost}
          onClick={() =>
            createPost({
              variables: {
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
              createPostCallback(
                result as FetchResult<CreatePostMutationResult['data']>,
                sendToast,
                navigate
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

export default NewPostEditor;
