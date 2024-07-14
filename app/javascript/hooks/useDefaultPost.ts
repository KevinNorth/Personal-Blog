import getAllPosts from '../graphql/queries/allPosts';
import Post from '../graphql/types/post';
import grabFirstTopLevelPost from '../transforms/grabFirstTopLevelPost';

export interface DefaultPostResult {
  loading: boolean;
  defaultPost: Partial<Post> | null;
}

function useDefaultPost(): DefaultPostResult {
  const { data, loading } = getAllPosts({
    includeUnpublished: false,
  });

  if (loading) {
    return { loading: true, defaultPost: null };
  }

  const defaultPost = grabFirstTopLevelPost(data.allPosts);
  return { loading: false, defaultPost };
}

export default useDefaultPost;
