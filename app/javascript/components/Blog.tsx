import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import getCRSFToken from '../lib/getCRSFToken';

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
    headers: { 'X-CSRF-Token': getCRSFToken() || '' },
  }),
  cache: new InMemoryCache()
});

function Blog() {
  return (
    <ApolloProvider client={client}>
      <div>
        <header>
          <h1>Blog Test</h1>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default Blog;
