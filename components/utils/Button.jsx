import React from "react";

function Button({ text, onClick }) {
  return (
    <>
      <button className="rounded-xl bg-primary-500 p-4 text-center text-white" onClick={onClick}>
        {text}
      </button>
    </>
  );
}

export default Button;
