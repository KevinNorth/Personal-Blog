import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graphql',
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