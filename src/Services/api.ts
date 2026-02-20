import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Allocation } from '../Models/Allocation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Endpoints
export const allocationAPI = {
  // Allocate new MSISDN
  // Equivalent to: fetch('/api/allocation/allocate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userName }) })
  allocate: async (userName: string): Promise<Allocation> => {
    const response = await api.post<Allocation, any, { userName: string }>('/allocation/allocate', { userName });
    return response.data;
  },

  // Release specific MSISDN
  // Equivalent to: fetch('/api/allocation/release', { method: 'POST', body: JSON.stringify({ id, msisdn }) })
  release: async (id: number, msisdn: string): Promise<void> => {
    await api.post('/allocation/release', { id, msisdn });
  },

  // Release all MSISDNs
  // Equivalent to: fetch('/api/allocation/release-all', { method: 'POST' })
  releaseAll: async (): Promise<void> => {
    await api.post('/allocation/release-all');
  },

  // Get all allocations
  // Equivalent to: fetch('/api/allocation/list', { method: 'GET' })
  getAll: async (): Promise<Allocation[]> => {
    const response = await api.get<Allocation[]>('/allocation/list');
    return response.data;
  },

  // Check if MSISDN is active
  // Equivalent to: fetch('/api/allocation/is-active/:msisdn', { method: 'GET' })
  isActive: async (msisdn: string): Promise<boolean> => {
    const response = await api.get<{ active: boolean }>(`/allocation/is-active/${msisdn}`);
    return response.data.active;
  },
};

export default api;
