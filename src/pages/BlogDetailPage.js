import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { blogActions } from "../redux/actions/blog.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import Markdown from "react-markdown";

import Loader from "../components/Loader";
import Reactions from "../components/Reactions";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";

const BlogDetailPage = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const blog = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const submitLoading = useSelector((state) => state.blog.submitLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("....", currentUser);
  console.log(blog?.author._id);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (params?.id) {
      console.log("hellooo");
      dispatch(blogActions.getSingleBlog(params.id));
    }
  }, [dispatch, params]);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(params.id, reviewText));
    setReviewText("");
  };

  const handleGoBack = (e) => {
    history.goBack();
  };

  return (
    <div className="pages">
      <Container>
        <div className="d-flex justify-content-between">
          <Button onClick={handleGoBack}>
            <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
          </Button>

          {/* Blog Edit button */}
          {blog?._id && currentUser?._id === blog?.author?._id ? (
            <Link to={`/blog/edit/${blog._id}`}>
              <Button variant="success">
                <FontAwesomeIcon icon="edit" size="1x" /> Edit
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>

        {/* Blog detail section */}
        {loading ? (
          <Loader />
        ) : (
          <>
            {blog && (
              <div className="mb-5">
                <h4>{blog.title}</h4>

                {blog.images && (
                  <img
                    src={blog.images[0]}
                    alt="blog"
                    style={{ maxWidth: "500px" }}
                  />
                )}

                <span className="text-muted">
                  @{blog.author?.name} wrote
                  <Moment fromNow>{blog.createdAt}</Moment>
                </span>

                <hr />

                {blog.content && <Markdown source={blog.content} />}

                <hr />

                <Reactions
                  reactionsData={blog.reactions}
                  targetType="Blog"
                  targetId={blog._id}
                  size="lg"
                />

                <hr />

                <Reviews reviews={blog.reviews} />
              </div>
            )}

            {/* Review Creation Form*/}
            {isAuthenticated && (
              <ReviewForm
                reviewText={reviewText}
                handleInputChange={handleInputChange}
                handleReviewSubmit={handleReviewSubmit}
                loading={submitLoading}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default BlogDetailPage;
