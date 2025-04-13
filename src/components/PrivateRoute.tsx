import { useQuery } from '@tanstack/react-query';
import { fetchSession } from '../api/auth';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
