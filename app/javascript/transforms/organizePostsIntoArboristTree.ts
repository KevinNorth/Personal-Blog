import { AdminTreeVertex } from '../components/admin/Root/types';
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
}): AdminTreeVertex {
  const sortedChildren = children?.slice().sort(sortByOrder);

  let childVerticies: AdminTreeVertex[] = [];
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
    title: post.title,
    children: childVerticies,
    graphqlObject: post,
  };
}

/**
 * Massages a GraphQL query result into the data structure that
 * React Arborist expects for the Tree component's data prop.
 * @param posts An array of posts queried from GraphQL,
 *  including lists of children posts' IDs and full child posts.
 * @returns A tree that can be dropped directly into React Arborist's
 *  Tree component as the data prop.
 */
function organizePostsIntoArboristTree(
  posts: Partial<Post>[]
): AdminTreeVertex[] {
  const postIdToChildrenMap = new Map<string, Partial<Post>[]>();
  const rootPosts: Partial<Post>[] = [];

  posts.forEach((post: Partial<Post>) => {
    if (!post.id) {
      return;
    }

    if (!post.parent) {
      rootPosts.push(post);
    }

    const childPosts = post.children || [];
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

export default organizePostsIntoArboristTree;
