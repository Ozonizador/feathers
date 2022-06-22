import React from "react";
import "./Profileinput.css";
import user from "../../Assets/images/user.png";
function Profileinput() {
  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col">
            <p id="profile-heading" className="mb-4">
              Perfil da Maria
            </p>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            {/* Avator */}
            <div>
              <img
                src={user}
                className="rounded-circle mb-4"
                style={{ width: "100px" }}
                alt="Avatar"
              />
            </div>
          </div>
          <div className="col">
            <div className="mt-2">
              <textarea
                placeholder="Sobre mim..."
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Profileinput;
