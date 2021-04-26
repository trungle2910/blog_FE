import * as types from "../constants/blog.constants";
import api from "../../apiService";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getBlogs = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
  try {
    const res = await api.get(`/blogs?page=${pageNum}`);
    console.log(res);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: null });
  }
};

const getSingleBlog = (blog_id) => async (dispatch) => {
  dispatch({ type: types.GET_BLOG_DETAIL_REQUEST, payload: null });
  try {
    let url = `/blogs/${blog_id}`;
    const response = await api.get(url);

    const data = response.data.data;
    dispatch({ type: types.GET_BLOG_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_BLOG_DETAIL_FAILURE, payload: error.message });
  }
};

const createReview = (blog_id, reviewText) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const response = await api.post(`/reviews/blogs/${blog_id}`, {
      content: reviewText,
    });
    const data = response.data.data;
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error.message });
  }
};

const createBlog = (title, content, images) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/blogs", formData);

    // Upload images using cloudinary already
    const res = await api.post("/blogs", { title, content, images });

    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("New blog has been created!");
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const updateBlog = (blogId, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/blogs/${blogId}`, { title, content, images });

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("The blog has been updated!");
  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};

const deleteBlog = (blog_id) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const response = await api.delete(`/blogs/${blog_id}`);
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: response.data });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("The blog has been deleted!");
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: error.message });
  }
};

const sendEmojiReaction = ({ targetType, target_id, emoji }) => async (
  dispatch
) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const response = await api.post(`/reactions`, {
      targetType,
      target_id,
      emoji,
    });
    const data = response.data;

    if (targetType === "Blog") {
      dispatch({ type: types.BLOG_REACTION_SUCCESS, payload: data });
    }

    if (targetType === "Review") {
      dispatch({ type: types.REVIEW_REACTION_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error.message });
  }
};

export const blogActions = {
  getBlogs,
  getSingleBlog,
  createReview,
  createBlog,
  updateBlog,
  deleteBlog,
  sendEmojiReaction,
};
