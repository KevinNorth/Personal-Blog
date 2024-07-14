import { mockPosts } from '../../__tests__/fixtures/allPosts';
import { AdminTreeVertex } from '../../components/admin/Root/types';
import Post from '../../graphql/types/post';
import organizePostsIntoArboristTree from '../organizePostsIntoArboristTree';
import { allPostsAsArboristTree } from './fixtures/allPostsAsArboristTree';

describe('test', () => {
  describe('when given an empty array', () => {
    it('returns an empty array', () => {
      expect(organizePostsIntoArboristTree([])).toEqual([]);
    });
  });

  describe('when given only top-level posts', () => {
    it('returns a flat structure', () => {
      const posts: Post[] = [
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '1',
          markdown: 'Lorem Ipsum',
          name: 'Test 1',
          order: 1,
          parent: null,
          published: true,
          slug: 'test-1',
          subtitle: 'Test 1',
          summary: 'Test 1',
          title: 'Test 1',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '2',
          markdown: 'Lorem Ipsum',
          name: 'Test 2',
          order: 2,
          parent: null,
          published: true,
          slug: 'test-2',
          subtitle: 'Test 2',
          summary: 'Test 2',
          title: 'Test 2',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '3',
          markdown: 'Lorem Ipsum',
          name: 'Test 3',
          order: 3,
          parent: null,
          published: true,
          slug: 'test-3',
          subtitle: 'Test 3',
          summary: 'Test 3',
          title: 'Test 3',
          updatedAt: '2023-10-28',
        },
      ];

      const expectedTree = posts.map(
        (post): AdminTreeVertex => ({
          id: post.id,
          title: post.title,
          children: [],
          graphqlObject: post,
        })
      );

      expect(organizePostsIntoArboristTree(posts)).toEqual(expectedTree);
    });
  });

  describe('when given nested posts', () => {
    it('renders the correct tree', () => {
      // There's a lot of test data here. There's no magic to it,
      // I just wrote all of it by hand!
      const rootPosts: Post[] = [
        {
          __typename: 'Post',
          children: [{ id: '4' }, { id: '5' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '1',
          markdown: 'Lorem Ipsum',
          name: 'Test 1',
          order: 1,
          parent: null,
          published: true,
          slug: 'test-1',
          subtitle: 'Test 1',
          summary: 'Test 1',
          title: 'Test 1',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [{ id: '6' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '2',
          markdown: 'Lorem Ipsum',
          name: 'Test 2',
          order: 2,
          parent: null,
          published: true,
          slug: 'test-2',
          subtitle: 'Test 2',
          summary: 'Test 2',
          title: 'Test 2',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [{ id: '7' }, { id: '8' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '3',
          markdown: 'Lorem Ipsum',
          name: 'Test 3',
          order: 3,
          parent: null,
          published: true,
          slug: 'test-3',
          subtitle: 'Test 3',
          summary: 'Test 3',
          title: 'Test 3',
          updatedAt: '2023-10-28',
        },
      ];

      const post1Children: Post[] = [
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '4',
          markdown: 'Lorem Ipsum',
          name: 'Test 1-4',
          order: 1,
          parent: { id: '1' },
          published: true,
          slug: 'test-4',
          subtitle: 'Test 1-4',
          summary: 'Test 1-4',
          title: 'Test 1-4',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '5',
          markdown: 'Lorem Ipsum',
          name: 'Test 1-5',
          order: 2,
          parent: { id: '1' },
          published: true,
          slug: 'test-5',
          subtitle: 'Test 1-5',
          summary: 'Test 1-5',
          title: 'Test 1-5',
          updatedAt: '2023-10-28',
        },
      ];

      const post2Children: Post[] = [
        {
          __typename: 'Post',
          children: [{ id: '9' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '6',
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6',
          order: 1,
          parent: { id: '2' },
          published: true,
          slug: 'test-6',
          subtitle: 'Test 2-6',
          summary: 'Test 2-6',
          title: 'Test 2-6',
          updatedAt: '2023-10-28',
        },
      ];

      const post3Children: Post[] = [
        {
          __typename: 'Post',
          children: [{ id: '10' }, { id: '11' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '7',
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7',
          order: 1,
          parent: { id: '3' },
          published: true,
          slug: 'test-7',
          subtitle: 'Test 3-7',
          summary: 'Test 3-7',
          title: 'Test 3-7',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [{ id: '12' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '8',
          markdown: 'Lorem Ipsum',
          name: 'Test 3-8',
          order: 2,
          parent: { id: '3' },
          published: true,
          slug: 'test-8',
          subtitle: 'Test 3-8',
          summary: 'Test 3-8',
          title: 'Test 3-8',
          updatedAt: '2023-10-28',
        },
      ];

      const post6Children: Post[] = [
        {
          __typename: 'Post',
          children: [{ id: '13' }],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '9',
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6-9',
          order: 1,
          parent: { id: '6' },
          published: true,
          slug: 'test-9',
          subtitle: 'Test 2-6-9',
          summary: 'Test 2-6-9',
          title: 'Test 2-6-9',
          updatedAt: '2023-10-28',
        },
      ];

      const post7Children: Post[] = [
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '10',
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7-10',
          order: 1,
          parent: { id: '7' },
          published: true,
          slug: 'test-10',
          subtitle: 'Test 3-7-10',
          summary: 'Test 3-7-10',
          title: 'Test 3-7-10',
          updatedAt: '2023-10-28',
        },
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '11',
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7-11',
          order: 2,
          parent: { id: '7' },
          published: true,
          slug: 'test-11',
          subtitle: 'Test 3-7-11',
          summary: 'Test 3-7-11',
          title: 'Test 3-7-11',
          updatedAt: '2023-10-28',
        },
      ];

      const post8Children: Post[] = [
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '12',
          markdown: 'Lorem Ipsum',
          name: 'Test 3-8-12',
          order: 1,
          parent: { id: '8' },
          published: true,
          slug: 'test-9',
          subtitle: 'Test 3-8-12',
          summary: 'Test 3-8-12',
          title: 'Test 3-8-12',
          updatedAt: '2023-10-28',
        },
      ];

      const category9Children: Post[] = [
        {
          __typename: 'Post',
          children: [],
          author: {
            __typename: 'User',
            id: '1',
          },
          createdAt: '2023-10-28',
          headerImage: null,
          id: '13',
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6-9-13',
          order: 1,
          parent: { id: '9' },
          published: true,
          slug: 'test-13',
          subtitle: 'Test 2-6-9-13',
          summary: 'Test 2-6-9-13',
          title: 'Test 2-6-9-13',
          updatedAt: '2023-10-28',
        },
      ];

      const posts: Post[] = [
        ...rootPosts,
        ...post1Children,
        ...post2Children,
        ...post3Children,
        ...post6Children,
        ...post7Children,
        ...post8Children,
        ...category9Children,
      ];

      const expectedTree: AdminTreeVertex[] = [
        {
          id: rootPosts[0].id,
          title: rootPosts[0].title,
          graphqlObject: rootPosts[0],
          children: [
            {
              id: post1Children[0].id,
              title: post1Children[0].title,
              graphqlObject: post1Children[0],
              children: [],
            },
            {
              id: post1Children[1].id,
              title: post1Children[1].title,
              graphqlObject: post1Children[1],
              children: [],
            },
          ],
        },
        {
          id: rootPosts[1].id,
          title: rootPosts[1].title,
          graphqlObject: rootPosts[1],
          children: [
            {
              id: post2Children[0].id,
              title: post2Children[0].title,
              graphqlObject: post2Children[0],
              children: [
                {
                  id: post6Children[0].id,
                  title: post6Children[0].title,
                  graphqlObject: post6Children[0],
                  children: [
                    {
                      id: category9Children[0].id,
                      title: category9Children[0].title,
                      graphqlObject: category9Children[0],
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: rootPosts[2].id,
          title: rootPosts[2].title,
          graphqlObject: rootPosts[2],
          children: [
            {
              id: post3Children[0].id,
              title: post3Children[0].title,
              graphqlObject: post3Children[0],
              children: [
                {
                  id: post7Children[0].id,
                  title: post7Children[0].title,
                  graphqlObject: post7Children[0],
                  children: [],
                },
                {
                  id: post7Children[1].id,
                  title: post7Children[1].title,
                  graphqlObject: post7Children[1],
                  children: [],
                },
              ],
            },
            {
              id: post3Children[1].id,
              title: post3Children[1].title,
              graphqlObject: post3Children[1],
              children: [
                {
                  id: post8Children[0].id,
                  title: post8Children[0].title,
                  graphqlObject: post8Children[0],
                  children: [],
                },
              ],
            },
          ],
        },
      ];

      expect(organizePostsIntoArboristTree(posts)).toEqual(expectedTree);
    });
  });

  describe('when given a realistic input', () => {
    it('produces the correct tree', () => {
      expect(organizePostsIntoArboristTree(mockPosts)).toEqual(
        allPostsAsArboristTree
      );
    });
  });
});
