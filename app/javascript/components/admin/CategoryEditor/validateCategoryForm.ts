import Category from '../../../graphql/types/category';

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
  markdown: Validation;
  name: Validation;
  order: Validation;
  parentId: Validation;
  published: Validation;
  slug: Validation;
  subtitle: Validation;
  summary: Validation;
  title: Validation;
}

function validateCategoryForm({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markdown,
  name,
  order,
  parentId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  published,
  slug,
  subtitle,
  summary,
  title,
  otherCategories,
}: {
  markdown: string;
  name: string;
  order: string;
  parentId: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  otherCategories: Partial<Category>[];
}): ValidationResults {
  const validationResults: ValidationResults = [
    'markdown',
    'name',
    'order',
    'parentId',
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

  const siblingCategories = otherCategories.filter(
    (c) => (c.parent?.id || null) === parentId
  );
  const usedSlugs = otherCategories.map((c) => c.slug);
  const usedOrders = siblingCategories.map((c) => c.order);

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

  if (name === '') {
    validationResults.name = {
      isValid: false,
      invalidReason: 'Name must not be blank.',
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
        "Cannot match another category's order under the same parent.",
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
      invalidReason: 'Slug is already used by another category.',
    };
  }

  if (
    !(parentId === null) &&
    !otherCategories.map((c) => c.id).includes(parentId)
  ) {
    validationResults.parentId = {
      isValid: false,
      invalidReason: 'Selected parent category does not exist.',
    };
  }

  return validationResults;
}

export default validateCategoryForm;
