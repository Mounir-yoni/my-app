import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-end-agence-de-voyage.onrender.com/api/v1';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    timeout: 30000, // Increased timeout to 30 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false, // Disable credentials for cross-origin requests
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        // Don't add token for auth endpoints
        if (!config.url.includes('/auth/')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject(new Error('The request took too long. Please try again.'));
        }

        if (!error.response) {
            console.error('Network error:', error);
            // Check if it's a CORS error
            if (error.message.includes('Network Error')) {
                return Promise.reject(new Error('Unable to connect to the server. Please check your internet connection and try again.'));
            }
            return Promise.reject(new Error('An unexpected error occurred. Please try again.'));
        }

        // Handle specific error status codes
        switch (error.response.status) {
            case 400:
                return Promise.reject(new Error(error.response.data.message || 'Invalid request. Please check your input.'));
            case 401:
                if (!error.config.url.includes('/auth/')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/auth';
                }
                return Promise.reject(new Error('Invalid credentials. Please try again.'));
            case 403:
                return Promise.reject(new Error('You do not have permission to perform this action.'));
            case 404:
                return Promise.reject(new Error('The requested resource was not found.'));
            case 500:
                return Promise.reject(new Error('Server error. Please try again later.'));
            default:
                return Promise.reject(new Error(error.response.data.message || 'An unexpected error occurred.'));
        }
    }
);

// Retry logic for failed requests
const retryRequest = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0) {
            throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        return retryRequest(fn, retries - 1, delay * 2);
    }
};

// Authentication functions
export const login = async (credentials) => {
    try {
        const response = await retryRequest(async () => {
            const result = await api.post('/auth/login', credentials);
            return result;
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await retryRequest(async () => {
            const result = await api.post('/auth/register', userData);
            return result;
        });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getOffers = async () => {
    try {
        // First try to get from cache
        const cachedData = localStorage.getItem('cachedOffers');
        if (cachedData) {
            try {
                return JSON.parse(cachedData);
            } catch (e) {
                console.error('Error parsing cached data:', e);
            }
        }

        // If no cache or invalid cache, fetch from API with retry
        const response = await retryRequest(async () => {
            try {
                return await api.get('/voyages');
            } catch (error) {
                console.error('API request failed:', error);
                throw error;
            }
        });

        // Process the response
        let offersData;
        if (response.data && response.data.data) {
            offersData = response.data.data;
        } else if (Array.isArray(response.data)) {
            offersData = response.data;
        } else {
            console.warn('Unexpected API response structure:', response.data);
            offersData = [];
        }

        // Cache the successful response
        try {
            localStorage.setItem('cachedOffers', JSON.stringify(offersData));
        } catch (e) {
            console.error('Error caching data:', e);
        }

        return offersData;
    } catch (error) {
        console.error('Error fetching offers:', error);
        // If we have cached data, return it as fallback
        const cachedData = localStorage.getItem('cachedOffers');
        if (cachedData) {
            try {
                return JSON.parse(cachedData);
            } catch (e) {
                console.error('Error parsing cached data:', e);
            }
        }
        throw error;
    }
};

export default api; 