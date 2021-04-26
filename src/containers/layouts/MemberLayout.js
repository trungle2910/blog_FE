import React from "react";
import { Switch, Route } from "react-router-dom";
import BlogEditorPage from "../../pages/BlogEditorPage";

import ProfilePage from "../../pages/ProfilePage";

const MemberLayout = () => {
  return (
    <Switch>
      <Route exact path="/member/blog/add" component={BlogEditorPage} />
      <Route exact path="/member/profile" component={ProfilePage} />
    </Switch>
  );
};

export default MemberLayout;
