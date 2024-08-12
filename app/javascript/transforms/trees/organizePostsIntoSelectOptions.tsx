import React, { ReactElement } from 'react';
import Post from '../../graphql/types/post';
import organizePostsIntoTree from './orgainzePostsIntoTree';

interface OptionsTreeVertex {
  id: string;
  title: string;
  children: OptionsTreeVertex[];
}

function createVertex({ post, children }): OptionsTreeVertex {
  return {
    id: post.id,
    title: post.title,
    children,
  };
}

function createOptionsFromVertexAndAddToList({
  vertex,
  depth,
  options,
  postsToDisable,
}: {
  vertex: OptionsTreeVertex;
  depth: number;
  options: ReactElement[];
  postsToDisable: Partial<Post>[];
}): void {
  if (!vertex) {
    return;
  }

  const disabled = !!postsToDisable.find(
    (postToDisable) => postToDisable?.id === vertex.id
  );

  options.push(
    <option value={vertex.id} key={vertex.id} disabled={disabled}>
      {/* '\u00A0' is a non-breaking space, but here React renders "&nbsp;" as those characters instead of one space */}
      {'\u00A0'.repeat(depth * 3)}
      {vertex.title}
    </option>
  );

  vertex.children.forEach((child) => {
    createOptionsFromVertexAndAddToList({
      vertex: child,
      depth: depth + 1,
      options,
      postsToDisable,
    });
  });
}

/**
 * Massages a list of Posts into a list of <option> components that
 * can be dropped into a <select> component. The <option>s will be sorted
 * topographically by order, and their labels will be prepended with &nbsp;s
 * so it's easier to read the parent/child relationship between each post.
 * @param posts An array of posts queried from GraphQL,
 *  including lists of children posts' IDs and full child posts.
 * @param postsToDisable An array of posts. The <option>s corresponding to these
 *  posts will be disabled in the final result.
 * @returns A list of <option>s representing each post.
 */
function organizePostsIntoSelectOptions({
  posts,
  postsToDisable,
}: {
  posts: Partial<Post>[];
  postsToDisable: Partial<Post>[];
}): ReactElement[] {
  const optionsTreeRoots = organizePostsIntoTree(posts, createVertex);

  const options: ReactElement[] = [];

  optionsTreeRoots.forEach((root) => {
    createOptionsFromVertexAndAddToList({
      vertex: root,
      depth: 0,
      options,
      postsToDisable: postsToDisable || [],
    });
  });

  return options;
}

export default organizePostsIntoSelectOptions;
