import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '@apollo/client';
import Layout from './blog/Layout';
import PostViewer from './blog/PostViewer/PostViewer';

function Blog() {
  return (
    <Layout>
      <Routes>
        <Route path="/:parentSlug/:slug" element={<PostViewer />} />
        <Route path="/:slug" element={<PostViewer />} />
        <Route path="/" element={<PostViewer showDefaultPost={true} />} />
      </Routes>
    </Layout>
  );
}

export default Blog;
