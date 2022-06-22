import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-12 d-flex flex-row cardss mt-4 mb-4 p-2 shadow-lg rounded">
            <div className="col-2 p-2">
              <img src={props.img} alt="" />
            </div>
            <div className="col-2 p-2 mt-4 ">
              <img src={props.img11} alt="" />
            </div>
            <div className="col-8 p-2 mt-2 mr-4 ">
              {" "}
              <div className="card-bodys">
                <h5 className="card-titless">{props.heading}</h5>
                <p className="card-textss">{props.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
