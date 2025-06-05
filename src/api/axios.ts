import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: '', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
 
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
   
    return response;
  },
  (error: AxiosError) => {
   
    console.error('API Error:', error.response?.data || error.message);
   
    return Promise.reject(error);
  }
);

export default instance;