import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery, OperationVariables, QueryProps as ApolloQueryProps, QueryResult } from 'react-apollo';
import { NetworkStatus, ApolloError } from 'apollo-client';
import { Loader } from './Loader';
import { Error } from './Error';

export type ApolloFetchMore<TData, TVariables> = QueryResult<TData, TVariables>['fetchMore'];
export type FetchMore<TData, TVariables> = (data: TData, fetchMore: ApolloFetchMore<TData, TVariables>) => any;

export type QueryRenderProps<TData = any, TVariables = OperationVariables> = Omit<
  QueryResult<TData, TVariables>,
  'fetchMore'
> & {
  fetchMore: (() => any) | undefined;
};

export type QueryProps<TData, TVariables> = Omit<ApolloQueryProps<TData, TVariables>, 'children'> & {
  children: (result: QueryRenderProps<TData, TVariables>) => React.ReactNode;
  fetchMore?: FetchMore<TData, TVariables>;
  passLoading?: boolean;
  passError?: boolean;
};

export class Query<TData = any, TVariables = OperationVariables> extends React.Component<
  QueryProps<TData, TVariables>
> {
  static propTypes = {
    ...ApolloQuery.propTypes,
    passLoading: PropTypes.bool,
    passError: PropTypes.bool
  };

  render() {
    const { children, fetchMore, passLoading, passError, ...restProps } = this.props;

    return (
      <ApolloQuery {...restProps}>
        {(result: QueryResult<TData, TVariables>) => {
          const { networkStatus, error, data } = result;

          if (!passError && error) {
            return <Error error={error} />;
          }

          const loading =
            networkStatus === NetworkStatus.loading || (networkStatus !== NetworkStatus.fetchMore && result.loading);
          if (!passLoading && loading) {
            return <Loader />;
          }

          return children({
            ...result,
            fetchMore: fetchMore ? () => fetchMore(data!, result.fetchMore) : undefined
          });
        }}
      </ApolloQuery>
    );
  }
}
