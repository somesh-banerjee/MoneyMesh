import { ApolloLink } from '@apollo/client';
import { finalize } from 'rxjs';

export const createLoaderLink = (loader: {
    startLoading: () => void;
    stopLoading: () => void;
}) => {
    return new ApolloLink((operation, forward) => {
        loader.startLoading();
        return forward(operation).pipe(
            finalize(() => loader.stopLoading()),
        );
    });
};
