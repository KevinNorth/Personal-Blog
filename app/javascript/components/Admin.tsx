import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import getCRSFToken from '../lib/getCRSFToken';
import ExistingCategoryEditor from './admin/CategoryEditor/ExistingCategoryEditor';
import NewCategoryEditor from './admin/CategoryEditor/NewCategoryEditor';
import Layout from './admin/Layout';
import ExistingPostEditor from './admin/PostEditor/ExistingPostEditor';
import NewPostEditor from './admin/PostEditor/NewPostEditor';
import Root from './admin/Root/Root';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache(),
});

function Admin() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <BrowserRouter basename="/admin">
          <Routes>
            <Route path="/category/new" element={<NewCategoryEditor />} />
            <Route path="/category/:id" element={<ExistingCategoryEditor />} />
            <Route path="/post/new" element={<NewPostEditor />} />
            <Route path="/post/:id" element={<ExistingPostEditor />} />
            <Route path="/" element={<Root />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ApolloProvider>
  );
}

export default Admin;
