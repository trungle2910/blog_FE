import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// import { ClipLoader } from "react-spinners";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "./redux/actions/auth.actions";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// imort components
import NavigationBar from "./components/NavigationBar";
import Notification from "./components/Notification";
// import pages
import Routes from "./containers/Routes";

library.add(
  fab,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt
);

function App() {
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken && accessToken !== "undefined") {
  //     dispatch(authActions.getRealCurrentUser);
  //   } else {
  //     dispatch(authActions.logout());
  //   }
  // }, [dispatch]);

  return (
    <Router>
      <NavigationBar />
      <Notification />
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}

export default App;
