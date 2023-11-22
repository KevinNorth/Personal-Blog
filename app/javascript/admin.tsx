import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Admin from './components/Admin';
import getCRSFToken from './lib/getCRSFToken';
import mermaid from 'mermaid';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache(),
});

document.addEventListener('DOMContentLoaded', () => {
  mermaid.initialize({ startOnLoad: true });

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
