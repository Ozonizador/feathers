import React from "react";
import Image from "next/image";

import Pg4_5homecard from "../../components/pg4_5homecard/Pg4_5homecard";

export default function Pg4_5selection() {
  return (
    <div>
      <div className="">
        <div className="row">
          <div className="col-7">
            <div className="row ">
              <div className="top">
                <h2 className="headingt fs-100 bold" style={{ fontSize: "25px" }}>
                  Pertence Onde Tu Quiseres!
                </h2>

                <div className="form-group col-4 otuline-secondary " style={{ width: "20%" }}>
                  <select id="inputState" className="form-select">
                    <option>Ordenar Por</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-3">
                <select id="inputState" className="form-select form-control-lg select-destaques">
                  <option>Tipo De Espaço</option>
                  <option>...</option>
                </select>
              </div>

              <div className="col-md-3">
                <select id="inputState" className="form-select form-control- select-destaques">
                  <option>Preço</option>
                  <option>...</option>
                </select>
              </div>

              <div className="col-md-3">
                <select id="inputState" className="form-select form-control-lg select-destaques">
                  <option>Comodidades</option>
                  <option>...</option>
                </select>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-2">
                <button
                  className="btn w-100"
                  id="btn-destaques"
                  style={{ backgroundColor: "#c48b60" }}
                >
                  Mais Filtros
                </button>
              </div>
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home1.png" />
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home2.png" />
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home3.png" />
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home4.png" />
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home5.png" />
            </div>

            <div className="row">
              <Pg4_5homecard img="/images/home6.png" />
            </div>

            <div className="row mb-5">
              <div className="col-md-2"></div>
              <div className="col-md-5 d-flex justify-content-center">
                <button className="btn w-auto shadow-none">
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button
                  className="btn w-auto shadow-none"
                  style={{
                    backgroundColor: "#c48b60",
                    color: "#fff",
                  }}
                >
                  1
                </button>
                <button className="btn w-auto shadow-none">2</button>
                <button className="btn w-auto shadow-none">3</button>
                <button className="btn w-auto shadow-none">4</button>
                <button className="btn w-auto shadow-none">5</button>
                <button className="btn w-auto shadow-none">6</button>
                <button className="btn w-auto shadow-none">
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div className="col-md-5"></div>
            </div>
          </div>
          <div className="col-5 d-none d-lg-block ">
            <Image src="/images/homemap.png" height={32} width={32} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
