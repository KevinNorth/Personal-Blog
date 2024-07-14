import { NavbarTreeVertex } from '../components/blog/Navbar/types';
import Post from '../graphql/types/post';
import sortByOrder from '../lib/sortByOrder';

function buildTreeVertex({
  post,
  children,
  postIdToChildrenMap,
}: {
  post: Partial<Post>;
  children?: Partial<Post>[];
  postIdToChildrenMap: Map<string, Partial<Post>[]>;
}): NavbarTreeVertex {
  const sortedChildren = children?.slice().sort(sortByOrder);

  let childVerticies: NavbarTreeVertex[] = [];
  if (sortedChildren) {
    childVerticies = childVerticies.concat(
      sortedChildren.map((child) =>
        buildTreeVertex({
          post: child,
          children: child?.id ? postIdToChildrenMap.get(child.id) : [],
          postIdToChildrenMap,
        })
      )
    );
  }

  return {
    id: post.id,
    name: post.name,
    slug: post.slug,
    children: childVerticies,
  };
}

/**
 * Massages a GraphQL query result into the data structure that
 * BlogNavbar expects for the tree prop.
 * @param posts An array Posts Categories queried from GraphQL,
 *  including lists of child posts.
 * @returns A tree that can be dropped directly into the BlogNavbar
 * component as the tree prop.
 */
function organizePostsIntoNavbarTree(
  posts: Partial<Post>[]
): NavbarTreeVertex[] {
  const postIdToChildrenMap = new Map<string, Partial<Post>[]>();
  const rootPosts: Partial<Post>[] = [];

  posts.forEach((post: Partial<Post>) => {
    if (!post.id) {
      return;
    }

    if (!post.parent) {
      rootPosts.push(post);
    }

    const childPostIds = post.children
      ?.map((child: { id?: string }) => child?.id)
      .filter((id) => id !== undefined);
    const childPosts =
      posts.filter((potentialChild: Partial<Post>) =>
        childPostIds?.includes(potentialChild.id)
      ) || [];

    postIdToChildrenMap.set(post.id, childPosts);
  });

  return rootPosts
    .slice()
    .sort(sortByOrder)
    .map((rootPost) =>
      buildTreeVertex({
        post: rootPost,
        children: postIdToChildrenMap.get(rootPost.id!),
        postIdToChildrenMap,
      })
    );
}

export default organizePostsIntoNavbarTree;
