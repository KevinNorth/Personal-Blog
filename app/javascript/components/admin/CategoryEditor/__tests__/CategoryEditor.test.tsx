/**
 * @jest-environment jsdom
 */
import React from 'react';
import snapshotRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  render as interactableRenderer,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
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

function testTextInput(input: keyof CategoryEditorProps, label?: string) {
  const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);

  it(`calls on${capitalizedInput}Change`, async () => {
    const user = userEvent.setup();
    const onChangeSpy = jest.fn();
    const initialValue = '1';
    const typedChar = '2';

    const props = {
      [input]: initialValue,
      [`on${capitalizedInput}Change`]: onChangeSpy,
    };

    let wrapper: RenderResult;
    act(() => {
      wrapper = interactableRenderer(
        <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
          <TestCategoryEditor {...props} />
        </MockedProvider>
      );
    });

    const escapedLabelForRegExp = (label || capitalizedInput).replace(
      /[/\-\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );
    // We are in complete control of the values passed to the regexp here,
    // and we escape characters with regex meaning as well.
    // eslint-disable-next-line security/detect-non-literal-regexp
    const labelRegExp = new RegExp(`^${escapedLabelForRegExp}$`);

    await waitFor(() => {
      // Some form inputs are only available after GraphQL queries resolve
      expect(wrapper.findByLabelText(labelRegExp)).toBeTruthy();
    });
    const textbox = screen.getByLabelText(labelRegExp);
    await user.type(textbox, typedChar);

    expect(onChangeSpy.mock.lastCall?.[0]).toEqual(
      `${initialValue}${typedChar}`
    );
  });
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
    describe('when the user enters markdown', () => {
      it('calls onMarkdownChange', async () => {
        const user = userEvent.setup();
        const onMarkdownChangeSpy = jest.fn();
        const initialMarkdown = 'a';
        const typedChar = 'b';

        let wrapper;
        act(() => {
          wrapper = interactableRenderer(
            <MockedProvider mocks={[getAllCategoriesAndPostsMock]}>
              <TestCategoryEditor
                markdown={initialMarkdown}
                onMarkdownChange={onMarkdownChangeSpy}
              />
            </MockedProvider>
          );
        });

        expect(
          (await wrapper.findAllByDisplayValue(initialMarkdown)).length
        ).toBeGreaterThan(0);
        const markdownInput = screen.getAllByDisplayValue(initialMarkdown)[0];
        await user.type(markdownInput, typedChar);

        expect(onMarkdownChangeSpy.mock.lastCall?.[0]).toEqual(
          `${initialMarkdown}${typedChar}`
        );
      });
    });

    describe('when the user enters a name', () => {
      testTextInput('name', 'Name in Navbar');
    });

    describe('when the user enters an order', () => {
      testTextInput('order', 'Order in Navbar');
    });

    describe('when the user selects a parent category', () => {
      describe('when the user selects a non-null parent category', () => {
        test.todo('calls onParentIdChange');
      });

      describe('when the user selects "No parent" for parent category', () => {
        test.todo('calls onParentIdChange with null');
      });
    });

    describe('when the user clicks on a published button', () => {
      describe('when the user clicks "Published', () => {
        test.todo('calls onPublishedChange(true)');
      });

      describe('when the user clicks "Unpublished', () => {
        test.todo('calls onPublishedChange(false)');
      });
    });

    describe('when the user enters a slug', () => {
      testTextInput('slug');
    });

    describe('when the user enters a subtitle', () => {
      testTextInput('subtitle');
    });

    describe('when the user enters a summary', () => {
      testTextInput('summary');
    });

    describe('when the user enters a title', () => {
      testTextInput('title');
    });
  });
});
