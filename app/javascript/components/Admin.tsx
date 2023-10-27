import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoryEditor from './admin/CategoryEditor/CategoryEditor';
import Layout from './admin/Layout';
import PostEditor from './admin/PostEditor/PostEditor';
import Root from './admin/Root/Root';

const client = new ApolloClient({
  uri: '/graphql',
});

function Admin() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <BrowserRouter basename="/admin">
          <Routes>
            <Route path="/post/:id" element={<PostEditor />} />
            <Route path="/category/:id" element={<CategoryEditor />} />
            <Route path="/" element={<Root />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ApolloProvider>
  );
}

export default Admin;