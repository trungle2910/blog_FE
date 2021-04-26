import * as types from "../constants/blog.constants";

const initialState = {
  blogs: [],
  selectedBlog: null,
  totalPageNum: 1,
  loading: false,
  submitLoading: false,
  error: null,
};

const blogReducers = (state = initialState, action) => {
  const { type, payload } = action;

  // GET_BLOGS, GET_BLOG_DETAIL, SEND_REACTION, CREATE_REVIEW

  switch (type) {
    case types.GET_BLOGS_REQUEST:
    case types.GET_BLOG_DETAIL_REQUEST:
    case types.CREATE_BLOG_REQUEST:
    case types.UPDATE_BLOG_REQUEST:
    case types.DELETE_BLOG_REQUEST:
      state.loading = true;
      state.error = null;
      break;

    case types.SEND_REACTION_REQUEST:
    case types.CREATE_REVIEW_REQUEST:
      state.submitLoading = true;
      state.error = null;
      break;

    case types.GET_BLOGS_SUCCESS:
      state.blogs = payload.blogs;
      state.totalPageNum = payload.totalPages;
      state.loading = false;
      break;

    case types.GET_BLOG_DETAIL_SUCCESS:
      state.selectedBlog = payload;
      state.loading = false;
      break;

    case types.CREATE_BLOG_SUCCESS:
      state.loading = false;
      break;

    case types.UPDATE_BLOG_SUCCESS:
      state.selectedBlog = payload;
      state.loading = false;
      break;

    case types.DELETE_BLOG_SUCCESS:
      state.selectedBlog = {};
      state.loading = false;
      break;

    case types.BLOG_REACTION_SUCCESS:
      state.selectedBlog = { ...state.selectedBlog, reactions: payload };
      state.submitLoading = false;
      break;

    case types.REVIEW_REACTION_SUCCESS:
      state.selectedBlog = {
        ...state.selectedBlog,
        reviews: [
          ...state.selectedBlog.reviews.map((review) => {
            if (review._id !== payload.review_id) return review;
            return { ...review, reactions: payload.reactions };
          }),
        ],
      };
      state.submitLoading = false;
      break;

    case types.GET_BLOGS_FAILURE:
    case types.GET_BLOG_DETAIL_FAILURE:
    case types.CREATE_BLOG_FAILURE:
    case types.UPDATE_BLOG_FAILURE:
    case types.DELETE_BLOG_FAILURE:
      state.error = payload;
      state.loading = false;
      break;

    case types.SEND_REACTION_FAILURE:
    case types.CREATE_REVIEW_FAILURE:
      state.error = payload;
      state.submitLoading = false;
      break;

    default:
      return state;
  }

  return { ...state };
};

export default blogReducers;
