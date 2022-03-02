import React from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ filled }) => {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"}  
     />
  );
}
export default Star;