import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { blogActions } from "../redux/actions/blog.actions";
import { routeActions } from "../redux/actions/route.actions";

const BlogEditorPage = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const blogId = params.id;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    images: [],
  });
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const loading = useSelector((state) => state.blog.loading);
  const addOrEdit = params.id ? "Edit" : "Add";

  const handleChange = (e) => {
    if (e.target.name === "images") {
      console.log(e.target.files);
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(blogActions.createBlog({ title, content, images }));
    } else if (addOrEdit === "Edit") {
      dispatch(
        blogActions.updateBlog(selectedBlog._id, title, content, images)
      );
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    dispatch(blogActions.deleteBlog(selectedBlog._id));
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["socialBlog", "blogImages"],
      },
      function (error, result) {
        if (result && result.length) {
          if (result.event === "success") {
            setFormData({
              ...formData,
              images: result.map((res) => res.secure_url),
            });
          }
        }
      }
    );
  };

  useEffect(() => {
    if (blogId) {
      if (!selectedBlog) {
        dispatch(blogActions.getSingleBlog(blogId));
      }
      setFormData((formData) => ({
        ...formData,
        title: selectedBlog.title,
        content: selectedBlog.content,
        images: selectedBlog.images,
      }));
    }
  }, [blogId, dispatch, selectedBlog]);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [redirectTo, dispatch, history]);

  return (
    <Container className="pages">
      <h1> Editor of blog content</h1>

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} blog</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>

            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="file"
                name="images"
                multiple
                accept="image/png image/jpeg image/jpg"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              {formData.images &&
                formData.images.length > 0 &&
                formData.images.map((image) => (
                  <img
                    src={image}
                    key={image}
                    width="90px"
                    height="60px"
                    alt="blog images"
                  />
                ))}
              <Button variant="info" onClick={uploadWidget}>
                {addOrEdit} images
              </Button>
            </Form.Group>

            <Button.Group className="d-flex mb-3">
              {loading ? (
                <Button
                  className="mr-3"
                  variant="success"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="success">
                  Submit
                </Button>
              )}

              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Button.Group>

            {addOrEdit === "Edit" && (
              <Button.Group className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Blog
                </Button>
              </Button.Group>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogEditorPage;
