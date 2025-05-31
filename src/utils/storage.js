export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null;
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
    }
};

export const removeLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const getParsedLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key);
        try {
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error parsing localStorage item:', error);
            return null;
        }
    }
    return null;
}; 