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

const buildUrl = (path) => `${API_BASE_URL}/api${path}`;

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    return text;
  }
};

const requestRaw = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    credentials: 'include',
    ...options
  });

  const data = await parseResponse(response);
  return { response, data };
};

export const request = async (path, options = {}) => {
  const { response, data } = await requestRaw(path, options);
  if (!response.ok) {
    const message = data?.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const refreshAccessTokenInternal = async () => {
  const data = await request('/auth/refresh', { method: 'POST' });
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

export const requestWithAuth = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const { response, data } = await requestRaw(path, {
    ...options,
    headers
  });

  if (response.status === 401) {
    try {
      await refreshAccessToken();
      const retryHeaders = new Headers(options.headers || {});
      if (accessToken) {
        retryHeaders.set('Authorization', `Bearer ${accessToken}`);
      }

      const retryResult = await requestRaw(path, {
        ...options,
        headers: retryHeaders
      });

      if (!retryResult.response.ok) {
        const message = retryResult.data?.message || 'Request failed';
        const error = new Error(message);
        error.status = retryResult.response.status;
        error.data = retryResult.data;
        throw error;
      }

      return retryResult.data;
    } catch (err) {
      clearAccessToken();
      throw err;
    }
  }

  if (!response.ok) {
    const message = data?.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
