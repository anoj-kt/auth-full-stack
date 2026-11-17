import type { Credentials } from '@/types';
import { accessTokenSchema, userSchema } from '@/zod';

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

if (!AUTH_API_URL) {
  throw new Error('Auth API URL is required. Check your .env file.');
}

export const register = async (credentials: Credentials) => {
  const response = await fetch(AUTH_API_URL + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Die Registierung ist fehlgeschlagen.',
    );
  }

  const data = await response.json();
  const parsedData = accessTokenSchema.parse(data);
  return parsedData;
};

export const login = async (credentials: Credentials) => {
  const response = await fetch(AUTH_API_URL + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Die Anmeldung ist fehlgeschlagen.');
  }

  const data = await response.json();
  const parsedData = accessTokenSchema.parse(data);
  return parsedData;
};

export const getUser = async () => {
  const response = await fetch(AUTH_API_URL + '/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || 'Die Profil konnte nicht geladen werden.',
    );
  }

  const data = await response.json();
  const parsedData = userSchema.parse(data);
  return parsedData;
};

export const logout = async () => {
  const response = await fetch(AUTH_API_URL + '/logout', {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Die Abmelden ist fehlgeschlagen.');
  }
};
