import Category from '../../../graphql/types/category';
import Post from '../../../graphql/types/post';

export type Validation =
  | {
      isValid: false;
      invalidReason: string;
    }
  | {
      isValid: true;
      invalidReason: undefined;
    };

export interface ValidationResults {
  categoryId: Validation;
  markdown: Validation;
  order: Validation;
  published: Validation;
  slug: Validation;
  subtitle: Validation;
  summary: Validation;
  title: Validation;
}

function validatePostForm({
  categoryId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markdown,
  order,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  published,
  slug,
  subtitle,
  summary,
  title,
  siblingPosts,
  allCategories,
}: {
  categoryId: string;
  markdown: string;
  order: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  siblingPosts: Partial<Post>[];
  allCategories: Partial<Category>[];
}): ValidationResults {
  const validationResults: ValidationResults = [
    'categoryId',
    'markdown',
    'order',
    'published',
    'slug',
    'subtitle',
    'summary',
    'title',
  ].reduce(
    (allResults: Partial<ValidationResults>, key: string) => ({
      ...allResults,
      [key]: { isValid: true },
    }),
    {}
  ) as ValidationResults;

  const usedSlugs = siblingPosts.map((p) => p.slug);
  const usedOrders = siblingPosts.map((p) => p.order);

  if (title === '') {
    validationResults.title = {
      isValid: false,
      invalidReason: 'Title must not be blank.',
    };
  }

  if (subtitle === '') {
    validationResults.subtitle = {
      isValid: false,
      invalidReason: 'Subtitle must not be blank.',
    };
  }

  if (summary === '') {
    validationResults.summary = {
      isValid: false,
      invalidReason: 'Summary must not be blank.',
    };
  }

  if (order === '') {
    validationResults.order = {
      isValid: false,
      invalidReason: 'Order must not be blank.',
    };
  } else if (!/^-?\d+$/.test(order)) {
    validationResults.order = {
      isValid: false,
      invalidReason: 'Order must be an integer.',
    };
  } else if (usedOrders.includes(Number(order))) {
    validationResults.order = {
      isValid: false,
      invalidReason:
        "Order cannot match another post's order in this category.",
    };
  }

  if (slug === '') {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug must not be blank.',
    };
  } else if (usedSlugs.includes(slug)) {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug is already used by another post in this category.',
    };
  }

  if (categoryId === '') {
    validationResults.categoryId = {
      isValid: false,
      invalidReason: 'Category must not be blank.',
    };
  } else if (!allCategories.map((c) => c.id).includes(categoryId)) {
    validationResults.categoryId = {
      isValid: false,
      invalidReason: 'Selected category does not exist.',
    };
  }

  return validationResults;
}

export default validatePostForm;
