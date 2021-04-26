import { combineReducers } from "redux";

import authReducers from "./auth.reducers";
import blogReducers from "./blog.reducers";
import friendReducer from "./friend.reducers";
import routeReducers from "./route.reducers";
import userReducers from "./user.reducers";

const rootReducer = combineReducers({
  blog: blogReducers,
  auth: authReducers,
  route: routeReducers,
  user: userReducers,
  friend: friendReducer,
});

export default rootReducer;
