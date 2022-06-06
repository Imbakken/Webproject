import { Route, Navigate } from "react-router-dom";
import { AuthConsumer } from '../utils/Auth';

//checking if user is admin with isAdminFunc and rendering component if true
//else redirect to /profile
const AdminRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAdminFunc }) => (
      <Route {...rest} render={({ props }) =>
        isAdminFunc() ? (
            <Component {...props} />
          ) : (
            <Navigate
              to={{
                pathname: "/profile"
              }}
            />
          )}
        />
      )}
  </AuthConsumer>
);

export default AdminRoute;