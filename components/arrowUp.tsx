import React from "react";

import { IoIosArrowUp } from "react-icons/io";

import arrowStyles from "../styles/arrow.module.scss";

const ArrowUp = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={arrowStyles.arrowUp} onClick={(e) => handleClick(e)}>
      <IoIosArrowUp />
    </div>
  );
};

export default ArrowUp;
