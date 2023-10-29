export const mockCategoriesAndPosts = {
  data: {
    categories: [
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '1',
        markdown: 'Lorem Ipsum',
        name: 'Home',
        order: 1,
        published: true,
        slug: 'index',
        subtitle: "Give me a hard problem and cut me loose. I'll make the impossible seem effortless.",
        summary: null,
        title: 'Home',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: null,
        children: [],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '2',
        markdown: 'Lorem Ipsum',
        name: 'Accomplishments',
        order: 2,
        published: true,
        slug: 'accomplishments',
        subtitle: 'No ordinary developer.',
        summary: 'A list of projects under my belt that go above and beyond what you would expect from a typical dev.',
        title: 'Accomplishments',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: null,
        children: [
          {
            id: '5',
            __typename: 'Category'
          },
          {
            id: '6',
            __typename: 'Category'
          },
          {
            id: '7',
            __typename: 'Category'
          }
        ],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '3',
        markdown: 'Lorem Ipsum',
        name: 'About',
        order: 3,
        published: false,
        slug: 'about',
        subtitle: 'A mind at home in complexity.',
        summary: 'Who I am.',
        title: 'About Me',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: null,
        children: [],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '4',
        markdown: 'Lorem Ipsum',
        name: 'Contact',
        order: 4,
        published: true,
        slug: 'contact',
        subtitle: "Let's chat!",
        summary: 'My contact information.',
        title: 'Contact',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: null,
        children: [],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '5',
        markdown: 'Lorem Ipsum',
        name: 'Applied Systems',
        order: 1,
        published: true,
        slug: 'applied-systems',
        subtitle: 'Career Milestones',
        summary: 'Exceptional projects from my career.',
        title: 'Applied Systems',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '2',
          __typename: 'Category'
        },
        children: [
          {
            id: '8',
            __typename: 'Category'
          },
          {
            id: '9',
            __typename: 'Category'
          }
        ],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '6',
        markdown: 'Lorem Ipsum',
        name: 'Research',
        order: 2,
        published: true,
        slug: 'research',
        subtitle: "Master's Degree in Computer Science",
        summary: 'Research and other accomlishments from my graduate program at the University of Nebraska–Lincoln.',
        title: 'Research',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '2',
          __typename: 'Category'
        },
        children: [],
        posts: [
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '4',
            markdown: 'Lorem Ipsum',
            order: 1,
            published: true,
            slug: 'gitvs',
            subtitle: 'A practical combination of Git, visualization, and music',
            summary: 'A tool to explore Git history that combines traditional visualizations with sound.',
            title: 'GitVS',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          },
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '5',
            markdown: 'Lorem Ipsum',
            order: 3,
            published: true,
            slug: 'research-conference',
            subtitle: 'Public speaking is no problem.',
            summary: 'A presentation at a research conference in Italy.',
            title: 'Presentation at ESEC/FSE 2015',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          }
        ]
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '7',
        markdown: 'Lorem Ipsum',
        name: 'Personal Projects',
        order: 3,
        published: true,
        slug: 'personal-projects',
        subtitle: 'My mind does not turn off at 5pm.',
        summary: 'When I say I love a hard problem, I mean it. I literally took on these development projects for fun.',
        title: 'Personal Projects',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '2',
          __typename: 'Category'
        },
        children: [
          {
            id: '10',
            __typename: 'Category'
          },
          {
            id: '11',
            __typename: 'Category'
          },
          {
            id: '12',
            __typename: 'Category'
          }
        ],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '8',
        markdown: 'Lorem Ipsum',
        name: 'Epic Quotes',
        order: 1,
        published: true,
        slug: 'epic-quotes',
        subtitle: 'A Ruby on Rails/React webapp',
        summary: 'A React and Rails app that I worked on from its inception to its long-term support phase.',
        title: 'Epic Quotes',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '5',
          __typename: 'Category'
        },
        children: [],
        posts: [
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '1',
            markdown: 'Lorem Ipsum',
            order: 2,
            published: true,
            slug: 'backend-refactor',
            subtitle: 'Saving a Major Client',
            summary: "When we couldn't onboard a major client, I refactored our entire backend to keep them.",
            title: 'Parent/Child Agency Refactoring',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          },
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '2',
            markdown: 'Lorem Ipsum',
            order: 3,
            published: true,
            slug: 'copy-quote-algorithm',
            subtitle: 'Rails Metaprogramming and Graph Theory',
            summary: 'An algorithm I wrote uses the right kind of cleverness to require virtually no further maintenance.',
            title: 'Copy Quote Algorithm',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          }
        ]
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '9',
        markdown: 'Lorem Ipsum',
        name: 'Applied Anaylitics',
        order: 2,
        published: true,
        slug: 'applied-analytics',
        subtitle: 'A Looker and BigQuery project',
        summary: 'Creating a business intelligence project under an aggressive timeline.',
        title: 'Applied Analytics',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '5',
          __typename: 'Category'
        },
        children: [],
        posts: [
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '3',
            markdown: 'Lorem Ipsum',
            order: 1,
            published: true,
            slug: 'team-quarterback',
            subtitle: 'On time and under budget.',
            summary: 'I served as team lead for a critical six-month project.',
            title: 'Team Quarterback',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          }
        ]
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '10',
        markdown: 'Lorem Ipsum',
        name: 'This Website',
        order: 1,
        published: true,
        slug: 'this-website',
        subtitle: "You're looking at it now.",
        summary: 'A webapp showcasing my ability with Rails, React, GraphQL, Apollo, and many other technologies',
        title: 'kevinnorth.dev',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '7',
          __typename: 'Category'
        },
        children: [],
        posts: []
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '11',
        markdown: 'Lorem Ipsum',
        name: 'Democratic Party',
        order: 2,
        published: true,
        slug: 'democratic-party',
        subtitle: 'Using my unique skills to serve my community.',
        summary: 'I served on the technology committee of my local Democratic party for two years.',
        title: 'Lancaster County Democratic Party',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '7',
          __typename: 'Category'
        },
        children: [],
        posts: [
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '6',
            markdown: 'Lorem Ipsum',
            order: 1,
            published: true,
            slug: 'purchasing-new-equipment',
            subtitle: 'Enabling democrats to get work done.',
            summary: 'Replacing decades-old computers with new laptops and tablets.',
            title: 'Purchasing New Equipment',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          },
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '7',
            markdown: 'Lorem Ipsum',
            order: 2,
            published: true,
            slug: 'security-training',
            subtitle: 'Doing my part to keep democracy safe.',
            summary: 'Provided security training to the board and other volunteers.',
            title: 'Security Training',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          }
        ]
      },
      {
        createdAt: '2023-10-28T20:04:26Z',
        headerImage: null,
        id: '12',
        markdown: 'Lorem Ipsum',
        name: 'Unity Game Development',
        order: 3,
        published: false,
        slug: 'game-development',
        subtitle: 'C# for Fun',
        summary: 'I taught myself how to develop with Unity and have several games I work on in my free time.',
        title: 'Unity Game Development',
        updatedAt: '2023-10-28T20:04:26Z',
        __typename: 'Category',
        parent: {
          id: '7',
          __typename: 'Category'
        },
        children: [],
        posts: [
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '8',
            markdown: 'Lorem Ipsum',
            order: 1,
            published: false,
            slug: 'your-hope-is-unforgivable',
            subtitle: 'Smart design up-front for faster development later.',
            summary: 'Inspired by Redux, I built this game on a highly flexible state management architecture.',
            title: 'Your Hope is Unforgivable: a deckbuilding rougelike',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          },
          {
            createdAt: '2023-10-28T20:04:26Z',
            headerImage: null,
            id: '9',
            markdown: 'Lorem Ipsum',
            order: 2,
            published: false,
            slug: 'the-halting-problem',
            subtitle: 'A potent integration of C# language features, Unity tooling, and third-party libraries.',
            summary: 'Digging deep into the source of third-party libraries I licensed, I built a combat system that ties everything to the music.',
            title: 'The Halting Problem: a rhythm game twin-stick shooter',
            updatedAt: '2023-10-28T20:04:26Z',
            __typename: 'Post',
            author: {
              admin: true,
              createdAt: '2023-10-28T20:04:26Z',
              id: '1',
              login: 'kevin',
              name: 'Kevin North',
              updatedAt: '2023-10-28T20:04:26Z',
              __typename: 'User'
            }
          }
        ]
      }
    ]
  }
};

