import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { FetchResult } from '@apollo/client';
import useDeleteCategoryAndChildrenMutation, {
  DeleteCategoryAndChildrenMutationResponsePayload,
  DeleteCategoryAndChildrenMutationResult,
} from '../../../graphql/mutations/deleteCategoryAndChildren';
import useUpdateCategoryMutation, {
  UpdateCategoryMutationResponsePayload,
  UpdateCategoryMutationResult,
} from '../../../graphql/mutations/updateCategory';
import getAllCategoriesAndPosts from '../../../graphql/queries/allPosts';
import getCategoryById from '../../../graphql/queries/categoryById';
import Category from '../../../graphql/types/category';
import grabErrorsFromMutationResult from '../../../transforms/grabErrorsFromMutationResult';
import Toastable, { SendToastFunction } from '../../../types/toastable';
import ButtonWithConfirmation from '../../common/ButtonWithConfirmation';
import QueryErrorToast from '../../common/QueryErrorToast';
import SimpleToast from '../../common/SimpleToast';
import CategoryEditor from './CategoryEditor';
import validateCategoryForm from './validateCategoryForm';

function updateCategoryCallback(
  result: FetchResult<UpdateCategoryMutationResult['data']>,
  sendToast: SendToastFunction,
  refetchCategory: () => void
): void {
  const data =
    (result.data as { updateCategory: UpdateCategoryMutationResponsePayload })
      ?.updateCategory ||
    (result.data as UpdateCategoryMutationResponsePayload);

  const errors = grabErrorsFromMutationResult(result, data);

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem updating category." />
    );
    return;
  }

  sendToast(
    <SimpleToast
      header="Success"
      body="Category saved."
      bg="success"
      headerIcon="CheckCircle"
    />
  );

  refetchCategory();
}

function deletePostCallback(
  result: FetchResult<DeleteCategoryAndChildrenMutationResult['data']>,
  sendToast: (toast: React.ReactElement) => void,
  navigate: NavigateFunction
): void {
  const data =
    (
      result.data as {
        deleteCategoryAndChildren: DeleteCategoryAndChildrenMutationResponsePayload;
      }
    )?.deleteCategoryAndChildren ||
    (result.data as DeleteCategoryAndChildrenMutationResponsePayload);

  const errors = grabErrorsFromMutationResult(result, data);

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem deleting category." />
    );
    return;
  }

  navigate('/', {
    state: {
      toast: {
        header: 'Success',
        body: 'Category deleted.',
        bg: 'success',
        icon: 'CheckCircle2',
      },
    },
  });
}

function ExistingCategoryEditor({ sendToast }: Toastable): React.ReactElement {
  const { id } = useParams();

  const {
    data,
    loading,
    refetch: refetchCategory,
  } = getCategoryById({
    id,
    includeUnpublished: true,
  });
  const category = loading ? null : data.categoryById;

  const [hasSetInitialValues, indicateHasSetInitialValues] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('0');
  const [parentId, setParentId] = useState('');

  if (!loading && !hasSetInitialValues) {
    indicateHasSetInitialValues(true);
    setTitle(category.title);
    setSubtitle(category.subtitle);
    setSummary(category.summary);
    setSlug(category.slug);
    setPublished(category.published);
    setMarkdown(category.markdown);
    setName(category.name);
    setOrder(String(category.order));
    setParentId(category.parent?.id || null);
  }

  const navigate = useNavigate();

  const { data: allCategoriesData, loading: loadingAllCategories } =
    getAllCategoriesAndPosts({ includeUnpublished: true });
  const allCategories = !loadingAllCategories
    ? (allCategoriesData as { categories: Partial<Category>[] }).categories
    : [];
  const otherCategories = loadingAllCategories
    ? []
    : allCategories.filter((c) => c.id !== id);

  const [updateCategory, { loading: loadingUpdateCategory }] =
    useUpdateCategoryMutation(
      {
        id,
        categoryAttributes: {
          parentId,
          markdown,
          name,
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
            header="Problem updating category."
          />
        )
    );

  const [deleteCategory, { loading: loadingDeleteCategory }] =
    useDeleteCategoryAndChildrenMutation({ id }, (error) =>
      sendToast(
        <QueryErrorToast
          errors={[error.message]}
          header="Problem deleting category."
        />
      )
    );

  const validationResults = validateCategoryForm({
    markdown,
    name,
    order,
    parentId,
    published,
    slug,
    subtitle,
    summary,
    title,
    otherCategories,
  });

  const isCategoryValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <CategoryEditor
      loading={loading || loadingUpdateCategory || loadingDeleteCategory}
      id={category?.id || ''}
      parentId={parentId}
      markdown={markdown}
      name={name}
      order={order}
      published={published}
      slug={slug}
      subtitle={subtitle}
      summary={summary}
      title={title}
      onMarkdownChange={setMarkdown}
      onNameChange={setName}
      onOrderChange={setOrder}
      onParentIdChange={setParentId}
      onPublishedChange={setPublished}
      onSlugChange={setSlug}
      onSubtitleChange={setSubtitle}
      onSummaryChange={setSummary}
      onTitleChange={setTitle}
    >
      <div>
        <ButtonWithConfirmation
          confirmationButtonProps={{
            disabled: loadingDeleteCategory || loadingUpdateCategory,
          }}
          confirmationButtonText="Delete"
          confirmationPopoverId="delete-category-and-children-confirmation"
          confirmationText="This will delete this category as well as all of its posts and children cateories. Are you sure?"
          outerButtonProps={{
            className: 'delete-button',
            disabled: loadingDeleteCategory || loadingUpdateCategory,
          }}
          outerButtonText="Delete"
          onConfirmationClick={() =>
            deleteCategory({ variables: { id } }).then((result) =>
              deletePostCallback(
                result as FetchResult<
                  DeleteCategoryAndChildrenMutationResult['data']
                >,
                sendToast,
                navigate
              )
            )
          }
        />
        <Button
          disabled={
            !isCategoryValid ||
            loadingAllCategories ||
            loadingDeleteCategory ||
            loadingUpdateCategory
          }
          onClick={() =>
            updateCategory({
              variables: {
                id: id,
                categoryAttributes: {
                  parentId,
                  name,
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
              updateCategoryCallback(
                result as FetchResult<UpdateCategoryMutationResult['data']>,
                sendToast,
                refetchCategory
              )
            )
          }
        >
          Save
        </Button>
      </div>
    </CategoryEditor>
  );
}

export default ExistingCategoryEditor;
