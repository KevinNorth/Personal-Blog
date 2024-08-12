import { NavbarTreeVertex } from '../../components/blog/Navbar/types';
import Post from '../../graphql/types/post';
import organizePostsIntoTree from './orgainzePostsIntoTree';

function createVertex({ post, children }) {
  return {
    id: post.id,
    name: post.name,
    slug: post.slug,
    children,
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
  return organizePostsIntoTree(posts, createVertex);
}

export default organizePostsIntoNavbarTree;
