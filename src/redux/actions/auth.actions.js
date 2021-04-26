import * as types from "../constants/auth.constants";
import { toast } from "react-toastify";

import api from "../../apiService";
import { routeActions } from "./route.actions";

const register = (data) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const response = await api.post("/users", data);

    dispatch({ type: types.REGISTER_SUCCESS, payload: response.data.data });
    dispatch(routeActions.redirect("/login"));

    toast.success(`Thank for your registration, ${data.name}`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error.message });
  }
};

const login = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post(`/auth/login`, { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    api.defaults.headers["authorization"] =
      "Bearer " + res.data.data.accessToken;
    dispatch(routeActions.redirect("/"));
    const userName = `${res.data.data.user.name}`;
    toast.success(`Welcome, ${userName}`);
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
    toast.error(error.message);
  }
};

const logout = () => (dispatch) => {
  dispatch({ type: types.LOGOUT, payload: null });
  try {
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    toast.error(error.message);
  }
};

const getRealCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_REAL_CURRENT_USER_REQUEST, payload: null });

  // const bearerToken = "Bearer " + accessToken;
  // api.defaults.headers["authorization"] = bearerToken;

  try {
    const res = await api.get("/users/me");
    dispatch({
      type: types.GET_REAL_CURRENT_USER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_REAL_CURRENT_USER_FAILURE, payload: error });
  }
};

export const authActions = { register, login, logout, getRealCurrentUser };
