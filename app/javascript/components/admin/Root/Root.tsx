import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import getAllPosts from '../../../graphql/queries/allPosts';
import organizePostsIntoArboristTree from '../../../transforms/trees/organizePostsIntoArboristTree';
import AdminTree from './AdminTree';

export default function Root(): React.ReactElement {
  const { data, loading } = getAllPosts({
    includeUnpublished: true,
  });

  const tree = useMemo(() => {
    if (loading || !data?.allPosts) {
      return [];
    }

    return organizePostsIntoArboristTree(data.allPosts);
  }, [data]);

  // These are a lot of React hooks, but they're the canonical pattern
  // for grabbing a value from a DOM node controlled by React and
  // using it to change the state of another React element. See:
  // https://react.dev/learn/synchronizing-with-effects
  // https://react.dev/learn/referencing-values-with-refs#best-practices-for-refs
  // https://react.dev/learn/manipulating-the-dom-with-refs#when-react-attaches-the-refs
  // https://stackoverflow.com/questions/62846043/react-js-useeffect-with-window-resize-event-listener-not-working
  const adminTreeWrapperRef = useRef(null);
  const [adminTreeHeight, setAdminTreeHeight] = useState(100);
  useEffect(() => {
    function onResize() {
      setAdminTreeHeight(adminTreeWrapperRef.current?.offsetHeight || 100);
    }

    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  let adminTree: React.ReactElement;
  if (loading || !data) {
    adminTree = <Spinner animation="border" role="status" />;
  } else {
    adminTree = (
      <AdminTree tree={tree} indentSize={12} height={adminTreeHeight} />
    );
  }

  return (
    <div className="admin-tree-wrapper" ref={adminTreeWrapperRef}>
      {adminTree}
    </div>
  );
}
