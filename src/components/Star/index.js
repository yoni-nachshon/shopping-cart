import React from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ filled, onClick }) => {
  return (
    <FaStar 
     color={filled ? "orange" : "lightgray"} 
     onClick={onClick} 
     />
  );
}
export default Star;