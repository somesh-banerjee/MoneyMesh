import {
    ApolloClient,
    ApolloProvider,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createLoaderLink } from "./loaderLink";
import { useGlobalLoader } from "./LoaderContext";
import { useUser } from "./UserContext";

export const ApolloWithLoader = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const loader = useGlobalLoader();
    const { accessToken } = useUser();

    const authLink = setContext((_, { headers }) => {
        const token = accessToken ?? "";
        return {
            headers: {
                ...headers,
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
    });

    const client = new ApolloClient({
        link: from([
            authLink,
            createLoaderLink(loader),
            new HttpLink({
                uri: import.meta.env.VITE_GRAPHQL_ENDPOINT + "/graphql",
            }),
        ]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}> {children} </ApolloProvider>;
};
