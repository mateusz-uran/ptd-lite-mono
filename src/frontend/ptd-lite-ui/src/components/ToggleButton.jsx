import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const ToggleButton = ({ toggleFunction, toggleCondition }) => {
  return (
    <button onClick={toggleFunction} id="toggle-button" className="primary-btn">
      <MdKeyboardArrowDown className={toggleCondition ? "rotate" : ""} />
    </button>
  );
};

export default ToggleButton;
