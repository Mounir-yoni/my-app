import axios from 'axios';

// 🛡️ استخدم متغير بيئة حتى يسهل تغييره بين localhost و production
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

// 🔍 تحقق إن كنت في المتصفح
const isBrowser = typeof window !== 'undefined';

// Add request queue and rate limiting
let requestQueue = [];
let isProcessingQueue = false;
const RATE_LIMIT_DELAY = 1000; // 1 second between requests

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  const request = requestQueue.shift();
  
  try {
    const response = await request.fn();
    request.resolve(response);
  } catch (error) {
    request.reject(error);
  } finally {
    isProcessingQueue = false;
    if (requestQueue.length > 0) {
      setTimeout(processQueue, RATE_LIMIT_DELAY);
    }
  }
};

const queueRequest = (fn) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fn, resolve, reject });
    processQueue();
  });
};

// ⚙️ إعداد axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: false, // إذا تستخدم كوكيز، اجعله true
});

// 📦 أضف التوكن إذا كان موجودًا (للبيئة التي فيها نافذة فقط)
api.interceptors.request.use(
  (config) => {
    if (isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🛠️ التعامل مع الأخطاء
api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('🔴 Axios error:', error);

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('⏱️ Request timeout. Please try again.'));
    }

    if (!error.response) {
      // Check if it's a network error
      if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        return Promise.reject(new Error('📡 Unable to connect to the server. Check your connection.'));
      }
      // Check if it's a DNS error
      if (error.message.includes('getaddrinfo ENOTFOUND')) {
        return Promise.reject(new Error('🌐 DNS lookup failed. Check your internet connection.'));
      }
      // Check if it's a timeout
      if (error.message.includes('timeout')) {
        return Promise.reject(new Error('⏱️ Connection timed out. Please try again.'));
      }
      return Promise.reject(new Error('⚠️ Connection error. Please try again.'));
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        return Promise.reject(new Error(data.message || '❌ Bad request.'));
      case 401:
        if (isBrowser) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/auth';
        }
        return Promise.reject(new Error('🔐 Unauthorized. Please login again.'));
      case 403:
        return Promise.reject(new Error('🚫 Forbidden.'));
      case 404:
        return Promise.reject(new Error('🔎 Not found.'));
      case 429:
        return Promise.reject(new Error('⏳ Too many requests. Please wait a moment and try again.'));
      case 500:
        console.error('Server error details:', data);
        return Promise.reject(new Error(data.message || '💥 Server error. Please check the server logs.'));
      default:
        return Promise.reject(new Error(data.message || '⚠️ Unexpected error.'));
    }
  }
);

// ✅ التحقق من توفر السيرفر
const checkServerAvailability = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await axios.get(`${API_URL}/voyages`, {
      signal: controller.signal,
      timeout: 5000,
      validateStatus: (status) => status < 500
    });
    return true;
  } catch (err) {
    console.error('🌐 Server check failed:', err.message);
    if (err.name === 'AbortError') {
      console.error('⏱️ Server check timed out');
    }
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
};

// ♻️ دالة لإعادة المحاولة
const retryRequest = async (fn, retries = 3) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      // Queue the request to handle rate limiting
      return await queueRequest(fn);
    } catch (err) {
      lastError = err;
      console.warn(`🔁 Attempt ${i + 1} failed: ${err.message}`);
      
      // Don't retry on certain errors
      if (err.message.includes('Unauthorized') || 
          err.message.includes('Forbidden') || 
          err.message.includes('Bad request') ||
          err.message.includes('Too many requests')) {
        throw err;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(1000 * Math.pow(2, i), 10000);
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('❌ Failed after multiple attempts.');
};

//
// 🧩 API FUNCTIONS
//

export const getStats = async () => retryRequest(() => api.get('/statistic').then(res => res.data));

export const getReservations = async (params = {}) =>
  retryRequest(() => api.get('/reservations', { params }).then(res => res.data));

export const getTrips = async () => retryRequest(() => api.get('/admin/trips').then(res => res.data));

export const createAdmin = async (data) =>
  retryRequest(() => api.post('/voyages', data).then(res => res.data));

export const createTrip = async (formData) => {
  try {
    // Validate image
    if (!formData.get('image')) {
      throw new Error('Please upload a voyage image');
    }

    // Log FormData contents for debugging
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
    }

    // Log request configuration
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      timeout: 30000,
      validateStatus: (status) => status < 500
    };
    console.log('Request config:', config);

    const response = await retryRequest(() => 
      api.post('/voyages', formData, config)
        .then(res => {
          console.log('Response data:', res.data);
          return res.data;
        })
        .catch(error => {
          console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
          });
          throw error;
        })
    );

    return response;
  } catch (error) {
    console.error('Error creating trip:', error);
    
    // Log detailed error information
    if (error.response) {
      console.error('Error response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }

    // Handle specific error cases
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    if (error.response?.status === 500) {
      throw new Error('Server error: ' + (error.response.data?.message || 'Unknown error occurred'));
    }
    throw error; // Re-throw the original error to preserve the specific error message
  }
};

export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  if (isBrowser && res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const register = async (data) => {
  const res = await api.post('/auth/register', data);
  if (isBrowser && res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
  }
  return res.data;
};

export const getOffers = async () => {
  if (isBrowser) {
    const cached = localStorage.getItem('cachedOffers');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.warn('🧹 Invalid cached offers:', err);
      }
    }
  }

  const res = await retryRequest(() => api.get('/voyages').then(res => res.data));
  if (isBrowser) {
    try {
      localStorage.setItem('cachedOffers', JSON.stringify(res));
    } catch (e) {
      console.warn('❗ Failed to cache offers:', e);
    }
  }
  return res;
};

export default api;
