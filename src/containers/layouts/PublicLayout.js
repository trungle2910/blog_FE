import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import BlogDetailPage from "../../pages/BlogDetailPage";
import NotFoundPage from "../../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/blogs/:id" component={BlogDetailPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PublicLayout;
