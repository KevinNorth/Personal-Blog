import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Blog from './components/Blog';
import getCRSFToken from './lib/getCRSFToken';
import mermaidConfig from './lib/mermaidConfig';
import mermaid from 'mermaid';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    // The frontend doesn't send any POST requests for now,
    // but if that ever changes, I can see this being an
    // easy piece of configuration to forget.
    // It doesn't hurt anything to add it in, so in it goes!
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache(),
});

document.addEventListener('DOMContentLoaded', () => {
  mermaid.initialize({ startOnLoad: false, ...mermaidConfig });

  const domNode = document.createElement('div');
  document.body.appendChild(domNode);
  const root = createRoot(domNode);
  root.render(
    <ApolloProvider client={client}>
      <BrowserRouter basename="/">
        <Blog />
      </BrowserRouter>
    </ApolloProvider>
  );
});
