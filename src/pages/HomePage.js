import React from "react";
// import Loader from "../components/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogActions } from "../redux/actions/blog.actions";
import { ClipLoader } from "react-spinners";
import { Container, Row, Card, Button, Col, Jumbotron } from "react-bootstrap";
import PaginationBar from "../components/PaginationBar";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import moment from "moment";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const loading = useSelector((state) => state.blog.loading);
  // const [blogs, setBlogs] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const BACKEND_API = process.env.REACT_APP_BACKEND_API;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickDetail = (id) => {
    console.log(id);
    history.push(`/blogs/${id}`);
  };

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum));
  }, [dispatch, pageNum]);

  return (
    <Container style={{ marginTop: "150px" }}>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
        {isAuthenticated && (
          <Link to="/member/blog/add">
            <Button variant="primary">Write now</Button>
          </Link>
        )}
      </Jumbotron>

      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <>
              <Row>
                {blogs.map((blog) => (
                  <Col xs={4} className="mb-4">
                    <Card
                      className="card-box"
                      style={{
                        width: "18rem",
                        height: "35rem",
                        marginBottom: "11px",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          blog.images[0]?.length < 20 || !blog.images.length
                            ? ` https://makitweb.com/demo/broken_image/images/noimage.png`
                            : blog.images[0]
                        }
                        style={{ height: "20rem", width: "18rem" }}
                      />
                      <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>
                          {blog.content.length <= 130
                            ? blog.content
                            : blog.content.slice(0, 130) + "......"}
                        </Card.Text>
                        <div className="text-center">
                          <Button
                            variant="outline-success"
                            onClick={() => handleClickDetail(blog._id)}
                          >
                            Click to View Post
                          </Button>
                        </div>
                      </Card.Body>
                      <Card.Footer
                        className="text-muted"
                        style={{ fontSize: "10px" }}
                      >
                        @{blog.author.name} {moment().startOf("hour").fromNow()}
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row
                className="d-flex justify-content-center mb-3"
                style={{ position: "sticky", bottom: "5px" }}
              >
                <PaginationBar
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                  totalPageNum={totalPageNum}
                />
              </Row>
            </>
          ) : (
            <p>There are no blogs</p>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
