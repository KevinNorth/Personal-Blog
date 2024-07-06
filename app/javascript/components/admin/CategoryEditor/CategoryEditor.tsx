import React from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Placeholder,
  Row,
  ToggleButton,
} from 'react-bootstrap';
import { lazyGetAllCategoriesAndPosts } from '../../../graphql/queries/allPosts';
import Category from '../../../graphql/types/category';
import InvalidIcon from '../../common/InvalidIcon';
import Editor from '../Editor/Editor';
import LoadingEditor from './LoadingEditor';
import validateCategoryForm from './validateCategoryForm';

export interface CategoryEditorProps {
  children: React.ReactNode;
  loading: boolean;
  id: string;
  parentId: string | null;
  markdown: string;
  name: string;
  order: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  onMarkdownChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onParentIdChange: (value: string | null) => void;
  onPublishedChange: (value: boolean) => void;
  onSlugChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
}

export default function CategoryEditor({
  children,
  loading,
  id,
  parentId,
  markdown,
  name,
  order,
  published,
  slug,
  subtitle,
  summary,
  title,
  onMarkdownChange,
  onNameChange,
  onOrderChange,
  onParentIdChange,
  onPublishedChange,
  onSlugChange,
  onSubtitleChange,
  onSummaryChange,
  onTitleChange,
}: CategoryEditorProps): React.ReactElement {
  const [
    getAllCategoriesAndPosts,
    {
      data: allCategoriesData,
      loading: loadingAllCategories,
      called: calledGetAllCategoriesAndPosts,
    },
  ] = lazyGetAllCategoriesAndPosts({ includeUnpublished: true });
  const allCategories =
    calledGetAllCategoriesAndPosts && !loadingAllCategories
      ? (allCategoriesData as { categories: Partial<Category>[] }).categories
      : [];
  const otherCategories =
    loadingAllCategories || !calledGetAllCategoriesAndPosts
      ? []
      : allCategories.filter((c) => c.id !== id);

  if (loading) {
    return <LoadingEditor />;
  }

  if (!calledGetAllCategoriesAndPosts) {
    getAllCategoriesAndPosts();
  }

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

  return (
    <Container fluid className="category-editor">
      <Form>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group category-title"
              controlId="category-title"
            >
              <Form.Label size="lg">Title</Form.Label>
              <Form.Control
                isValid={validationResults.title.isValid}
                isInvalid={!validationResults.title.isValid}
                size="lg"
                type="text"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
              />
              <InvalidIcon
                id="category-title-invalid"
                isInvalid={!validationResults.title.isValid}
                invalidReason={validationResults.title.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group category-subtitle"
              controlId="category-subtitle"
            >
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                isValid={validationResults.subtitle.isValid}
                isInvalid={!validationResults.subtitle.isValid}
                type="text"
                value={subtitle}
                onChange={(event) => onSubtitleChange(event.target.value)}
              />
              <InvalidIcon
                id="category-subtitle-invalid"
                isInvalid={!validationResults.subtitle.isValid}
                invalidReason={validationResults.subtitle.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group category-summary"
              controlId="category-summary"
            >
              <Form.Label>Summary</Form.Label>
              <Form.Control
                isValid={validationResults.summary.isValid}
                isInvalid={!validationResults.summary.isValid}
                type="text"
                value={summary}
                onChange={(event) => onSummaryChange(event.target.value)}
              />
              <InvalidIcon
                id="category-summary-invalid"
                isInvalid={!validationResults.summary.isValid}
                invalidReason={validationResults.summary.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="select-group category-parent"
              controlId="category-parent"
            >
              <Form.Label>Category</Form.Label>
              {loadingAllCategories ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <Form.Select
                    aria-label="Select the category's parent"
                    isValid={validationResults.parentId.isValid}
                    isInvalid={!validationResults.parentId.isValid}
                    value={parentId || ''}
                    onChange={(event) => {
                      const newValue = event.target.value;
                      if (newValue === '') {
                        // This is how we indicate that the category being edited
                        // is a top-level category.
                        onParentIdChange(null);
                      } else {
                        onParentIdChange(newValue);
                      }
                    }}
                  >
                    <option value="">No parent</option>
                    {otherCategories.map((category: Partial<Category>) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  <InvalidIcon
                    id="post-category-invalid"
                    isInvalid={!validationResults.parentId.isValid}
                    invalidReason={validationResults.parentId.invalidReason}
                  />
                </>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group
              className="button-group category-published"
              controlId="category-published"
            >
              <ButtonGroup>
                <ToggleButton
                  key="unpublished"
                  id="category-unpublished-button"
                  type="radio"
                  name="unpublished"
                  value="false"
                  checked={!published}
                  onChange={() => onPublishedChange(false)}
                >
                  Unpublished
                </ToggleButton>
                <ToggleButton
                  key="published"
                  id="category-published-button"
                  type="radio"
                  name="published"
                  value="false"
                  checked={published}
                  onChange={() => onPublishedChange(true)}
                >
                  Published
                </ToggleButton>
              </ButtonGroup>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <FormGroup
              className="text-group category-slug"
              controlId="category-slug"
            >
              <FormLabel>Slug</FormLabel>
              {loadingAllCategories || !calledGetAllCategoriesAndPosts ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <FormControl
                    isValid={validationResults.slug.isValid}
                    isInvalid={!validationResults.slug.isValid}
                    type="text"
                    value={slug}
                    onChange={(event) => onSlugChange(event.target.value)}
                  />
                  <InvalidIcon
                    id="category-slug-invalid"
                    isInvalid={!validationResults.slug.isValid}
                    invalidReason={validationResults.slug.invalidReason}
                  />
                </>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup
              className="text-group category-name"
              controlId="category-name"
            >
              <FormLabel>Name in Navbar</FormLabel>
              <FormControl
                isValid={validationResults.name.isValid}
                isInvalid={!validationResults.name.isValid}
                type="text"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
              />
              <InvalidIcon
                id="category-name-invalid"
                isInvalid={!validationResults.name.isValid}
                invalidReason={validationResults.name.invalidReason}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup
              className="number-group category-order"
              controlId="category-order"
            >
              <FormLabel>Order in Navbar</FormLabel>
              {loadingAllCategories || !calledGetAllCategoriesAndPosts ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <FormControl
                    isValid={validationResults.order.isValid}
                    isInvalid={!validationResults.order.isValid}
                    type="number"
                    value={order}
                    onChange={(event) => onOrderChange(event.target.value)}
                    inputMode="numeric"
                  />
                  <InvalidIcon
                    id="category-order-invalid"
                    isInvalid={!validationResults.order.isValid}
                    invalidReason={validationResults.order.invalidReason}
                  />
                </>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="editor-group category-body"
              controlId="category-body"
            >
              <Editor
                alreadyInsideForm
                markdown={markdown}
                onChange={onMarkdownChange}
                className="category-markdown-editor"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} as="footer">
            {children}
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
