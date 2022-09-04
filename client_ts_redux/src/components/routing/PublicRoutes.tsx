import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/redux";

const PublicRoutes = () => {
  const user = useAppSelector(state => state.auth.user);
  console.log("PublicRoutes user", user);

  return user ? <Navigate to="/projects" replace /> : <Outlet />;
};

export default PublicRoutes;
