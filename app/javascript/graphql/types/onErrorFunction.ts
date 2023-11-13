import { ApolloError, BaseMutationOptions } from '@apollo/client';

export type MutationOnErrorFunction = (
  error: ApolloError,
  clientOptions?: BaseMutationOptions
) => void;

export type QueryOnErrorFunction = (error: ApolloError) => void;
