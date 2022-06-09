import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/Auth";

const AdminRoute = ({ children }) => {
let auth = React.useContext(AuthContext);
  let location = useLocation();

  return (
    <>
      {auth.isLoading && <p>Loading</p>}
      {auth.isAdminFunc && (children ? children : <Outlet />)}
      {!auth.isLoading && !auth.isAdminFunc && <Navigate to="/403" state={{ from: location }} replace />}
    </>
  )
}

export default AdminRoute; 