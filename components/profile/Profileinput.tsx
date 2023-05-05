import React from "react";
import Image from "next/image";
import { defaultUserProfile } from "../../helpers/imageHelper";

/*  not being used */
const ProfileInput = () => {
  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col">
            <p className="mb-4">Perfil da Maria</p>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            {/* Avator */}
            <div>
              <Image src={defaultUserProfile} className="rounded-circle mb-4" style={{ width: "100px" }} alt="Avatar" />
            </div>
          </div>
          <div className="col">
            <div className="mt-2">
              <textarea
                placeholder="Sobre mim..."
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInput;
