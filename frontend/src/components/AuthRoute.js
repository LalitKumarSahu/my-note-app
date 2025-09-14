import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    // user already logged in → home page pe redirect
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
