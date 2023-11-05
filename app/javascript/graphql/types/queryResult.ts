import { ApolloQueryResult } from '@apollo/client';

export type RefetchFunction<Model, Variables> = (
  variables?: Partial<Variables>
) => Promise<ApolloQueryResult<Model>>;

interface QueryResult<Model, Variables> {
  data?: Model;
  loading: boolean;
  refetch: RefetchFunction<Model, Variables>;
}

export default QueryResult;
