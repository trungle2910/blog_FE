import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ ...rest }) => {
  const isAuthenticated = true;
  if (isAuthenticated) return <Route {...rest} />;
  return <Route render={() => <Redirect to="/login" />} />;
};

export default ProtectedRoute;
