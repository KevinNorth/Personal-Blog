import {
  AdminTreeCategoryVertex,
  AdminTreePostVertex,
  AdminTreeVertex,
} from '../components/admin/Root/types';
import Category from '../graphql/types/category';
import Post from '../graphql/types/post';
import sortByOrder from '../lib/sortByOrder';

function buildPostTreeVertex(post: Partial<Post>): AdminTreePostVertex {
  return {
    id: post.id,
    title: post.title,
    type: 'Post',
    children: null,
    graphqlObject: post,
  };
}

function buildCategoryTreeVertex({
  category,
  children,
  posts,
  categoryIdToChildrenMap,
  categoryIdToPostsMap: categoryIdToPostMap,
}: {
  category: Partial<Category>;
  children?: Partial<Category>[];
  posts?: Partial<Post>[];
  categoryIdToChildrenMap: Map<string, Partial<Category>[]>;
  categoryIdToPostsMap: Map<string, Partial<Post>[]>;
}): AdminTreeCategoryVertex {
  const sortedChildren = children?.slice().sort(sortByOrder);
  const sortedPosts = posts?.slice().sort(sortByOrder);

  let childVerticies: AdminTreeVertex[] = [];
  if (sortedChildren) {
    childVerticies = childVerticies.concat(
      sortedChildren.map((child) =>
        buildCategoryTreeVertex({
          category: child,
          children: child?.id ? categoryIdToChildrenMap.get(child.id) : [],
          posts: child?.id ? categoryIdToPostMap.get(child.id) : [],
          categoryIdToChildrenMap,
          categoryIdToPostsMap: categoryIdToPostMap,
        })
      )
    );
  }

  if (sortedPosts) {
    childVerticies = childVerticies.concat(
      sortedPosts.map((post) => buildPostTreeVertex(post))
    );
  }

  return {
    id: category.id,
    title: category.title,
    type: 'Category',
    children: childVerticies,
    graphqlObject: category,
  };
}

/**
 * Massages a GraphQL query result into the data structure thats
 * React Arborist expects for the Tree component's data prop.
 * @param categoriesAndPosts An array of Categories queried from GraphQL,
 *  including lists of child category IDs and full child posts.
 * @returns A tree that can be dropped directly into React Arborist's
 * Tree component as the id prop.
 */
function organizeCategoriesAndPostsIntoArboristTree(
  categoriesAndPosts: Partial<Category>[]
): AdminTreeVertex[] {
  const categoryIdToChildrenMap = new Map<string, Partial<Category>[]>();
  const categoryIdToPostsMap = new Map<string, Partial<Post>[]>();
  const rootCategories: Partial<Category>[] = [];

  categoriesAndPosts.forEach((category: Partial<Category>) => {
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
      categoriesAndPosts.filter((potentialChild: Partial<Category>) =>
        childCategoryIds?.includes(potentialChild.id)
      ) || [];
    const childPosts = category.posts || [];

    categoryIdToChildrenMap.set(category.id, childCategories);
    categoryIdToPostsMap.set(category.id, childPosts);
  });

  return rootCategories
    .slice()
    .sort(sortByOrder)
    .map((rootCategory) =>
      buildCategoryTreeVertex({
        category: rootCategory,
        children: categoryIdToChildrenMap.get(rootCategory.id!),
        posts: categoryIdToPostsMap.get(rootCategory.id!),
        categoryIdToChildrenMap,
        categoryIdToPostsMap,
      })
    );
}

export default organizeCategoriesAndPostsIntoArboristTree;
