import React, { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import getAllCategoriesAndPostsQuery from '../../../graphql/queries/allCategoriesAndPosts';
import organizeCategoriesAndPostsIntoArboristTree from '../../../transforms/organizeCategoriesAndPostsIntoArboristTree';
import AdminTree from './AdminTree';

export default function Root(): React.ReactElement {
  const { data, loading } = getAllCategoriesAndPostsQuery({
    includeUnpublished: true,
  });

  const tree = useMemo(() => {
    if (loading || !data?.categories) {
      return [];
    }

    return organizeCategoriesAndPostsIntoArboristTree(data.categories);
  }, [data]);

  if (loading || !data) {
    return <Spinner animation="border" role="status" />;
  } else {
    return <AdminTree tree={tree} indentSize={12} />;
  }
}
