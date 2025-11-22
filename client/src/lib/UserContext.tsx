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
    clearAllAppStorage,
} from "@/utils/localStorage";

type UserContextType = {
    accessToken: string | null;
    email: string | null;
    setAccessToken: (token: string | null) => void;
    setEmail: (email: string | null) => void;
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
    const [email, setEmailState] = useState<string | null>(null);

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

    const setEmail = (email: string | null) => {
        setEmailState(email);
    };

    const logout = () => {
        setAccessToken(null);
        setEmail(null);
        clearAllAppStorage();
        window.location.reload(); // ensure fresh ApolloClient with no token
    };

    return (
        <UserContext.Provider
            value={{ accessToken, email, setAccessToken, setEmail, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};

