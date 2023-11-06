import { gql } from '@apollo/client';

const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    createdAt
    id
    login
    name
    updatedAt
  }
`;

export default USER_FRAGMENT;
