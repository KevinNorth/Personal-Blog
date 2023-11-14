/**
 * @jest-environment jsdom
 */
import React from 'react';
import { act } from 'react-dom/test-utils';
import snapshotRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { render as interactableRenderer, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCategoriesAndPosts } from '../../../../__tests__/fixtures/allCategoriesAndPosts';
import { allCategoriesAndPostsQuery } from '../../../../graphql/queries/allCategoriesAndPosts';
import CategoryEditor, { CategoryEditorProps } from '../CategoryEditor';

function TestCategoryEditor(
  props: Partial<CategoryEditorProps> & { key?: string | number }
): React.ReactElement {
  return (
    <CategoryEditor
      id={props.id || 'test-category-editor'}
      loading={props.loading === undefined ? false : props.loading}
      markdown={props.markdown || 'Test markdown'}
      name={props.name || 'Test name'}
      order={props.order || '1'}
      parentId={props.parentId || null}
      published={props.published === undefined ? true : props.published}
      slug={props.slug || 'test-slug'}
      subtitle={props.subtitle || 'Test subtitle'}
      summary={props.summary || 'Test summary'}
      title={props.title || 'Test title'}
      onMarkdownChange={props.onMarkdownChange || jest.fn()}
      onNameChange={props.onNameChange || jest.fn()}
      onOrderChange={props.onOrderChange || jest.fn()}
      onParentIdChange={props.onParentIdChange || jest.fn()}
      onPublishedChange={props.onPublishedChange || jest.fn()}
      onSlugChange={props.onSlugChange || jest.fn()}
      onSubtitleChange={props.onSubtitleChange || jest.fn()}
      onSummaryChange={props.onSummaryChange || jest.fn()}
      onTitleChange={props.onTitleChange || jest.fn()}
      key={props.key || undefined}
    >
      {props.children || <span>Test children</span>}
    </CategoryEditor>
  );
}

const getAllCategoriesAndPostsMock = {
  request: {
    query: allCategoriesAndPostsQuery,
    variables: {
      includeUnpublished: true,
    },
  },
  result: {
    data: {
      categories: mockCategoriesAndPosts,
    },
  },
};

describe('CategoryEditor', () => {
  describe('when loading', () => {
    it('renders as expected', () => {
      let wrapper;

      act(() => {
        wrapper = snapshotRenderer.create(
          <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
            <TestCategoryEditor loading={true} />
          </MockedProvider>
        );
      });

      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when given a valid category form', () => {
    describe('when the category is a top-level category', () => {
      it('renders as expected', () => {
        let wrapper;

        act(() => {
          wrapper = snapshotRenderer.create(
            <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
              <TestCategoryEditor parentId={null} loading={false} />
            </MockedProvider>
          );
        });

        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });

    describe('when the category is a child category', () => {
      it('renders as expected', () => {
        let wrapper;

        act(() => {
          wrapper = snapshotRenderer.create(
            <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
              <TestCategoryEditor parentId="1" loading={false} />
            </MockedProvider>
          );
        });

        expect(wrapper.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('when given an invalid category form', () => {
    it('renders as expected', () => {
      let wrapper;

      act(() => {
        wrapper = snapshotRenderer.create(
          <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
            <TestCategoryEditor order="invalid" loading={false} />
          </MockedProvider>
        );
      });

      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('user interactions', () => {
    describe('when the user enters a title', () => {
      it('calls onTitleChange', async () => {
        const user = userEvent.setup();
        const onTitleChangeSpy = jest.fn();
        const initialTitle = 'a';
        const typedChar = 'b';

        let wrapper;
        act(() => {
          wrapper = interactableRenderer(
            <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
              <TestCategoryEditor
                title={initialTitle}
                onTitleChange={onTitleChangeSpy}
              />
            </MockedProvider>
          );
        });

        expect(wrapper.findByLabelText(/^title$/i)).toBeTruthy();
        const titleInput = screen.getByLabelText(/^title$/i);
        await user.type(titleInput, typedChar);

        expect(onTitleChangeSpy.mock.lastCall?.[0]).toEqual(
          `${initialTitle}${typedChar}`
        );
      });
    });
  });
});
