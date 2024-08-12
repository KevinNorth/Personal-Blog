import Post from '../graphql/types/post';

export interface FindDescendantsOfPostResult {
  descendants: Partial<Post>[];
  notDescendants: Partial<Post>[];
}

function getChildren(
  post: Partial<Post>,
  allPosts: Partial<Post>[]
): Partial<Post>[] {
  const childrenIds = post.children?.map((child) => child.id) || [];
  return allPosts.filter((child) => childrenIds.includes(child.id));
}

function walkDescendants(
  descendant: Partial<Post>,
  allPosts: Partial<Post>[],
  result: FindDescendantsOfPostResult
): void {
  const children = getChildren(descendant, allPosts);
  children.forEach((child) => {
    walkDescendants(child, allPosts, result);
  });

  result.descendants.push(descendant);
}

function walkNonDescendants(
  nonDescendant: Partial<Post>,
  chosenAncestor: Partial<Post>,
  allPosts: Partial<Post>[],
  result: FindDescendantsOfPostResult
): void {
  const children = getChildren(nonDescendant, allPosts);

  if (nonDescendant.id === chosenAncestor.id) {
    children.forEach((child) => {
      walkDescendants(child, allPosts, result);
    });
  } else {
    children.forEach((child) => {
      walkNonDescendants(child, chosenAncestor, allPosts, result);
    });

    result.notDescendants.push(nonDescendant);
  }
}

export default function findDescendantsOfPost(
  post: Partial<Post>,
  allPosts: Partial<Post>[]
) {
  if (!post) {
    return {
      descendants: allPosts,
      notDescendants: [],
    };
  }

  const result: FindDescendantsOfPostResult = {
    descendants: [],
    notDescendants: [],
  };

  const topLevelPosts = allPosts.filter((p) => !p.parent);

  topLevelPosts.forEach((topLevelPost) => {
    walkNonDescendants(topLevelPost, post, allPosts, result);
  });

  return result;
}
