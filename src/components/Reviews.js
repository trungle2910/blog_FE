import React from "react";
import Moment from "react-moment";
import Reactions from "./Reactions";

const ReviewItem = ({ review }) => {
  return (
    <>
      <div className="review">
        <span className="review_body">{review?.content}</span>
        <br />
        <span className="reviewed_by">posted by </span>
        <span className="review_author">{review?.user?.name}</span>
        <span className="review_on"> on </span>
        <div className="review_date">
          <Moment fromNow>{review?.createdAt}</Moment>
        </div>
        <Reactions
          reactionsData={review?.reactions}
          targetType="Review"
          target_id={review?._id}
          size="sm"
        />
      </div>
    </>
  );
};

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <ReviewItem review={review} key={review._id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