export const categoriesAndPostsAsArboristTree = [
  {
    id: '1',
    title: 'Home',
    type: 'Category',
    children: [],
    graphqlObject: {
      __typename: 'Category',
      parent: null,
      children: [],
      posts: [],
      createdAt: '2023-10-28T20:04:26Z',
      headerImage: null,
      id: '1',
      markdown: 'Lorem Ipsum',
      name: 'Home',
      order: 1,
      published: true,
      slug: 'index',
      subtitle: "Give me a hard problem and cut me loose. I'll make the impossible seem effortless.",
      summary: null,
      title: 'Home',
      updatedAt: '2023-10-28T20:04:26Z'
    }
  },
  {
    id: '2',
    title: 'Accomplishments',
    type: 'Category',
    children: [
      {
        id: '5',
        title: 'Applied Systems',
        type: 'Category',
        children: [
          {
            id: '8',
            title: 'Epic Quotes',
            type: 'Category',
            children: [
              {
                id: '1',
                title: 'Parent/Child Agency Refactoring',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '1',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: true,
                  slug: 'backend-refactor',
                  subtitle: 'Saving a Major Client',
                  summary: "When we couldn't onboard a major client, I refactored our entire backend to keep them.",
                  title: 'Parent/Child Agency Refactoring',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              },
              {
                id: '2',
                title: 'Copy Quote Algorithm',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '2',
                  markdown: 'Lorem Ipsum',
                  order: 3,
                  published: true,
                  slug: 'copy-quote-algorithm',
                  subtitle: 'Rails Metaprogramming and Graph Theory',
                  summary: 'An algorithm I wrote uses the right kind of cleverness to require virtually no further maintenance.',
                  title: 'Copy Quote Algorithm',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              }
            ],
            graphqlObject: {
              __typename: 'Category',
              parent: {
                __typename: 'Category',
                id: '5'
              },
              children: [],
              posts: [
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '1',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: true,
                  slug: 'backend-refactor',
                  subtitle: 'Saving a Major Client',
                  summary: "When we couldn't onboard a major client, I refactored our entire backend to keep them.",
                  title: 'Parent/Child Agency Refactoring',
                  updatedAt: '2023-10-28T20:04:26Z'
                },
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '2',
                  markdown: 'Lorem Ipsum',
                  order: 3,
                  published: true,
                  slug: 'copy-quote-algorithm',
                  subtitle: 'Rails Metaprogramming and Graph Theory',
                  summary: 'An algorithm I wrote uses the right kind of cleverness to require virtually no further maintenance.',
                  title: 'Copy Quote Algorithm',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              ],
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '8',
              markdown: 'Lorem Ipsum',
              name: 'Epic Quotes',
              order: 1,
              published: true,
              slug: 'epic-quotes',
              subtitle: 'A Ruby on Rails/React webapp',
              summary: 'A React and Rails app that I worked on from its inception to its long-term support phase.',
              title: 'Epic Quotes',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          },
          {
            id: '9',
            title: 'Applied Analytics',
            type: 'Category',
            children: [
              {
                id: '3',
                title: 'Team Quarterback',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '3',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: true,
                  slug: 'team-quarterback',
                  subtitle: 'On time and under budget.',
                  summary: 'I served as team lead for a critical six-month project.',
                  title: 'Team Quarterback',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              }
            ],
            graphqlObject: {
              __typename: 'Category',
              parent: {
                __typename: 'Category',
                id: '5'
              },
              children: [],
              posts: [
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '3',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: true,
                  slug: 'team-quarterback',
                  subtitle: 'On time and under budget.',
                  summary: 'I served as team lead for a critical six-month project.',
                  title: 'Team Quarterback',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              ],
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '9',
              markdown: 'Lorem Ipsum',
              name: 'Applied Anaylitics',
              order: 2,
              published: true,
              slug: 'applied-analytics',
              subtitle: 'A Looker and BigQuery project',
              summary: 'Creating a business intelligence project under an aggressive timeline.',
              title: 'Applied Analytics',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          }
        ],
        graphqlObject: {
          __typename: 'Category',
          parent: {
            __typename: 'Category',
            id: '2'
          },
          children: [
            {
              __typename: 'Category',
              id: '8'
            },
            {
              __typename: 'Category',
              id: '9'
            }
          ],
          posts: [],
          createdAt: '2023-10-28T20:04:26Z',
          headerImage: null,
          id: '5',
          markdown: 'Lorem Ipsum',
          name: 'Applied Systems',
          order: 1,
          published: true,
          slug: 'applied-systems',
          subtitle: 'Career Milestones',
          summary: 'Exceptional projects from my career.',
          title: 'Applied Systems',
          updatedAt: '2023-10-28T20:04:26Z'
        }
      },
      {
        id: '6',
        title: 'Research',
        type: 'Category',
        children: [
          {
            id: '4',
            title: 'GitVS',
            type: 'Post',
            children: [],
            graphqlObject: {
              __typename: 'Post',
              author: {
                __typename: 'User',
                admin: true,
                createdAt: '2023-10-28T20:04:26Z',
                id: '1',
                login: 'kevin',
                name: 'Kevin North',
                updatedAt: '2023-10-28T20:04:26Z'
              },
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '4',
              markdown: 'Lorem Ipsum',
              order: 1,
              published: true,
              slug: 'gitvs',
              subtitle: 'A practical combination of Git, visualization, and music',
              summary: 'A tool to explore Git history that combines traditional visualizations with sound.',
              title: 'GitVS',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          },
          {
            id: '5',
            title: 'Presentation at ESEC/FSE 2015',
            type: 'Post',
            children: [],
            graphqlObject: {
              __typename: 'Post',
              author: {
                __typename: 'User',
                admin: true,
                createdAt: '2023-10-28T20:04:26Z',
                id: '1',
                login: 'kevin',
                name: 'Kevin North',
                updatedAt: '2023-10-28T20:04:26Z'
              },
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '5',
              markdown: 'Lorem Ipsum',
              order: 3,
              published: true,
              slug: 'research-conference',
              subtitle: 'Public speaking is no problem.',
              summary: 'A presentation at a research conference in Italy.',
              title: 'Presentation at ESEC/FSE 2015',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          }
        ],
        graphqlObject: {
          __typename: 'Category',
          parent: {
            __typename: 'Category',
            id: '2'
          },
          children: [],
          posts: [
            {
              __typename: 'Post',
              author: {
                __typename: 'User',
                admin: true,
                createdAt: '2023-10-28T20:04:26Z',
                id: '1',
                login: 'kevin',
                name: 'Kevin North',
                updatedAt: '2023-10-28T20:04:26Z'
              },
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '4',
              markdown: 'Lorem Ipsum',
              order: 1,
              published: true,
              slug: 'gitvs',
              subtitle: 'A practical combination of Git, visualization, and music',
              summary: 'A tool to explore Git history that combines traditional visualizations with sound.',
              title: 'GitVS',
              updatedAt: '2023-10-28T20:04:26Z'
            },
            {
              __typename: 'Post',
              author: {
                __typename: 'User',
                admin: true,
                createdAt: '2023-10-28T20:04:26Z',
                id: '1',
                login: 'kevin',
                name: 'Kevin North',
                updatedAt: '2023-10-28T20:04:26Z'
              },
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '5',
              markdown: 'Lorem Ipsum',
              order: 3,
              published: true,
              slug: 'research-conference',
              subtitle: 'Public speaking is no problem.',
              summary: 'A presentation at a research conference in Italy.',
              title: 'Presentation at ESEC/FSE 2015',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          ],
          createdAt: '2023-10-28T20:04:26Z',
          headerImage: null,
          id: '6',
          markdown: 'Lorem Ipsum',
          name: 'Research',
          order: 2,
          published: true,
          slug: 'research',
          subtitle: "Master's Degree in Computer Science",
          summary: 'Research and other accomlishments from my graduate program at the University of Nebraska–Lincoln.',
          title: 'Research',
          updatedAt: '2023-10-28T20:04:26Z'
        }
      },
      {
        id: '7',
        title: 'Personal Projects',
        type: 'Category',
        children: [
          {
            id: '10',
            title: 'kevinnorth.dev',
            type: 'Category',
            children: [],
            graphqlObject: {
              __typename: 'Category',
              parent: {
                __typename: 'Category',
                id: '7'
              },
              children: [],
              posts: [],
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '10',
              markdown: 'Lorem Ipsum',
              name: 'This Website',
              order: 1,
              published: true,
              slug: 'this-website',
              subtitle: "You're looking at it now.",
              summary: 'A webapp showcasing my ability with Rails, React, GraphQL, Apollo, and many other technologies',
              title: 'kevinnorth.dev',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          },
          {
            id: '11',
            title: 'Lancaster County Democratic Party',
            type: 'Category',
            children: [
              {
                id: '6',
                title: 'Purchasing New Equipment',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '6',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: true,
                  slug: 'purchasing-new-equipment',
                  subtitle: 'Enabling democrats to get work done.',
                  summary: 'Replacing decades-old computers with new laptops and tablets.',
                  title: 'Purchasing New Equipment',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              },
              {
                id: '7',
                title: 'Security Training',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '7',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: true,
                  slug: 'security-training',
                  subtitle: 'Doing my part to keep democracy safe.',
                  summary: 'Provided security training to the board and other volunteers.',
                  title: 'Security Training',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              }
            ],
            graphqlObject: {
              __typename: 'Category',
              parent: {
                __typename: 'Category',
                id: '7'
              },
              children: [],
              posts: [
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '6',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: true,
                  slug: 'purchasing-new-equipment',
                  subtitle: 'Enabling democrats to get work done.',
                  summary: 'Replacing decades-old computers with new laptops and tablets.',
                  title: 'Purchasing New Equipment',
                  updatedAt: '2023-10-28T20:04:26Z'
                },
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '7',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: true,
                  slug: 'security-training',
                  subtitle: 'Doing my part to keep democracy safe.',
                  summary: 'Provided security training to the board and other volunteers.',
                  title: 'Security Training',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              ],
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '11',
              markdown: 'Lorem Ipsum',
              name: 'Democratic Party',
              order: 2,
              published: true,
              slug: 'democratic-party',
              subtitle: 'Using my unique skills to serve my community.',
              summary: 'I served on the technology committee of my local Democratic party for two years.',
              title: 'Lancaster County Democratic Party',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          },
          {
            id: '12',
            title: 'Unity Game Development',
            type: 'Category',
            children: [
              {
                id: '8',
                title: 'Your Hope is Unforgivable: a deckbuilding rougelike',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '8',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: false,
                  slug: 'your-hope-is-unforgivable',
                  subtitle: 'Smart design up-front for faster development later.',
                  summary: 'Inspired by Redux, I built this game on a highly flexible state management architecture.',
                  title: 'Your Hope is Unforgivable: a deckbuilding rougelike',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              },
              {
                id: '9',
                title: 'The Halting Problem: a rhythm game twin-stick shooter',
                type: 'Post',
                children: [],
                graphqlObject: {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '9',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: false,
                  slug: 'the-halting-problem',
                  subtitle: 'A potent integration of C# language features, Unity tooling, and third-party libraries.',
                  summary: 'Digging deep into the source of third-party libraries I licensed, I built a combat system that ties everything to the music.',
                  title: 'The Halting Problem: a rhythm game twin-stick shooter',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              }
            ],
            graphqlObject: {
              __typename: 'Category',
              parent: {
                __typename: 'Category',
                id: '7'
              },
              children: [],
              posts: [
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '8',
                  markdown: 'Lorem Ipsum',
                  order: 1,
                  published: false,
                  slug: 'your-hope-is-unforgivable',
                  subtitle: 'Smart design up-front for faster development later.',
                  summary: 'Inspired by Redux, I built this game on a highly flexible state management architecture.',
                  title: 'Your Hope is Unforgivable: a deckbuilding rougelike',
                  updatedAt: '2023-10-28T20:04:26Z'
                },
                {
                  __typename: 'Post',
                  author: {
                    __typename: 'User',
                    admin: true,
                    createdAt: '2023-10-28T20:04:26Z',
                    id: '1',
                    login: 'kevin',
                    name: 'Kevin North',
                    updatedAt: '2023-10-28T20:04:26Z'
                  },
                  createdAt: '2023-10-28T20:04:26Z',
                  headerImage: null,
                  id: '9',
                  markdown: 'Lorem Ipsum',
                  order: 2,
                  published: false,
                  slug: 'the-halting-problem',
                  subtitle: 'A potent integration of C# language features, Unity tooling, and third-party libraries.',
                  summary: 'Digging deep into the source of third-party libraries I licensed, I built a combat system that ties everything to the music.',
                  title: 'The Halting Problem: a rhythm game twin-stick shooter',
                  updatedAt: '2023-10-28T20:04:26Z'
                }
              ],
              createdAt: '2023-10-28T20:04:26Z',
              headerImage: null,
              id: '12',
              markdown: 'Lorem Ipsum',
              name: 'Unity Game Development',
              order: 3,
              published: false,
              slug: 'game-development',
              subtitle: 'C# for Fun',
              summary: 'I taught myself how to develop with Unity and have several games I work on in my free time.',
              title: 'Unity Game Development',
              updatedAt: '2023-10-28T20:04:26Z'
            }
          }
        ],
        graphqlObject: {
          __typename: 'Category',
          parent: {
            __typename: 'Category',
            id: '2'
          },
          children: [
            {
              __typename: 'Category',
              id: '10'
            },
            {
              __typename: 'Category',
              id: '11'
            },
            {
              __typename: 'Category',
              id: '12'
            }
          ],
          posts: [],
          createdAt: '2023-10-28T20:04:26Z',
          headerImage: null,
          id: '7',
          markdown: 'Lorem Ipsum',
          name: 'Personal Projects',
          order: 3,
          published: true,
          slug: 'personal-projects',
          subtitle: 'My mind does not turn off at 5pm.',
          summary: 'When I say I love a hard problem, I mean it. I literally took on these development projects for fun.',
          title: 'Personal Projects',
          updatedAt: '2023-10-28T20:04:26Z'
        }
      }
    ],
    graphqlObject: {
      __typename: 'Category',
      parent: null,
      children: [
        {
          __typename: 'Category',
          id: '5'
        },
        {
          __typename: 'Category',
          id: '6'
        },
        {
          __typename: 'Category',
          id: '7'
        }
      ],
      posts: [],
      createdAt: '2023-10-28T20:04:26Z',
      headerImage: null,
      id: '2',
      markdown: 'Lorem Ipsum',
      name: 'Accomplishments',
      order: 2,
      published: true,
      slug: 'accomplishments',
      subtitle: 'No ordinary developer.',
      summary: 'A list of projects under my belt that go above and beyond what you would expect from a typical dev.',
      title: 'Accomplishments',
      updatedAt: '2023-10-28T20:04:26Z'
    }
  },
  {
    id: '3',
    title: 'About Me',
    type: 'Category',
    children: [],
    graphqlObject: {
      __typename: 'Category',
      parent: null,
      children: [],
      posts: [],
      createdAt: '2023-10-28T20:04:26Z',
      headerImage: null,
      id: '3',
      markdown: 'Lorem Ipsum',
      name: 'About',
      order: 3,
      published: false,
      slug: 'about',
      subtitle: 'A mind at home in complexity.',
      summary: 'Who I am.',
      title: 'About Me',
      updatedAt: '2023-10-28T20:04:26Z'
    }
  },
  {
    id: '4',
    title: 'Contact',
    type: 'Category',
    children: [],
    graphqlObject: {
      __typename: 'Category',
      parent: null,
      children: [],
      posts: [],
      createdAt: '2023-10-28T20:04:26Z',
      headerImage: null,
      id: '4',
      markdown: 'Lorem Ipsum',
      name: 'Contact',
      order: 4,
      published: true,
      slug: 'contact',
      subtitle: "Let's chat!",
      summary: 'My contact information.',
      title: 'Contact',
      updatedAt: '2023-10-28T20:04:26Z'
    }
  }
];
