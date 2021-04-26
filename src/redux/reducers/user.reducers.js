import * as types from "../constants/user.constants";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERS_REQUEST:
    case types.EDIT_PROFILE_REQUEST:
      state.loading = true;
      state.error = null;
      break;

    case types.GET_USERS_SUCCESS:
      state.user = { ...payload };
      state.loading = false;
      console.log("ssss", state);
      break;

    case types.EDIT_PROFILE_SUCCESS:
      state.loading = false;
      break;

    case types.GET_USERS_FAILURE:
    case types.EDIT_PROFILE_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    default:
      return state;
  }

  return { ...state };
};

export default userReducers;
