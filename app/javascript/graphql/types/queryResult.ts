import { ApolloQueryResult } from '@apollo/client';

interface QueryResult<Model, Variables> {
  data?: Model;
  loading: boolean;
  refetch: (variables?: Partial<Variables>) => Promise<ApolloQueryResult<Model>>;
}

export default QueryResult;
