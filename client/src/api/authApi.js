import { apiClient, clearAccessToken, setAccessToken } from './httpClient.js';

const toFriendlyAuthError = (error, fallbackMessage) => {
  const apiMessage = error?.response?.data?.message;

  if (apiMessage) {
    if (apiMessage === 'Invalid credentials') {
      return 'Email or password is incorrect.';
    }
    if (apiMessage === 'Email already in use') {
      return 'Email is already registered.';
    }
    return apiMessage;
  }

  if (error?.message === 'Network Error') {
    return 'Unable to reach the server. Please try again.';
  }

  return fallbackMessage;
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });

    if (data?.accessToken) {
      setAccessToken(data.accessToken);
    }

    return data;
  } catch (error) {
    throw new Error(toFriendlyAuthError(error, 'Login failed. Please try again.'));
  }
};

export const register = async ({ fullName, email, password }) => {
  try {
    const { data } = await apiClient.post('/auth/register', { fullName, email, password });

    if (data?.accessToken) {
      setAccessToken(data.accessToken);
    }

    return data;
  } catch (error) {
    throw new Error(toFriendlyAuthError(error, 'Registration failed. Please try again.'));
  }
};

export const logout = async () => {
  await apiClient.post('/auth/logout');
  clearAccessToken();
};

export const getMe = async () => {
  const { data } = await apiClient.get('/auth/me');
  return data;
};
