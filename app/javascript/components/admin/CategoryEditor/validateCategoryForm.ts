export type Validation = {
  isValid: false;
  invalidReason: string;
} | {
  isValid: true;
  invalidReason: undefined;
}

export interface ValidationResults {
  markdown: Validation;
  name: Validation;
  order: Validation;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  published,
  slug,
  subtitle,
  summary,
  title,
  usedSlugs,
  usedOrders
}: {
  markdown: string,
  name: string,
  order: string,
  published: boolean,
  slug: string,
  subtitle: string,
  summary: string,
  title: string,
  usedSlugs: string[],
  usedOrders: number[]
}): ValidationResults {
  const validationResults: ValidationResults =
    ['markdown', 'name', 'order', 'published', 'slug', 'subtitle', 'summary', 'title']
      .reduce(
        (allResults: Partial<ValidationResults>, key: string) => ({
          ...allResults,
          [key]: { isValid: true }
        }),
        {}
      ) as ValidationResults;

  if (title === '') {
    validationResults.title = {
      isValid: false,
      invalidReason: 'Title must not be blank.'
    };
  }

  if (subtitle === '') {
    validationResults.subtitle = {
      isValid: false,
      invalidReason: 'Subtitle must not be blank.'
    };
  }

  if (summary === '') {
    validationResults.summary = {
      isValid: false,
      invalidReason: 'Summary must not be blank.'
    };
  }

  if (name === '') {
    validationResults.name = {
      isValid: false,
      invalidReason: 'Name must not be blank.'
    };
  }

  if (order === '') {
    validationResults.order = {
      isValid: false,
      invalidReason: 'Order must not be blank.'
    };
  } else if (isNaN(+order)) {
    validationResults.order = {
      isValid: false,
      invalidReason: 'Order must be a number.'
    };
  } else if (usedOrders.includes(Number(order))) {
    validationResults.order = {
      isValid: false,
      invalidReason: "Cannot match another category's order under the same parent."
    };
  }

  if (slug === '') {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug must not be blank.'
    };
  } else if (usedSlugs.includes(slug)) {
    validationResults.slug = {
      isValid: false,
      invalidReason: 'Slug is already used by another category.'
    };
  }
  
  return validationResults;
}

export default validateCategoryForm;
