import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '@apollo/client';
import CategoryViewer from './blog/CategoryViewer/CategoryViewer';
import Layout from './blog/Layout';
import PostViewer from './blog/PostViewer/PostViewer';

function Blog() {
  return (
    <Layout>
      <Routes>
        <Route path="/:categorySlug/:postSlug" element={<PostViewer />} />
        <Route path="/:categorySlug" element={<CategoryViewer />} />
        <Route
          path="/"
          element={<CategoryViewer showDefaultCategory={true} />}
        />
      </Routes>
    </Layout>
  );
}

export default Blog;
