import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FetchResult } from '@apollo/client';
import useCreatePostMutation, {
  CreatePostMutationResponsePayload,
  CreatePostMutationResult,
} from '../../../graphql/mutations/createPost';
import getAllCategoriesAndPosts from '../../../graphql/queries/allCategoriesAndPosts';
import getPostsByCategory from '../../../graphql/queries/postsByCategory';
import Category from '../../../graphql/types/category';
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
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [order, setOrder] = useState('0');
  const [categoryId, setCategoryId] = useState(null);

  const navigate = useNavigate();

  const { data: allCategoriesData, loading: loadingAllCategories } =
    getAllCategoriesAndPosts({
      includeUnpublished: true,
    });

  const allCategories = !loadingAllCategories
    ? (allCategoriesData as { categories: Partial<Category>[] }).categories
    : [];

  const { data: postsByCategoryData, refetch: refetchPostsByCategory } =
    getPostsByCategory({ categoryId, includeUnpublished: true });
  const siblingPosts =
    (postsByCategoryData as { postsByCategory: Partial<Post>[] })
      ?.postsByCategory || [];

  const [createPost, { loading: loadingCreatePost }] = useCreatePostMutation(
    {
      postAttributes: {
        categoryId,
        markdown,
        order: Number(order),
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
    categoryId,
    markdown,
    order,
    published,
    slug,
    subtitle,
    summary,
    title,
    siblingPosts,
    allCategories,
  });

  const isPostValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <PostEditor
      loading={false}
      id={''}
      categoryId={categoryId}
      markdown={markdown}
      order={order}
      published={published}
      slug={slug}
      subtitle={subtitle}
      summary={summary}
      title={title}
      onCategoryIdChange={(newCategoryId) => {
        setCategoryId(newCategoryId);
        refetchPostsByCategory({
          categoryId: newCategoryId,
          includeUnpublished: true,
        });
      }}
      onMarkdownChange={setMarkdown}
      onOrderChange={setOrder}
      onPublishedChange={setPublished}
      onSlugChange={setSlug}
      onSubtitleChange={setSubtitle}
      onSummaryChange={setSummary}
      onTitleChange={setTitle}
    >
      <div>
        <Button
          disabled={!isPostValid || loadingAllCategories || loadingCreatePost}
          onClick={() =>
            createPost({
              variables: {
                postAttributes: {
                  categoryId,
                  markdown,
                  order: Number(order),
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
