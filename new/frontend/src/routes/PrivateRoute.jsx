import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/Auth";

const PrivateRoute = ({ children }) => {
let auth = React.useContext(AuthContext);
  let location = useLocation();

  return (
    <>
      {auth.isLoading && <p>Loading</p>}
      {auth.isEmployee && (children ? children : <Outlet />)}
      {!auth.isLoading && !auth.isEmployee && <Navigate to="/" state={{ from: location }} replace />}
    </>
  )
}

export default PrivateRoute;