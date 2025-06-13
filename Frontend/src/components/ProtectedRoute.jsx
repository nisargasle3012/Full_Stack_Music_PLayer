import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" replace />;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token'); // Clear expired token
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    localStorage.removeItem('token'); // If decode fails
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
