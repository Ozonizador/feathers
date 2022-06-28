import React from "react";

/*
- onChange -> pass () => {}
- label - to match the label
*/

export default function Input({ onChange, label = "", labelText = "" }) {
  return (
    <div className="my-2">
      <div className="">
        {label && <label htmlFor={label}>{labelText}</label>}
        <input
          className="mt-1 w-full border border-terciary-500 p-1"
          onChange={onChange}
          name={label}
        ></input>
      </div>
    </div>
  );
}
