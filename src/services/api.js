import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back-end-agence-de-voyage.onrender.com/api/v1';
const token = process.env.NEXT_PUBLIC_TOKEN;

const api = axios.create({
    baseURL: API_URL,
    params: {
        limit: 6,
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const getOffers = async ({url}) => {
    try {
        const response = await api.get(url);
        console.log('Raw API Response:', response); // Debug log
        
        // Check if response has data property
        if (response.data && response.data.data) {
            return response.data.data;
        }
        
        // If response is already an array, return it
        if (Array.isArray(response.data)) {
            return response.data;
        }
        
        // If response is an object with a different structure, return empty array
        console.warn('Unexpected API response structure:', response.data);
        return [];
    } catch (error) {
        console.error('Error fetching offers:', error.response || error);
        throw error;
    }
};

export default api; 