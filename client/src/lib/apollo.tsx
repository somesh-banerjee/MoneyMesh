import {
    ApolloClient,
    ApolloProvider,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
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
                createLoaderLink(loader),
                authLink,
                new HttpLink({
                    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT + "/graphql",
                }),
            ]),
            cache: new InMemoryCache(),
        });
    }, [accessToken, loader]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
