import React from "react";

const HighlightText = ({text}) => {
  return (
    <span className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
