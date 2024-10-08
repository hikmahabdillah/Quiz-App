import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // get nilai authentikasi user (true/false)
  const {isAuthenticated} = useContext(AuthContext);

  // if not direct to halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // arahkan ke halaman children(app=homepage)
  return children;
};

export default ProtectedRoute;
