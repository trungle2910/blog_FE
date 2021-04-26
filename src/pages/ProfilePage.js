import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "../components/UserProfile";
import UserFriendship from "../components/UserFriendship";

const ProfilePage = () => {
  return (
    <div className="pages">
      <Container fluid>
        <Row style={{ padding: "20px 25px 0 25px" }}>
          <Col sm={3} style={{ position: "relative" }}>
            <div style={{ position: "sticky", top: "200px", left: "20px" }}>
              <UserProfile />
            </div>
          </Col>
          <Col sm={9}>
            <UserFriendship />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
