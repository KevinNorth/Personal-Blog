import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FetchResult } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ButtonWithConfirmation from '../../common/ButtonWithConfirmation';
import Category from '../../../graphql/types/category';
import CategoryEditor from './CategoryEditor';
import getAllCategoriesAndPosts from 'graphql/queries/allCategoriesAndPosts';
import getCategoryById from '../../../graphql/queries/categoryById';
import Spacer from 'components/common/Spacer';
import useUpdateCategoryMutation, {
  UpdateCategoryMutationResult,
} from '../../../graphql/mutations/updateCategory';
import useDeleteCategoryAndChildrenMutation, {
  DeleteCategoryAndChildrenMutationResult,
} from 'graphql/mutations/deleteCategoryAndChildren';
import validateCategoryForm from './validateCategoryForm';

function updateCategoryCallback(
  result: FetchResult<UpdateCategoryMutationResult['data']>
): void {}

function deletePostCallback(
  result: FetchResult<DeleteCategoryAndChildrenMutationResult['data']>
): void {}

function ExistingCategoryEditor(): React.ReactElement {
  const { id } = useParams();

  const { data, loading } = getCategoryById({ id, includeUnpublished: true });
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

  const { data: allCategoriesData, loading: loadingAllCategories } =
    getAllCategoriesAndPosts({ includeUnpublished: true });
  const allCategories = !loadingAllCategories
    ? (allCategoriesData as { categories: Partial<Category>[] }).categories
    : [];
  const otherCategories = loadingAllCategories
    ? []
    : allCategories.filter((c) => c.id !== id);

  const [
    updateCategory,
    {
      data: updatedCategoryData,
      loading: updateCategoryLoading,
      called: updateCategoryCalled,
    },
  ] = useUpdateCategoryMutation({
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
  });

  const [
    deleteCategory,
    {
      data: deleteCategoryResult,
      loading: deleteCategoryLoading,
      called: deleteCategoryCalled,
    },
  ] = useDeleteCategoryAndChildrenMutation({ id });

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
    <Container fluid>
      <Row>
        <Col xs={12}>
          <CategoryEditor
            loading={loading || updateCategoryLoading || deleteCategoryLoading}
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
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ButtonWithConfirmation
            confirmationButtonText="Delete"
            confirmationPopoverId="delete-category-and-children-confirmation"
            confirmationText="This will delete this category and also all of its posts and children cateories. Are you sure?"
            outerButtonText="Delete"
            onConfirmationClick={() =>
              deleteCategory().then(deletePostCallback)
            }
          />
          <Spacer indent="15px" />
          <Button
            disabled={loadingAllCategories || !isCategoryValid}
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
              }).then(updateCategoryCallback)
            }
          >
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ExistingCategoryEditor;
