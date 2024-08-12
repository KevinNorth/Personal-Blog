import React, { ReactElement } from 'react';
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
import { lazyGetAllPosts } from '../../../graphql/queries/allPosts';
import { lazyGetPostsByParent } from '../../../graphql/queries/postsByParent';
import Post from '../../../graphql/types/post';
import findDescendantsOfPost from '../../../lib/findDescendantsOfPost';
import organizePostsIntoSelectOptions from '../../../transforms/trees/organizePostsIntoSelectOptions';
import InvalidIcon from '../../common/InvalidIcon';
import Editor from '../Editor/Editor';
import LoadingEditor from './LoadingEditor';
import validatePostForm, { ValidationResults } from './validatePostForm';

export interface PostEditorProps {
  children: React.ReactNode;
  loading: boolean;
  id: string;
  markdown: string;
  name: string;
  order: string;
  parentId: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  onMarkdownChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onParentIdChange: (value: string) => void;
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
  name,
  order,
  parentId,
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
}: PostEditorProps): React.ReactElement {
  const [
    getAllPosts,
    { data: allPostsData, loading: loadingPosts, called: calledGetAllPosts },
  ] = lazyGetAllPosts({ includeUnpublished: true });
  const posts =
    calledGetAllPosts && !loadingPosts
      ? (allPostsData as { allPosts: Partial<Post>[] }).allPosts
      : [];

  const [
    getPostsByParent,
    {
      data: postsByParentData,
      loading: loadingSiblingPosts,
      called: calledGetPostsByParent,
    },
  ] = lazyGetPostsByParent({ parentId, includeUnpublished: true });
  const siblingPosts =
    (postsByParentData as { postsByParent: Partial<Post>[] })?.postsByParent ||
    [];
  const otherSiblingPosts =
    loadingSiblingPosts || !calledGetPostsByParent
      ? []
      : siblingPosts.filter((p) => p.id !== id);

  const selectParentOptions = React.useMemo<ReactElement[]>(() => {
    if (!id || id === '') {
      return organizePostsIntoSelectOptions({
        posts,
        postsToDisable: [],
      });
    }

    const thisPost = posts.find((post) => String(post.id) === String(id));
    const descendants = findDescendantsOfPost(thisPost, posts).descendants;
    const postsToDisable = [thisPost, ...descendants];

    return organizePostsIntoSelectOptions({
      posts,
      postsToDisable,
    });
  }, [id, posts]);

  const validationResults = React.useMemo<ValidationResults>(
    () =>
      validatePostForm({
        id,
        parentId,
        markdown: markdown || '',
        name: name || '',
        order: order || '',
        published: published || false,
        slug: slug || '',
        subtitle: subtitle || '',
        summary: summary || '',
        title: title || '',
        siblingPosts: otherSiblingPosts,
        allPosts: posts || [],
      }),
    [
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
      siblingPosts,
      posts,
    ]
  );

  if (loading) {
    return <LoadingEditor />;
  }

  if (!calledGetPostsByParent) {
    getPostsByParent();
  }

  if (!calledGetAllPosts) {
    getAllPosts();
  }

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
                value={title || ''}
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
          <Col xs={6}>
            <Form.Group
              className="text-group post-subtitle"
              controlId="post-subtitle"
            >
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                isValid={validationResults.subtitle.isValid}
                isInvalid={!validationResults.subtitle.isValid}
                type="text"
                value={subtitle || ''}
                onChange={(event) => onSubtitleChange(event.target.value)}
              />
              <InvalidIcon
                id="post-subtitle-invalid"
                isInvalid={!validationResults.subtitle.isValid}
                invalidReason={validationResults.subtitle.invalidReason}
              />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="text-group post-name" controlId="post-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                isValid={validationResults.name.isValid}
                isInvalid={!validationResults.name.isValid}
                type="text"
                value={name || ''}
                onChange={(event) => onNameChange(event.target.value)}
              />
              <InvalidIcon
                id="post-name-invalid"
                isInvalid={!validationResults.name.isValid}
                invalidReason={validationResults.name.invalidReason}
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
                value={summary || ''}
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
              className="text-group post-parent"
              controlId="post-parent"
            >
              <Form.Label>Parent</Form.Label>
              {loadingPosts ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <Form.Select
                    aria-label="Select the post's parent"
                    isValid={validationResults.parentId.isValid}
                    isInvalid={!validationResults.parentId.isValid}
                    value={parentId || ''}
                    onChange={(event) => {
                      const newValue = event.target.value;
                      // Update which posts we compare against to make sure
                      // we properly validate slug and order
                      getPostsByParent({
                        variables: {
                          parentId: newValue,
                          includeUnplished: true,
                        },
                      });
                      onParentIdChange(newValue);
                    }}
                  >
                    <option value="">(No parent)</option>
                    {selectParentOptions}
                  </Form.Select>
                  <InvalidIcon
                    id="post-parent-invalid"
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
              {loadingSiblingPosts || !calledGetPostsByParent ? (
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
              {loadingSiblingPosts || !calledGetPostsByParent ? (
                <Placeholder animation="glow" className="w-100" />
              ) : (
                <>
                  <FormControl
                    isValid={validationResults.slug.isValid}
                    isInvalid={!validationResults.slug.isValid}
                    type="text"
                    value={slug || ''}
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
                markdown={markdown || ''}
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
