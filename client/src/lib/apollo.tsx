import {
    ApolloClient,
    ApolloProvider,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { createLoaderLink } from "./loaderLink";
import { LoaderProvider, useGlobalLoader } from "./LoaderContext";

const ApolloWithLoader = ({ children }: { children: React.ReactNode }) => {
    const loader = useGlobalLoader();

    const client = new ApolloClient({
        link: from([
            createLoaderLink(loader),
            new HttpLink({
                uri: import.meta.env.VITE_GRAPHQL_API + "/graphql",
            }),
        ]),
        cache: new InMemoryCache(),
    });

    // export const client = new ApolloClient({
    //     uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    //     cache: new InMemoryCache(),
    // });
    return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => (
    <LoaderProvider>
        <ApolloWithLoader>{children} </ApolloWithLoader>
    </LoaderProvider>
);
