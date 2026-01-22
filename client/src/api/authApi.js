import { apiClient, clearAccessToken, setAccessToken } from './httpClient.js';

const toFriendlyAuthErrorKey = (error, fallbackKey) => {
  const response = error?.response;
  const apiMessage = response?.data?.message;
  const apiError = response?.data?.error;
  const details = response?.data?.details;

  if (apiError === 'VALIDATION_ERROR' && Array.isArray(details)) {
    const passwordIssue = details.find(
      (issue) => issue?.path?.[0] === 'password' && issue?.code === 'too_small'
    );

    if (passwordIssue) {
      return 'common.errors.passwordTooShort';
    }
  }

  if (apiMessage) {
    if (apiMessage === 'Invalid credentials') {
      return 'common.errors.invalidCredentials';
    }
    if (apiMessage === 'Email already in use') {
      return 'common.errors.emailInUse';
    }
  }

  if (error?.message === 'Network Error') {
    return 'common.errors.network';
  }

  return fallbackKey;
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await apiClient.post('/auth/login', { email, password });

    if (data?.accessToken) {
      setAccessToken(data.accessToken);
    }

    return data;
  } catch (error) {
    throw new Error(toFriendlyAuthErrorKey(error, 'common.modals.login.error'));
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
    throw new Error(toFriendlyAuthErrorKey(error, 'common.modals.register.error'));
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
