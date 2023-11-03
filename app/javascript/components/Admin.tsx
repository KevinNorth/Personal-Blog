import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import getCRSFToken from '../lib/getCRSFToken';
import Layout from './admin/Layout';
import Root from './admin/Root/Root';
import ExistingPostEditor from './admin/PostEditor/ExistingPostEditor';
import ExistingCategoryEditor from './admin/CategoryEditor/ExistingCategoryEditor';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache()
});

function Admin() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <BrowserRouter basename="/admin">
          <Routes>
            <Route path="/post/:id" element={<ExistingPostEditor />} />
            <Route path="/category/:id" element={<ExistingCategoryEditor />} />
            <Route path="/" element={<Root />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ApolloProvider>
  );
}

export default Admin;
