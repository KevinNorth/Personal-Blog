import Post from '../../../graphql/types/post';

export interface AdminTreeVertex {
  id?: string;
  title?: string;
  children: AdminTreeVertex[] | null;
  graphqlObject?: Partial<Post>;
}
