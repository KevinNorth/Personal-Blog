import React, { useState } from 'react';
import { Accordion, Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { FetchResult } from '@apollo/client';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
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

function MutationErrorToast({
  header,
  bodyPreamble = 'The messages from the server are:',
  errors,
}: {
  header: string;
  bodyPreamble?: string;
  errors: string[];
}): React.ReactElement {
  return (
    <Toast>
      <Toast.Header>{header}</Toast.Header>
      <Toast.Body>
        <p>{bodyPreamble}</p>
        <Accordion>
          {errors.map((error, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>Error {index + 1}</Accordion.Header>
              <Accordion.Body>
                <code>{error}</code>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Toast.Body>
    </Toast>
  );
}

function updateCategoryCallback(
  result: FetchResult<UpdateCategoryMutationResult['data']>,
  sendToast: (toast: React.ReactElement) => void,
  navigate: NavigateFunction
): void {
  let errors: string[] = [];

  if (result.errors && result.errors.length > 0) {
    errors = result.errors.map((error) => error.message);
  } else if (result.data?.errors && result.data?.errors.length > 0) {
    errors = result.data?.errors;
  }

  if (errors.length > 0) {
    sendToast(
      <MutationErrorToast errors={errors} header="Problem updating category." />
    );
  }

  navigate(`/category/${encodeURIComponent(result.data?.category?.id)}`, {
    state: { toast: { header: 'Success', body: 'category saved.' } },
  });
}

function deletePostCallback(
  result: FetchResult<DeleteCategoryAndChildrenMutationResult['data']>,
  sendToast: (toast: React.ReactElement) => void,
  navigate: NavigateFunction
): void {
  let errors: string[] = [];

  if (result.errors && result.errors.length > 0) {
    errors = result.errors.map((error) => error.message);
  } else if (result.data?.errors && result.data?.errors.length > 0) {
    errors = result.data?.errors;
  }

  if (errors.length > 0) {
    sendToast(
      <MutationErrorToast errors={errors} header="Problem deleting category." />
    );
  }

  navigate('/', {
    state: { toast: { header: 'Success', body: 'Category deleted.' } },
  });
}

export interface ExistingCategoryEditorProps {
  sendToast: (toast: React.ReactElement) => void;
}

function ExistingCategoryEditor({
  sendToast,
}: ExistingCategoryEditorProps): React.ReactElement {
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
    useUpdateCategoryMutation({
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

  const [deleteCategory, { loading: loadingDeleteCategory }] =
    useDeleteCategoryAndChildrenMutation({ id });

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
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ButtonWithConfirmation
            confirmationButtonProps={{
              disabled: loadingDeleteCategory || loadingUpdateCategory,
            }}
            confirmationButtonText="Delete"
            confirmationPopoverId="delete-category-and-children-confirmation"
            confirmationText="This will delete this category as well as all of its posts and children cateories. Are you sure?"
            outerButtonProps={{
              disabled: loadingDeleteCategory || loadingUpdateCategory,
            }}
            outerButtonText="Delete"
            onConfirmationClick={() =>
              deleteCategory({ variables: { id } }).then((result) =>
                deletePostCallback(result, sendToast, navigate)
              )
            }
          />
          <Spacer indent="15px" />
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
                updateCategoryCallback(result, sendToast, navigate)
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

export default ExistingCategoryEditor;
