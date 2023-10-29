import Category from '../graphql/types/category';
import Post from '../graphql/types/post';

export interface AdminTreeCategoryVertex {
  id?: string,
  title?: string,
  type: 'Category',
  children: AdminTreeVertex[],
  graphqlObject?: Partial<Category>
}

export interface AdminTreePostVertex {
  id?: string,
  title?: string,
  type: 'Post',
  children: null,
  graphqlObject?: Partial<Post>
}

export type AdminTreeVertex = AdminTreeCategoryVertex | AdminTreePostVertex ;
