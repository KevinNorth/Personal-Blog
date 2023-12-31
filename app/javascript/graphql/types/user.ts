import Post from './post';

export interface UserWithoutRelationships {
  __typename: 'User';
  createdAt: string;
  id: NonNullable<string>;
  login: string;
  name: string;
  updatedAt: string;
}

interface User extends UserWithoutRelationships {
  posts: Partial<Post>[];
}

export default User;
