import { createContext, useContext } from 'react';
import type { Credentials, User } from '@/types';

type AuthContextValue = {
  user: User | null;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  checkingSession: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('Auth Provider is missing');
  return auth;
};

export { useAuth, AuthContext };
