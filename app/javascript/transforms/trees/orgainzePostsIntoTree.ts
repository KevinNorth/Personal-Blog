import Post from '../../graphql/types/post';
import sortByOrder from '../../lib/sortByOrder';

export interface CreateVertexArguments<Vertex> {
  post: Partial<Post>;
  children: Vertex[];
}

function buildTreeVertex<Vertex>({
  post,
  children,
  postIdToChildrenMap,
  createVertex,
}: {
  post: Partial<Post>;
  children?: Partial<Post>[];
  postIdToChildrenMap: Map<string, Partial<Post>[]>;
  createVertex: (CreateVertexArguments) => Vertex;
}): Vertex {
  const sortedChildren = children?.slice().sort(sortByOrder);

  let childVerticies: Vertex[] = [];
  if (sortedChildren) {
    childVerticies = childVerticies.concat(
      sortedChildren.map((child) =>
        buildTreeVertex({
          post: child,
          children: child?.id ? postIdToChildrenMap.get(child.id) : [],
          postIdToChildrenMap,
          createVertex,
        })
      )
    );
  }

  return createVertex({ post, children: childVerticies });
}

/**
 * Massages a GraphQL query result into the data structure that
 * React Arborist expects for the Tree component's data prop.
 * @param posts An array of posts queried from GraphQL,
 *  including lists of children posts' IDs and full child posts.
 * @returns A tree that can be dropped directly into React Arborist's
 *  Tree component as the data prop.
 */
function organizePostsIntoTree<Vertex>(
  posts: Partial<Post>[],
  createVertex: (CreateVertexArguments) => Vertex
): Vertex[] {
  const postIdToChildrenMap = new Map<string, Partial<Post>[]>();
  const rootPosts: Partial<Post>[] = [];

  posts.forEach((post: Partial<Post>) => {
    if (!post.id) {
      return;
    }

    if (!post.parent) {
      rootPosts.push(post);
    }

    const childPosts = posts
      .filter((childPost) => childPost.parent?.id === post.id)
      .sort(sortByOrder);
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
        createVertex,
      })
    );
}

export default organizePostsIntoTree;
