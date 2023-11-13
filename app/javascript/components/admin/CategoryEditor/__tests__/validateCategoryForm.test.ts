import { mockCategories } from '../fixtures/allCategories';
import validateCategoryForm, {
  CategoryForm,
  Validation,
  ValidationResults,
} from '../validateCategoryForm';

const validForm: CategoryForm = {
  markdown: 'Test',
  name: 'Test',
  order: '0',
  otherCategories: mockCategories,
  parentId: null,
  published: true,
  slug: 'test',
  subtitle: 'Test',
  summary: 'Test',
  title: 'Test',
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

describe('test', () => {
  describe('when given a valid category form', () => {
    describe('when the category has no parent', () => {
      it('returns an object with all valid results', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          parentId: null,
        };

        const results = validateCategoryForm(categoryForm);

        expectAllResultsToBeValid(results);
      });
    });

    describe('when the category has a parent', () => {
      it('returns an object with all valid results', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          parentId: '1',
        };

        const results = validateCategoryForm(categoryForm);

        expectAllResultsToBeValid(results);
      });
    });

    describe('when markdown is empty', () => {
      it('still returns an object with all valid results', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          markdown: '',
        };

        const results = validateCategoryForm(categoryForm);

        expectAllResultsToBeValid(results);
      });
    });
  });

  describe('when name is empty', () => {
    it('returns a validation warning', () => {
      const categoryForm: CategoryForm = {
        ...validForm,
        name: '',
      };

      const results = validateCategoryForm(categoryForm);

      expect(results.name).toEqual({
        isValid: false,
        invalidReason: 'Name must not be blank.',
      });
    });
  });

  describe('when order is invalid', () => {
    describe('when order is blank', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          order: '',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must not be blank.',
        });
      });
    });

    describe('when order is not a number', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          order: 'one',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must be an integer.',
        });
      });
    });

    describe('when order is not an integer', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          order: '1.5',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: 'Order must be an integer.',
        });
      });
    });

    describe('when order is a number already used by a sibling category', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          parentId: '2',
          order: '1',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason:
            "Cannot match another category's order under the same parent.",
        });
      });
    });
  });

  describe('when parentId does not match an existing category', () => {
    it('returns a validation warning', () => {
      const categoryForm: CategoryForm = {
        ...validForm,
        parentId: '1000',
      };

      const results = validateCategoryForm(categoryForm);

      expect(results.parentId).toEqual({
        isValid: false,
        invalidReason: 'Selected parent category does not exist.',
      });
    });
  });

  describe('when slug is invalid', () => {
    describe('when slug is blank', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          slug: '',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason: 'Slug must not be blank.',
        });
      });
    });

    describe('when slug is already used by a sibling category', () => {
      it('returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          parentId: '2',
          slug: 'applied-systems',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason: 'Slug is already used by another category.',
        });
      });
    });

    describe('when slug is already used by a non-sibling category', () => {
      it('also returns a validation warning', () => {
        const categoryForm: CategoryForm = {
          ...validForm,
          parentId: null,
          slug: 'applied-systems',
        };

        const results = validateCategoryForm(categoryForm);

        expect(results.slug).toEqual({
          isValid: false,
          invalidReason: 'Slug is already used by another category.',
        });
      });
    });
  });

  describe('when subtitle is empty', () => {
    it('returns a validation warning', () => {
      const categoryForm: CategoryForm = {
        ...validForm,
        subtitle: '',
      };

      const results = validateCategoryForm(categoryForm);

      expect(results.subtitle).toEqual({
        isValid: false,
        invalidReason: 'Subtitle must not be blank.',
      });
    });
  });

  describe('when summary is empty', () => {
    it('returns a validation warning', () => {
      const categoryForm: CategoryForm = {
        ...validForm,
        summary: '',
      };

      const results = validateCategoryForm(categoryForm);

      expect(results.summary).toEqual({
        isValid: false,
        invalidReason: 'Summary must not be blank.',
      });
    });
  });

  describe('when title is empty', () => {
    it('returns a validation warning', () => {
      const categoryForm: CategoryForm = {
        ...validForm,
        title: '',
      };

      const results = validateCategoryForm(categoryForm);

      expect(results.title).toEqual({
        isValid: false,
        invalidReason: 'Title must not be blank.',
      });
    });
  });
});
