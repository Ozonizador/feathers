import React from "react";
import Image from "next/image";
import SimpleMap from "./SimpleMap.jsx";

function Maps() {
  return (
    <div>
      <div className="container mb-4">
        <div id="maps" className="row ">
          <div id="map" className="col-lg-6">
            <SimpleMap />
          </div>
          <div id="form" className="col-lg-6">
            <h1 className="Headingn">Onde Estamos?</h1>
            <div id="search" className="input-group flex-nowrap">
              <span className="input-group-text">
                <Image style={{ padding: "2px" }} src="/images/location.png" alt="" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Portugal continental e ilhas"
                aria-label="Username"
                aria-describedby="addon-wrapping"
              />
            </div>
            <br />
            <p className="textn">
              Pode anunciar o seu espaço de forma gratuita em todo o território nacional.
            </p>

            <p className="textn">
              Pode anunciar o seu espaço de forma gratuita em todo o território nacional.
            </p>
            <button id="buttont" type="button" className="btn mb-4">
              Saber Mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maps;
