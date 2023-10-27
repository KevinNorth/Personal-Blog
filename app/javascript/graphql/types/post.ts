import Category from './category';
import User from './user';

interface Post {
  author: User;
  category: Category;
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

export default Post;
