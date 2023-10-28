import Post from './post';

export interface CategoryWithoutRelationships {
  __typename: 'Category',
  createdAt: string;
  headerImage: string | null;
  id: NonNullable<string>;
  markdown: string;
  name: string;
  order: number;
  published: boolean;
  slug: string;
  subtitle: string;
  summary: string;
  title: string;
  updatedAt: string;
}

interface Category extends CategoryWithoutRelationships {
  parent: Partial<Category> | null;
  posts: Partial<Post>[];
  children: Partial<Category>[];
}

export default Category;
