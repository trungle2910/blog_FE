import React, { useEffect, useState } from "react";
import { Badge, Button, Tab, Table, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { friendActions } from "../redux/actions/friend.actions";
import PaginationBar from "./PaginationBar";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faTrashAlt,
  faCheck,
  faUserCheck,
  faTimes,
  faPauseCircle,
} from "@fortawesome/free-solid-svg-icons";

const UserFriendship = () => {
  const [key, setKey] = useState("allUser");
  const allFriendData = useSelector((state) => state.friend.allFriend);
  const loading = useSelector((state) => state.friend.loading);
  const totalPageNum = allFriendData?.totalPages;
  const allFriend = allFriendData?.users;
  const [pageNum, setPageNum] = useState(1);
  const newLoading = useSelector((state) => state.friend.newLoading);
  const defaultAvatar =
    "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
  console.log("all allFriendData", allFriendData);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (key === "allUser") {
      dispatch(friendActions.getAllUser(pageNum));
      return;
    } else if (key === "sent") {
      dispatch(friendActions.sentRequests(pageNum));
      return;
    } else if (key === "received") {
      dispatch(friendActions.receivedRequest(pageNum));
      return;
    } else if (key === "friends") {
      dispatch(friendActions.getMyFriends(pageNum));
      return;
    } else if (key === "home") {
      history.push("/");
    }
  }, [key, pageNum, dispatch, newLoading, history]);

  // if (loading === true) {
  //   return <h1 className="text-center">Loading......</h1>;
  // }

  return (
    <>
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} variant="pills">
            <Tab eventKey="allUser" title="All User">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFriend?.map((friend) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`${
                              !friend.avatarUrl
                                ? defaultAvatar
                                : friend.avatarUrl
                            }`}
                            alt="blah"
                            style={{ borderRadius: "50%", height: "70px" }}
                          />
                        </td>
                        <td>{friend?.name}</td>
                        <td>{friend?.email}</td>
                        <td>
                          {!friend.friendship ||
                          friend?.friendship.status === "cancel" ? (
                            <Button
                              variant="outline-primary"
                              onClick={() => {
                                dispatch(
                                  friendActions.sendFriendRequest(friend._id)
                                );
                              }}
                            >
                              <FontAwesomeIcon icon={faUserPlus} /> Add Friend
                            </Button>
                          ) : friend?.friendship.status === "requesting" ? (
                            <h5>
                              <Badge pill variant="warning">
                                <FontAwesomeIcon icon={faPauseCircle} />
                                Requesting
                              </Badge>
                            </h5>
                          ) : (
                            <h5>
                              <Badge pill variant="success">
                                <FontAwesomeIcon icon={faCheck} /> Friend
                              </Badge>
                            </h5>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="sent" title="Sent Requsets">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFriend?.map((friend) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`${
                              !friend.avatarUrl
                                ? defaultAvatar
                                : friend.avatarUrl
                            }`}
                            alt="blah"
                            style={{ borderRadius: "50%", height: "70px" }}
                          />
                        </td>
                        <td>{friend?.name}</td>
                        <td>{friend?.email}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              dispatch(friendActions.cancelRequest(friend._id));
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTimes} /> Cancel Request{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="received" title="Received Requests">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFriend?.map((friend) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`${
                              !friend.avatarUrl
                                ? defaultAvatar
                                : friend.avatarUrl
                            }`}
                            alt="blah"
                            style={{ borderRadius: "50%", height: "70px" }}
                          />
                        </td>
                        <td>{friend?.name}</td>
                        <td>{friend?.email}</td>
                        <td>
                          <Button
                            variant="outline-success"
                            onClick={() => {
                              dispatch(friendActions.acceptRequest(friend._id));
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faUserCheck} /> Accept{" "}
                          </Button>
                          <Button
                            variant="outline-warning"
                            onClick={() => {
                              dispatch(
                                friendActions.declineRequest(friend._id)
                              );
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTimes} /> Decline{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="friends" title="My Friends">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFriend?.map((friend) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={`${
                              !friend.avatarUrl
                                ? defaultAvatar
                                : friend.avatarUrl
                            }`}
                            alt="blah"
                            style={{ borderRadius: "50%", height: "70px" }}
                          />
                        </td>
                        <td>{friend?.name}</td>
                        <td>{friend?.email}</td>
                        <td>
                          {" "}
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              dispatch(friendActions.deleteFriend(friend._id));
                            }}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrashAlt} /> Delete{" "}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="home" title="Go Home" />
          </Tabs>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
          />
        </div>
      )}
    </>
  );
};

export default UserFriendship;
