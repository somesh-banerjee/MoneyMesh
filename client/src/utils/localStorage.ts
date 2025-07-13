import { APP_NAME } from "@/constants";

const PREFIX = APP_NAME;

export const localStorageKeys = {
    accessToken: `${PREFIX}_accessToken`,
};

export const setItem = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (err) {
        console.warn(`Unable to store item "${key}" in localStorage`, err);
    }
};

export const getItem = (key: string): string | null => {
    try {
        return localStorage.getItem(key);
    } catch (err) {
        console.warn(`Unable to read item "${key}" from localStorage`, err);
        return null;
    }
};

export const removeItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.warn(`Unable to remove item "${key}" from localStorage`, err);
    }
};

export const clearAllAppStorage = () => {
    Object.values(localStorageKeys).forEach(removeItem);
};
