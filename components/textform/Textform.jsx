import React from "react";
import "./Textform.css";
import location from "../../assets/images/locationicon.png";
import map from "../../assets/images/mapicon.png";
function Textform() {
  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col"></div>

          <div className="col ">
            <div className="row d-flex ">
              <div className="col text-end">
                {" "}
                <p>É de Lisboa, Portugal</p>
              </div>

              <div className="col">
                <img style={{ height: "30px" }} src={location} alt="" />
              </div>
            </div>
            <div className="row d-flex">
              <div className="col text-end">
                {" "}
                <p>Fala portuguêss, inglês e espanhol</p>
              </div>
              <div className="col">
                {" "}
                <img style={{ height: "30px" }} src={map} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Textform;
