import { ApolloWithLoader } from "./apollo";
import { LoaderProvider } from "./LoaderContext";
import { UserProvider } from "./UserContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <LoaderProvider>
        <UserProvider>
            <ApolloWithLoader>{children} </ApolloWithLoader>
        </UserProvider>
    </LoaderProvider>
);
