import React, { useState } from "react";
import { Navigate, Route } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
// import { useAuth } from '../../context/auth';
import Login from '../../pages/Login';

type PublicRouteProps =  {
  path: string;
  restricted?: boolean;
//   element: React.ReactElement;
}

export default function PublicRoute({path, restricted}:PublicRouteProps): React.ReactElement {
  const [isAuthenticated, setAuth] = useState<boolean>(false);
  // const { isAuthenticated } = useState();
  // isAuthenticated && restricted
  return isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Login setAuth={setAuth}/>;
}
