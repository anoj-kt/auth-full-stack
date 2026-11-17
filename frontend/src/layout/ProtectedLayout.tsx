import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/context/AuthContext';

export const ProtectedLayout = () => {
  const { user, checkingSession } = useAuth();

  if (checkingSession) return <p>Session wird geprüft</p>;

  return user ? <Outlet /> : <Navigate to='/login' />;
};
