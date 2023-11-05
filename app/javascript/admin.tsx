import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Admin from './components/Admin';
import getCRSFToken from './lib/getCRSFToken';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache(),
});

document.addEventListener('DOMContentLoaded', () => {
  const domNode = document.createElement('div');
  document.body.appendChild(domNode);
  const root = createRoot(domNode);
  root.render(
    <ApolloProvider client={client}>
      <BrowserRouter basename="/admin">
        <Admin />
      </BrowserRouter>
    </ApolloProvider>
  );
});
