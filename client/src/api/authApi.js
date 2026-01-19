import { clearAccessToken, request, requestWithAuth, setAccessToken } from './httpClient.js';

export const login = async ({ email, password }) => {
  const data = await request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

export const register = async ({ fullName, email, password }) => {
  const data = await request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  });

  if (data?.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

export const logout = async () => {
  await request('/auth/logout', { method: 'POST' });
  clearAccessToken();
};

export const getMe = async () => {
  return requestWithAuth('/auth/me');
};
