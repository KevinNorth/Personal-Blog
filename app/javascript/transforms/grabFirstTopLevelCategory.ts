import Category from '../graphql/types/category';
import sortByOrder from '../lib/sortByOrder';

function grabFirstTopLevelCategory(
  categories: Partial<Category>[]
): Partial<Category> | null {
  if (categories.length === 0) {
    return null;
  }

  const topLevelCategories = categories.filter((c) => c.parent === null);
  const inOrder = topLevelCategories.sort(sortByOrder);
  const firstTopLevelCategory = inOrder.length === 0 ? null : inOrder[0];

  return firstTopLevelCategory;
}

export default grabFirstTopLevelCategory;
