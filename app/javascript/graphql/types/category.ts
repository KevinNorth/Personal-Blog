import Post from './post';

interface Category {
  children: Category[];
  createdAt: string;
  headerImage: string | null;
  id: NonNullable<string>;
  markdown: string;
  name: string;
  order: number;
  parent: Category | null;
  posts: Post[];
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  updatedAt: string;
}

export default Category;
