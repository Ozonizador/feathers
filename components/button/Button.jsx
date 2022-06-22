import React from "react";
import "./Button.css";


function Button(props) {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div id="Button" className="btn">
          {props.text}
        </div>
      </div>
    </div>
  );
}

export default Button;
