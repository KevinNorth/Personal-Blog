import { FetchResult, MutationOptions } from '@apollo/client';

export type MutationExecutionFunction<
  ResultType,
  Variables,
  ResultKey extends string
> = (
  options?: Partial<
    MutationOptions<ResultType | { [Key in ResultKey]?: ResultType }, Variables>
  >
) => Promise<FetchResult<ResultType | { [Key in ResultKey]?: ResultType }>>;

interface MutationResult<ResultType, ResultKey extends string> {
  data?: ResultType | { [Key in ResultKey]?: ResultType };
  loading: boolean;
  called: boolean;
}

export default MutationResult;
