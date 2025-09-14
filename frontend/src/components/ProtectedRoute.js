import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // user logged out → login page pe redirect
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
