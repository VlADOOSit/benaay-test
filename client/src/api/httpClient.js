import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const getAccessToken = () => accessToken;

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true
});

const refreshClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true
});

const refreshAccessTokenInternal = async () => {
  const { data } = await refreshClient.post('/auth/refresh');
  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }
  return data;
};

export const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessTokenInternal().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = error?.response;
    const originalRequest = error?.config;
    const requestUrl = originalRequest?.url || '';
    const shouldSkipRefresh =
      originalRequest?.skipAuthRefresh ||
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/auth/refresh');

    if (!response || response.status !== 401 || originalRequest?._retry || shouldSkipRefresh) {
      throw error;
    }

    try {
      originalRequest._retry = true;
      await refreshAccessToken();
      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }
      return apiClient(originalRequest);
    } catch (err) {
      clearAccessToken();
      throw err;
    }
  }
);
