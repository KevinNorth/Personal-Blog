import Category from './category';
import User from './user';

export interface PostWithoutRelationships {
  __typename: 'Post';
  createdAt: string;
  headerImage: string | null;
  id: NonNullable<string>;
  markdown: string;
  order: number;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  updatedAt: string;
}

interface Post extends PostWithoutRelationships {
  author: Partial<User>;
  category: Partial<Category>;
}

export default Post;
