import React from "react";
import Image from "next/image";

import Pg4_5homecard from "../../components/pg4_5homecard/Pg4_5homecard";

export default function Rooms() {
  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-1/2">
          <div className="row">
            <div className="flex flex-1">
              <h2 className="heading text-bold" style={{ fontSize: "25px" }}>
                Pertence Onde Tu Quiseres!
              </h2>

              <div className="ml-auto">
                <select className="w-32">
                  <option>Ordenar Por</option>
                  <option>...</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 py-5">
            <div className="mr-auto w-64">
              <select className="w-32">
                <option>Tipo De Espaço</option>
                <option>...</option>
              </select>
            </div>

            <div>
              <select className="w-32">
                <option>Preço</option>
                <option>...</option>
              </select>
            </div>

            <div>
              <select className="w-32">
                <option>Comodidades</option>
                <option>...</option>
              </select>
            </div>

            <div>
              <button
                className="bg-primary-500 p-2 text-white"
                style={{ backgroundColor: "#c48b60" }}
              >
                Mais Filtros
              </button>
            </div>
          </div>

          <div>
            <Pg4_5homecard img="/images/home1.png" />
          </div>

          <div>
            <Pg4_5homecard img="/images/home2.png" />
          </div>

          <div>
            <Pg4_5homecard img="/images/home3.png" />
          </div>

          <div>
            <Pg4_5homecard img="/images/home4.png" />
          </div>

          <div>
            <Pg4_5homecard img="/images/home5.png" />
          </div>

          <div>
            <Pg4_5homecard img="/images/home6.png" />
          </div>

          <div className="row mb-5">
            <div className="col-md-2"></div>
            <div className="flex flex-1 justify-around px-5">
              <button className="btn w-auto shadow-none">
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button className="bg-primary-500 p-2 text-white shadow-none">1</button>
              <button className="p-2 shadow-none">2</button>
              <button className="p-2 shadow-none">3</button>
              <button className="p-2 shadow-none">4</button>
              <button className="p-2 shadow-none">5</button>
              <button className="p-2 shadow-none">6</button>
              <button className="p-2 shadow-none">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="col-md-5"></div>
          </div>
        </div>
        <div className="w-1/2 px-5">
          <Image src="/images/homemap.png" layout="responsive" height="100%" width="100%" alt="" />
        </div>
      </div>
    </>
  );
}
