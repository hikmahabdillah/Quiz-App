import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = useContext(AuthContext);
  console.log('ProtectedRoute Auth Status:', isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
