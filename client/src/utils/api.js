import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('bidlance_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Auth
export const signupAPI = (data) => api.post('/auth/signup', data);
export const loginAPI = (data) => api.post('/auth/login', data);
export const getMeAPI = () => api.get('/auth/me');

// Projects
export const getProjectsAPI = (params) => api.get('/projects', { params });
export const getProjectAPI = (id) => api.get(`/projects/${id}`);
export const createProjectAPI = (data) => api.post('/projects', data);
export const updateProjectAPI = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProjectAPI = (id) => api.delete(`/projects/${id}`);

// Wallet
export const getWalletAPI = () => api.get('/wallet');
export const getTransactionsAPI = () => api.get('/wallet/transactions');
export const depositAPI = (data) => api.post('/wallet/deposit', data);
export const withdrawAPI = (data) => api.post('/wallet/withdraw', data);

// Orders
export const getMyOrdersAPI = () => api.get('/orders');
export const createOrderAPI = (data) => api.post('/orders', data);
export const deliverOrderAPI = (id) => api.put(`/orders/${id}/deliver`);
export const approveOrderAPI = (id) => api.put(`/orders/${id}/approve`);

// Bids
export const getProjectBidsAPI = (projectId) => api.get(`/bids/${projectId}`);
export const placeBidAPI = (data) => api.post('/bids', data);

// Uploads (Cloudinary via backend)
const uploadHeaders = { headers: { 'Content-Type': 'multipart/form-data' } };
export const uploadAvatarAPI = (formData) => api.post('/upload/avatar', formData, uploadHeaders);
export const uploadProjectImagesAPI = (formData) => api.post('/upload/project-images', formData, uploadHeaders);
export const uploadCvAPI = (formData) => api.post('/upload/cv', formData, uploadHeaders);

export default api;
