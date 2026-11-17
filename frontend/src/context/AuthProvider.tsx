import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { Credentials, User } from '@/types';
import { getUser, login, logout } from '@/data/auth';

const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

if (!AUTH_API_URL) {
  throw new Error('Auth API URL is required. Check your .env file.');
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // setUser ergänzen wir, wenn wir das Profil laden.
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        if (!localStorage.getItem('accessToken')) return;

        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('accessToken');
        console.log(error);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreUser();
  }, []);

  const signIn = async (credentials: Credentials) => {
    const { accessToken } = await login(credentials);
    localStorage.setItem('accessToken', accessToken);

    //Holen wir User Daten
    const userData = await getUser();
    setUser(userData);
  };

  const signOut = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, checkingSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
