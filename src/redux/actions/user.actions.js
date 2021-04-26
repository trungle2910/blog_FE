import * as types from "../constants/user.constants";
import api from "../../apiService";

const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_USERS_REQUEST, payload: null });
    const response = await api.get("/users/me");
    dispatch({ type: types.GET_USERS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_USERS_FAILURE, payload: error.message });
  }
};

const editProfile = (name, avatarUrl) => async (dispatch) => {
  try {
    dispatch({ type: types.EDIT_PROFILE_REQUEST, payload: null });
    const response = await api.put("/users", name, avatarUrl);

    dispatch({ type: types.EDIT_PROFILE_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.EDIT_PROFILE_FAILURE, payload: error.message });
  }
};

export const userActions = { getCurrentUser, editProfile };
