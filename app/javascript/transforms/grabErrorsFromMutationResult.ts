import { ApolloError, FetchResult } from '@apollo/client';

function grabErrorsFromMutationResult(
  result: FetchResult | (Omit<FetchResult, 'errors'> & { errors: ApolloError }),
  data: { errors?: string[] | null }
): string[] {
  if (result.errors) {
    if (Array.isArray(result.errors)) {
      // result.errors is a GraphQLError[]
      return result.errors.map((error) => error.message);
    }
    // result.errors is an ApolloError. (Not sure why Apollo behaves
    // this way but it's what I observe while debugging.)
    return [(result.errors as unknown as ApolloError).message];
  }

  // The GraphQL request came back with a 200 response, but the server put together
  // errors as data.
  if (data?.errors && data?.errors.length > 0) {
    return data?.errors;
  }

  // There were no errors.
  return [];
}

export default grabErrorsFromMutationResult;
