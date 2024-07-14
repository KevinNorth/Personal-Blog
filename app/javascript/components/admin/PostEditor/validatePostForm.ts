import Post from '../../../graphql/types/post';

export interface PostForm {
  markdown: string;
  name: string;
  order: string;
  parentId: string;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  siblingPosts: Partial<Post>[];
  allPosts: Partial<Post>[];
}

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
  name: Validation;
  markdown: Validation;
  order: Validation;
  parentId: Validation;
  published: Validation;
  slug: Validation;
  subtitle: Validation;
  summary: Validation;
  title: Validation;
}

function validatePostForm({
  parentId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markdown,
  name,
  order,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  published,
  slug,
  subtitle,
  summary,
  title,
  siblingPosts,
  allPosts,
}: PostForm): ValidationResults {
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

  const usedSlugs = allPosts.map((p) => p.slug);
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
      invalidReason: "Order cannot match a sibling post's order.",
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
      invalidReason: 'Slug is already used by another post.',
    };
  }

  if (parentId === '') {
    validationResults.parentId = {
      isValid: false,
      invalidReason: 'Parent must not be blank.',
    };
  } else if (!allPosts.map((c) => c.id).includes(parentId)) {
    validationResults.parentId = {
      isValid: false,
      invalidReason: 'Selected parent does not exist.',
    };
  }

  return validationResults;
}

export default validatePostForm;
