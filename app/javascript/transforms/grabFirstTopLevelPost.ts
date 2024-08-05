import Post from '../graphql/types/post';
import sortByOrder from '../lib/sortByOrder';

function grabFirstTopLevelPost(posts: Partial<Post>[]): Partial<Post> | null {
  if (posts.length === 0) {
    return null;
  }

  const topLevelPosts = posts.filter((p) => p.parent === null);
  const inOrder = topLevelPosts.sort(sortByOrder);
  const firstTopLevelPost = inOrder.length === 0 ? null : inOrder[0];

  return firstTopLevelPost;
}

export default grabFirstTopLevelPost;
