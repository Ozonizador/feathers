import React from "react";

function Button({ text, onClick }) {
  return (
    <div>
      <div className="text-center" onClick={onClick}>
        <div>{text}</div>
      </div>
    </div>
  );
}

export default Button;
