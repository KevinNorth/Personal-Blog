import { gql } from '@apollo/client';

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    createdAt
    headerImage
    id
    markdown
    name
    order
    published
    slug
    subtitle
    summary
    title
    updatedAt
  }
`;

export default CATEGORY_FRAGMENT;
