import { ApolloLink, type NextLink, type Operation, type FetchResult } from '@apollo/client';
import { useGlobalLoader } from './LoaderContext';

// This helper creates a link with access to your loader context
export const createLoaderLink = (loader: {
    startLoading: () => void;
    stopLoading: () => void;
}) => {
    return new ApolloLink((operation: Operation, forward: NextLink) => {
        loader.startLoading();
        return forward(operation).map((result: FetchResult) => {
            loader.stopLoading();
            return result;
        });
    });
};
