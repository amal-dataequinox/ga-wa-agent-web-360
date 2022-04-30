import { ReactNode } from 'react';
import {  useHistory } from 'react-router-dom';
import useAuth from '../pages/Auth/useAuth';
// hooks

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();
	const history = useHistory();

  if (isAuthenticated) {
    return history.push('/home');
  }

  return <>{children}</>;
}
