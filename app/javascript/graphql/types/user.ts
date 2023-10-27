import Post from './post';

interface User {
  admin: boolean;
  createdAt: string;
  id: NonNullable<string>;
  login: string;
  name: string;
  posts: Post[];
  updatedAt: string;
}

export default User;
