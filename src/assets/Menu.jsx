import React from "react";

const Menu = ({ color }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.43734 22.7084H15.5623C20.6665 22.7084 22.7082 20.6667 22.7082 15.5626V9.43758C22.7082 4.33341 20.6665 2.29175 15.5623 2.29175H9.43734C4.33317 2.29175 2.2915 4.33341 2.2915 9.43758V15.5626C2.2915 20.6667 4.33317 22.7084 9.43734 22.7084Z"
        stroke={color}
        strokeWidth="1.53125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.4375 2.29175V22.7084"
        stroke={color}
        strokeWidth="1.53125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Menu;

 