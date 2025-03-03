// import React, { useState } from "react";
// import { Input } from "antd";

// const FloatingInputLabel = ({ label, value, onChange, name }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div
//       className={`floating-input-container ${
//         isFocused || value ? "focused" : ""
//       }`}
//     >
//       <label className="floating-label">{label}</label>
//       <Input
//         className="input__name"
//         name={name}
//         value={value}
//         onChange={onChange}
//         onFocus={() => setIsFocused(true)}
//         onBlur={(e) => setIsFocused(e.target.value.length > 0)}
//       />
//     </div>
//   );
// };

// export default FloatingInputLabel;
