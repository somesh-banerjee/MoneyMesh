import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const LoaderContext = createContext({
    loading: false,
    startLoading: () => {},
    stopLoading: () => {},
});

export const useGlobalLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [requestCount, setRequestCount] = useState(0);

    const startLoading = useCallback(
        () => setRequestCount((count) => count + 1),
        [],
    );
    const stopLoading = useCallback(
        () => setRequestCount((count) => Math.max(count - 1, 0)),
        [],
    );

    const value = useMemo(
        () => ({
            loading: requestCount > 0,
            startLoading,
            stopLoading,
        }),
        [requestCount, startLoading, stopLoading],
    );

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};
