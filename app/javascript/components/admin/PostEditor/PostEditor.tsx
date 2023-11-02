import React from 'react';
import { ButtonGroup, Container, Col, Form, FormControl, FormGroup, FormLabel, Placeholder, Row, ToggleButton } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import { PostWithoutRelationships } from '../../../graphql/types/post';
import { lazyGetPostsByCategory } from '../../../graphql/queries/postsByCategory';
import LoadingEditor from './LoadingEditor';

export interface PostEditorProps {
  loading: boolean;
  post: PostWithoutRelationships;
  categoryId: string;
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

type ValidationResults = { [Property in keyof PostWithoutRelationships]: Validation };

function validateForm(post: PostWithoutRelationships, usedSlugs: string[]): ValidationResults {
  const validationResults: ValidationResults = Object.keys(post).reduce(
    (allResults: Partial<ValidationResults>, key: string) => ({
      ...allResults,
      [key]: { isValid: true }
    }),
    {}
  ) as ValidationResults;

  if (post.title === '') {
    validationResults.title = {
      isValid: false,
      invalidReason: 'Title must not be blank.'
    };
  }

  if (post.subtitle === '') {
    validationResults.subtitle = {
      isValid: false,
      invalidReason: 'Subtitle must not be blank.'
    };
  }

  if (post.summary === '') {
    validationResults.summary = {
      isValid: false,
      invalidReason: 'Summary must not be blank.'
    };
  }

  if (post.slug === '') {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug must not be blank.'
    };
  } else if (usedSlugs.includes(post.slug)) {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug is already used by another post in this category.'
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
}: PostEditorProps): React.ReactElement {
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
    <Container fluid>
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
