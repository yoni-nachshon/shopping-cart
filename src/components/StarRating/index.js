import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = ({ rating }) => {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((el, i) =>
        i < rating && i + 1 > rating ? (
          <BsStarHalf key={i} color="orange" />
        ) : i < rating ? (
          <BsStarFill key={i} color="orange" />
        ) : (
          <BsStar key={i} color="orange" />
        )
      )}
    </span>
  );
};
export default StarRating;
