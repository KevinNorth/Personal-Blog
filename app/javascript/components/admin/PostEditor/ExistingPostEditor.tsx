import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import useDeletePost, {
  DeletePostMutationResponsePayload,
  DeletePostMutationResult,
} from '../../../graphql/mutations/deletePost';
import useUpdatePostMutation, {
  UpdatePostMutationResponsePayload,
  UpdatePostMutationResult,
} from '../../../graphql/mutations/updatePost';
import getAllCategoriesAndPosts from '../../../graphql/queries/allCategoriesAndPosts';
import getPostById from '../../../graphql/queries/postById';
import { lazyGetPostsByCategory } from '../../../graphql/queries/postsByCategory';
import Category from '../../../graphql/types/category';
import Post from '../../../graphql/types/post';
import Toastable, { SendToastFunction } from '../../../types/toastable';
import ButtonWithConfirmation from '../../common/ButtonWithConfirmation';
import QueryErrorToast from '../../common/QueryErrorToast';
import SimpleToast from '../../common/SimpleToast';
import Spacer from '../../common/Spacer';
import PostEditor from './PostEditor';
import validatePostForm from './validatePostForm';
import { FetchResult } from '@apollo/client';

function updatePostCallback(
  result: FetchResult<UpdatePostMutationResult['data']>,
  sendToast: SendToastFunction,
  refetchPost: () => void
): void {
  let errors: string[] = [];
  const data =
    (result.data as { updatePost: UpdatePostMutationResponsePayload })
      ?.updatePost || (result.data as UpdatePostMutationResponsePayload);

  if (result.errors && result.errors.length > 0) {
    errors = result.errors.map((error) => error.message);
  } else if (data?.errors && data?.errors.length > 0) {
    errors = data?.errors;
  }

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
  result: FetchResult<DeletePostMutationResult['data']>,
  sendToast: (toast: React.ReactElement) => void,
  navigate: NavigateFunction
): void {
  let errors: string[] = [];
  const data =
    (
      result.data as {
        deletePost: DeletePostMutationResponsePayload;
      }
    )?.deletePost || (result.data as DeletePostMutationResponsePayload);

  if (result.errors && result.errors.length > 0) {
    errors = result.errors.map((error) => error.message);
  } else if (data?.errors && data?.errors.length > 0) {
    errors = data?.errors;
  }

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
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [order, setOrder] = useState('0');
  const [categoryId, setCategoryId] = useState('');

  const navigate = useNavigate();

  const { data: allCategoriesData, loading: loadingAllCategories } =
    getAllCategoriesAndPosts({ includeUnpublished: true });
  const allCategories = !loadingAllCategories
    ? (allCategoriesData as { categories: Partial<Category>[] }).categories
    : [];

  const [
    getPostsByCategory,
    {
      data: postsByCategoryData,
      loading: loadingSiblingPosts,
      called: calledGetPostsByCategory,
    },
  ] = lazyGetPostsByCategory({ categoryId, includeUnpublished: true });
  const siblingPosts =
    calledGetPostsByCategory && !loadingSiblingPosts
      ? (postsByCategoryData as { postsByCategory: Partial<Post>[] })
        .postsByCategory
      : [];
  const otherSiblingPosts =
    loadingSiblingPosts || !calledGetPostsByCategory
      ? []
      : siblingPosts.filter((p) => p.id !== id);

  const [updatePost, { loading: loadingUpdatePost }] = useUpdatePostMutation({
    id,
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
  });

  const [deletePost, { loading: loadingDeletePost }] = useDeletePost({ id });

  if (!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    getPostsByCategory({
      variables: { categoryId: post.category?.id, includeUnpublished: true },
    });
    setTitle(post.title);
    setSubtitle(post.subtitle);
    setSummary(post.summary);
    setSlug(post.slug);
    setPublished(post.published);
    setMarkdown(post.markdown);
    setOrder(String(post.order));
    setCategoryId(post.category?.id || null);
  }

  const validationResults = validatePostForm({
    markdown,
    order,
    categoryId,
    published,
    slug,
    subtitle,
    summary,
    title,
    siblingPosts: otherSiblingPosts,
    allCategories: allCategories,
  });

  const isPostValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <PostEditor
            loading={loading || loadingUpdatePost || loadingDeletePost}
            id={post?.id || ''}
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
              getPostsByCategory({
                variables: {
                  categoryId: newCategoryId,
                  includeUnpublished: true,
                },
              });
            }}
            onMarkdownChange={setMarkdown}
            onOrderChange={setOrder}
            onPublishedChange={setPublished}
            onSlugChange={setSlug}
            onSubtitleChange={setSubtitle}
            onSummaryChange={setSummary}
            onTitleChange={setTitle}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ButtonWithConfirmation
            confirmationButtonProps={{
              disabled: loadingDeletePost || loadingUpdatePost,
            }}
            confirmationButtonText="Delete"
            confirmationPopoverId="delete-post-confirmation"
            confirmationText="This will delete this post. Are you sure?"
            outerButtonProps={{
              disabled: loadingDeletePost || loadingUpdatePost,
            }}
            outerButtonText="Delete"
            onConfirmationClick={() =>
              deletePost({ variables: { id } }).then((result) =>
                deletePostCallback(
                  result as FetchResult<DeletePostMutationResult['data']>,
                  sendToast,
                  navigate
                )
              )
            }
          />
          <Spacer indent="15px" />
          <Button
            disabled={
              !isPostValid ||
              loadingAllCategories ||
              loadingDeletePost ||
              loadingUpdatePost
            }
            onClick={() =>
              updatePost({
                variables: {
                  id: id,
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
        </Col>
      </Row>
    </Container>
  );
}

export default ExistingPostEditor;
