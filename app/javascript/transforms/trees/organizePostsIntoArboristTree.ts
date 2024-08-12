import { AdminTreeVertex } from '../../components/admin/Root/types';
import Post from '../../graphql/types/post';
import organizePostsIntoTree from './orgainzePostsIntoTree';

function createVertex({ post, children }) {
  return {
    id: post.id,
    title: post.title,
    children,
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
  return organizePostsIntoTree(posts, createVertex);
}

export default organizePostsIntoArboristTree;
