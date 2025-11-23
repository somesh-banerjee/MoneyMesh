import {
    ApolloClient,
    ApolloProvider,
    from,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUser } from "./UserContext";

export const ApolloWithLoader = ({
    children,
}: {
    children: React.ReactNode;
}) => {
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
            new HttpLink({
                uri: import.meta.env.VITE_GRAPHQL_ENDPOINT + "/graphql",
            }),
        ]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

