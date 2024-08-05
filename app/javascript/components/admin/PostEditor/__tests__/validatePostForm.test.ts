import { mockPosts } from '../../../../__tests__/fixtures/allPosts';
import validatePostForm, {
  PostForm,
  Validation,
  ValidationResults,
} from '../validatePostForm';

const parent = mockPosts.find((parent) => parent.id === '6');
const post = mockPosts.find((post) => post.parent?.id === parent.id);
const siblings = mockPosts.filter(
  (sibling) => sibling.parent?.id === parent.id && sibling.id !== post.id
);

const validForm: PostForm = {
  id: post.id,
  markdown: post.markdown,
  name: post.name,
  order: String(post.order),
  published: post.published,
  slug: post.slug,
  subtitle: post.subtitle,
  summary: post.summary,
  title: post.title,
  parentId: parent.id,
  allPosts: mockPosts,
  siblingPosts: siblings,
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

    describe('when id is null', () => {
      it('still returns an object with all valid results', () => {
        const postForm: PostForm = {
          ...validForm,
          id: null,
          // This case is useful when creating a new post, before it's been saved to
          // the database. So we remove it from the list of all posts to simulate that.
          allPosts: mockPosts.filter((otherPost) => otherPost.id !== post.id),
        };

        const results = validatePostForm(postForm);

        expectAllResultsToBeValid(results);
      });
    });

    describe('when parentId is blank', () => {
      it('still returns an object with all valid results', () => {
        const postForm: PostForm = {
          ...validForm,
          parentId: '',
        };

        const results = validatePostForm(postForm);

        expectAllResultsToBeValid(results);
      });
    });

    describe('when parentId is null', () => {
      it('still returns an object with all valid results', () => {
        const postForm: PostForm = {
          ...validForm,
          parentId: null,
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
          order: String(siblings[0].order),
        };

        const results = validatePostForm(postForm);

        expect(results.order).toEqual({
          isValid: false,
          invalidReason: "Order cannot match a sibling post's order.",
        });
      });
    });

    describe('when order is a number already used, but not by a sibling post', () => {
      it('does not return a validation warning', () => {
        const invalidOrders = [post.order, ...siblings.map((s) => s.order)];
        const usedButValidOrder = mockPosts.find(
          (p) => !invalidOrders.includes(p.order)
        ).order;

        const postForm: PostForm = {
          ...validForm,
          order: String(usedButValidOrder),
        };

        const results = validatePostForm(postForm);

        expectAllResultsToBeValid(results);
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
          slug: siblings[0].slug,
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
    describe('when the post has a parent post', () => {
      it('returns a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          summary: '',
        };

        const results = validatePostForm(postForm);

        expect(results.summary).toEqual({
          isValid: false,
          invalidReason:
            'Summary must not be blank when there is a parent post.',
        });
      });
    });

    describe('when the post does not have a parent post', () => {
      it('does not return a validation warning', () => {
        const postForm: PostForm = {
          ...validForm,
          summary: '',
          parentId: '',
          siblingPosts: [],
        };

        const results = validatePostForm(postForm);

        expectAllResultsToBeValid(results);
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
