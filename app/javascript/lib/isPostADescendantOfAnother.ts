import Post from '../graphql/types/post';

export default function isPostADescendantOfAnother({
  potentialDescendant,
  potentialAncestor,
  allPosts,
}: {
  potentialDescendant: Partial<Post>;
  potentialAncestor: Partial<Post>;
  allPosts: Partial<Post>[];
}): boolean {
  let ancestor = allPosts.find(
    (post) => post.id === potentialDescendant.parent?.id
  );

  while (ancestor) {
    if (ancestor.id === potentialAncestor.id) {
      return true;
    }

    ancestor = allPosts.find((post) => post.id === ancestor.parent?.id);
  }

  return false;
}
