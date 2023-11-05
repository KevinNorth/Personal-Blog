import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useCreateCategoryMutation, {
  CreateCategoryMutationResponsePayload,
  CreateCategoryMutationResult,
} from '../../../graphql/mutations/createCategory';
import getAllCategoriesAndPosts from '../../../graphql/queries/allCategoriesAndPosts';
import Category from '../../../graphql/types/category';
import Toastable, { SendToastFunction } from '../../../types/toastable';
import QueryErrorToast from '../../common/QueryErrorToast';
import CategoryEditor from './CategoryEditor';
import validateCategoryForm from './validateCategoryForm';
import { FetchResult } from '@apollo/client';

function createCategoryCallback(
  result: FetchResult<CreateCategoryMutationResult['data']>,
  sendToast: SendToastFunction,
  navigate: NavigateFunction
): void {
  let errors: string[] = [];
  const data =
    (result.data as { createCategory: CreateCategoryMutationResponsePayload })
      ?.createCategory ||
    (result.data as CreateCategoryMutationResponsePayload);

  if (result.errors && result.errors.length > 0) {
    errors = result.errors.map((error) => error.message);
  } else if (data?.errors && data?.errors.length > 0) {
    errors = data?.errors;
  }

  if (errors.length > 0) {
    sendToast(
      <QueryErrorToast errors={errors} header="Problem creating category." />
    );
    return;
  }

  const { id } = data.category;

  navigate(`/category/${encodeURIComponent(id)}`, {
    state: {
      toast: {
        header: 'Success',
        body: 'Category saved.',
        bg: 'success',
        headerIcon: 'CheckCircle',
      },
    },
  });
}

function NewCategoryEditor({ sendToast }: Toastable): React.ReactElement {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [summary, setSummary] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);
  const [markdown, setMarkdown] = useState('');
  const [name, setName] = useState('');
  const [order, setOrder] = useState('0');
  const [parentId, setParentId] = useState(null);

  const navigate = useNavigate();

  const { data: allCategoriesData, loading: loadingAllCategories } =
    getAllCategoriesAndPosts({
      includeUnpublished: true,
    });

  const allCategories = !loadingAllCategories
    ? (allCategoriesData as { categories: Partial<Category>[] }).categories
    : [];

  const [createCategory, { loading: loadingCreateCategory }] =
    useCreateCategoryMutation({
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
    otherCategories: allCategories,
  });

  const isCategoryValid = Object.values(validationResults).every(
    (validation) => validation.isValid
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <CategoryEditor
            loading={false}
            id={''}
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
          <Button
            disabled={
              !isCategoryValid || loadingAllCategories || loadingCreateCategory
            }
            onClick={() =>
              createCategory({
                variables: {
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
                createCategoryCallback(
                  result as FetchResult<CreateCategoryMutationResult['data']>,
                  sendToast,
                  navigate
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

export default NewCategoryEditor;
