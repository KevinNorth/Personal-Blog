import { gql } from '@apollo/client';
import CATEGORY_FRAGMENT from './fragments/categoryFragment';
import POST_FRAGMENT from './fragments/postFragment';
import USER_FRAGMENT from './fragments/userFragment';

const allCategoriesAndPostsQuery = 
  gql`
    query allCategoriesAndPostsQuery($includeUnpublished: Boolean) {
      categories(includeUnpublished: $includeUnpublished) {
        ...CategoryFragment
        parent
        children
        posts {
          ...PostFragment
          author {
            ...UserFragment
          }
        }
      }
    }
    ${CATEGORY_FRAGMENT}
    ${POST_FRAGMENT}
    ${USER_FRAGMENT}
  `;

export default allCategoriesAndPostsQuery;
