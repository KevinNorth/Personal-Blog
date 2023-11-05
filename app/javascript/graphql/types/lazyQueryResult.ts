import {
  LazyQueryResult as ApolloLazyQueryResult,
  ApolloQueryResult,
  LazyQueryHookOptions,
  OperationVariables,
} from '@apollo/client';

export type RefetchLazyQueryFunction<
  Model,
  Variables,
  ResultKey extends string
> = (
  variables?: Partial<OperationVariables | Variables>
) => Promise<
  ApolloQueryResult<
    OperationVariables | Variables | Model | { [Key in ResultKey]?: Model }
  >
>;

export type LazyQueryExecuteFunction<
  Model,
  Variables,
  ResultKey extends string
> = (
  options?: LazyQueryHookOptions<OperationVariables | Variables>
) => Promise<
  ApolloLazyQueryResult<
    OperationVariables | Variables | Model | { [Key in ResultKey]?: Model },
    OperationVariables | Variables
  >
>;

interface LazyQueryResult<Model, Variables, ResultKey extends string> {
  data?:
    | Variables
    | Model
    | OperationVariables
    | { [Key in ResultKey]?: Model };
  loading: boolean;
  called: boolean;
  refetch: RefetchLazyQueryFunction<Model, Variables, ResultKey>;
}

export default LazyQueryResult;
