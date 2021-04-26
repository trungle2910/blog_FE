import * as types from "../constants/auth.constants";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: localStorage.getItem("accessToken"),
};

const authReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.GET_REAL_CURRENT_USER_REQUEST:
      state.loading = true;
      state.error = null;
      break;

    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      state.user = { ...payload.data };
      state.accessToken = payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
      break;

    case types.REGISTER_SUCCESS:
      state.loading = false;
      console.log("Successful");
      break;

    case types.GET_REAL_CURRENT_USER_SUCCESS:
      state.user = payload;
      state.isAuthenticated = true;
      state.loading = false;
      break;

    case types.LOGIN_FAILURE:
    case types.GET_REAL_CURRENT_USER_FAILURE:
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;
      break;

    case types.REGISTER_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    case types.LOGOUT:
      state.accessToken = null;
      localStorage.clear();
      break;

    default:
      return state;
  }

  return { ...state };
};

export default authReducers;
