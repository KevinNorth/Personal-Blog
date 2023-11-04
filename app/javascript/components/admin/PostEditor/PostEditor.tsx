import React from 'react';
import { ButtonGroup, Container, Col, Form, FormControl, FormGroup, FormLabel, Placeholder, Row, ToggleButton } from 'react-bootstrap';
import Editor from '../Editor/Editor';
import { lazyGetPostsByCategory } from '../../../graphql/queries/postsByCategory';
import LoadingEditor from './LoadingEditor';
import validatePostForm from './validatePostForm';
import InvalidIcon from '../../common/InvalidIcon';
import Post from '../../../graphql/types/post';

export interface PostEditorProps {
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
  onMarkdownChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onPublishedChange: (value: boolean) => void;
  onSlugChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onSummaryChange: (value: string) => void;
  onTitleChange: (value: string) => void;
}

export default function PostEditor({
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
  onMarkdownChange,
  onOrderChange,
  onPublishedChange,
  onSlugChange,
  onSubtitleChange,
  onSummaryChange,
  onTitleChange
}: PostEditorProps): React.ReactElement {
  const [
    getPostsByCategory,
    { data: siblingPosts, loading: loadingSiblingPosts, called: calledGetPostsByCategory }
  ] = lazyGetPostsByCategory({ categoryId, includeUnpublished: true });

  if (loading) {
    return <LoadingEditor />;
  }

  if (!calledGetPostsByCategory) {
    getPostsByCategory();
  }

  const otherSiblingPosts = (loadingSiblingPosts || !calledGetPostsByCategory) ? [] :
    (siblingPosts as { postsByCategory: Partial<Post>[] }).postsByCategory
      .filter((p) => p.id !== id);
  const usedSlugs = otherSiblingPosts.map((p) => p.slug);
  const usedOrders = otherSiblingPosts.map((p) => p.order);

  const validationResults = validatePostForm({
    markdown,
    order,
    published,
    slug,
    subtitle,
    summary,
    title,
    usedOrders,
    usedSlugs
  });

  return (
    <Container fluid className='post-editor'>
      <Form>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-title" controlId="post-title">
              <Form.Label size="lg">Title</Form.Label>
              <Form.Control
                isValid={validationResults.title.isValid}
                isInvalid={!validationResults.title.isValid}
                size="lg"
                type='text'
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
              />
              <InvalidIcon
                id='post-title-invalid'
                isInvalid={!validationResults.title.isValid}
                invalidReason={validationResults.title.invalidReason}
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
                isInvalid={!validationResults.subtitle.isValid}
                type='text'
                value={subtitle}
                onChange={(event) => onSubtitleChange(event.target.value)}
              />
              <InvalidIcon
                id='post-subtitle-invalid'
                isInvalid={!validationResults.subtitle.isValid}
                invalidReason={validationResults.subtitle.invalidReason}
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
                isInvalid={!validationResults.summary.isValid}
                type='text'
                value={summary}
                onChange={(event) => onSummaryChange(event.target.value)}
              />
              <InvalidIcon
                id='post-summary-invalid'
                isInvalid={!validationResults.summary.isValid}
                invalidReason={validationResults.summary.invalidReason}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Form.Group className="post-published" controlId="post-published">
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
          <Col xs={3}>
            <FormGroup className="post-order" controlId="post-order">
              <FormLabel>Order in Navbar</FormLabel>
              {
                (loadingSiblingPosts || !calledGetPostsByCategory) ?
                  <Placeholder animation="glow" className="w-100" /> :
                  <>
                    <FormControl
                      isValid={validationResults.order.isValid}
                      isInvalid={!validationResults.order.isValid}
                      type='number'
                      value={order}
                      onChange={(event) => onOrderChange(event.target.value)}
                      inputMode='numeric'
                    />
                    <InvalidIcon
                      id='post-order-invalid'
                      isInvalid={!validationResults.order.isValid}
                      invalidReason={validationResults.order.invalidReason}
                    />
                  </>
              }
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup className="post-slug" controlId="post-slug">
              <FormLabel>Slug</FormLabel>
              {
                (loadingSiblingPosts || !calledGetPostsByCategory) ?
                  <Placeholder animation="glow" className="w-100" /> :
                  <>
                    <FormControl
                      isValid={validationResults.slug.isValid}
                      isInvalid={!validationResults.slug.isValid}
                      type='text'
                      value={slug}
                      onChange={(event) => onSlugChange(event.target.value)}
                    />
                    <InvalidIcon
                      id='post-slug-invalid'
                      isInvalid={!validationResults.slug.isValid}
                      invalidReason={validationResults.slug.invalidReason}
                    />
                  </>
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="post-body" controlId="post-body">
              <Editor
                alreadyInsideForm
                markdown={markdown}
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
