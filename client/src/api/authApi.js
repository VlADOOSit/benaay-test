import { apiClient, clearAccessToken, setAccessToken } from './httpClient.js';

export const login = async ({ email, password }) => {
  const { data } = await apiClient.post('/auth/login', { email, password });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

export const register = async ({ fullName, email, password }) => {
  const { data } = await apiClient.post('/auth/register', { fullName, email, password });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

export const logout = async () => {
  await apiClient.post('/auth/logout');
  clearAccessToken();
};

export const getMe = async () => {
  const { data } = await apiClient.get('/auth/me');
  return data;
};
