import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import Home from '../../pages/Home'


// type PrivateRouteProps = {
//   path: string;
// }

export default function PrivateRoute(): React.ReactElement {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;

  return !isAuthenticated ? <Navigate to={ROUTES.SIGNIN} replace /> : <Home />;
}


