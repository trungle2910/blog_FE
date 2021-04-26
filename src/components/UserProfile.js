import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../reduxw/actions/auth.actions";
import { userActions } from "../redux/actions/user.actions";

const UserProfile = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    name: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const getUserData = () => {
      dispatch(userActions.getCurrentUser());
    };
    getUserData();
  }, [dispatch]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, avatarUrl } = formData;
    if (!name) {
      setShow(false);
    } else {
      dispatch(userActions.editProfile({ name, avatarUrl }));
    }
  };
  return (
    <div className="text-center">
      <img
        src={`${
          userData?.avatarUrl
            ? userData?.avatarUrl
            : "https://i.pinimg.com/originals/6e/58/9a/6e589a76e6403015819eacb830756c4a.png"
        }`}
        alt=""
        style={{
          width: "250px",
          borderRadius: "50%",
        }}
      />
      <h1 style={{ marginTop: "7px" }}>{userData?.name}</h1>
      <h5>email: {userData?.email}</h5>
      <button
        className="button button--calypso"
        style={{ outline: "none" }}
        onClick={() => setShow(true)}
      >
        <span>Edit Your Profile</span>
      </button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Avatar URL"
                name="avatarUrl"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfile;
