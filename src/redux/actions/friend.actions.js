import * as types from "../constants/friend.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const getAllUser = (pageNum) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ALL_USERS_REQUEST, payload: null });
    const res = await api.get(`/users?page=${pageNum}`);
    dispatch({
      type: types.GET_ALL_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_ALL_USERS_FAILURE, payload: error.message });
  }
};
const sentRequests = (pageNum) => async (dispatch) => {
  try {
    dispatch({ type: types.SENT_REQUESTS_REQUEST, payload: null });
    const res = await api.get(`/friends/add?page=${pageNum}`);
    dispatch({ type: types.SENT_REQUESTS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.SENT_REQUESTS_FAILURE, payload: error.message });
  }
};
const receivedRequest = (pageNum) => async (dispatch) => {
  try {
    dispatch({ type: types.RECEIVED_REQUESTS_REQUEST, payload: null });
    const res = await api.get(`/friends/manage?page=${pageNum}`);
    dispatch({
      type: types.RECEIVED_REQUESTS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.RECEIVED_REQUESTS_FAILURE, payload: error.message });
  }
};
const getMyFriends = (pageNum) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_MY_FRIENDS_REQUEST, payload: null });
    const res = await api.get(`/friends?page=${pageNum}`);
    dispatch({ type: types.GET_MY_FRIENDS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_MY_FRIENDS_FAILURE, payload: error.message });
  }
};

const sendFriendRequest = (toUserId) => async (dispatch) => {
  try {
    dispatch({ type: types.SEND_FRIEND_REQUEST_REQUEST, payload: null });
    const res = await api.post(`/friends/add/${toUserId}`);
    dispatch({ type: types.SEND_FRIEND_REQUEST_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({
      type: types.SEND_FRIEND_REQUEST_FAILURE,
      payload: error.message,
    });
  }
};
const acceptRequest = (fromUserId) => async (dispatch) => {
  try {
    dispatch({ type: types.ACCEPT_FRIEND_REQUEST_REQUEST, payload: null });
    const res = await api.post(`/friends/manage/${fromUserId}`);
    dispatch({ type: types.ACCEPT_FRIEND_REQUEST_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({
      type: types.ACCEPT_FRIEND_REQUEST_FAILURE,
      payload: error.message,
    });
  }
};
const declineRequest = (fromUserId) => async (dispatch) => {
  try {
    dispatch({ type: types.DECLINE_FRIEND_REQUEST_REQUEST, payload: null });
    const res = await api.delete(`/friends/manage/${fromUserId}`);
    dispatch({ type: types.DECLINE_FRIEND_REQUEST_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({
      type: types.DECLINE_FRIEND_REQUEST_FAILURE,
      payload: error.message,
    });
  }
};
const cancelRequest = (toUserId) => async (dispatch) => {
  try {
    dispatch({ type: types.CANCEL_REQUEST_REQUEST, payload: null });
    const res = await api.delete(`/friends/add/${toUserId}`);
    dispatch({ type: types.CANCEL_REQUEST_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({
      type: types.CANCEL_REQUEST_FAILURE,
      payload: error.message,
    });
  }
};
const deleteFriend = (friendUserId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_FRIEND_REQUEST, payload: null });
    const res = await api.delete(`/friends/${friendUserId}`);
    dispatch({ type: types.DELETE_FRIEND_SUCCESS, payload: res });
    toast.success(res.data.message);
  } catch (error) {
    dispatch({
      type: types.DELETE_FRIEND_FAILURE,
      payload: error.message,
    });
  }
};
export const friendActions = {
  getAllUser,
  sentRequests,
  receivedRequest,
  getMyFriends,
  sendFriendRequest,
  acceptRequest,
  cancelRequest,
  declineRequest,
  deleteFriend,
};
