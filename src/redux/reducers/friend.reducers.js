import * as types from "../constants/friend.constants";

const initialState = {
  allFriend: null,
  loading: false,
  error: null,
  newLoading: 0,
};
const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_REQUEST:
    case types.SENT_REQUESTS_REQUEST:
    case types.RECEIVED_REQUESTS_REQUEST:
    case types.GET_MY_FRIENDS_REQUEST:
    case types.SEND_FRIEND_REQUEST_REQUEST:
    case types.ACCEPT_FRIEND_REQUEST_REQUEST:
    case types.DECLINE_FRIEND_REQUEST_REQUEST:
    case types.CANCEL_REQUEST_REQUEST:
    case types.DELETE_FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.GET_ALL_USERS_FAILURE:
    case types.SENT_REQUESTS_FAILURE:
    case types.RECEIVED_REQUESTS_FAILURE:
    case types.GET_MY_FRIENDS_FAILURE:
    case types.SEND_FRIEND_REQUEST_FAILURE:
    case types.ACCEPT_FRIEND_REQUEST_FAILURE:
    case types.DECLINE_FRIEND_REQUEST_FAILURE:
    case types.CANCEL_REQUEST_FAILURE:
    case types.DELETE_FRIEND_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.DELETE_FRIEND_SUCCESS:
    case types.CANCEL_REQUEST_SUCCESS:
    case types.DECLINE_FRIEND_REQUEST_SUCCESS:
    case types.SEND_FRIEND_REQUEST_SUCCESS:
    case types.ACCEPT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        newLoading: state.newLoading + 1,
      };

    case types.GET_ALL_USERS_SUCCESS:
    case types.SENT_REQUESTS_SUCCESS:
    case types.RECEIVED_REQUESTS_SUCCESS:
    case types.GET_MY_FRIENDS_SUCCESS:
      return {
        ...state,
        allFriend: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default friendReducer;
