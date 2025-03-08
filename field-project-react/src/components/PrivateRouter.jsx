// PrivateRouter.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Use the AuthContext

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth(); // Get the user and loading state from context

  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading indicator while checking auth
  }

  // If no user, redirect to login; else, render the child components
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
