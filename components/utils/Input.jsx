import classNames from "classnames";
import React from "react";

/*
- onChange -> pass () => {}
- label - to match the label
*/

export default function Input({ onChange, label = "", labelText = "", customCss = "" }) {
  return (
    <div className="my-2">
      <div className="">
        {label && <label htmlFor={label}>{labelText}</label>}
        <input
          className={classNames("block w-full py-2 px-4 border-solid border border-terciary-500 bg-white rounded-md shadow-sm", `${customCss}`)}
          onChange={onChange}
          name={label}
        ></input>
      </div>
    </div >
  );
}
