import { mockCategoriesAndPosts } from '../../../../__tests__/fixtures/allCategoriesAndPosts';
import validatePostForm, {
  PostForm,
  Validation,
  ValidationResults,
} from '../validatePostForm';

const parentCategory = mockCategoriesAndPosts.find(
  (category) => category.id === '6'
);

const validForm: PostForm = {
  markdown: 'Test',
  order: '10',
  published: true,
  slug: 'test',
  subtitle: 'Test',
  summary: 'Test',
  title: 'Test',
  allCategories: mockCategoriesAndPosts,
  categoryId: '6',
  siblingPosts: parentCategory.posts,
};

function expectResultToBeValid(result: Validation): void {
  expect(result).toEqual({
    invalidReason: undefined,
    isValid: true,
  });
}

function expectAllResultsToBeValid(results: ValidationResults): void {
  Object.values(results).forEach((result) => expectResultToBeValid(result));
}

describe('validatePostForm()', () => {
  describe('when given a valid post form', () => {
    it('returns an object with all valid results', () => {
      const postForm: PostForm = validForm;

      const results = validatePostForm(postForm);

      expectAllResultsToBeValid(results);
    });

    describe('when markdown is empty', () => {
      it('still returns an object with all valid results', () => {
        const postForm: PostForm = {
          ...validForm,
          markdown: '',
        };

        const results = validatePostForm(postForm);

        expectAllResultsToBeValid(results);
      });
    });
  });

  describe('when categoryId is invalid', () => {
    describe('when categoryId is blank', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          categoryId: '',
        };

        const results = validatePostForm(postForm);

        expect(results.categoryId).toEqual({
          isValid: false,
          invalidReason: 'Category must not be blank.',
        });
      });
    });

    describe('when categoryId does not match an existing category', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          categoryId: '999',
        };

        const results = validatePostForm(postForm);

        expect(results.categoryId).toEqual({
          isValid: false,
          invalidReason: 'Selected category does not exist.',
        });
      });
    });
  });

  describe('when order is invalid', () => {
    describe('when order is blank', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          order: '',
        };

        const results = validatePostForm(postForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must not be blank.',
        });
      });
    });

    describe('when order is not a number', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          order: 'one',
        };

        const results = validatePostForm(postForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must be an integer.',
        });
      });
    });

    describe('when order is not an integer', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          order: '1.5',
        };

        const results = validatePostForm(postForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must be an integer.',
        });
      });
    });

    describe('when order is a number already used by a sibling post', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          order: '1',
        };

        const results = validatePostForm(postForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason:
            "Order cannot match another post's order in this category.",
        });
      });
    });
  });

  describe('when slug is invalid', () => {
    describe('when slug is blank', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          slug: '',
        };

        const results = validatePostForm(postForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason: 'Slug must not be blank.',
        });
      });
    });

    describe('when slug is already used by a sibling post', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          slug: 'gitvs',
        };

        const results = validatePostForm(postForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason:
            'Slug is already used by another post in this category.',
        });
      });
    });
  });

  describe('when subtitle is empty', () => {
    it('returns a validation warning', () => {
      const postForm: PostForm = {
        ...validForm,
        subtitle: '',
      };

      const results = validatePostForm(postForm);

      expect(results.subtitle).toEqual({
        isValid: false,
        invalidReason: 'Subtitle must not be blank.',
      });
    });
  });

  describe('when summary is empty', () => {
    it('returns a validation warning', () => {
      const postForm: PostForm = {
        ...validForm,
        summary: '',
      };

      const results = validatePostForm(postForm);

      expect(results.summary).toEqual({
        isValid: false,
        invalidReason: 'Summary must not be blank.',
      });
    });
  });

  describe('when title is empty', () => {
    it('returns a validation warning', () => {
      const postForm: PostForm = {
        ...validForm,
        title: '',
      };

      const results = validatePostForm(postForm);

      expect(results.title).toEqual({
        isValid: false,
        invalidReason: 'Title must not be blank.',
      });
    });
  });
});
