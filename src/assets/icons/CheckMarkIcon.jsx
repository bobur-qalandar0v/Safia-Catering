import * as React from "react";
const CheckMarkIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <path
      stroke="#142147"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m12.766 7.719-4.357 4.156-2.175-2.078"
    />
    <path
      stroke="#142147"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.5 16.625a7.125 7.125 0 1 0 0-14.25 7.125 7.125 0 0 0 0 14.25Z"
    />
  </svg>
);
export default CheckMarkIcon;
