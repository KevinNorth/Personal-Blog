import getAllCategoriesAndPosts from '../graphql/queries/allCategoriesAndPosts';
import Category from '../graphql/types/category';
import grabFirstTopLevelCategory from '../transforms/grabFirstTopLevelCategory';

export interface DefaultCategoryResult {
  loading: boolean;
  defaultCategory: Partial<Category> | null;
}

function useDefaultCategory(): DefaultCategoryResult {
  const { data, loading } = getAllCategoriesAndPosts({
    includeUnpublished: false,
  });

  if (loading) {
    return { loading: true, defaultCategory: null };
  }

  const defaultCategory = grabFirstTopLevelCategory(data.categories);
  return { loading: false, defaultCategory };
}

export default useDefaultCategory;
