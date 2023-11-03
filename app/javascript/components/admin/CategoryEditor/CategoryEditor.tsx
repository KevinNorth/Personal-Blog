import React from 'react';
import { ButtonGroup, Container, Col, Form, FormControl, FormGroup, FormLabel, Placeholder, Row, ToggleButton } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import { CategoryWithoutRelationships } from '../../../graphql/types/category';
import { lazyGetPostsByCategory } from '../../../graphql/queries/postsByCategory';
import LoadingEditor from './LoadingEditor';

export interface CategoryEditorProps {
  loading: boolean;
  post: CategoryWithoutRelationships;
  categoryId: string;
  onNameChange: (value: string) => void;
  onMarkdownChange: (value: string) => void;
  onPublishedChange: (value: boolean) => void;
  onSlugChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
}

type Validation = {
  isValid: false;
  invalidReason: string;
} | {
  isValid: true;
}

type ValidationResults = { [Property in keyof CategoryWithoutRelationships]: Validation };

function validateForm(category: CategoryWithoutRelationships, usedSlugs: string[]): ValidationResults {
  const validationResults: ValidationResults = Object.keys(category).reduce(
    (allResults: Partial<ValidationResults>, key: string) => ({
      ...allResults,
      [key]: { isValid: true }
    }),
    {}
  ) as ValidationResults;

  if (category.title === '') {
    validationResults.title = {
      isValid: false,
      invalidReason: 'Title must not be blank.'
    };
  }

  if (category.name === '') {
    validationResults.name = {
      isValid: false,
      invalidReason: 'Name must not be blank.'
    };
  }

  if (category.subtitle === '') {
    validationResults.subtitle = {
      isValid: false,
      invalidReason: 'Subtitle must not be blank.'
    };
  }

  if (category.summary === '') {
    validationResults.summary = {
      isValid: false,
      invalidReason: 'Summary must not be blank.'
    };
  }

  if (category.slug === '') {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug must not be blank.'
    };
  } else if (usedSlugs.includes(category.slug)) {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug is already used by another category.'
    };
  }
  
  return validationResults;
}

export default function PostEditor({
  loading,
  post,
  categoryId,
  onMarkdownChange,
  onPublishedChange,
  onSlugChange,
  onSubtitleChange,
  onSummaryChange,
  onTitleChange
}: CategoryEditorProps): React.ReactElement {
  const [
    getPostsByCategory,
    { data: siblingPosts, loading: loadingSiblingPosts, called: calledGetPostsByCategory }
  ] = lazyGetPostsByCategory(categoryId, true);

  if (loading) {
    return <LoadingEditor />;
  }

  if (!calledGetPostsByCategory) {
    getPostsByCategory();
  }

  const siblingSlugs = (loadingSiblingPosts || !calledGetPostsByCategory) ? [] :
    siblingPosts.postsByCategory
      .filter((p) => p.id !== post.id)
      .map((p) => p.slug);

  const validationResults = validateForm(post, siblingSlugs);

  return (
    <Container fluid className='post-editor'>
      <Form>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-title" controlId="post-title">
              <Form.Label size="lg">Title</Form.Label>
              <Form.Control
                isValid={validationResults.title.isValid}
                size="lg"
                type='text'
                value={post.title}
                onChange={(event) => onTitleChange(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-subtitle" controlId="post-subtitle">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                isValid={validationResults.subtitle.isValid}
                type='text'
                value={post.subtitle}
                onChange={(event) => onSubtitleChange(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-summary" controlId="post-summary">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                isValid={validationResults.summary.isValid}
                type='text'
                value={post.summary}
                onChange={(event) => onSummaryChange(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <Form.Group className="post-published" controlId="post-published">
              <ButtonGroup>
                <ToggleButton
                  key="unpublished"
                  id="post-unpublished-button"
                  type="radio"
                  name="unpublished"
                  value="false"
                  checked={!post.published}
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
                  checked={post.published}
                  onChange={() => onPublishedChange(true)}
                >
                  Published
                </ToggleButton>
              </ButtonGroup>
            </Form.Group>
          </Col>
          <Col xs={8}>
            <FormGroup className="post-slug" controlId="post-slug">
              <FormLabel>Slug</FormLabel>
              {
                (loadingSiblingPosts || !calledGetPostsByCategory) ?
                  <Placeholder animation="glow" className="w-100" /> :
                  <FormControl
                    isValid={validationResults.slug.isValid}
                    type='text'
                    value={post.slug}
                    onChange={(event) => onSlugChange(event.target.value)}
                  />
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-body" controlId="post-body">
              <Editor
                alreadyInsideForm
                markdown={post.markdown}
                onChange={onMarkdownChange}
                className='post-editor'
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
