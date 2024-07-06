import { gql } from '@apollo/client';

const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    createdAt
    headerImage
    id
    markdown
    order
    published
    slug
    subtitle
    summary
    title
    name
    updatedAt
  }
`;

export default POST_FRAGMENT;
