import React from "react";
import "./Notification.css";
import notification from "../../Assets/images/notification.png";

function Notification() {
  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-lg-3"></div>
          <div className="col-lg-6 col-sm-12 ">
            <div className="alert alert-warning con " role="alert">
              <img style={{ height: "5vh" }} src={notification} alt="" />
              Receba notificações sempre que houver novidades por aqui
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
