import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import {
    localStorageKeys,
    getItem,
    setItem,
    removeItem,
} from "@/utils/localStorage";

type UserContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);

    useEffect(() => {
        const token = getItem(localStorageKeys.accessToken);
        if (token) setAccessTokenState(token);
    }, []);

    const setAccessToken = (token: string | null) => {
        setAccessTokenState(token);
        if (token) {
            setItem(localStorageKeys.accessToken, token);
        } else {
            removeItem(localStorageKeys.accessToken);
        }
    };

    const logout = () => {
        setAccessToken(null);
        window.location.reload(); // ensure fresh ApolloClient with no token
    };

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};
