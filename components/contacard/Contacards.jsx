import React from "react";
import Image from "next/image";

function Contacards(props) {
  return (
    <div>
      <div className="container mt-4 mb-4 ">
        <div className="row ">
          <div className="col"></div>
          <div className="col-lg-8 align-self-center">
            <div className="cardcont mb-3 rounded shadow-lg" style={{ width: "840px" }}>
              <div className="row g-0">
                <div className="col-md-4 p-4">
                  <Image
                    src={props.img}
                    height={64}
                    width={64}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8 mt-4 pt-4">
                  <div className="cardcont-body">
                    <h5 className="cardcont-title">{props.heading}</h5>
                    <p className="cardcont-text">{props.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default Contacards;
