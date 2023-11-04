import { FetchResult, MutationOptions } from '@apollo/client';

export type MutationExecutionFunction =
  (options?: MutationOptions) => Promise<FetchResult>;

interface MutationResult<ResultType> {
  data?: ResultType;
  loading: boolean;
  called: boolean;
}

export default MutationResult;
