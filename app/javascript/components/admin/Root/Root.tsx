import React from 'react';
import { useQuery } from '@apollo/client';
import allCategoriesAndPostsQuery from '../../../graphql/queries/allCategoriesAndPostsQuery';

export default function Root(): React.ReactElement {
  const { data, loading } = useQuery(
    allCategoriesAndPostsQuery, 
    {
      variables: { 'includeUnpublished': true }
    }
  );

  if (loading) {
    return <>Root</>;
  } else {
    return <>{JSON.stringify(data)}</>;
  }
}
