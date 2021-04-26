import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ReviewForm = ({
  reviewText,
  handleInputChange,
  handleReviewSubmit,
  loading,
}) => {
  return (
    <Form onSubmit={handleReviewSubmit}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="review" column sm="2">
          Review:
        </Form.Label>

        <Col sm="8">
          <Form.Control
            id="review"
            type="text"
            placeholder="Write a Review"
            value={reviewText}
            onChange={handleInputChange}
          />
        </Col>

        {loading ? (
          <Button variant="primary" type="button" disabled>
            {" "}
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Posting...
          </Button>
        ) : (
          <Button type="submit" disabled={!reviewText}>
            Post Review
          </Button>
        )}
      </Form.Group>
    </Form>
  );
};

export default ReviewForm;
