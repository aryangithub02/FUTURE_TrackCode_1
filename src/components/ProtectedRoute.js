import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Always redirect to login for /admin
  const location = useLocation();
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
