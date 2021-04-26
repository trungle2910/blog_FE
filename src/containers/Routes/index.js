import React from "react";
import { Route, Switch } from "react-router-dom";

import MemberLayout from "../layouts/MemberLayout";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/member" component={MemberLayout} />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};

export default Routes;
