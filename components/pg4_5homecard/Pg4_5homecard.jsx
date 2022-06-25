import React from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { GrRestroom } from "react-icons/gr";

export default function RoomInformation(props) {
  const routeChange = () => {
    let path = `/4_5`;
    // navigate(path);
  };

  return (
    <div>
      <div className="container mb-4">
        <div>
          <div className="cards">
            <div className="flex flex-1">
              <div>
                <Image src={props.img} className="card-img" alt="..." height={256} width={256} />
              </div>
              <div onClick={routeChange} className="p-3">
                <div className="m-1">
                  <div className="">
                    <h6 className="mb-0 ">Quarto Privado em T3 - Peniche</h6>
                    <div className="m-1">
                      <Image src="/images/stars.png" alt="" height={32} width={32} />
                    </div>
                  </div>
                  {/* icon with images */}
                  <div className="mb-2 mt-3 flex flex-1 justify-around">
                    <div>
                      <RiUserLine className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">2 Hóspedes</span>
                    </div>
                    <div className="ml-2">
                      <BiBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Cama</span>
                    </div>
                    <div className="ml-2">
                      <TbBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Quarto</span>
                    </div>
                    <div className="ml-2">
                      <GrRestroom className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">1 Casa De Banho</span>
                    </div>
                  </div>
                  <div className="d-flex mb-1 mt-2" style={{ fontSize: "12px" }}>
                    <ul
                      id="classlist"
                      className="d-flex space-between flex-row"
                      style={{ gap: "20px" }}
                    >
                      <li>Wifi</li>
                      <li>Cozinha</li>
                      <li>Secretária</li>
                      <li>Varanda</li>
                    </ul>
                  </div>

                  <div className="row">
                    <div className="col-6 mt-4">
                      <button id="cardbtn">Favoritos</button>
                    </div>
                    <div className="col-6">
                      <div className="hotel-card_pricing text-center">
                        <h3 style={{ color: "#C48B60" }}>300€/mês</h3>
                        <div className="d-flex">
                          <p
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            Despesas incluídas
                          </p>
                          <i className="fa-solid fa-circle-info m-1"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
