import { createContext, useContext, useState } from "react";

const LoaderContext = createContext({
    loading: false,
    startLoading: () => {},
    stopLoading: () => {},
});

export const useGlobalLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [requestCount, setRequestCount] = useState(0);

    const startLoading = () => setRequestCount((count) => count + 1);
    const stopLoading = () =>
        setRequestCount((count) => Math.max(count - 1, 0));

    return (
        <LoaderContext.Provider
            value={{ loading: requestCount > 0, startLoading, stopLoading }}
        >
            {children}
        </LoaderContext.Provider>
    );
};
