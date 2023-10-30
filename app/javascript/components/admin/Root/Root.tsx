import React, { useMemo } from 'react';
import { Spinner } from 'react-bootstrap'; 
import AdminTree from './AdminTree';
import getAllCategoriesAndPostsQuery from '../../../graphql/queries/allCategoriesAndPosts';
import organizeCategoriesAndPostsIntoArboristTree from '../../../transforms/organizeCategoriesAndPostsIntoArboristTree';

export default function Root(): React.ReactElement {
  const { data, loading } = getAllCategoriesAndPostsQuery(true);

  const tree = useMemo(() => {
    if (loading || !data?.categories) {
      return [];
    }

    return organizeCategoriesAndPostsIntoArboristTree(data.categories);
  }, [data]);


  if (loading || !data) {
    return <Spinner animation='border' role='status' />;
  } else {
    return <AdminTree tree={tree} indentSize={12} />;
  }
}
