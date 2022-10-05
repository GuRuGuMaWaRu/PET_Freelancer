import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";
import Spinner from "../layout/Spinner";

const PrivateRoutes = () => {
  const user = useAppSelector(state => state.auth.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
