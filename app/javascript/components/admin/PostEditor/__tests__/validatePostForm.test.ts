import { mockPosts } from '../../../../__tests__/fixtures/allPosts';
import validatePostForm, {
  PostForm,
  Validation,
  ValidationResults,
} from '../validatePostForm';

const parent = mockPosts.find((parent) => parent.id === '6');

const validForm: PostForm = {
  markdown: 'Test',
  name: 'Test',
  order: '10',
  published: true,
  slug: 'test',
  subtitle: 'Test',
  summary: 'Test',
  title: 'Test',
  allPosts: mockPosts,
  parentId: '6',
  siblingPosts: parent.children,
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

  describe('when name is empty', () => {
    it('returns a validation warning', () => {
      const postForm: PostForm = {
        ...validForm,
        name: '',
      };

      const results = validatePostForm(postForm);

      expect(results.name).toEqual({
        isValid: false,
        invalidReason: 'Name must not be blank.',
      });
    });
  });

  describe('when parentId is invalid', () => {
    describe('when parentId is blank', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          parentId: '',
        };

        const results = validatePostForm(postForm);

        expect(results.parentId).toEqual({
          isValid: false,
          invalidReason: 'Parent must not be blank.',
        });
      });
    });

    describe('when parentId does not match an existing post', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          parentId: '999',
        };

        const results = validatePostForm(postForm);

        expect(results.parentId).toEqual({
          isValid: false,
          invalidReason: 'Selected parent does not exist.',
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
          invalidReason: "Order cannot match a sibling post's order.",
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
          invalidReason: 'Slug is already used by another post.',
        });
      });
    });

    describe('when slug is already used by a non-sibling post', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          slug: 'index',
        };

        const results = validatePostForm(postForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason: 'Slug is already used by another post.',
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
