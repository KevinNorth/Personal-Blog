import { NavbarTreeVertex } from '../components/blog/Navbar/types';
import Category from '../graphql/types/category';
import sortByOrder from '../lib/sortByOrder';

function buildTreeVertex({
  category,
  children,
  categoryIdToChildrenMap,
}: {
  category: Partial<Category>;
  children?: Partial<Category>[];
  categoryIdToChildrenMap: Map<string, Partial<Category>[]>;
}): NavbarTreeVertex {
  const sortedChildren = children?.slice().sort(sortByOrder);

  let childVerticies: NavbarTreeVertex[] = [];
  if (sortedChildren) {
    childVerticies = childVerticies.concat(
      sortedChildren.map((child) =>
        buildTreeVertex({
          category: child,
          children: child?.id ? categoryIdToChildrenMap.get(child.id) : [],
          categoryIdToChildrenMap,
        })
      )
    );
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    children: childVerticies,
  };
}

/**
 * Massages a GraphQL query result into the data structure that
 * BlogNavbar expects for the tree prop.
 * @param categories An array of Categories queried from GraphQL,
 *  including lists of child category IDs.
 * @returns A tree that can be dropped directly into the BlogNavbar
 * component as the tree prop.
 */
function organizeCategoriesAndPostsIntoNavbarTree(
  categories: Partial<Category>[]
): NavbarTreeVertex[] {
  const categoryIdToChildrenMap = new Map<string, Partial<Category>[]>();
  const rootCategories: Partial<Category>[] = [];

  categories.forEach((category: Partial<Category>) => {
    if (!category.id) {
      return;
    }

    if (!category.parent) {
      rootCategories.push(category);
    }

    const childCategoryIds = category.children
      ?.map((child: { id?: string }) => child?.id)
      .filter((id) => id !== undefined);
    const childCategories =
      categories.filter((potentialChild: Partial<Category>) =>
        childCategoryIds?.includes(potentialChild.id)
      ) || [];

    categoryIdToChildrenMap.set(category.id, childCategories);
  });

  return rootCategories
    .slice()
    .sort(sortByOrder)
    .map((rootCategory) =>
      buildTreeVertex({
        category: rootCategory,
        children: categoryIdToChildrenMap.get(rootCategory.id!),
        categoryIdToChildrenMap,
      })
    );
}

export default organizeCategoriesAndPostsIntoNavbarTree;
