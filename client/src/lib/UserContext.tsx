import { createContext, useContext, useState, type ReactNode } from "react";

type UserContextType = {
    accessToken: string | null;
    setAccessToken: (id: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </UserContext.Provider>
    );
};
