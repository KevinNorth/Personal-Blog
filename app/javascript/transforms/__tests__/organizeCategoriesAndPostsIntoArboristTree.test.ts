import organizeCategoriesAndPostsIntoArboristTree from '../organizeCategoriesAndPostsIntoArboristTree';
import { mockCategoriesAndPosts, categoriesAndPostsAsArboristTree } from './fixtures/allCategoriesAndPosts';
import Category from '../../graphql/types/category';

describe('test', () => {
  describe('when given an empty array', () => {
    it('returns an empty array', () => {
      expect(organizeCategoriesAndPostsIntoArboristTree([])).toEqual([]);
    });
  });

  describe('when given only top-level categories', () => {
    it('return a flat structure', () => {
      const categories: Category[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 1,
          markdown: 'Lorem Ipsum',
          name: 'Test 1',
          order: 1,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-1',
          subtitle: 'Test 1',
          summary: 'Test 1',
          title: 'Test 1',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 2,
          markdown: 'Lorem Ipsum',
          name: 'Test 2',
          order: 2,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-2',
          subtitle: 'Test 2',
          summary: 'Test 2',
          title: 'Test 2',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 3,
          markdown: 'Lorem Ipsum',
          name: 'Test 3',
          order: 3,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-3',
          subtitle: 'Test 3',
          summary: 'Test 3',
          title: 'Test 3',
          updatedAt: '2023-10-28',        
        },
      ];

      const expectedTree = categories.map((category): ArboristTreeVertex => ({
        id: category.id,
        title: category.title,
        type: 'Category',
        children: [],
        graphqlObject: category,    
      }));

      expect(organizeCategoriesAndPostsIntoArboristTree(categories)).toEqual(expectedTree);
    });
  });

  describe('when given categories with posts', () => {
    it('includes the posts in the tree', () => {
      const categories: Category[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 1,
          markdown: 'Lorem Ipsum',
          name: 'Test 1',
          order: 1,
          parent: null,
          posts: [
            {
              __typename: 'Post',
              createdAt: '2023-10-28',
              headerImage: null,
              id: 1,
              markdown: 'Lorem Ipsum',
              order: 1,
              published: true,
              slug: 'post-1',
              subtitle: 'Post 1',
              summary: 'Post 1',
              title: 'Post 1',
              updatedAt: '2023-10-28',            
            },
            {
              __typename: 'Post',
              createdAt: '2023-10-28',
              headerImage: null,
              id: 2,
              markdown: 'Lorem Ipsum',
              order: 2,
              published: true,
              slug: 'post-2',
              subtitle: 'Post 2',
              summary: 'Post 2',
              title: 'Post 2',
              updatedAt: '2023-10-28',            
            }
          ],
          published: true,
          slug: 'test-1',
          subtitle: 'Test 1',
          summary: 'Test 1',
          title: 'Test 1',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 2,
          markdown: 'Lorem Ipsum',
          name: 'Test 2',
          order: 2,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-2',
          subtitle: 'Test 2',
          summary: 'Test 2',
          title: 'Test 2',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 3,
          markdown: 'Lorem Ipsum',
          name: 'Test 3',
          order: 3,
          parent: null,
          posts: [
            {
              __typename: 'Post',
              createdAt: '2023-10-28',
              headerImage: null,
              id: 3,
              markdown: 'Lorem Ipsum',
              order: 1, // Posts in different categories can have the same order
              published: true,
              slug: 'post-3',
              subtitle: 'Post 3',
              summary: 'Post 3',
              title: 'Post 3',
              updatedAt: '2023-10-28',            
            }
          ],
          published: true,
          slug: 'test-3',
          subtitle: 'Test 3',
          summary: 'Test 3',
          title: 'Test 3',
          updatedAt: '2023-10-28',        
        },
      ];

      const expectedTree = categories.map((category): ArboristTreeVertex => ({
        id: category.id,
        title: category.title,
        type: 'Category',
        children: category.posts.map((post): ArboristTreeVertex => ({
          id: post.id,
          title: post.title,
          type: 'Post',
          children: [],
          graphqlObject: post,
        })),
        graphqlObject: category,    
      }));

      expect(organizeCategoriesAndPostsIntoArboristTree(categories)).toEqual(expectedTree);
    });
  });

  describe('when given nested categories', () => {
    it('renders the correct tree', () => {
      // There's a lot of test data here. There's no magic to it,
      // I just wrote all of it by hand!
      const rootCategories: Category[] = [
        {
          __typename: 'Category',
          children: [{ id: 4 }, { id: 5 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 1,
          markdown: 'Lorem Ipsum',
          name: 'Test 1',
          order: 1,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-1',
          subtitle: 'Test 1',
          summary: 'Test 1',
          title: 'Test 1',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [{ id: 6 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 2,
          markdown: 'Lorem Ipsum',
          name: 'Test 2',
          order: 2,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-2',
          subtitle: 'Test 2',
          summary: 'Test 2',
          title: 'Test 2',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [{ id: 7 }, { id: 8 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 3,
          markdown: 'Lorem Ipsum',
          name: 'Test 3',
          order: 3,
          parent: null,
          posts: [],
          published: true,
          slug: 'test-3',
          subtitle: 'Test 3',
          summary: 'Test 3',
          title: 'Test 3',
          updatedAt: '2023-10-28',        
        },
      ];

      const category1Children: Categories[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 4,
          markdown: 'Lorem Ipsum',
          name: 'Test 1-4',
          order: 1,
          parent: { id: 1 },
          posts: [],
          published: true,
          slug: 'test-4',
          subtitle: 'Test 1-4',
          summary: 'Test 1-4',
          title: 'Test 1-4',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 5,
          markdown: 'Lorem Ipsum',
          name: 'Test 1-5',
          order: 2,
          parent: { id: 1 },
          posts: [],
          published: true,
          slug: 'test-5',
          subtitle: 'Test 1-5',
          summary: 'Test 1-5',
          title: 'Test 1-5',
          updatedAt: '2023-10-28',        
        },
      ];

      const category2Children: Categories[] = [
        {
          __typename: 'Category',
          children: [{ id: 9 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 6,
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6',
          order: 1,
          parent: { id: 2 },
          posts: [],
          published: true,
          slug: 'test-6',
          subtitle: 'Test 2-6',
          summary: 'Test 2-6',
          title: 'Test 2-6',
          updatedAt: '2023-10-28',        
        },
      ];

      const category3Children: Categories[] = [
        {
          __typename: 'Category',
          children: [{ id: 10 }, { id: 11 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 7,
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7',
          order: 1,
          parent: { id: 3 },
          posts: [],
          published: true,
          slug: 'test-7',
          subtitle: 'Test 3-7',
          summary: 'Test 3-7',
          title: 'Test 3-7',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [{ id: 12 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 8,
          markdown: 'Lorem Ipsum',
          name: 'Test 3-8',
          order: 2,
          parent: { id: 3 },
          posts: [],
          published: true,
          slug: 'test-8',
          subtitle: 'Test 3-8',
          summary: 'Test 3-8',
          title: 'Test 3-8',
          updatedAt: '2023-10-28',        
        },
      ];

      const category6Children: Categories[] = [
        {
          __typename: 'Category',
          children: [{ id: 13 }],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 9,
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6-9',
          order: 1,
          parent: { id: 6 },
          posts: [],
          published: true,
          slug: 'test-9',
          subtitle: 'Test 2-6-9',
          summary: 'Test 2-6-9',
          title: 'Test 2-6-9',
          updatedAt: '2023-10-28',        
        },
      ];

      const category7Children: Categories[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 10,
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7-10',
          order: 1,
          parent: { id: 7 },
          posts: [],
          published: true,
          slug: 'test-10',
          subtitle: 'Test 3-7-10',
          summary: 'Test 3-7-10',
          title: 'Test 3-7-10',
          updatedAt: '2023-10-28',        
        },
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 11,
          markdown: 'Lorem Ipsum',
          name: 'Test 3-7-11',
          order: 2,
          parent: { id: 7 },
          posts: [],
          published: true,
          slug: 'test-11',
          subtitle: 'Test 3-7-11',
          summary: 'Test 3-7-11',
          title: 'Test 3-7-11',
          updatedAt: '2023-10-28',        
        },
      ];

      const category8Children: Categories[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 12,
          markdown: 'Lorem Ipsum',
          name: 'Test 3-8-12',
          order: 1,
          parent: { id: 8 },
          posts: [],
          published: true,
          slug: 'test-9',
          subtitle: 'Test 3-8-12',
          summary: 'Test 3-8-12',
          title: 'Test 3-8-12',
          updatedAt: '2023-10-28',        
        },
      ];

      const category9Children: Categories[] = [
        {
          __typename: 'Category',
          children: [],
          createdAt: '2023-10-28',
          headerImage: null,
          id: 13,
          markdown: 'Lorem Ipsum',
          name: 'Test 2-6-9-13',
          order: 1,
          parent: { id: 9 },
          posts: [],
          published: true,
          slug: 'test-13',
          subtitle: 'Test 2-6-9-13',
          summary: 'Test 2-6-9-13',
          title: 'Test 2-6-9-13',
          updatedAt: '2023-10-28',        
        },
      ];

      const categories: Category[] = [
        ...rootCategories,
        ...category1Children,
        ...category2Children,
        ...category3Children,
        ...category6Children,
        ...category7Children,
        ...category8Children,
        ...category9Children,
      ];

      const expectedTree: ArboristTreeVertex[] = [
        {
          id: rootCategories[0].id,
          title: rootCategories[0].title,
          type: 'Category',
          graphqlObject: rootCategories[0],
          children: [
            {
              id: category1Children[0].id,
              title: category1Children[0].title,
              type: 'Category',
              graphqlObject: category1Children[0],
              children: []
            },
            {
              id: category1Children[1].id,
              title: category1Children[1].title,
              type: 'Category',
              graphqlObject: category1Children[1],
              children: []
            },
          ]
        },
        {
          id: rootCategories[1].id,
          title: rootCategories[1].title,
          type: 'Category',
          graphqlObject: rootCategories[1],
          children: [
            {
              id: category2Children[0].id,
              title: category2Children[0].title,
              type: 'Category',
              graphqlObject: category2Children[0],
              children: [
                {
                  id: category6Children[0].id,
                  title: category6Children[0].title,
                  type: 'Category',
                  graphqlObject: category6Children[0],
                  children: [
                    {
                      id: category9Children[0].id,
                      title: category9Children[0].title,
                      type: 'Category',
                      graphqlObject: category9Children[0],
                      children: [],
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          id: rootCategories[2].id,
          title: rootCategories[2].title,
          type: 'Category',
          graphqlObject: rootCategories[2],
          children: [
            {
              id: category3Children[0].id,
              title: category3Children[0].title,
              type: 'Category',
              graphqlObject: category3Children[0],
              children: [
                {
                  id: category7Children[0].id,
                  title: category7Children[0].title,
                  type: 'Category',
                  graphqlObject: category7Children[0],
                  children: [],
                },
                {
                  id: category7Children[1].id,
                  title: category7Children[1].title,
                  type: 'Category',
                  graphqlObject: category7Children[1],
                  children: [],
                },
              ],
            },
            {
              id: category3Children[1].id,
              title: category3Children[1].title,
              type: 'Category',
              graphqlObject: category3Children[1],
              children: [
                {
                  id: category8Children[0].id,
                  title: category8Children[0].title,
                  type: 'Category',
                  graphqlObject: category8Children[0],
                  children: [],
                }
              ]
            },
          ]
        },
      ];

      expect(organizeCategoriesAndPostsIntoArboristTree(categories)).toEqual(expectedTree);
    });
  });

  describe('when given a realistic input', () => {
    it('produces the correct tree', () => {
      expect(
        organizeCategoriesAndPostsIntoArboristTree(mockCategoriesAndPosts.data.categories)
      ).toEqual(categoriesAndPostsAsArboristTree);
    });
  });
});
