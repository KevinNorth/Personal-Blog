import { gql } from '@apollo/client';

const USER_FRAGMENT =
  gql`
    fragment UserFragment on Category {
      admin
      createdAt
      id
      login
      name
      updatedAt
    }
  `;

export default USER_FRAGMENT;
