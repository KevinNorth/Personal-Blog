
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <header>
          <h1>Test</h1>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;