import {
    ApolloClient,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { useMemo, useRef } from "react";
import { useUser } from "./UserContext";
import { useGlobalLoader } from "./LoaderContext";
import { createLoaderLink } from "./loaderLink";

export const ApolloWithLoader = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { accessToken } = useUser();
    const loader = useGlobalLoader();
    const loaderRef = useRef(loader);
    loaderRef.current = loader;

    const client = useMemo(() => {
        const authLink = setContext((_, { headers }) => {
            const token = accessToken ?? "";
            return {
                headers: {
                    ...headers,
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            };
        });

        return new ApolloClient({
            link: from([
                createLoaderLink({
                    startLoading: () => loaderRef.current.startLoading(),
                    stopLoading: () => loaderRef.current.stopLoading(),
                }),
                authLink,
                new HttpLink({
                    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT + "/graphql",
                }),
            ]),
            cache: new InMemoryCache(),
        });
    }, [accessToken]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
