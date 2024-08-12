import Post from '../graphql/types/post';

export interface FindDescendantsOfPostResult {
  descendants: Partial<Post>[];
  notDescendants: Partial<Post>[];
}

function walkDescendants(
  descendant: Partial<Post>,
  result: FindDescendantsOfPostResult
): void {
  descendant.children?.forEach((child) => {
    walkDescendants(child, result);
  });

  result.descendants.push(descendant);
}

function walkNonDescendants(
  nonDescendant: Partial<Post>,
  chosenAncestor: Partial<Post>,
  result: FindDescendantsOfPostResult
): void {
  if (nonDescendant.id === chosenAncestor.id) {
    nonDescendant.children?.forEach((child) => {
      walkDescendants(child, result);
    });
  } else {
    nonDescendant.children?.forEach((child) => {
      walkNonDescendants(child, chosenAncestor, result);
    });

    result.notDescendants.push(nonDescendant);
  }
}

export default function findDescendantsOfPost(
  post: Partial<Post>,
  allPosts: Partial<Post>[]
) {
  const result: FindDescendantsOfPostResult = {
    descendants: [],
    notDescendants: [],
  };

  const topLevelPosts = allPosts.filter((p) => !p.parent);

  topLevelPosts.forEach((topLevelPost) => {
    walkNonDescendants(topLevelPost, post, result);
  });

  return result;
}
