import { FetchResult, MutationOptions } from '@apollo/client';

export type MutationExecutionFunction<ResultType, Variables> = (
  options?: Partial<MutationOptions<ResultType, Variables>>
) => Promise<FetchResult<ResultType>>;

interface MutationResult<ResultType> {
  data?: ResultType;
  loading: boolean;
  called: boolean;
}

export default MutationResult;
