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
import { lazyGetAllCategoriesAndPosts } from '../../../graphql/queries/allCategoriesAndPosts';
import { lazyGetPostsByCategory } from '../../../graphql/queries/postsByCategory';
import Category from '../../../graphql/types/category';
import Post from '../../../graphql/types/post';
import InvalidIcon from '../../common/InvalidIcon';
import Editor from '../Editor/Editor';
import LoadingEditor from './LoadingEditor';
import validatePostForm from './validatePostForm';

export interface PostEditorProps {
  children: React.ReactNode;
  loading: boolean;
  id: string;
  categoryId: string;
  markdown: string;
  order: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  onCategoryIdChange: (value: string) => void;
  onMarkdownChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onPublishedChange: (value: boolean) => void;
  onSlugChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
}

export default function PostEditor({
  children,
  loading,
  id,
  markdown,
  order,
  published,
  slug,
  subtitle,
  summary,
  title,
  categoryId,
  onCategoryIdChange,
  onMarkdownChange,
  onOrderChange,
  onPublishedChange,
  onSlugChange,
  onSubtitleChange,
  onSummaryChange,
  onTitleChange,
}: PostEditorProps): React.ReactElement {
  const [
    getAllCategoriesAndPosts,
    {
      data: allCategoriesAndPostsData,
      loading: loadingCategories,
      called: calledGetAllCategoriesAndPosts,
    },
  ] = lazyGetAllCategoriesAndPosts({ includeUnpublished: true });
  const categories =
    calledGetAllCategoriesAndPosts && !loadingCategories
      ? (allCategoriesAndPostsData as { categories: Partial<Category>[] })
        .categories
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
    (postsByCategoryData as { postsByCategory: Partial<Post>[] })
      ?.postsByCategory || [];
  const otherSiblingPosts =
    loadingSiblingPosts || !calledGetPostsByCategory
      ? []
      : siblingPosts.filter((p) => p.id !== id);

  if (loading) {
    return <LoadingEditor />;
  }

  if (!calledGetPostsByCategory) {
    getPostsByCategory();
  }

  if (!calledGetAllCategoriesAndPosts) {
    getAllCategoriesAndPosts();
  }

  const validationResults = validatePostForm({
    categoryId,
    markdown,
    order,
    published,
    slug,
    subtitle,
    summary,
    title,
    siblingPosts: otherSiblingPosts,
    allCategories: categories || [],
  });

  return (
    <Container fluid className="post-editor">
      <Form>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group post-title"
              controlId="post-title"
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
                id="post-title-invalid"
                isInvalid={!validationResults.title.isValid}
                invalidReason={validationResults.title.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group post-subtitle"
              controlId="post-subtitle"
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
                id="post-subtitle-invalid"
                isInvalid={!validationResults.subtitle.isValid}
                invalidReason={validationResults.subtitle.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group post-summary"
              controlId="post-summary"
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
                id="post-summary-invalid"
                isInvalid={!validationResults.summary.isValid}
                invalidReason={validationResults.summary.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group
              className="text-group post-category"
              controlId="post-category"
            >
              <Form.Label>Category</Form.Label>
              {loadingCategories ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <Form.Select
                    aria-label="Select the post's category"
                    isValid={validationResults.categoryId.isValid}
                    isInvalid={!validationResults.categoryId.isValid}
                    value={categoryId}
                    onChange={(event) => {
                      const newValue = event.target.value;
                      // Update which posts we compare against to make sure
                      // we properly validate slug and order
                      getPostsByCategory({
                        variables: {
                          categoryId: newValue,
                          includeUnplished: true,
                        },
                      });
                      onCategoryIdChange(newValue);
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category: Partial<Category>) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                  <InvalidIcon
                    id="post-category-invalid"
                    isInvalid={!validationResults.categoryId.isValid}
                    invalidReason={validationResults.categoryId.invalidReason}
                  />
                </>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Form.Group
              className="button-group post-published"
              controlId="post-published"
            >
              <ButtonGroup>
                <ToggleButton
                  key="unpublished"
                  id="post-unpublished-button"
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
                  id="post-published-button"
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
              className="number-group post-order"
              controlId="post-order"
            >
              <FormLabel>Order in Navbar</FormLabel>
              {loadingSiblingPosts || !calledGetPostsByCategory ? (
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
                    id="post-order-invalid"
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
            <FormGroup className="text-group post-slug" controlId="post-slug">
              <FormLabel>Slug</FormLabel>
              {loadingSiblingPosts || !calledGetPostsByCategory ? (
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
                    id="post-slug-invalid"
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
            <Form.Group
              className="editor-group post-body"
              controlId="post-body"
            >
              <Editor
                alreadyInsideForm
                markdown={markdown}
                onChange={onMarkdownChange}
                className="post-markdown-editor"
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
