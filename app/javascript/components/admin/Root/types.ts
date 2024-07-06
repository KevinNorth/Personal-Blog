import Post from '../../../graphql/types/post';

export interface AdminTreeVertex {
  id?: string;
  title?: string;
  children: Partial<Post>[] | null;
  graphqlObject?: Partial<Post>;
}
